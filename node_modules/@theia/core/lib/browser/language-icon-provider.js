"use strict";
// *****************************************************************************
// Copyright (C) 2023 EclipseSource and others.
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
exports.LanguageIconLabelProvider = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../common");
const icon_theme_service_1 = require("./icon-theme-service");
const language_service_1 = require("./language-service");
let LanguageIconLabelProvider = class LanguageIconLabelProvider {
    constructor() {
        this.onDidChangeEmitter = new common_1.Emitter();
    }
    init() {
        this.languageService.onDidChangeIcon(() => this.fireDidChange());
    }
    canHandle(element) {
        const current = this.iconThemeService.getDefinition(this.iconThemeService.current);
        return (current === null || current === void 0 ? void 0 : current.showLanguageModeIcons) === true && this.languageService.getIcon(element) ? Number.MAX_SAFE_INTEGER : 0;
    }
    getIcon(element) {
        const language = this.languageService.detectLanguage(element);
        return this.languageService.getIcon(language.id);
    }
    get onDidChange() {
        return this.onDidChangeEmitter.event;
    }
    fireDidChange() {
        this.onDidChangeEmitter.fire({
            affects: element => this.canHandle(element) > 0
        });
    }
};
exports.LanguageIconLabelProvider = LanguageIconLabelProvider;
tslib_1.__decorate([
    (0, inversify_1.inject)(icon_theme_service_1.IconThemeService),
    tslib_1.__metadata("design:type", icon_theme_service_1.IconThemeService)
], LanguageIconLabelProvider.prototype, "iconThemeService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(language_service_1.LanguageService),
    tslib_1.__metadata("design:type", language_service_1.LanguageService)
], LanguageIconLabelProvider.prototype, "languageService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], LanguageIconLabelProvider.prototype, "init", null);
exports.LanguageIconLabelProvider = LanguageIconLabelProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], LanguageIconLabelProvider);
//# sourceMappingURL=language-icon-provider.js.map