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
exports.DebugWatchExpression = void 0;
const React = require("@theia/core/shared/react");
const dialogs_1 = require("@theia/core/lib/browser/dialogs");
const debug_console_items_1 = require("../console/debug-console-items");
const browser_1 = require("@theia/core/lib/browser");
const core_1 = require("@theia/core");
class DebugWatchExpression extends debug_console_items_1.ExpressionItem {
    constructor(options) {
        super(options.expression, options.session);
        this.options = options;
        this.setValueRef = (valueRef) => this.valueRef = valueRef || undefined;
        this.id = options.id;
    }
    async evaluate() {
        await super.evaluate('watch');
    }
    setResult(body, error) {
        if (this.options.session()) {
            super.setResult(body, error);
            this.isError = !!error;
        }
        this.options.onDidChange();
    }
    render() {
        return React.createElement("div", { className: 'theia-debug-console-variable theia-debug-watch-expression' },
            React.createElement("div", { className: browser_1.TREE_NODE_SEGMENT_GROW_CLASS },
                React.createElement("span", { title: this.type || this._expression, className: 'name' },
                    this._expression,
                    ": "),
                React.createElement("span", { title: this._value, ref: this.setValueRef, className: this.isError ? 'watch-error' : '' }, this._value)),
            React.createElement("div", { className: (0, browser_1.codicon)('close', true), title: core_1.nls.localizeByDefault('Remove Expression'), onClick: this.options.remove }));
    }
    async open() {
        const input = new dialogs_1.SingleTextInputDialog({
            title: core_1.nls.localizeByDefault('Edit Expression'),
            initialValue: this.expression,
            placeholder: core_1.nls.localizeByDefault('Expression to watch')
        });
        const newValue = await input.open();
        if (newValue !== undefined) {
            this._expression = newValue;
            await this.evaluate();
        }
    }
    get supportCopyValue() {
        return !!this.valueRef && document.queryCommandSupported('copy');
    }
    copyValue() {
        const selection = document.getSelection();
        if (this.valueRef && selection) {
            selection.selectAllChildren(this.valueRef);
            document.execCommand('copy');
        }
    }
}
exports.DebugWatchExpression = DebugWatchExpression;
//# sourceMappingURL=debug-watch-expression.js.map