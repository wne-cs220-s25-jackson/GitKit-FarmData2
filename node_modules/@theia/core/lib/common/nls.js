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
exports.nls = void 0;
const localization_1 = require("./i18n/localization");
var nls;
(function (nls) {
    nls.defaultLocale = 'en';
    nls.localeId = 'localeId';
    nls.locale = typeof window === 'object' && window && window.localStorage.getItem(nls.localeId) || undefined;
    let keyProvider;
    /**
     * Automatically localizes a text if that text also exists in the vscode repository.
     */
    function localizeByDefault(defaultValue, ...args) {
        if (nls.localization) {
            const key = getDefaultKey(defaultValue);
            if (key) {
                return localize(key, defaultValue, ...args);
            }
            else {
                console.warn(`Could not find translation key for default value: "${defaultValue}"`);
            }
        }
        return localization_1.Localization.format(defaultValue, args);
    }
    nls.localizeByDefault = localizeByDefault;
    function getDefaultKey(defaultValue) {
        if (!keyProvider) {
            keyProvider = new LocalizationKeyProvider();
        }
        const key = keyProvider.get(defaultValue);
        if (key) {
            return key;
        }
        return '';
    }
    nls.getDefaultKey = getDefaultKey;
    function localize(key, defaultValue, ...args) {
        return localization_1.Localization.localize(nls.localization, key, defaultValue, ...args);
    }
    nls.localize = localize;
    function isSelectedLocale(id) {
        if (nls.locale === undefined && id === nls.defaultLocale) {
            return true;
        }
        return nls.locale === id;
    }
    nls.isSelectedLocale = isSelectedLocale;
    function setLocale(id) {
        window.localStorage.setItem(nls.localeId, id);
    }
    nls.setLocale = setLocale;
})(nls || (exports.nls = nls = {}));
class LocalizationKeyProvider {
    constructor() {
        this.preferredKeys = new Set([
            // We only want the `File` translation used in the menu
            'vscode/fileActions.contribution/filesCategory',
            // Needed for `Close Editor` translation
            'vscode/editor.contribution/closeEditor'
        ]);
        this.data = this.buildData();
    }
    get(defaultValue) {
        const normalized = localization_1.Localization.normalize(defaultValue);
        return this.data.get(normalized) || this.data.get(normalized.toUpperCase());
    }
    /**
     * Transforms the data coming from the `nls.metadata.json` file into a map.
     * The original data contains arrays of keys and messages.
     * The result is a map that matches each message to the key that belongs to it.
     *
     * This allows us to skip the key in the localization process and map the original english default values to their translations in different languages.
     */
    buildData() {
        const bundles = require('../../src/common/i18n/nls.metadata.json');
        const keys = bundles.keys;
        const messages = bundles.messages;
        const data = new Map();
        const foundPreferredKeys = new Set();
        const keysAndMessages = this.buildKeyMessageTuples(keys, messages);
        for (const { key, message } of keysAndMessages) {
            if (!foundPreferredKeys.has(message)) {
                data.set(message, key);
                if (this.preferredKeys.has(key)) {
                    // Prevent messages with preferred keys to be overridden
                    foundPreferredKeys.add(message);
                }
            }
        }
        // Second pass adds each message again in upper case, if the message doesn't already exist in upper case
        // The second pass is needed to not accidentally override any translations which actually use the upper case message
        for (const { key, message } of keysAndMessages) {
            const upperMessage = message.toUpperCase();
            if (!data.has(upperMessage)) {
                data.set(upperMessage, key);
            }
        }
        return data;
    }
    buildKeyMessageTuples(keys, messages) {
        const list = [];
        for (const [fileKey, messageBundle] of Object.entries(messages)) {
            const keyBundle = keys[fileKey];
            for (let i = 0; i < messageBundle.length; i++) {
                const message = localization_1.Localization.normalize(messageBundle[i]);
                const key = keyBundle[i];
                const localizationKey = this.buildKey(typeof key === 'string' ? key : key.key, fileKey);
                list.push({
                    key: localizationKey,
                    message
                });
            }
        }
        return list;
    }
    buildKey(key, filepath) {
        return `vscode/${localization_1.Localization.transformKey(filepath)}/${key}`;
    }
}
//# sourceMappingURL=nls.js.map