"use strict";
// *****************************************************************************
// Copyright (C) 2018 Google and others.
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
exports.bindEditorPreviewPreferences = exports.createEditorPreviewPreferences = exports.EditorPreviewPreferences = exports.EditorPreviewPreferenceContribution = exports.EditorPreviewConfigSchema = void 0;
const browser_1 = require("@theia/core/lib/browser");
const nls_1 = require("@theia/core/lib/common/nls");
exports.EditorPreviewConfigSchema = {
    'type': 'object',
    properties: {
        'editor.enablePreview': {
            type: 'boolean',
            // eslint-disable-next-line max-len
            description: nls_1.nls.localizeByDefault('Controls whether opened editors show as preview editors. Preview editors do not stay open, are reused until explicitly set to be kept open (via double-click or editing), and show file names in italics.'),
            default: true
        },
    }
};
exports.EditorPreviewPreferenceContribution = Symbol('EditorPreviewPreferenceContribution');
exports.EditorPreviewPreferences = Symbol('EditorPreviewPreferences');
function createEditorPreviewPreferences(preferences, schema = exports.EditorPreviewConfigSchema) {
    return (0, browser_1.createPreferenceProxy)(preferences, schema);
}
exports.createEditorPreviewPreferences = createEditorPreviewPreferences;
function bindEditorPreviewPreferences(bind) {
    bind(exports.EditorPreviewPreferences).toDynamicValue(ctx => {
        const preferences = ctx.container.get(browser_1.PreferenceService);
        const contribution = ctx.container.get(exports.EditorPreviewPreferenceContribution);
        return createEditorPreviewPreferences(preferences, contribution.schema);
    }).inSingletonScope();
    bind(exports.EditorPreviewPreferenceContribution).toConstantValue({ schema: exports.EditorPreviewConfigSchema });
    bind(browser_1.PreferenceContribution).toService(exports.EditorPreviewPreferenceContribution);
}
exports.bindEditorPreviewPreferences = bindEditorPreviewPreferences;
//# sourceMappingURL=editor-preview-preferences.js.map