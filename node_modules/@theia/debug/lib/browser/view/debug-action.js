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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugAction = void 0;
const React = require("@theia/core/shared/react");
const browser_1 = require("@theia/core/lib/browser");
class DebugAction extends React.Component {
    constructor() {
        super(...arguments);
        this.setRef = (ref) => this.ref = ref || undefined;
    }
    render() {
        const { enabled, label, iconClass } = this.props;
        const classNames = ['debug-action'];
        if (iconClass) {
            classNames.push(...(0, browser_1.codiconArray)(iconClass, true));
        }
        if (enabled === false) {
            classNames.push(browser_1.DISABLED_CLASS);
        }
        return React.createElement("span", { tabIndex: 0, className: classNames.join(' '), title: label, onClick: this.props.run, ref: this.setRef }, !iconClass && React.createElement("div", null, label));
    }
    focus() {
        if (this.ref) {
            this.ref.focus();
        }
    }
}
exports.DebugAction = DebugAction;
//# sourceMappingURL=debug-action.js.map