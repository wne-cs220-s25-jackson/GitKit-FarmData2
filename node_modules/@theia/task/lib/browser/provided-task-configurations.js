"use strict";
// *****************************************************************************
// Copyright (C) 2019 Ericsson and others.
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
exports.ProvidedTaskConfigurations = exports.ALL_TASK_TYPES = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const task_contribution_1 = require("./task-contribution");
const task_definition_registry_1 = require("./task-definition-registry");
const common_1 = require("../common");
exports.ALL_TASK_TYPES = '*';
let ProvidedTaskConfigurations = class ProvidedTaskConfigurations {
    constructor() {
        /**
         * Map of source (name of extension, or path of root folder that the task config comes from) and `task config map`.
         * For the second level of inner map, the key is task label.
         * For the third level of inner map, the key is the task scope and value TaskConfiguration.
         */
        this.tasksMap = new Map();
        this.currentToken = 0;
        this.activatedProvidersTypes = [];
        this.nextToken = 1;
    }
    startUserAction() {
        return this.nextToken++;
    }
    updateUserAction(token) {
        if (this.currentToken !== token) {
            this.currentToken = token;
            this.activatedProvidersTypes.length = 0;
        }
    }
    pushActivatedProvidersType(taskType) {
        if (!this.activatedProvidersTypes.includes(taskType)) {
            this.activatedProvidersTypes.push(taskType);
        }
    }
    isTaskProviderActivationNeeded(taskType) {
        if (!taskType || this.activatedProvidersTypes.includes(taskType) || this.activatedProvidersTypes.includes(exports.ALL_TASK_TYPES)) {
            return false;
        }
        return true;
    }
    /**
     * Activate providers for the given taskType
     * @param taskType A specific task type or '*' to indicate all task providers
     */
    async activateProviders(taskType) {
        if (!!taskType) {
            await this.taskProviderRegistry.activateProvider(taskType);
            this.pushActivatedProvidersType(taskType);
        }
    }
    /** returns a list of provided tasks matching an optional given type, or all if '*' is used */
    async getTasks(token, type) {
        await this.refreshTasks(token, type);
        const tasks = [];
        for (const taskLabelMap of this.tasksMap.values()) {
            for (const taskScopeMap of taskLabelMap.values()) {
                for (const task of taskScopeMap.values()) {
                    if (!type || task.type === type || type === exports.ALL_TASK_TYPES) {
                        tasks.push(task);
                    }
                }
            }
        }
        return tasks;
    }
    async refreshTasks(token, taskType) {
        const newProviderActivationNeeded = this.isTaskProviderActivationNeeded(taskType);
        if (token !== this.currentToken || newProviderActivationNeeded) {
            this.updateUserAction(token);
            await this.activateProviders(taskType);
            const providers = await this.taskProviderRegistry.getProviders();
            const providedTasks = (await Promise.all(providers.map(p => this.resolveTaskConfigurations(p))))
                .reduce((acc, taskArray) => acc.concat(taskArray), []);
            this.cacheTasks(providedTasks);
        }
    }
    async resolveTaskConfigurations(taskProvider) {
        return (await taskProvider.provideTasks())
            // Global/User tasks from providers are not supported.
            .filter(task => task.scope !== common_1.TaskScope.Global)
            .map(providedTask => {
            const originalPresentation = providedTask.presentation || {};
            return {
                ...providedTask,
                presentation: {
                    ...common_1.TaskOutputPresentation.getDefault(),
                    ...originalPresentation
                }
            };
        });
    }
    /** returns the task configuration for a given source and label or undefined if none */
    async getTask(token, source, taskLabel, scope) {
        await this.refreshTasks(token);
        return this.getCachedTask(source, taskLabel, scope);
    }
    /**
     * Finds the detected task for the given task customization.
     * The detected task is considered as a "match" to the task customization if it has all the `required` properties.
     * In case that more than one customization is found, return the one that has the biggest number of matched properties.
     *
     * @param customization the task customization
     * @return the detected task for the given task customization. If the task customization is not found, `undefined` is returned.
     */
    async getTaskToCustomize(token, customization, scope) {
        const definition = this.taskDefinitionRegistry.getDefinition(customization);
        if (!definition) {
            return undefined;
        }
        const matchedTasks = [];
        let highest = -1;
        const tasks = await this.getTasks(token, customization.type);
        for (const task of tasks) { // find detected tasks that match the `definition`
            const required = definition.properties.required || [];
            if (!required.every(requiredProp => customization[requiredProp] !== undefined)) {
                continue;
            }
            let score = required.length; // number of required properties
            const requiredProps = new Set(required);
            // number of optional properties
            score += definition.properties.all.filter(p => !requiredProps.has(p) && customization[p] !== undefined).length;
            if (score >= highest) {
                if (score > highest) {
                    highest = score;
                    matchedTasks.length = 0;
                }
                matchedTasks.push(task);
            }
        }
        // Tasks with scope set to 'Workspace' can be customized in a workspace root, and will not match
        // providers scope 'TaskScope.Workspace' unless specifically included as below.
        const scopes = [scope, common_1.TaskScope.Workspace];
        // find the task that matches the `customization`.
        // The scenario where more than one match is found should not happen unless users manually enter multiple customizations for one type of task
        // If this does happen, return the first match
        const matchedTask = matchedTasks.find(t => scopes.some(scp => scp === t._scope) && definition.properties.all.every(p => t[p] === customization[p]));
        return matchedTask;
    }
    getCachedTask(source, taskLabel, scope) {
        const labelConfigMap = this.tasksMap.get(source);
        if (labelConfigMap) {
            const scopeConfigMap = labelConfigMap.get(taskLabel);
            if (scopeConfigMap) {
                if (scope) {
                    return scopeConfigMap.get(scope.toString());
                }
                return Array.from(scopeConfigMap.values())[0];
            }
        }
    }
    cacheTasks(tasks) {
        this.tasksMap.clear();
        for (const task of tasks) {
            const label = task.label;
            const source = task._source;
            const scope = task._scope;
            if (this.tasksMap.has(source)) {
                const labelConfigMap = this.tasksMap.get(source);
                if (labelConfigMap.has(label)) {
                    labelConfigMap.get(label).set(scope.toString(), task);
                }
                else {
                    const newScopeConfigMap = new Map();
                    newScopeConfigMap.set(scope.toString(), task);
                    labelConfigMap.set(label, newScopeConfigMap);
                }
            }
            else {
                const newLabelConfigMap = new Map();
                const newScopeConfigMap = new Map();
                newScopeConfigMap.set(scope.toString(), task);
                newLabelConfigMap.set(label, newScopeConfigMap);
                this.tasksMap.set(source, newLabelConfigMap);
            }
        }
    }
};
exports.ProvidedTaskConfigurations = ProvidedTaskConfigurations;
tslib_1.__decorate([
    (0, inversify_1.inject)(task_contribution_1.TaskProviderRegistry),
    tslib_1.__metadata("design:type", task_contribution_1.TaskProviderRegistry)
], ProvidedTaskConfigurations.prototype, "taskProviderRegistry", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(task_definition_registry_1.TaskDefinitionRegistry),
    tslib_1.__metadata("design:type", task_definition_registry_1.TaskDefinitionRegistry)
], ProvidedTaskConfigurations.prototype, "taskDefinitionRegistry", void 0);
exports.ProvidedTaskConfigurations = ProvidedTaskConfigurations = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ProvidedTaskConfigurations);
//# sourceMappingURL=provided-task-configurations.js.map