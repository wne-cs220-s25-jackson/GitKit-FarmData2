"use strict";
// *****************************************************************************
// Copyright (C) 2024 Toro Cloud Pty Ltd and others.
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
const assert = require("assert");
const React = require("react");
const jsdom_1 = require("../test/jsdom");
let disableJSDOM = (0, jsdom_1.enableJSDOM)();
const react_dialog_1 = require("./react-dialog");
class MyDialog extends react_dialog_1.ReactDialog {
    constructor() {
        super({ title: '' });
    }
    get value() {
        return;
    }
    render() {
        return React.createElement(React.Fragment, null);
    }
}
describe('ReactDialog', () => {
    before(() => disableJSDOM = (0, jsdom_1.enableJSDOM)());
    after(() => disableJSDOM());
    it('should be extended', () => {
        const dialog = new MyDialog();
        assert.equal(dialog instanceof react_dialog_1.ReactDialog, true);
    });
});
//# sourceMappingURL=react-dialog.spec.js.map