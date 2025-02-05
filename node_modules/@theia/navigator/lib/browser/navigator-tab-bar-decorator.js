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
exports.NavigatorTabBarDecorator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const event_1 = require("@theia/core/lib/common/event");
const browser_1 = require("@theia/core/lib/browser");
const disposable_1 = require("@theia/core/lib/common/disposable");
const navigator_open_editors_widget_1 = require("./open-editors-widget/navigator-open-editors-widget");
let NavigatorTabBarDecorator = class NavigatorTabBarDecorator {
    constructor() {
        this.id = 'theia-navigator-tabbar-decorator';
        this.emitter = new event_1.Emitter();
        this.toDispose = new disposable_1.DisposableCollection();
        this.toDisposeOnDirtyChanged = new Map();
    }
    onStart(app) {
        this.applicationShell = app.shell;
        if (!!this.getDirtyEditorsCount()) {
            this.fireDidChangeDecorations();
        }
        this.toDispose.pushAll([
            this.applicationShell.onDidAddWidget(widget => {
                const saveable = browser_1.Saveable.get(widget);
                if (saveable) {
                    this.toDisposeOnDirtyChanged.set(widget.id, saveable.onDirtyChanged(() => this.fireDidChangeDecorations()));
                }
            }),
            this.applicationShell.onDidRemoveWidget(widget => { var _a; return (_a = this.toDisposeOnDirtyChanged.get(widget.id)) === null || _a === void 0 ? void 0 : _a.dispose(); })
        ]);
    }
    decorate(title) {
        const { owner } = title;
        if (owner instanceof browser_1.ViewContainer && owner.getParts().find(part => part.wrapped instanceof navigator_open_editors_widget_1.OpenEditorsWidget)) {
            const changes = this.getDirtyEditorsCount();
            return changes > 0 ? [{ badge: changes }] : [];
        }
        else {
            return [];
        }
    }
    getDirtyEditorsCount() {
        return this.applicationShell.widgets.filter(widget => browser_1.Saveable.isDirty(widget)).length;
    }
    get onDidChangeDecorations() {
        return this.emitter.event;
    }
    fireDidChangeDecorations() {
        this.emitter.fire(undefined);
    }
};
exports.NavigatorTabBarDecorator = NavigatorTabBarDecorator;
exports.NavigatorTabBarDecorator = NavigatorTabBarDecorator = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NavigatorTabBarDecorator);
//# sourceMappingURL=navigator-tab-bar-decorator.js.map