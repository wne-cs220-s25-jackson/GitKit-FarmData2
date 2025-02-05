"use strict";
// *****************************************************************************
// Copyright (C) 2022 TypeFox and others.
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
exports.LanguageQuickPickService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const nls_1 = require("../../common/nls");
const localization_1 = require("../../common/i18n/localization");
const quick_input_1 = require("../quick-input");
const window_service_1 = require("../window/window-service");
let LanguageQuickPickService = class LanguageQuickPickService {
    async pickDisplayLanguage() {
        const quickInput = this.quickInputService.createQuickPick();
        const installedItems = await this.getInstalledLanguages();
        const quickInputItems = [
            {
                type: 'separator',
                label: nls_1.nls.localizeByDefault('Installed')
            },
            ...installedItems
        ];
        quickInput.items = quickInputItems;
        quickInput.busy = true;
        const selected = installedItems.find(item => nls_1.nls.isSelectedLocale(item.languageId));
        if (selected) {
            quickInput.activeItems = [selected];
        }
        quickInput.placeholder = nls_1.nls.localizeByDefault('Configure Display Language');
        quickInput.show();
        this.getAvailableLanguages().then(availableItems => {
            if (availableItems.length > 0) {
                quickInputItems.push({
                    type: 'separator',
                    label: nls_1.nls.localizeByDefault('Available')
                });
                const installed = new Set(installedItems.map(e => e.languageId));
                for (const available of availableItems) {
                    // Exclude already installed languages
                    if (!installed.has(available.languageId)) {
                        quickInputItems.push(available);
                    }
                }
                quickInput.items = quickInputItems;
            }
        }).finally(() => {
            quickInput.busy = false;
        });
        return new Promise(resolve => {
            quickInput.onDidAccept(async () => {
                var _a;
                const selectedItem = quickInput.selectedItems[0];
                if (selectedItem) {
                    // Some language quick pick items want to install additional languages
                    // We have to await that before returning the selected locale
                    await ((_a = selectedItem.execute) === null || _a === void 0 ? void 0 : _a.call(selectedItem));
                    resolve(selectedItem);
                }
                else {
                    resolve(undefined);
                }
                quickInput.hide();
            });
            quickInput.onDidHide(() => {
                resolve(undefined);
            });
        });
    }
    async getInstalledLanguages() {
        const languageInfos = await this.localizationProvider.getAvailableLanguages();
        const items = [];
        const en = {
            languageId: 'en',
            languageName: 'English',
            localizedLanguageName: 'English'
        };
        languageInfos.push(en);
        for (const language of languageInfos.filter(e => !!e.languageId)) {
            items.push(this.createLanguageQuickPickItem(language));
        }
        return items;
    }
    async getAvailableLanguages() {
        return [];
    }
    createLanguageQuickPickItem(language) {
        let label;
        let description;
        const languageName = language.localizedLanguageName || language.languageName;
        const id = language.languageId;
        const idLabel = id + (nls_1.nls.isSelectedLocale(id) ? ` (${nls_1.nls.localizeByDefault('Current')})` : '');
        if (languageName) {
            label = languageName;
            description = idLabel;
        }
        else {
            label = idLabel;
        }
        return {
            label,
            description,
            languageId: id,
            languageName: language.languageName,
            localizedLanguageName: language.localizedLanguageName
        };
    }
};
exports.LanguageQuickPickService = LanguageQuickPickService;
tslib_1.__decorate([
    (0, inversify_1.inject)(quick_input_1.QuickInputService),
    tslib_1.__metadata("design:type", Object)
], LanguageQuickPickService.prototype, "quickInputService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(localization_1.AsyncLocalizationProvider),
    tslib_1.__metadata("design:type", Object)
], LanguageQuickPickService.prototype, "localizationProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(window_service_1.WindowService),
    tslib_1.__metadata("design:type", Object)
], LanguageQuickPickService.prototype, "windowService", void 0);
exports.LanguageQuickPickService = LanguageQuickPickService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], LanguageQuickPickService);
//# sourceMappingURL=language-quick-pick-service.js.map