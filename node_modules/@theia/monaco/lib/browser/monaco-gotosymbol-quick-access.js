"use strict";
// *****************************************************************************
// Copyright (C) 2021 SAP SE or an SAP affiliate company and others.
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
exports.GotoSymbolQuickAccessContribution = exports.GotoSymbolQuickAccess = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const codeEditorService_1 = require("@theia/monaco-editor-core/esm/vs/editor/browser/services/codeEditorService");
const languageFeatures_1 = require("@theia/monaco-editor-core/esm/vs/editor/common/services/languageFeatures");
const outlineModel_1 = require("@theia/monaco-editor-core/esm/vs/editor/contrib/documentSymbols/browser/outlineModel");
const standaloneGotoSymbolQuickAccess_1 = require("@theia/monaco-editor-core/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoSymbolQuickAccess");
const quickAccess_1 = require("@theia/monaco-editor-core/esm/vs/platform/quickinput/common/quickAccess");
const platform_1 = require("@theia/monaco-editor-core/esm/vs/platform/registry/common/platform");
let GotoSymbolQuickAccess = class GotoSymbolQuickAccess extends standaloneGotoSymbolQuickAccess_1.StandaloneGotoSymbolQuickAccessProvider {
    constructor(codeEditorService, languageFeatures, outlineService) {
        super(codeEditorService, languageFeatures, outlineService);
        this.codeEditorService = codeEditorService;
        this.languageFeatures = languageFeatures;
        this.outlineService = outlineService;
    }
    get activeTextEditorControl() {
        var _a, _b;
        return (_b = ((_a = this.codeEditorService.getFocusedCodeEditor()) !== null && _a !== void 0 ? _a : this.codeEditorService.getActiveCodeEditor())) !== null && _b !== void 0 ? _b : undefined;
    }
};
exports.GotoSymbolQuickAccess = GotoSymbolQuickAccess;
exports.GotoSymbolQuickAccess = GotoSymbolQuickAccess = tslib_1.__decorate([
    tslib_1.__param(0, codeEditorService_1.ICodeEditorService),
    tslib_1.__param(1, languageFeatures_1.ILanguageFeaturesService),
    tslib_1.__param(2, outlineModel_1.IOutlineModelService),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], GotoSymbolQuickAccess);
let GotoSymbolQuickAccessContribution = class GotoSymbolQuickAccessContribution {
    registerQuickAccessProvider() {
        platform_1.Registry.as(quickAccess_1.Extensions.Quickaccess).registerQuickAccessProvider({
            ctor: GotoSymbolQuickAccess,
            prefix: '@',
            placeholder: '',
            helpEntries: [{ description: 'Go to symbol' }]
        });
    }
};
exports.GotoSymbolQuickAccessContribution = GotoSymbolQuickAccessContribution;
exports.GotoSymbolQuickAccessContribution = GotoSymbolQuickAccessContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], GotoSymbolQuickAccessContribution);
//# sourceMappingURL=monaco-gotosymbol-quick-access.js.map