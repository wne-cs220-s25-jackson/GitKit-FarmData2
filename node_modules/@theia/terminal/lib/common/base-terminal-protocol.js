"use strict";
// *****************************************************************************
// Copyright (C) 2017 Ericsson and others.
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
exports.DispatchingBaseTerminalClient = exports.TerminalExitReason = exports.IBaseTerminalServer = void 0;
const core_1 = require("@theia/core");
var IBaseTerminalServer;
(function (IBaseTerminalServer) {
    function validateId(id) {
        return typeof id === 'number' && id !== -1;
    }
    IBaseTerminalServer.validateId = validateId;
})(IBaseTerminalServer || (exports.IBaseTerminalServer = IBaseTerminalServer = {}));
var TerminalExitReason;
(function (TerminalExitReason) {
    TerminalExitReason[TerminalExitReason["Unknown"] = 0] = "Unknown";
    TerminalExitReason[TerminalExitReason["Shutdown"] = 1] = "Shutdown";
    TerminalExitReason[TerminalExitReason["Process"] = 2] = "Process";
    TerminalExitReason[TerminalExitReason["User"] = 3] = "User";
    TerminalExitReason[TerminalExitReason["Extension"] = 4] = "Extension";
})(TerminalExitReason || (exports.TerminalExitReason = TerminalExitReason = {}));
class DispatchingBaseTerminalClient {
    constructor() {
        this.clients = new Set();
    }
    push(client) {
        this.clients.add(client);
        return core_1.Disposable.create(() => this.clients.delete(client));
    }
    onTerminalExitChanged(event) {
        this.clients.forEach(c => {
            try {
                c.onTerminalExitChanged(event);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    onTerminalError(event) {
        this.clients.forEach(c => {
            try {
                c.onTerminalError(event);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    updateTerminalEnvVariables() {
        this.clients.forEach(c => {
            try {
                c.updateTerminalEnvVariables();
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    storeTerminalEnvVariables(data) {
        this.clients.forEach(c => {
            try {
                c.storeTerminalEnvVariables(data);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.DispatchingBaseTerminalClient = DispatchingBaseTerminalClient;
//# sourceMappingURL=base-terminal-protocol.js.map