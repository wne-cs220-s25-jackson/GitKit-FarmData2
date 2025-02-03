"use strict";
// *****************************************************************************
// Copyright (C) 2022 STMicroelectronics and others.
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
exports.ProcessTerminatedMessage = exports.ProcessTerminateMessage = void 0;
var ProcessTerminateMessage;
(function (ProcessTerminateMessage) {
    ProcessTerminateMessage.TYPE = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function is(object) {
        return typeof object === 'object' && object.type === ProcessTerminateMessage.TYPE;
    }
    ProcessTerminateMessage.is = is;
})(ProcessTerminateMessage || (exports.ProcessTerminateMessage = ProcessTerminateMessage = {}));
var ProcessTerminatedMessage;
(function (ProcessTerminatedMessage) {
    ProcessTerminatedMessage.TYPE = 1;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function is(object) {
        return typeof object === 'object' && object.type === ProcessTerminatedMessage.TYPE;
    }
    ProcessTerminatedMessage.is = is;
})(ProcessTerminatedMessage || (exports.ProcessTerminatedMessage = ProcessTerminatedMessage = {}));
//# sourceMappingURL=hosted-plugin-protocol.js.map