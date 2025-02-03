"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.bindOutputPreferences = exports.createOutputPreferences = exports.OutputPreferences = exports.OutputPreferenceContribution = exports.OutputConfigSchema = void 0;
const preferences_1 = require("@theia/core/lib/browser/preferences");
const nls_1 = require("@theia/core/lib/common/nls");
exports.OutputConfigSchema = {
    'type': 'object',
    'properties': {
        'output.maxChannelHistory': {
            'type': 'number',
            'description': nls_1.nls.localize('theia/output/maxChannelHistory', 'The maximum number of entries in an output channel.'),
            'default': 1000
        }
    }
};
exports.OutputPreferenceContribution = Symbol('OutputPreferenceContribution');
exports.OutputPreferences = Symbol('OutputPreferences');
function createOutputPreferences(preferences, schema = exports.OutputConfigSchema) {
    return (0, preferences_1.createPreferenceProxy)(preferences, schema);
}
exports.createOutputPreferences = createOutputPreferences;
function bindOutputPreferences(bind) {
    bind(exports.OutputPreferences).toDynamicValue(ctx => {
        const preferences = ctx.container.get(preferences_1.PreferenceService);
        const contribution = ctx.container.get(exports.OutputPreferenceContribution);
        return createOutputPreferences(preferences, contribution.schema);
    }).inSingletonScope();
    bind(exports.OutputPreferenceContribution).toConstantValue({ schema: exports.OutputConfigSchema });
    bind(preferences_1.PreferenceContribution).toService(exports.OutputPreferenceContribution);
}
exports.bindOutputPreferences = bindOutputPreferences;
//# sourceMappingURL=output-preferences.js.map