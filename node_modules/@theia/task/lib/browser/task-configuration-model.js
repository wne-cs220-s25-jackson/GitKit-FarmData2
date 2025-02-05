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
exports.TaskConfigurationModel = void 0;
const event_1 = require("@theia/core/lib/common/event");
const disposable_1 = require("@theia/core/lib/common/disposable");
const browser_1 = require("@theia/core/lib/browser");
const common_1 = require("@theia/core/lib/common");
/**
 * Holds the task configurations associated with a particular file. Uses an editor model to facilitate
 * non-destructive editing and coordination with editing the file by hand.
 */
class TaskConfigurationModel {
    constructor(scope, preferences) {
        this.scope = scope;
        this.preferences = preferences;
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
        this.toDispose = new disposable_1.DisposableCollection(this.onDidChangeEmitter);
        this.reconcile();
        this.toDispose.push(this.preferences.onDidPreferencesChanged((e) => {
            const change = e['tasks'];
            if (change && browser_1.PreferenceProviderDataChange.affects(change, this.getWorkspaceFolder())) {
                this.reconcile();
            }
        }));
    }
    get uri() {
        return this.json.uri;
    }
    getWorkspaceFolder() {
        return typeof this.scope === 'string' ? this.scope : undefined;
    }
    dispose() {
        this.toDispose.dispose();
    }
    get onDispose() {
        return this.toDispose.onDispose;
    }
    get configurations() {
        return this.json.configurations;
    }
    reconcile() {
        this.json = this.parseConfigurations();
        this.onDidChangeEmitter.fire(undefined);
    }
    setConfigurations(value) {
        return this.preferences.setPreference('tasks.tasks', value, this.getWorkspaceFolder());
    }
    parseConfigurations() {
        const configurations = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { configUri, value } = this.preferences.resolve('tasks', this.getWorkspaceFolder());
        if ((0, common_1.isObject)(value) && Array.isArray(value.tasks)) {
            for (const taskConfig of value.tasks) {
                configurations.push(taskConfig);
            }
        }
        return {
            uri: configUri,
            configurations
        };
    }
}
exports.TaskConfigurationModel = TaskConfigurationModel;
//# sourceMappingURL=task-configuration-model.js.map