"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.DebugThreadsSource = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const source_tree_1 = require("@theia/core/lib/browser/source-tree");
const debug_view_model_1 = require("./debug-view-model");
let DebugThreadsSource = class DebugThreadsSource extends source_tree_1.TreeSource {
    init() {
        this.fireDidChange();
        this.toDispose.push(this.model.onDidChange(() => this.fireDidChange()));
    }
    get multiSession() {
        return this.model.sessionCount > 1;
    }
    *getElements() {
        if (this.model.sessionCount === 1 && this.model.session && this.model.session.threadCount) {
            return yield* this.model.session.threads;
        }
        for (const session of this.model.sessions) {
            if (!session.parentSession) {
                yield session;
            }
        }
    }
};
exports.DebugThreadsSource = DebugThreadsSource;
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_view_model_1.DebugViewModel),
    tslib_1.__metadata("design:type", debug_view_model_1.DebugViewModel)
], DebugThreadsSource.prototype, "model", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DebugThreadsSource.prototype, "init", null);
exports.DebugThreadsSource = DebugThreadsSource = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DebugThreadsSource);
//# sourceMappingURL=debug-threads-source.js.map