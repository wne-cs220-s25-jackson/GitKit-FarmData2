"use strict";
// *****************************************************************************
// Copyright (C) 2021 Ericsson and others.
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
exports.OpenEditorsTreeDecoratorService = exports.OpenEditorsTreeDecorator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const tree_decorator_1 = require("@theia/core/lib/browser/tree/tree-decorator");
const common_1 = require("@theia/core/lib/common");
exports.OpenEditorsTreeDecorator = Symbol('OpenEditorsTreeDecorator');
let OpenEditorsTreeDecoratorService = class OpenEditorsTreeDecoratorService extends tree_decorator_1.AbstractTreeDecoratorService {
    constructor(contributions) {
        super(contributions.getContributions());
        this.contributions = contributions;
    }
};
exports.OpenEditorsTreeDecoratorService = OpenEditorsTreeDecoratorService;
exports.OpenEditorsTreeDecoratorService = OpenEditorsTreeDecoratorService = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(common_1.ContributionProvider)),
    tslib_1.__param(0, (0, inversify_1.named)(exports.OpenEditorsTreeDecorator)),
    tslib_1.__metadata("design:paramtypes", [Object])
], OpenEditorsTreeDecoratorService);
//# sourceMappingURL=navigator-open-editors-decorator-service.js.map