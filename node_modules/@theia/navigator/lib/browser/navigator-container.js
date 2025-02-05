"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
exports.createFileNavigatorWidget = exports.createFileNavigatorContainer = exports.FILE_NAVIGATOR_PROPS = void 0;
const browser_1 = require("@theia/core/lib/browser");
const browser_2 = require("@theia/filesystem/lib/browser");
const navigator_tree_1 = require("./navigator-tree");
const navigator_model_1 = require("./navigator-model");
const navigator_widget_1 = require("./navigator-widget");
const navigator_contribution_1 = require("./navigator-contribution");
const navigator_decorator_service_1 = require("./navigator-decorator-service");
exports.FILE_NAVIGATOR_PROPS = {
    ...browser_1.defaultTreeProps,
    contextMenuPath: navigator_contribution_1.NAVIGATOR_CONTEXT_MENU,
    multiSelect: true,
    search: true,
    globalSelection: true
};
function createFileNavigatorContainer(parent) {
    const child = (0, browser_2.createFileTreeContainer)(parent, {
        tree: navigator_tree_1.FileNavigatorTree,
        model: navigator_model_1.FileNavigatorModel,
        widget: navigator_widget_1.FileNavigatorWidget,
        decoratorService: navigator_decorator_service_1.NavigatorDecoratorService,
        props: exports.FILE_NAVIGATOR_PROPS,
    });
    return child;
}
exports.createFileNavigatorContainer = createFileNavigatorContainer;
function createFileNavigatorWidget(parent) {
    return createFileNavigatorContainer(parent).get(navigator_widget_1.FileNavigatorWidget);
}
exports.createFileNavigatorWidget = createFileNavigatorWidget;
//# sourceMappingURL=navigator-container.js.map