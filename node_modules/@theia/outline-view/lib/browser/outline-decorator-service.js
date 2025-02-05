"use strict";
// *****************************************************************************
// Copyright (C) 2018 Redhat, Ericsson and others.
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
exports.OutlineDecoratorService = exports.OutlineTreeDecorator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const contribution_provider_1 = require("@theia/core/lib/common/contribution-provider");
const tree_decorator_1 = require("@theia/core/lib/browser/tree/tree-decorator");
/**
 * Symbol for all decorators that would like to contribute into the outline.
 */
exports.OutlineTreeDecorator = Symbol('OutlineTreeDecorator');
/**
 * Decorator service for the outline.
 */
let OutlineDecoratorService = class OutlineDecoratorService extends tree_decorator_1.AbstractTreeDecoratorService {
    constructor(contributions) {
        super(contributions.getContributions());
        this.contributions = contributions;
    }
};
exports.OutlineDecoratorService = OutlineDecoratorService;
exports.OutlineDecoratorService = OutlineDecoratorService = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(contribution_provider_1.ContributionProvider)),
    tslib_1.__param(0, (0, inversify_1.named)(exports.OutlineTreeDecorator)),
    tslib_1.__metadata("design:paramtypes", [Object])
], OutlineDecoratorService);
//# sourceMappingURL=outline-decorator-service.js.map