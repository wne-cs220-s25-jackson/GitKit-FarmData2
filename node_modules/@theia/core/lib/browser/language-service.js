"use strict";
// *****************************************************************************
// Copyright (C) 2020 TypeFox and others.
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
exports.LanguageService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../common");
let LanguageService = class LanguageService {
    constructor() {
        this.onDidChangeIconEmitter = new common_1.Emitter();
    }
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    get languages() {
        return [];
    }
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    getLanguage(languageId) {
        return undefined;
    }
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    detectLanguage(obj) {
        return undefined;
    }
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    registerIcon(languageId, iconClass) {
        return common_1.Disposable.NULL;
    }
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    getIcon(obj) {
        return undefined;
    }
    /**
     * Emit when the icon of a particular language was changed.
     */
    get onDidChangeIcon() {
        return this.onDidChangeIconEmitter.event;
    }
};
exports.LanguageService = LanguageService;
exports.LanguageService = LanguageService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], LanguageService);
//# sourceMappingURL=language-service.js.map