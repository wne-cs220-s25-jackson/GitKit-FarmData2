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
var ConsoleContentWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleContentWidget = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const source_tree_1 = require("@theia/core/lib/browser/source-tree");
const console_session_1 = require("./console-session");
const severity_1 = require("@theia/core/lib/common/severity");
let ConsoleContentWidget = ConsoleContentWidget_1 = class ConsoleContentWidget extends source_tree_1.SourceTreeWidget {
    static createContainer(parent, props) {
        const child = source_tree_1.SourceTreeWidget.createContainer(parent, {
            contextMenuPath: ConsoleContentWidget_1.CONTEXT_MENU,
            viewProps: {
                followOutput: true
            },
            ...props
        });
        child.unbind(source_tree_1.SourceTreeWidget);
        child.bind(ConsoleContentWidget_1).toSelf();
        return child;
    }
    createTreeElementNodeClassNames(node) {
        const classNames = super.createTreeElementNodeClassNames(node);
        if (node.element) {
            const className = this.toClassName(node.element);
            if (className) {
                classNames.push(className);
            }
        }
        return classNames;
    }
    toClassName(item) {
        if (item.severity === severity_1.Severity.Error) {
            return console_session_1.ConsoleItem.errorClassName;
        }
        if (item.severity === severity_1.Severity.Warning) {
            return console_session_1.ConsoleItem.warningClassName;
        }
        if (item.severity === severity_1.Severity.Info) {
            return console_session_1.ConsoleItem.infoClassName;
        }
        if (item.severity === severity_1.Severity.Log) {
            return console_session_1.ConsoleItem.logClassName;
        }
        return undefined;
    }
};
exports.ConsoleContentWidget = ConsoleContentWidget;
ConsoleContentWidget.CONTEXT_MENU = ['console-context-menu'];
exports.ConsoleContentWidget = ConsoleContentWidget = ConsoleContentWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ConsoleContentWidget);
//# sourceMappingURL=console-content-widget.js.map