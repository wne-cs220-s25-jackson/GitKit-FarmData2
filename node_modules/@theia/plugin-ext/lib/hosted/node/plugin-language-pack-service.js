"use strict";
// *****************************************************************************
// Copyright (C) 2023 TypeFox and others.
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
exports.PluginLanguagePackService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
let PluginLanguagePackService = class PluginLanguagePackService {
    constructor() {
        this.storage = new Map();
    }
    storeBundle(pluginId, locale, bundle) {
        if (!this.storage.has(pluginId)) {
            this.storage.set(pluginId, new Map());
        }
        this.storage.get(pluginId).set(locale, bundle);
    }
    deleteBundle(pluginId, locale) {
        var _a;
        if (locale) {
            (_a = this.storage.get(pluginId)) === null || _a === void 0 ? void 0 : _a.delete(locale);
        }
        else {
            this.storage.delete(pluginId);
        }
    }
    async getBundle(pluginId, locale) {
        var _a;
        return (_a = this.storage.get(pluginId)) === null || _a === void 0 ? void 0 : _a.get(locale);
    }
};
exports.PluginLanguagePackService = PluginLanguagePackService;
exports.PluginLanguagePackService = PluginLanguagePackService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginLanguagePackService);
//# sourceMappingURL=plugin-language-pack-service.js.map