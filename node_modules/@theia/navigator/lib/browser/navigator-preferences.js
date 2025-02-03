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
exports.bindFileNavigatorPreferences = exports.createNavigatorPreferences = exports.FileNavigatorPreferences = exports.FileNavigatorPreferenceContribution = exports.FileNavigatorConfigSchema = exports.EXPLORER_COMPACT_FOLDERS = void 0;
const browser_1 = require("@theia/core/lib/browser");
const nls_1 = require("@theia/core/lib/common/nls");
exports.EXPLORER_COMPACT_FOLDERS = 'explorer.compactFolders';
exports.FileNavigatorConfigSchema = {
    'type': 'object',
    properties: {
        'explorer.autoReveal': {
            type: 'boolean',
            description: nls_1.nls.localizeByDefault('Controls whether the Explorer should automatically reveal and select files when opening them.'),
            default: true
        },
        'explorer.decorations.colors': {
            type: 'boolean',
            description: nls_1.nls.localizeByDefault('Controls whether file decorations should use colors.'),
            default: true
        },
        [exports.EXPLORER_COMPACT_FOLDERS]: {
            type: 'boolean',
            // eslint-disable-next-line max-len
            description: nls_1.nls.localizeByDefault('Controls whether the Explorer should render folders in a compact form. In such a form, single child folders will be compressed in a combined tree element. Useful for Java package structures, for example.'),
            default: true,
        }
    },
};
exports.FileNavigatorPreferenceContribution = Symbol('FileNavigatorPreferenceContribution');
exports.FileNavigatorPreferences = Symbol('NavigatorPreferences');
function createNavigatorPreferences(preferences, schema = exports.FileNavigatorConfigSchema) {
    return (0, browser_1.createPreferenceProxy)(preferences, schema);
}
exports.createNavigatorPreferences = createNavigatorPreferences;
function bindFileNavigatorPreferences(bind) {
    bind(exports.FileNavigatorPreferences).toDynamicValue(ctx => {
        const preferences = ctx.container.get(browser_1.PreferenceService);
        const contribution = ctx.container.get(exports.FileNavigatorPreferenceContribution);
        return createNavigatorPreferences(preferences, contribution.schema);
    }).inSingletonScope();
    bind(exports.FileNavigatorPreferenceContribution).toConstantValue({ schema: exports.FileNavigatorConfigSchema });
    bind(browser_1.PreferenceContribution).toService(exports.FileNavigatorPreferenceContribution);
}
exports.bindFileNavigatorPreferences = bindFileNavigatorPreferences;
//# sourceMappingURL=navigator-preferences.js.map