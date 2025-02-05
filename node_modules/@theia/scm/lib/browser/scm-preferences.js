"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
exports.bindScmPreferences = exports.createScmPreferences = exports.ScmPreferences = exports.ScmPreferenceContribution = exports.scmPreferenceSchema = void 0;
const preferences_1 = require("@theia/core/lib/browser/preferences");
const nls_1 = require("@theia/core/lib/common/nls");
exports.scmPreferenceSchema = {
    type: 'object',
    properties: {
        'scm.defaultViewMode': {
            type: 'string',
            enum: ['tree', 'list'],
            enumDescriptions: [
                nls_1.nls.localizeByDefault('Show the repository changes as a tree.'),
                nls_1.nls.localizeByDefault('Show the repository changes as a list.')
            ],
            description: nls_1.nls.localizeByDefault('Controls the default Source Control repository view mode.'),
            default: 'list'
        }
    }
};
exports.ScmPreferenceContribution = Symbol('ScmPreferenceContribution');
exports.ScmPreferences = Symbol('ScmPreferences');
function createScmPreferences(preferences, schema = exports.scmPreferenceSchema) {
    return (0, preferences_1.createPreferenceProxy)(preferences, schema);
}
exports.createScmPreferences = createScmPreferences;
function bindScmPreferences(bind) {
    bind(exports.ScmPreferences).toDynamicValue((ctx) => {
        const preferences = ctx.container.get(preferences_1.PreferenceService);
        const contribution = ctx.container.get(exports.ScmPreferenceContribution);
        return createScmPreferences(preferences, contribution.schema);
    }).inSingletonScope();
    bind(exports.ScmPreferenceContribution).toConstantValue({ schema: exports.scmPreferenceSchema });
    bind(preferences_1.PreferenceContribution).toService(exports.ScmPreferenceContribution);
}
exports.bindScmPreferences = bindScmPreferences;
//# sourceMappingURL=scm-preferences.js.map