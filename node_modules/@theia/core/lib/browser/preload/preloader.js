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
exports.Preloader = exports.PreloadContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const contribution_provider_1 = require("../../common/contribution-provider");
exports.PreloadContribution = Symbol('PreloadContribution');
let Preloader = class Preloader {
    async initialize() {
        await Promise.allSettled(this.contributions.getContributions().map(contrib => contrib.initialize()));
    }
};
exports.Preloader = Preloader;
tslib_1.__decorate([
    (0, inversify_1.inject)(contribution_provider_1.ContributionProvider),
    (0, inversify_1.named)(exports.PreloadContribution),
    tslib_1.__metadata("design:type", Object)
], Preloader.prototype, "contributions", void 0);
exports.Preloader = Preloader = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], Preloader);
//# sourceMappingURL=preloader.js.map