"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
var DebugStackFramesWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugStackFramesWidget = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const source_tree_1 = require("@theia/core/lib/browser/source-tree");
const debug_stack_frames_source_1 = require("./debug-stack-frames-source");
const debug_stack_frame_1 = require("../model/debug-stack-frame");
const debug_view_model_1 = require("./debug-view-model");
const debug_call_stack_item_type_key_1 = require("../debug-call-stack-item-type-key");
const nls_1 = require("@theia/core/lib/common/nls");
let DebugStackFramesWidget = DebugStackFramesWidget_1 = class DebugStackFramesWidget extends source_tree_1.SourceTreeWidget {
    constructor() {
        super(...arguments);
        this.updatingSelection = false;
    }
    static createContainer(parent) {
        const child = source_tree_1.SourceTreeWidget.createContainer(parent, {
            contextMenuPath: DebugStackFramesWidget_1.CONTEXT_MENU,
            virtualized: false,
            scrollIfActive: true
        });
        child.bind(debug_stack_frames_source_1.DebugStackFramesSource).toSelf();
        child.unbind(source_tree_1.SourceTreeWidget);
        child.bind(DebugStackFramesWidget_1).toSelf();
        return child;
    }
    static createWidget(parent) {
        return DebugStackFramesWidget_1.createContainer(parent).get(DebugStackFramesWidget_1);
    }
    init() {
        super.init();
        this.id = DebugStackFramesWidget_1.FACTORY_ID + ':' + this.viewModel.id;
        this.title.label = nls_1.nls.localizeByDefault('Call Stack');
        this.toDispose.push(this.frames);
        this.source = this.frames;
        this.toDispose.push(this.viewModel.onDidChange(() => this.updateWidgetSelection()));
        this.toDispose.push(this.model.onNodeRefreshed(() => this.updateWidgetSelection()));
        this.toDispose.push(this.model.onSelectionChanged(() => this.updateModelSelection()));
    }
    async updateWidgetSelection() {
        if (this.updatingSelection) {
            return;
        }
        this.updatingSelection = true;
        try {
            const { currentFrame } = this.viewModel;
            if (currentFrame) {
                const node = this.model.getNode(currentFrame.id);
                if (browser_1.SelectableTreeNode.is(node)) {
                    this.model.selectNode(node);
                }
            }
        }
        finally {
            this.updatingSelection = false;
        }
    }
    async updateModelSelection() {
        if (this.updatingSelection) {
            return;
        }
        this.updatingSelection = true;
        try {
            const node = this.model.selectedNodes[0];
            if (source_tree_1.TreeElementNode.is(node)) {
                if (node.element instanceof debug_stack_frame_1.DebugStackFrame) {
                    node.element.thread.currentFrame = node.element;
                    this.debugCallStackItemTypeKey.set('stackFrame');
                }
            }
        }
        finally {
            this.updatingSelection = false;
        }
    }
    toContextMenuArgs(node) {
        if (source_tree_1.TreeElementNode.is(node)) {
            if (node.element instanceof debug_stack_frame_1.DebugStackFrame) {
                const source = node.element.source;
                if (source) {
                    if (source.inMemory) {
                        const path = source.raw.path || source.raw.sourceReference;
                        if (path !== undefined) {
                            return [path];
                        }
                    }
                    else {
                        return [source.uri.toString()];
                    }
                }
            }
        }
        return undefined;
    }
    tapNode(node) {
        if (source_tree_1.TreeElementNode.is(node) && node.element instanceof debug_stack_frames_source_1.LoadMoreStackFrames) {
            node.element.open();
        }
        super.tapNode(node);
    }
    getDefaultNodeStyle(node, props) {
        return undefined;
    }
};
exports.DebugStackFramesWidget = DebugStackFramesWidget;
DebugStackFramesWidget.CONTEXT_MENU = ['debug-frames-context-menu'];
DebugStackFramesWidget.FACTORY_ID = 'debug:frames';
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_stack_frames_source_1.DebugStackFramesSource),
    tslib_1.__metadata("design:type", debug_stack_frames_source_1.DebugStackFramesSource)
], DebugStackFramesWidget.prototype, "frames", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_view_model_1.DebugViewModel),
    tslib_1.__metadata("design:type", debug_view_model_1.DebugViewModel)
], DebugStackFramesWidget.prototype, "viewModel", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_call_stack_item_type_key_1.DebugCallStackItemTypeKey),
    tslib_1.__metadata("design:type", Object)
], DebugStackFramesWidget.prototype, "debugCallStackItemTypeKey", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DebugStackFramesWidget.prototype, "init", null);
exports.DebugStackFramesWidget = DebugStackFramesWidget = DebugStackFramesWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DebugStackFramesWidget);
//# sourceMappingURL=debug-stack-frames-widget.js.map