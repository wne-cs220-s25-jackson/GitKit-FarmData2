"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
exports.ResourceContextKey = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const context_key_service_1 = require("./context-key-service");
const language_service_1 = require("./language-service");
let ResourceContextKey = class ResourceContextKey {
    init() {
        this.resource = this.contextKeyService.createKey('resource', undefined);
        this.resourceSchemeKey = this.contextKeyService.createKey('resourceScheme', undefined);
        this.resourceFileName = this.contextKeyService.createKey('resourceFilename', undefined);
        this.resourceExtname = this.contextKeyService.createKey('resourceExtname', undefined);
        this.resourceLangId = this.contextKeyService.createKey('resourceLangId', undefined);
        this.resourceDirName = this.contextKeyService.createKey('resourceDirName', undefined);
        this.resourcePath = this.contextKeyService.createKey('resourcePath', undefined);
        this.resourceSet = this.contextKeyService.createKey('resourceSet', false);
    }
    get() {
        return this.resource.get();
    }
    set(resourceUri) {
        this.resource.set(resourceUri === null || resourceUri === void 0 ? void 0 : resourceUri.toString());
        this.resourceSchemeKey.set(resourceUri === null || resourceUri === void 0 ? void 0 : resourceUri.scheme);
        this.resourceFileName.set(resourceUri === null || resourceUri === void 0 ? void 0 : resourceUri.path.base);
        this.resourceExtname.set(resourceUri === null || resourceUri === void 0 ? void 0 : resourceUri.path.ext);
        this.resourceLangId.set(resourceUri && this.getLanguageId(resourceUri));
        this.resourceDirName.set(resourceUri === null || resourceUri === void 0 ? void 0 : resourceUri.path.dir.fsPath());
        this.resourcePath.set(resourceUri === null || resourceUri === void 0 ? void 0 : resourceUri.path.fsPath());
        this.resourceSet.set(Boolean(resourceUri));
    }
    getLanguageId(uri) {
        if (uri) {
            for (const language of this.languages.languages) {
                if (language.extensions.has(uri.path.ext)) {
                    return language.id;
                }
            }
        }
        return undefined;
    }
};
exports.ResourceContextKey = ResourceContextKey;
tslib_1.__decorate([
    (0, inversify_1.inject)(language_service_1.LanguageService),
    tslib_1.__metadata("design:type", language_service_1.LanguageService)
], ResourceContextKey.prototype, "languages", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(context_key_service_1.ContextKeyService),
    tslib_1.__metadata("design:type", Object)
], ResourceContextKey.prototype, "contextKeyService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ResourceContextKey.prototype, "init", null);
exports.ResourceContextKey = ResourceContextKey = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ResourceContextKey);
//# sourceMappingURL=resource-context-key.js.map