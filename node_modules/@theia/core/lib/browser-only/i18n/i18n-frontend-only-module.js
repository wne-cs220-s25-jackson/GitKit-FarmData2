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
const inversify_1 = require("inversify");
const localization_1 = require("../../common/i18n/localization");
const language_quick_pick_service_1 = require("../../browser/i18n/language-quick-pick-service");
exports.default = new inversify_1.ContainerModule(bind => {
    const i18nMock = {
        getCurrentLanguage: async () => 'en',
        setCurrentLanguage: async (_languageId) => {
        },
        getAvailableLanguages: async () => [],
        loadLocalization: async (_languageId) => ({
            translations: {},
            languageId: 'en'
        })
    };
    bind(localization_1.AsyncLocalizationProvider).toConstantValue(i18nMock);
    bind(language_quick_pick_service_1.LanguageQuickPickService).toSelf().inSingletonScope();
});
//# sourceMappingURL=i18n-frontend-only-module.js.map