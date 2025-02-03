"use strict";
// *****************************************************************************
// Copyright (C) 2017-2018 Ericsson and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
// *****************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskConfigurations = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("../common");
const task_definition_registry_1 = require("./task-definition-registry");
const provided_task_configurations_1 = require("./provided-task-configurations");
const task_configuration_manager_1 = require("./task-configuration-manager");
const task_schema_updater_1 = require("./task-schema-updater");
const task_source_resolver_1 = require("./task-source-resolver");
const common_2 = require("@theia/core/lib/common");
const browser_1 = require("@theia/workspace/lib/browser");
/**
 * Watches a tasks.json configuration file and provides a parsed version of the contained task configurations
 */
let TaskConfigurations = class TaskConfigurations {
    constructor() {
        this.toDispose = new common_2.DisposableCollection();
        /**
         * Map of source (path of root folder that the task configs come from) and task config map.
         * For the inner map (i.e., task config map), the key is task label and value TaskConfiguration
         */
        this.tasksMap = new Map();
        /**
         * Map of source (path of root folder that the task configs come from) and task customizations map.
         */
        this.taskCustomizationMap = new Map();
        this.client = undefined;
        /**
         * Map of source (path of root folder that the task configs come from) and raw task configurations / customizations.
         * This map is used to store the data from `tasks.json` files in workspace.
         */
        this.rawTaskConfigurations = new Map();
        this.toDispose.push(common_2.Disposable.create(() => {
            this.tasksMap.clear();
            this.taskCustomizationMap.clear();
            this.rawTaskConfigurations.clear();
            this.client = undefined;
        }));
    }
    init() {
        this.toDispose.push(this.taskConfigurationManager.onDidChangeTaskConfig(async (change) => {
            try {
                await this.onDidTaskFileChange([change]);
                if (this.client) {
                    this.client.taskConfigurationChanged(this.getTaskLabels());
                }
            }
            catch (err) {
                console.error(err);
            }
        }));
        this.reorganizeTasks();
        this.toDispose.push(this.taskSchemaUpdater.onDidChangeTaskSchema(() => this.reorganizeTasks()));
    }
    setClient(client) {
        this.client = client;
    }
    dispose() {
        this.toDispose.dispose();
    }
    /** returns the list of known task labels */
    getTaskLabels() {
        return Array.from(this.tasksMap.values()).reduce((acc, labelConfigMap) => acc.concat(Array.from(labelConfigMap.keys())), []);
    }
    /**
     * returns a collection of known tasks, which includes:
     * - all the configured tasks in `tasks.json`, and
     * - the customized detected tasks.
     *
     * The invalid task configs are not returned.
     */
    async getTasks(token) {
        const configuredTasks = Array.from(this.tasksMap.values()).reduce((acc, labelConfigMap) => acc.concat(Array.from(labelConfigMap.values())), []);
        const detectedTasksAsConfigured = [];
        for (const [rootFolder, customizations] of Array.from(this.taskCustomizationMap.entries())) {
            for (const customization of customizations) {
                // TODO: getTasksToCustomize() will ask all task providers to contribute tasks. Doing this in a loop is bad.
                const detected = await this.providedTaskConfigurations.getTaskToCustomize(token, customization, rootFolder);
                if (detected) {
                    // there might be a provided task that has a different scope from the task we're inspecting
                    detectedTasksAsConfigured.push({ ...detected, ...customization });
                }
            }
        }
        return [...configuredTasks, ...detectedTasksAsConfigured];
    }
    getRawTaskConfigurations(scope) {
        if (scope === undefined) {
            const tasks = [];
            for (const configs of this.rawTaskConfigurations.values()) {
                tasks.push(...configs);
            }
            return tasks;
        }
        const scopeKey = this.getKeyFromScope(scope);
        if (this.rawTaskConfigurations.has(scopeKey)) {
            return Array.from(this.rawTaskConfigurations.get(scopeKey).values());
        }
        return [];
    }
    /**
     * returns a collection of invalid task configs as per the task schema defined in Theia.
     */
    getInvalidTaskConfigurations() {
        const invalidTaskConfigs = [];
        for (const taskConfigs of this.rawTaskConfigurations.values()) {
            for (const taskConfig of taskConfigs) {
                const isValid = this.isTaskConfigValid(taskConfig);
                if (!isValid) {
                    invalidTaskConfigs.push(taskConfig);
                }
            }
        }
        return invalidTaskConfigs;
    }
    /** returns the task configuration for a given label or undefined if none */
    getTask(scope, taskLabel) {
        const labelConfigMap = this.tasksMap.get(this.getKeyFromScope(scope));
        if (labelConfigMap) {
            return labelConfigMap.get(taskLabel);
        }
    }
    /** returns the customized task for a given label or undefined if none */
    async getCustomizedTask(token, scope, taskLabel) {
        const customizations = this.taskCustomizationMap.get(this.getKeyFromScope(scope));
        if (customizations) {
            const customization = customizations.find(cus => cus.label === taskLabel);
            if (customization) {
                const detected = await this.providedTaskConfigurations.getTaskToCustomize(token, customization, scope);
                if (detected) {
                    return {
                        ...detected,
                        ...customization,
                        type: detected.type
                    };
                }
            }
        }
    }
    /** removes tasks configured in the given task config file */
    removeTasks(scope) {
        const source = this.getKeyFromScope(scope);
        this.tasksMap.delete(source);
        this.taskCustomizationMap.delete(source);
    }
    /**
     * Removes task customization objects found in the given task config file from the memory.
     * Please note: this function does not modify the task config file.
     */
    removeTaskCustomizations(scope) {
        const source = this.getKeyFromScope(scope);
        this.taskCustomizationMap.delete(source);
    }
    /**
     * Returns the task customizations by type from a given root folder in the workspace.
     * @param type the type of task customizations
     * @param rootFolder the root folder to find task customizations from. If `undefined`, this function returns an empty array.
     */
    getTaskCustomizations(type, scope) {
        const customizationInRootFolder = this.taskCustomizationMap.get(this.getKeyFromScope(scope));
        if (customizationInRootFolder) {
            return customizationInRootFolder.filter(c => c.type === type);
        }
        else {
            return [];
        }
    }
    /**
     * Returns the customization object in `tasks.json` for the given task. Please note, this function
     * returns `undefined` if the given task is not a detected task, because configured tasks don't need
     * customization objects - users can modify its config directly in `tasks.json`.
     * @param taskConfig The task config, which could either be a configured task or a detected task.
     */
    getCustomizationForTask(taskConfig) {
        if (!this.isDetectedTask(taskConfig)) {
            return undefined;
        }
        const customizationByType = this.getTaskCustomizations(taskConfig.type, taskConfig._scope) || [];
        const hasCustomization = customizationByType.length > 0;
        if (hasCustomization) {
            const taskDefinition = this.taskDefinitionRegistry.getDefinition(taskConfig);
            if (taskDefinition) {
                const required = taskDefinition.properties.required || [];
                // Only support having one customization per task.
                return customizationByType.find(customization => required.every(property => customization[property] === taskConfig[property]));
            }
        }
        return undefined;
    }
    /**
     * Called when a change, to a config file we watch, is detected.
     */
    async onDidTaskFileChange(fileChanges) {
        for (const change of fileChanges) {
            if (change.type === 2 /* FileChangeType.DELETED */) {
                this.removeTasks(change.scope);
            }
            else {
                // re-parse the config file
                await this.refreshTasks(change.scope);
            }
        }
    }
    /**
     * Read the task configs from the task configuration manager, and updates the list of available tasks.
     */
    async refreshTasks(scope) {
        await this.readTasks(scope);
        this.removeTasks(scope);
        this.removeTaskCustomizations(scope);
        this.reorganizeTasks();
    }
    /** parses a config file and extracts the tasks launch configurations */
    async readTasks(scope) {
        const rawConfigArray = this.taskConfigurationManager.getTasks(scope);
        const key = this.getKeyFromScope(scope);
        if (this.rawTaskConfigurations.has(key)) {
            this.rawTaskConfigurations.delete(key);
        }
        this.rawTaskConfigurations.set(key, rawConfigArray);
        return rawConfigArray;
    }
    async openUserTasks() {
        await this.taskConfigurationManager.openConfiguration(common_1.TaskScope.Global);
    }
    /** Adds given task to a config file and opens the file to provide ability to edit task configuration. */
    async configure(token, task) {
        const scope = task._scope;
        if (scope === common_1.TaskScope.Global) {
            return this.openUserTasks();
        }
        const workspace = this.workspaceService.workspace;
        if (!workspace) {
            return;
        }
        const configuredAndCustomizedTasks = await this.getTasks(token);
        if (!configuredAndCustomizedTasks.some(t => this.taskDefinitionRegistry.compareTasks(t, task))) {
            await this.saveTask(scope, task);
        }
        try {
            await this.taskConfigurationManager.openConfiguration(scope);
        }
        catch (e) {
            console.error(`Error occurred while opening 'tasks.json' in ${this.taskSourceResolver.resolve(task)}.`, e);
        }
    }
    getTaskCustomizationTemplate(task) {
        const definition = this.getTaskDefinition(task);
        if (!definition) {
            console.error('Detected / Contributed tasks should have a task definition.');
            return;
        }
        const customization = { type: task.type, runOptions: task.runOptions };
        definition.properties.all.forEach(p => {
            if (task[p] !== undefined) {
                customization[p] = task[p];
            }
        });
        if ('problemMatcher' in task) {
            const problemMatcher = [];
            if (Array.isArray(task.problemMatcher)) {
                problemMatcher.push(...task.problemMatcher.map(t => {
                    if (typeof t === 'string') {
                        return t;
                    }
                    else {
                        return t.name;
                    }
                }));
            }
            else if (typeof task.problemMatcher === 'string') {
                problemMatcher.push(task.problemMatcher);
            }
            else if (task.problemMatcher) {
                problemMatcher.push(task.problemMatcher.name);
            }
            customization.problemMatcher = problemMatcher.map(common_1.asVariableName);
        }
        if (task.group) {
            customization.group = task.group;
        }
        customization.label = task.label;
        return { ...customization };
    }
    /** Writes the task to a config file. Creates a config file if this one does not exist */
    saveTask(scope, task) {
        const { _source, $ident, ...preparedTask } = task;
        const customizedTaskTemplate = this.getTaskCustomizationTemplate(task) || preparedTask;
        return this.taskConfigurationManager.addTaskConfiguration(scope, customizedTaskTemplate);
    }
    /**
     * This function is called after a change in TaskDefinitionRegistry happens.
     * It checks all tasks that have been loaded, and re-organized them in `tasksMap` and `taskCustomizationMap`.
     */
    reorganizeTasks() {
        const newTaskMap = new Map();
        const newTaskCustomizationMap = new Map();
        const addCustomization = (rootFolder, customization) => {
            if (newTaskCustomizationMap.has(rootFolder)) {
                newTaskCustomizationMap.get(rootFolder).push(customization);
            }
            else {
                newTaskCustomizationMap.set(rootFolder, [customization]);
            }
        };
        const addConfiguredTask = (rootFolder, label, configuredTask) => {
            if (newTaskMap.has(rootFolder)) {
                newTaskMap.get(rootFolder).set(label, configuredTask);
            }
            else {
                const newConfigMap = new Map();
                newConfigMap.set(label, configuredTask);
                newTaskMap.set(rootFolder, newConfigMap);
            }
        };
        for (const [scopeKey, taskConfigs] of this.rawTaskConfigurations.entries()) {
            for (const taskConfig of taskConfigs) {
                const scope = this.getScopeFromKey(scopeKey);
                const isValid = this.isTaskConfigValid(taskConfig);
                if (!isValid) {
                    continue;
                }
                const transformedTask = this.getTransformedRawTask(taskConfig, scope);
                if (this.isDetectedTask(transformedTask)) {
                    addCustomization(scopeKey, transformedTask);
                }
                else {
                    addConfiguredTask(scopeKey, transformedTask['label'], transformedTask);
                }
            }
        }
        this.taskCustomizationMap = newTaskCustomizationMap;
        this.tasksMap = newTaskMap;
    }
    getTransformedRawTask(rawTask, scope) {
        let taskConfig;
        if (this.isDetectedTask(rawTask)) {
            const def = this.getTaskDefinition(rawTask);
            taskConfig = {
                ...rawTask,
                _source: def.source,
                _scope: scope
            };
        }
        else {
            taskConfig = {
                ...rawTask,
                _source: scope,
                _scope: scope
            };
        }
        return {
            ...taskConfig,
            presentation: common_1.TaskOutputPresentation.fromJson(rawTask)
        };
    }
    /**
     * Returns `true` if the given task configuration is valid as per the task schema defined in Theia
     * or contributed by Theia extensions and plugins, `false` otherwise.
     */
    isTaskConfigValid(task) {
        return this.taskSchemaUpdater.validate({ tasks: [task] });
    }
    /**
     * Updates the task config in the `tasks.json`.
     * The task config, together with updates, will be written into the `tasks.json` if it is not found in the file.
     *
     * @param task task that the updates will be applied to
     * @param update the updates to be applied
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async updateTaskConfig(token, task, update) {
        const scope = task._scope;
        const configuredAndCustomizedTasks = await this.getTasks(token);
        if (configuredAndCustomizedTasks.some(t => this.taskDefinitionRegistry.compareTasks(t, task))) { // task is already in `tasks.json`
            const jsonTasks = this.taskConfigurationManager.getTasks(scope);
            if (jsonTasks) {
                const ind = jsonTasks.findIndex((t) => {
                    if (t.type !== (task.type)) {
                        return false;
                    }
                    const def = this.taskDefinitionRegistry.getDefinition(t);
                    if (def) {
                        return def.properties.all.every(p => t[p] === task[p]);
                    }
                    return t.label === task.label;
                });
                jsonTasks[ind] = {
                    ...jsonTasks[ind],
                    ...update
                };
            }
            this.taskConfigurationManager.setTaskConfigurations(scope, jsonTasks);
        }
        else { // task is not in `tasks.json`
            Object.keys(update).forEach(taskProperty => {
                task[taskProperty] = update[taskProperty];
            });
            this.saveTask(scope, task);
        }
    }
    getKeyFromScope(scope) {
        // Converting the enums to string will not yield a valid URI, so the keys will be distinct from any URI.
        return scope.toString();
    }
    getScopeFromKey(key) {
        if (common_1.TaskScope.Global.toString() === key) {
            return common_1.TaskScope.Global;
        }
        else if (common_1.TaskScope.Workspace.toString() === key) {
            return common_1.TaskScope.Workspace;
        }
        else {
            return key;
        }
    }
    /** checks if the config is a detected / contributed task */
    isDetectedTask(task) {
        const taskDefinition = this.getTaskDefinition(task);
        // it is considered as a customization if the task definition registry finds a def for the task configuration
        return !!taskDefinition;
    }
    getTaskDefinition(task) {
        return this.taskDefinitionRegistry.getDefinition(task);
    }
};
exports.TaskConfigurations = TaskConfigurations;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.WorkspaceService),
    tslib_1.__metadata("design:type", browser_1.WorkspaceService)
], TaskConfigurations.prototype, "workspaceService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(task_definition_registry_1.TaskDefinitionRegistry),
    tslib_1.__metadata("design:type", task_definition_registry_1.TaskDefinitionRegistry)
], TaskConfigurations.prototype, "taskDefinitionRegistry", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(provided_task_configurations_1.ProvidedTaskConfigurations),
    tslib_1.__metadata("design:type", provided_task_configurations_1.ProvidedTaskConfigurations)
], TaskConfigurations.prototype, "providedTaskConfigurations", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(task_configuration_manager_1.TaskConfigurationManager),
    tslib_1.__metadata("design:type", task_configuration_manager_1.TaskConfigurationManager)
], TaskConfigurations.prototype, "taskConfigurationManager", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(task_schema_updater_1.TaskSchemaUpdater),
    tslib_1.__metadata("design:type", task_schema_updater_1.TaskSchemaUpdater)
], TaskConfigurations.prototype, "taskSchemaUpdater", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(task_source_resolver_1.TaskSourceResolver),
    tslib_1.__metadata("design:type", task_source_resolver_1.TaskSourceResolver)
], TaskConfigurations.prototype, "taskSourceResolver", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TaskConfigurations.prototype, "init", null);
exports.TaskConfigurations = TaskConfigurations = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], TaskConfigurations);
//# sourceMappingURL=task-configurations.js.map