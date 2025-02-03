"use strict";
// *****************************************************************************
// Copyright (C) 2024 TypeFox and others.
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
exports.EditorLanguageQuickPickService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const language_service_1 = require("@theia/core/lib/browser/language-service");
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
let EditorLanguageQuickPickService = class EditorLanguageQuickPickService {
    async pickEditorLanguage(current) {
        var _a;
        const items = [
            { label: core_1.nls.localizeByDefault('Auto Detect'), value: 'autoDetect' },
            { type: 'separator', label: core_1.nls.localizeByDefault('languages (identifier)') },
            ...(this.languages.languages.map(language => this.toQuickPickLanguage(language, current))).sort((e, e2) => e.label.localeCompare(e2.label))
        ];
        const selectedMode = await ((_a = this.quickInputService) === null || _a === void 0 ? void 0 : _a.showQuickPick(items, { placeholder: core_1.nls.localizeByDefault('Select Language Mode') }));
        return (selectedMode && 'value' in selectedMode) ? selectedMode : undefined;
    }
    toQuickPickLanguage(value, current) {
        const languageUri = this.toLanguageUri(value);
        const iconClasses = this.labelProvider.getIcon(languageUri).split(' ').filter(v => v.length > 0);
        if (iconClasses.length > 0) {
            iconClasses.push('file-icon');
        }
        const configured = current === value.id;
        return {
            value,
            label: value.name,
            description: core_1.nls.localizeByDefault(`({0})${configured ? ' - Configured Language' : ''}`, value.id),
            iconClasses
        };
    }
    toLanguageUri(language) {
        const extension = language.extensions.values().next();
        if (extension.value) {
            return new core_1.URI('file:///' + extension.value);
        }
        const filename = language.filenames.values().next();
        if (filename.value) {
            return new core_1.URI('file:///' + filename.value);
        }
        return new core_1.URI('file:///.txt');
    }
};
exports.EditorLanguageQuickPickService = EditorLanguageQuickPickService;
tslib_1.__decorate([
    (0, inversify_1.inject)(language_service_1.LanguageService),
    tslib_1.__metadata("design:type", language_service_1.LanguageService)
], EditorLanguageQuickPickService.prototype, "languages", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(core_1.QuickInputService),
    tslib_1.__metadata("design:type", Object)
], EditorLanguageQuickPickService.prototype, "quickInputService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.LabelProvider),
    tslib_1.__metadata("design:type", browser_1.LabelProvider)
], EditorLanguageQuickPickService.prototype, "labelProvider", void 0);
exports.EditorLanguageQuickPickService = EditorLanguageQuickPickService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], EditorLanguageQuickPickService);
//# sourceMappingURL=editor-language-quick-pick-service.js.map