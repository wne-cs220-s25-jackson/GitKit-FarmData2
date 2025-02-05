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
var DebugWatchWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugWatchWidget = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const source_tree_1 = require("@theia/core/lib/browser/source-tree");
const debug_watch_source_1 = require("./debug-watch-source");
const debug_view_model_1 = require("./debug-view-model");
const nls_1 = require("@theia/core/lib/common/nls");
let DebugWatchWidget = DebugWatchWidget_1 = class DebugWatchWidget extends source_tree_1.SourceTreeWidget {
    static createContainer(parent) {
        const child = source_tree_1.SourceTreeWidget.createContainer(parent, {
            contextMenuPath: DebugWatchWidget_1.CONTEXT_MENU,
            virtualized: false,
            scrollIfActive: true
        });
        child.bind(debug_watch_source_1.DebugWatchSource).toSelf();
        child.unbind(source_tree_1.SourceTreeWidget);
        child.bind(DebugWatchWidget_1).toSelf();
        return child;
    }
    static createWidget(parent) {
        return DebugWatchWidget_1.createContainer(parent).get(DebugWatchWidget_1);
    }
    init() {
        super.init();
        this.id = DebugWatchWidget_1.FACTORY_ID + ':' + this.viewModel.id;
        this.title.label = nls_1.nls.localizeByDefault('Watch');
        this.toDispose.push(this.variables);
        this.source = this.variables;
    }
};
exports.DebugWatchWidget = DebugWatchWidget;
DebugWatchWidget.CONTEXT_MENU = ['debug-watch-context-menu'];
DebugWatchWidget.EDIT_MENU = [...DebugWatchWidget_1.CONTEXT_MENU, 'a_edit'];
DebugWatchWidget.REMOVE_MENU = [...DebugWatchWidget_1.CONTEXT_MENU, 'b_remove'];
DebugWatchWidget.FACTORY_ID = 'debug:watch';
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_view_model_1.DebugViewModel),
    tslib_1.__metadata("design:type", debug_view_model_1.DebugViewModel)
], DebugWatchWidget.prototype, "viewModel", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_watch_source_1.DebugWatchSource),
    tslib_1.__metadata("design:type", debug_watch_source_1.DebugWatchSource)
], DebugWatchWidget.prototype, "variables", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DebugWatchWidget.prototype, "init", null);
exports.DebugWatchWidget = DebugWatchWidget = DebugWatchWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DebugWatchWidget);
//# sourceMappingURL=debug-watch-widget.js.map