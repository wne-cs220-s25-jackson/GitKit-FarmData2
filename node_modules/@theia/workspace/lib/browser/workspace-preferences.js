"use strict";
// *****************************************************************************
// Copyright (C) 2018 Ericsson and others.
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
exports.bindWorkspacePreferences = exports.createWorkspacePreferences = exports.WorkspacePreferences = exports.WorkspacePreferenceContribution = exports.workspacePreferenceSchema = void 0;
const preferences_1 = require("@theia/core/lib/browser/preferences");
const nls_1 = require("@theia/core/lib/common/nls");
exports.workspacePreferenceSchema = {
    type: 'object',
    properties: {
        'workspace.preserveWindow': {
            description: nls_1.nls.localize('theia/workspace/preserveWindow', 'Enable opening workspaces in current window.'),
            type: 'boolean',
            default: false
        },
    }
};
exports.WorkspacePreferenceContribution = Symbol('WorkspacePreferenceContribution');
exports.WorkspacePreferences = Symbol('WorkspacePreferences');
function createWorkspacePreferences(preferences, schema = exports.workspacePreferenceSchema) {
    return (0, preferences_1.createPreferenceProxy)(preferences, schema);
}
exports.createWorkspacePreferences = createWorkspacePreferences;
function bindWorkspacePreferences(bind) {
    bind(exports.WorkspacePreferences).toDynamicValue(ctx => {
        const preferences = ctx.container.get(preferences_1.PreferenceService);
        const contribution = ctx.container.get(exports.WorkspacePreferenceContribution);
        return createWorkspacePreferences(preferences, contribution.schema);
    }).inSingletonScope();
    bind(exports.WorkspacePreferenceContribution).toConstantValue({ schema: exports.workspacePreferenceSchema });
    bind(preferences_1.PreferenceContribution).toService(exports.WorkspacePreferenceContribution);
}
exports.bindWorkspacePreferences = bindWorkspacePreferences;
//# sourceMappingURL=workspace-preferences.js.map