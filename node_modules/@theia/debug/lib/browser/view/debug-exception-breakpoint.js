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
exports.DebugExceptionBreakpoint = void 0;
const React = require("@theia/core/shared/react");
const dialogs_1 = require("@theia/core/lib/browser/dialogs");
const browser_1 = require("@theia/core/lib/browser");
const core_1 = require("@theia/core");
class DebugExceptionBreakpoint {
    constructor(data, breakpoints) {
        this.data = data;
        this.breakpoints = breakpoints;
        this.toggle = () => this.breakpoints.toggleExceptionBreakpoint(this.data.raw.filter);
        this.id = data.raw.filter + ':' + data.raw.label;
    }
    render() {
        return React.createElement("div", { title: this.data.raw.description || this.data.raw.label, className: 'theia-source-breakpoint' },
            React.createElement("span", { className: 'theia-debug-breakpoint-icon' }),
            React.createElement("input", { type: 'checkbox', checked: this.data.enabled, onChange: this.toggle }),
            React.createElement("span", { className: 'line-info' },
                React.createElement("span", { className: 'name' },
                    this.data.raw.label,
                    " "),
                this.data.condition &&
                    React.createElement("span", { title: core_1.nls.localizeByDefault('Expression condition: {0}', this.data.condition), className: 'path ' + browser_1.TREE_NODE_INFO_CLASS },
                        this.data.condition,
                        " ")));
    }
    async editCondition() {
        const inputDialog = new dialogs_1.SingleTextInputDialog({
            title: this.data.raw.label,
            placeholder: this.data.raw.conditionDescription,
            initialValue: this.data.condition
        });
        let condition = await inputDialog.open();
        if (condition === undefined) {
            return;
        }
        if (condition === '') {
            condition = undefined;
        }
        if (condition !== this.data.condition) {
            this.breakpoints.updateExceptionBreakpoint(this.data.raw.filter, { condition });
        }
    }
}
exports.DebugExceptionBreakpoint = DebugExceptionBreakpoint;
//# sourceMappingURL=debug-exception-breakpoint.js.map