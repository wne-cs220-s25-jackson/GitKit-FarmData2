"use strict";
// *****************************************************************************
// Copyright (C) 2021 TypeFox and others.
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
exports.LocalizationProvider = exports.LazyLocalization = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const nls_1 = require("../../common/nls");
const disposable_1 = require("../../common/disposable");
const types_1 = require("../../common/types");
var LazyLocalization;
(function (LazyLocalization) {
    function is(obj) {
        return (0, types_1.isObject)(obj) && typeof obj.languageId === 'string' && typeof obj.getTranslations === 'function';
    }
    LazyLocalization.is = is;
    function fromLocalization(localization) {
        const { languageId, languageName, languagePack, localizedLanguageName, translations } = localization;
        return {
            languageId,
            languageName,
            languagePack,
            localizedLanguageName,
            getTranslations: () => Promise.resolve(translations)
        };
    }
    LazyLocalization.fromLocalization = fromLocalization;
    async function toLocalization(localization) {
        const { languageId, languageName, languagePack, localizedLanguageName } = localization;
        return {
            languageId,
            languageName,
            languagePack,
            localizedLanguageName,
            translations: await localization.getTranslations()
        };
    }
    LazyLocalization.toLocalization = toLocalization;
})(LazyLocalization || (exports.LazyLocalization = LazyLocalization = {}));
let LocalizationProvider = class LocalizationProvider {
    constructor() {
        this.localizations = [];
        this.currentLanguage = nls_1.nls.defaultLocale;
    }
    addLocalizations(...localizations) {
        this.localizations.push(...localizations);
        return disposable_1.Disposable.create(() => {
            for (const localization of localizations) {
                const index = this.localizations.indexOf(localization);
                if (index >= 0) {
                    this.localizations.splice(index, 1);
                }
            }
        });
    }
    setCurrentLanguage(languageId) {
        this.currentLanguage = languageId;
    }
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    getAvailableLanguages(all) {
        var _a;
        const languageInfos = new Map();
        for (const localization of this.localizations.values()) {
            if (all || localization.languagePack) {
                const languageInfo = (_a = languageInfos.get(localization.languageId)) !== null && _a !== void 0 ? _a : {
                    languageId: localization.languageId
                };
                languageInfo.languageName || (languageInfo.languageName = localization.languageName);
                languageInfo.localizedLanguageName || (languageInfo.localizedLanguageName = localization.localizedLanguageName);
                languageInfo.languagePack || (languageInfo.languagePack = localization.languagePack);
                languageInfos.set(localization.languageId, languageInfo);
            }
        }
        return Array.from(languageInfos.values()).sort((a, b) => a.languageId.localeCompare(b.languageId));
    }
    async loadLocalization(languageId) {
        const merged = {
            languageId,
            translations: {}
        };
        const localizations = await Promise.all(this.localizations.filter(e => e.languageId === languageId).map(LazyLocalization.toLocalization));
        for (const localization of localizations) {
            merged.languageName || (merged.languageName = localization.languageName);
            merged.localizedLanguageName || (merged.localizedLanguageName = localization.localizedLanguageName);
            merged.languagePack || (merged.languagePack = localization.languagePack);
            Object.assign(merged.translations, localization.translations);
        }
        return merged;
    }
};
exports.LocalizationProvider = LocalizationProvider;
exports.LocalizationProvider = LocalizationProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], LocalizationProvider);
//# sourceMappingURL=localization-provider.js.map