"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcProtocol = exports.AbstractChannel = void 0;
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
var channel_1 = require("./channel");
Object.defineProperty(exports, "AbstractChannel", { enumerable: true, get: function () { return channel_1.AbstractChannel; } });
var rpc_protocol_1 = require("./rpc-protocol");
Object.defineProperty(exports, "RpcProtocol", { enumerable: true, get: function () { return rpc_protocol_1.RpcProtocol; } });
const rpc_message_encoder_1 = require("./rpc-message-encoder");
(0, rpc_message_encoder_1.registerMsgPackExtensions)();
//# sourceMappingURL=index.js.map