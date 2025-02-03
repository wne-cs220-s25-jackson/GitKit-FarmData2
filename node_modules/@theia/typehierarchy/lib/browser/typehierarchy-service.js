"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
exports.TypeHierarchyServiceProvider = exports.TypeHierarchyService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@theia/core/lib/common");
const inversify_1 = require("@theia/core/shared/inversify");
const language_selector_1 = require("@theia/editor/lib/common/language-selector");
exports.TypeHierarchyService = Symbol('TypeHierarchyService');
let TypeHierarchyServiceProvider = class TypeHierarchyServiceProvider {
    constructor() {
        this.onDidChangeEmitter = new common_1.Emitter();
        this.services = [];
    }
    get onDidChange() {
        return this.onDidChangeEmitter.event;
    }
    init() {
        this.services = this.services.concat(this.contributions.getContributions());
    }
    get(languageId, uri) {
        return this.services
            .filter(service => this.score(service, languageId, uri) > 0)
            .sort((left, right) => this.score(right, languageId, uri) - this.score(left, languageId, uri))[0];
    }
    score(service, languageId, uri) {
        return (0, language_selector_1.score)(service.selector, uri.scheme, uri.path.toString(), languageId, true);
    }
    add(service) {
        this.services.push(service);
        const that = this;
        this.onDidChangeEmitter.fire();
        return {
            dispose: () => {
                that.remove(service);
            }
        };
    }
    remove(service) {
        const length = this.services.length;
        this.services = this.services.filter(value => value !== service);
        const serviceWasRemoved = length !== this.services.length;
        if (serviceWasRemoved) {
            this.onDidChangeEmitter.fire();
        }
        return serviceWasRemoved;
    }
};
exports.TypeHierarchyServiceProvider = TypeHierarchyServiceProvider;
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(exports.TypeHierarchyService),
    tslib_1.__metadata("design:type", Object)
], TypeHierarchyServiceProvider.prototype, "contributions", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TypeHierarchyServiceProvider.prototype, "init", null);
exports.TypeHierarchyServiceProvider = TypeHierarchyServiceProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TypeHierarchyServiceProvider);
//# sourceMappingURL=typehierarchy-service.js.map