"use strict";
// *****************************************************************************
// Copyright (C) 2019 Ericsson and others.
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
exports.TextDocumentContentChangeDelta = void 0;
const vscode_languageserver_protocol_1 = require("vscode-languageserver-protocol");
const types_1 = require("./types");
var TextDocumentContentChangeDelta;
(function (TextDocumentContentChangeDelta) {
    function is(arg) {
        return (0, types_1.isObject)(arg)
            && (0, types_1.isString)(arg.text)
            && ((0, types_1.isNumber)(arg.rangeLength) || (0, types_1.isUndefined)(arg.rangeLength))
            && vscode_languageserver_protocol_1.Range.is(arg.range);
    }
    TextDocumentContentChangeDelta.is = is;
})(TextDocumentContentChangeDelta || (exports.TextDocumentContentChangeDelta = TextDocumentContentChangeDelta = {}));
//# sourceMappingURL=lsp-types.js.map