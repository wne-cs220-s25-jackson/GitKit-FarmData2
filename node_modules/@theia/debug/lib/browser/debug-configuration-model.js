"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.DebugConfigurationModel = void 0;
const event_1 = require("@theia/core/lib/common/event");
const disposable_1 = require("@theia/core/lib/common/disposable");
const debug_common_1 = require("../common/debug-common");
const debug_compound_1 = require("../common/debug-compound");
const common_1 = require("@theia/core/lib/common");
class DebugConfigurationModel {
    constructor(workspaceFolderUri, preferences) {
        this.workspaceFolderUri = workspaceFolderUri;
        this.preferences = preferences;
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
        this.toDispose = new disposable_1.DisposableCollection(this.onDidChangeEmitter);
        this.reconcile();
        this.toDispose.push(this.preferences.onPreferenceChanged(e => {
            if (e.preferenceName === 'launch' && e.affects(workspaceFolderUri)) {
                this.reconcile();
            }
        }));
    }
    get uri() {
        return this.json.uri;
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
    get compounds() {
        return this.json.compounds;
    }
    async reconcile() {
        this.json = this.parseConfigurations();
        this.onDidChangeEmitter.fire(undefined);
    }
    parseConfigurations() {
        const configurations = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { configUri, value } = this.preferences.resolve('launch', undefined, this.workspaceFolderUri);
        if ((0, common_1.isObject)(value) && Array.isArray(value.configurations)) {
            for (const configuration of value.configurations) {
                if (debug_common_1.DebugConfiguration.is(configuration)) {
                    configurations.push(configuration);
                }
            }
        }
        const compounds = [];
        if ((0, common_1.isObject)(value) && Array.isArray(value.compounds)) {
            for (const compound of value.compounds) {
                if (debug_compound_1.DebugCompound.is(compound)) {
                    compounds.push(compound);
                }
            }
        }
        return { uri: configUri, configurations, compounds };
    }
}
exports.DebugConfigurationModel = DebugConfigurationModel;
//# sourceMappingURL=debug-configuration-model.js.map