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
exports.TerminalServer = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const logger_1 = require("@theia/core/lib/common/logger");
const base_terminal_server_1 = require("./base-terminal-server");
const node_1 = require("@theia/process/lib/node");
let TerminalServer = class TerminalServer extends base_terminal_server_1.BaseTerminalServer {
    constructor(processManager, logger) {
        super(processManager, logger);
    }
    create(options) {
        return new Promise((resolve, reject) => {
            const term = this.terminalFactory(options);
            term.onStart(_ => {
                this.postCreate(term);
                resolve(term.id);
            });
            term.onError(error => {
                this.logger.error('Error while creating terminal', error);
                resolve(-1);
            });
        });
    }
};
exports.TerminalServer = TerminalServer;
tslib_1.__decorate([
    (0, inversify_1.inject)(node_1.TerminalProcessFactory),
    tslib_1.__metadata("design:type", Function)
], TerminalServer.prototype, "terminalFactory", void 0);
exports.TerminalServer = TerminalServer = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(node_1.ProcessManager)),
    tslib_1.__param(1, (0, inversify_1.inject)(logger_1.ILogger)),
    tslib_1.__param(1, (0, inversify_1.named)('terminal')),
    tslib_1.__metadata("design:paramtypes", [node_1.ProcessManager, Object])
], TerminalServer);
//# sourceMappingURL=terminal-server.js.map