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
exports.bindDebugPreferences = exports.createDebugPreferences = exports.DebugPreferences = exports.DebugPreferenceContribution = exports.DebugConfiguration = exports.debugPreferencesSchema = void 0;
const nls_1 = require("@theia/core/lib/common/nls");
const preferences_1 = require("@theia/core/lib/browser/preferences");
exports.debugPreferencesSchema = {
    type: 'object',
    properties: {
        'debug.trace': {
            type: 'boolean',
            default: false,
            description: nls_1.nls.localize('theia/debug/toggleTracing', 'Enable/disable tracing communications with debug adapters')
        },
        'debug.openDebug': {
            enum: ['neverOpen', 'openOnSessionStart', 'openOnFirstSessionStart', 'openOnDebugBreak'],
            default: 'openOnSessionStart',
            description: nls_1.nls.localizeByDefault('Controls when the debug view should open.')
        },
        'debug.internalConsoleOptions': {
            enum: ['neverOpen', 'openOnSessionStart', 'openOnFirstSessionStart'],
            default: 'openOnFirstSessionStart',
            description: nls_1.nls.localizeByDefault('Controls when the internal Debug Console should open.')
        },
        'debug.inlineValues': {
            type: 'boolean',
            default: false,
            description: nls_1.nls.localizeByDefault('Show variable values inline in editor while debugging.')
        },
        'debug.showInStatusBar': {
            enum: ['never', 'always', 'onFirstSessionStart'],
            enumDescriptions: [
                nls_1.nls.localizeByDefault('Never show debug in Status bar'),
                nls_1.nls.localizeByDefault('Always show debug in Status bar'),
                nls_1.nls.localizeByDefault('Show debug in Status bar only after debug was started for the first time')
            ],
            description: nls_1.nls.localizeByDefault('Controls when the debug Status bar should be visible.'),
            default: 'onFirstSessionStart'
        },
        'debug.confirmOnExit': {
            description: 'Controls whether to confirm when the window closes if there are active debug sessions.',
            type: 'string',
            enum: ['never', 'always'],
            enumDescriptions: [
                'Never confirm.',
                'Always confirm if there are debug sessions.',
            ],
            default: 'never'
        },
        'debug.disassemblyView.showSourceCode': {
            description: nls_1.nls.localizeByDefault('Show Source Code in Disassembly View.'),
            type: 'boolean',
            default: true,
        }
    }
};
class DebugConfiguration {
}
exports.DebugConfiguration = DebugConfiguration;
exports.DebugPreferenceContribution = Symbol('DebugPreferenceContribution');
exports.DebugPreferences = Symbol('DebugPreferences');
function createDebugPreferences(preferences, schema = exports.debugPreferencesSchema) {
    return (0, preferences_1.createPreferenceProxy)(preferences, schema);
}
exports.createDebugPreferences = createDebugPreferences;
function bindDebugPreferences(bind) {
    bind(exports.DebugPreferences).toDynamicValue(ctx => {
        const preferences = ctx.container.get(preferences_1.PreferenceService);
        const contribution = ctx.container.get(exports.DebugPreferenceContribution);
        return createDebugPreferences(preferences, contribution.schema);
    }).inSingletonScope();
    bind(exports.DebugPreferenceContribution).toConstantValue({ schema: exports.debugPreferencesSchema });
    bind(preferences_1.PreferenceContribution).toService(exports.DebugPreferenceContribution);
}
exports.bindDebugPreferences = bindDebugPreferences;
//# sourceMappingURL=debug-preferences.js.map