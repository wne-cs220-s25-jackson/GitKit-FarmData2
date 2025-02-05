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
exports.bindPreviewPreferences = exports.createPreviewPreferences = exports.PreviewPreferences = exports.PreviewPreferenceContribution = exports.PreviewConfigSchema = void 0;
const browser_1 = require("@theia/core/lib/browser");
const nls_1 = require("@theia/core/lib/common/nls");
exports.PreviewConfigSchema = {
    type: 'object',
    properties: {
        'preview.openByDefault': {
            type: 'boolean',
            description: nls_1.nls.localize('theia/preview/openByDefault', 'Open the preview instead of the editor by default.'),
            default: false
        }
    }
};
exports.PreviewPreferenceContribution = Symbol('PreviewPreferenceContribution');
exports.PreviewPreferences = Symbol('PreviewPreferences');
function createPreviewPreferences(preferences, schema = exports.PreviewConfigSchema) {
    return (0, browser_1.createPreferenceProxy)(preferences, schema);
}
exports.createPreviewPreferences = createPreviewPreferences;
function bindPreviewPreferences(bind) {
    bind(exports.PreviewPreferences).toDynamicValue(ctx => {
        const preferences = ctx.container.get(browser_1.PreferenceService);
        const contribution = ctx.container.get(exports.PreviewPreferenceContribution);
        return createPreviewPreferences(preferences, contribution.schema);
    }).inSingletonScope();
    bind(exports.PreviewPreferenceContribution).toConstantValue({ schema: exports.PreviewConfigSchema });
    bind(browser_1.PreferenceContribution).toService(exports.PreviewPreferenceContribution);
}
exports.bindPreviewPreferences = bindPreviewPreferences;
//# sourceMappingURL=preview-preferences.js.map