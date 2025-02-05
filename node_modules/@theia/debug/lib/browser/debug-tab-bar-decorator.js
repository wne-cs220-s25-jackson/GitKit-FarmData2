"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
exports.DebugTabBarDecorator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const debug_session_manager_1 = require("./debug-session-manager");
const debug_widget_1 = require("./view/debug-widget");
const event_1 = require("@theia/core/lib/common/event");
const common_1 = require("@theia/core/lib/common");
let DebugTabBarDecorator = class DebugTabBarDecorator {
    constructor() {
        this.id = 'theia-debug-tabbar-decorator';
        this.emitter = new event_1.Emitter();
        this.toDispose = new common_1.DisposableCollection();
    }
    init() {
        this.toDispose.pushAll([
            this.debugSessionManager.onDidStartDebugSession(() => this.fireDidChangeDecorations()),
            this.debugSessionManager.onDidDestroyDebugSession(() => this.fireDidChangeDecorations())
        ]);
    }
    decorate(title) {
        return (title.owner.id === debug_widget_1.DebugWidget.ID)
            ? [{ badge: this.debugSessionManager.sessions.length }]
            : [];
    }
    get onDidChangeDecorations() {
        return this.emitter.event;
    }
    fireDidChangeDecorations() {
        this.emitter.fire(undefined);
    }
};
exports.DebugTabBarDecorator = DebugTabBarDecorator;
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_session_manager_1.DebugSessionManager),
    tslib_1.__metadata("design:type", debug_session_manager_1.DebugSessionManager)
], DebugTabBarDecorator.prototype, "debugSessionManager", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DebugTabBarDecorator.prototype, "init", null);
exports.DebugTabBarDecorator = DebugTabBarDecorator = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DebugTabBarDecorator);
//# sourceMappingURL=debug-tab-bar-decorator.js.map