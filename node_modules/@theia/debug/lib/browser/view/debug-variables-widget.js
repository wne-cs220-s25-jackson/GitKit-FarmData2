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
var DebugVariablesWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugVariablesWidget = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const source_tree_1 = require("@theia/core/lib/browser/source-tree");
const debug_variables_source_1 = require("./debug-variables-source");
const debug_view_model_1 = require("./debug-view-model");
const nls_1 = require("@theia/core/lib/common/nls");
let DebugVariablesWidget = DebugVariablesWidget_1 = class DebugVariablesWidget extends source_tree_1.SourceTreeWidget {
    static createContainer(parent) {
        const child = source_tree_1.SourceTreeWidget.createContainer(parent, {
            contextMenuPath: DebugVariablesWidget_1.CONTEXT_MENU,
            virtualized: false,
            scrollIfActive: true
        });
        child.bind(debug_variables_source_1.DebugVariablesSource).toSelf();
        child.unbind(source_tree_1.SourceTreeWidget);
        child.bind(DebugVariablesWidget_1).toSelf();
        return child;
    }
    static createWidget(parent) {
        return DebugVariablesWidget_1.createContainer(parent).get(DebugVariablesWidget_1);
    }
    init() {
        super.init();
        this.id = DebugVariablesWidget_1.FACTORY_ID + ':' + this.viewModel.id;
        this.title.label = nls_1.nls.localizeByDefault('Variables');
        this.toDispose.push(this.variables);
        this.source = this.variables;
    }
};
exports.DebugVariablesWidget = DebugVariablesWidget;
DebugVariablesWidget.CONTEXT_MENU = ['debug-variables-context-menu'];
DebugVariablesWidget.EDIT_MENU = [...DebugVariablesWidget_1.CONTEXT_MENU, 'a_edit'];
DebugVariablesWidget.WATCH_MENU = [...DebugVariablesWidget_1.CONTEXT_MENU, 'b_watch'];
DebugVariablesWidget.FACTORY_ID = 'debug:variables';
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_view_model_1.DebugViewModel),
    tslib_1.__metadata("design:type", debug_view_model_1.DebugViewModel)
], DebugVariablesWidget.prototype, "viewModel", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_variables_source_1.DebugVariablesSource),
    tslib_1.__metadata("design:type", debug_variables_source_1.DebugVariablesSource)
], DebugVariablesWidget.prototype, "variables", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DebugVariablesWidget.prototype, "init", null);
exports.DebugVariablesWidget = DebugVariablesWidget = DebugVariablesWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DebugVariablesWidget);
//# sourceMappingURL=debug-variables-widget.js.map