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
exports.DebugWatchSource = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const source_tree_1 = require("@theia/core/lib/browser/source-tree");
const debug_view_model_1 = require("./debug-view-model");
const debounce = require("p-debounce");
let DebugWatchSource = class DebugWatchSource extends source_tree_1.TreeSource {
    constructor() {
        super(...arguments);
        this.refresh = debounce(() => this.fireDidChange(), 100);
    }
    init() {
        this.refresh();
        this.toDispose.push(this.model.onDidChangeWatchExpressions(() => this.refresh()));
    }
    async getElements() {
        return this.model.watchExpressions[Symbol.iterator]();
    }
};
exports.DebugWatchSource = DebugWatchSource;
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_view_model_1.DebugViewModel),
    tslib_1.__metadata("design:type", debug_view_model_1.DebugViewModel)
], DebugWatchSource.prototype, "model", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DebugWatchSource.prototype, "init", null);
exports.DebugWatchSource = DebugWatchSource = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DebugWatchSource);
//# sourceMappingURL=debug-watch-source.js.map