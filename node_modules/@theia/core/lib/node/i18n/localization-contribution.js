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
exports.LocalizationRegistry = exports.LocalizationContribution = void 0;
const tslib_1 = require("tslib");
const fs = require("fs-extra");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const localization_provider_1 = require("./localization-provider");
exports.LocalizationContribution = Symbol('LocalizationContribution');
let LocalizationRegistry = class LocalizationRegistry {
    async initialize() {
        await Promise.all(this.contributions.getContributions().map(contribution => contribution.registerLocalizations(this)));
    }
    registerLocalization(localization) {
        if (!localization_provider_1.LazyLocalization.is(localization)) {
            localization = localization_provider_1.LazyLocalization.fromLocalization(localization);
        }
        this.localizationProvider.addLocalizations(localization);
    }
    registerLocalizationFromRequire(locale, required) {
        const translations = this.flattenTranslations(required);
        this.registerLocalization(this.createLocalization(locale, () => Promise.resolve(translations)));
    }
    registerLocalizationFromFile(localizationPath, locale) {
        if (!locale) {
            locale = this.identifyLocale(localizationPath);
        }
        if (!locale) {
            throw new Error('Could not determine locale from path.');
        }
        this.registerLocalization(this.createLocalization(locale, async () => {
            const translationJson = await fs.readJson(localizationPath);
            return this.flattenTranslations(translationJson);
        }));
    }
    createLocalization(locale, translations) {
        let localization;
        if (typeof locale === 'string') {
            localization = {
                languageId: locale,
                getTranslations: translations
            };
        }
        else {
            localization = {
                ...locale,
                getTranslations: translations
            };
        }
        return localization;
    }
    flattenTranslations(localization) {
        if ((0, common_1.isObject)(localization)) {
            const record = {};
            for (const [key, value] of Object.entries(localization)) {
                if (typeof value === 'string') {
                    record[key] = value;
                }
                else if ((0, common_1.isObject)(value)) {
                    const flattened = this.flattenTranslations(value);
                    for (const [flatKey, flatValue] of Object.entries(flattened)) {
                        record[`${key}/${flatKey}`] = flatValue;
                    }
                }
            }
            return record;
        }
        else {
            return {};
        }
    }
    identifyLocale(localizationPath) {
        const regex = /nls\.(\w+)\.json$/i;
        const match = regex.exec(localizationPath);
        if (match) {
            return match[1];
        }
        return undefined;
    }
};
exports.LocalizationRegistry = LocalizationRegistry;
tslib_1.__decorate([
    (0, inversify_1.inject)(localization_provider_1.LocalizationProvider),
    tslib_1.__metadata("design:type", localization_provider_1.LocalizationProvider)
], LocalizationRegistry.prototype, "localizationProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(exports.LocalizationContribution),
    tslib_1.__metadata("design:type", Object)
], LocalizationRegistry.prototype, "contributions", void 0);
exports.LocalizationRegistry = LocalizationRegistry = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], LocalizationRegistry);
//# sourceMappingURL=localization-contribution.js.map