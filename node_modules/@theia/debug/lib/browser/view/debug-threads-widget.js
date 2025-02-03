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
var DebugThreadsWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugThreadsWidget = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const source_tree_1 = require("@theia/core/lib/browser/source-tree");
const debug_threads_source_1 = require("./debug-threads-source");
const debug_session_1 = require("../debug-session");
const debug_thread_1 = require("../model/debug-thread");
const debug_view_model_1 = require("../view/debug-view-model");
const debug_call_stack_item_type_key_1 = require("../debug-call-stack-item-type-key");
const nls_1 = require("@theia/core/lib/common/nls");
let DebugThreadsWidget = DebugThreadsWidget_1 = class DebugThreadsWidget extends source_tree_1.SourceTreeWidget {
    constructor() {
        super(...arguments);
        this.updatingSelection = false;
    }
    static createContainer(parent) {
        const child = source_tree_1.SourceTreeWidget.createContainer(parent, {
            contextMenuPath: DebugThreadsWidget_1.CONTEXT_MENU,
            virtualized: false,
            scrollIfActive: true
        });
        child.bind(debug_threads_source_1.DebugThreadsSource).toSelf();
        child.unbind(source_tree_1.SourceTreeWidget);
        child.bind(DebugThreadsWidget_1).toSelf();
        return child;
    }
    static createWidget(parent) {
        return DebugThreadsWidget_1.createContainer(parent).get(DebugThreadsWidget_1);
    }
    init() {
        super.init();
        this.id = DebugThreadsWidget_1.FACTORY_ID + ':' + this.viewModel.id;
        this.title.label = nls_1.nls.localize('theia/debug/threads', 'Threads');
        this.toDispose.push(this.threads);
        this.source = this.threads;
        this.toDispose.push(this.viewModel.onDidChange(() => this.updateWidgetSelection()));
        this.toDispose.push(this.model.onSelectionChanged(() => this.updateModelSelection()));
    }
    updateWidgetSelection() {
        if (this.updatingSelection) {
            return;
        }
        this.updatingSelection = true;
        try {
            const { currentThread } = this.viewModel;
            if (currentThread) {
                const node = this.model.getNode(currentThread.id);
                if (browser_1.SelectableTreeNode.is(node)) {
                    this.model.selectNode(node);
                }
            }
        }
        finally {
            this.updatingSelection = false;
        }
    }
    updateModelSelection() {
        if (this.updatingSelection) {
            return;
        }
        this.updatingSelection = true;
        try {
            const node = this.model.selectedNodes[0];
            if (source_tree_1.TreeElementNode.is(node)) {
                if (node.element instanceof debug_session_1.DebugSession) {
                    this.viewModel.currentSession = node.element;
                    this.debugCallStackItemTypeKey.set('session');
                }
                else if (node.element instanceof debug_thread_1.DebugThread) {
                    this.viewModel.currentSession = node.element.session;
                    node.element.session.currentThread = node.element;
                    this.debugCallStackItemTypeKey.set('thread');
                }
            }
        }
        finally {
            this.updatingSelection = false;
        }
    }
    toContextMenuArgs(node) {
        if (source_tree_1.TreeElementNode.is(node) && node.element instanceof debug_thread_1.DebugThread) {
            return [node.element.raw.id];
        }
        return undefined;
    }
    getDefaultNodeStyle(node, props) {
        if (this.threads.multiSession) {
            return super.getDefaultNodeStyle(node, props);
        }
        return undefined;
    }
};
exports.DebugThreadsWidget = DebugThreadsWidget;
DebugThreadsWidget.CONTEXT_MENU = ['debug-threads-context-menu'];
DebugThreadsWidget.CONTROL_MENU = [...DebugThreadsWidget_1.CONTEXT_MENU, 'a_control'];
DebugThreadsWidget.TERMINATE_MENU = [...DebugThreadsWidget_1.CONTEXT_MENU, 'b_terminate'];
DebugThreadsWidget.OPEN_MENU = [...DebugThreadsWidget_1.CONTEXT_MENU, 'c_open'];
DebugThreadsWidget.FACTORY_ID = 'debug:threads';
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_threads_source_1.DebugThreadsSource),
    tslib_1.__metadata("design:type", debug_threads_source_1.DebugThreadsSource)
], DebugThreadsWidget.prototype, "threads", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_view_model_1.DebugViewModel),
    tslib_1.__metadata("design:type", debug_view_model_1.DebugViewModel)
], DebugThreadsWidget.prototype, "viewModel", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_call_stack_item_type_key_1.DebugCallStackItemTypeKey),
    tslib_1.__metadata("design:type", Object)
], DebugThreadsWidget.prototype, "debugCallStackItemTypeKey", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DebugThreadsWidget.prototype, "init", null);
exports.DebugThreadsWidget = DebugThreadsWidget = DebugThreadsWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DebugThreadsWidget);
//# sourceMappingURL=debug-threads-widget.js.map