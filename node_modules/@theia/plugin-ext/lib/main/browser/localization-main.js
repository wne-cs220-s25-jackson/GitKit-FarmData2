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
exports.LocalizationMainImpl = void 0;
const core_1 = require("@theia/core");
const language_pack_service_1 = require("../../common/language-pack-service");
class LocalizationMainImpl {
    constructor(container) {
        this.languagePackService = container.get(language_pack_service_1.LanguagePackService);
    }
    async $fetchBundle(id) {
        var _a;
        const bundle = await this.languagePackService.getBundle(id, (_a = core_1.nls.locale) !== null && _a !== void 0 ? _a : core_1.nls.defaultLocale);
        return bundle;
    }
}
exports.LocalizationMainImpl = LocalizationMainImpl;
//# sourceMappingURL=localization-main.js.map