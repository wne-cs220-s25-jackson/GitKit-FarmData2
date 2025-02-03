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
require("reflect-metadata");
const dynamic_require_1 = require("../dynamic-require");
const ipc_channel_1 = require("./ipc-channel");
const ipc_protocol_1 = require("./ipc-protocol");
(0, ipc_protocol_1.checkParentAlive)();
const entryPoint = ipc_protocol_1.IPCEntryPoint.getScriptFromEnv();
(0, dynamic_require_1.dynamicRequire)(entryPoint).default(new ipc_channel_1.IPCChannel());
//# sourceMappingURL=ipc-bootstrap.js.map