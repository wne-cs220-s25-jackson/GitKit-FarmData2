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
exports.BaseTerminalServer = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common");
const base_terminal_protocol_1 = require("../common/base-terminal-protocol");
const node_1 = require("@theia/process/lib/node");
const shell_process_1 = require("./shell-process");
let BaseTerminalServer = class BaseTerminalServer {
    constructor(processManager, logger) {
        this.processManager = processManager;
        this.logger = logger;
        this.client = undefined;
        this.terminalToDispose = new Map();
        processManager.onDelete(id => {
            const toDispose = this.terminalToDispose.get(id);
            if (toDispose !== undefined) {
                toDispose.dispose();
                this.terminalToDispose.delete(id);
            }
        });
    }
    async attach(id) {
        const term = this.processManager.get(id);
        if (term && term instanceof node_1.TerminalProcess) {
            return term.id;
        }
        else {
            this.logger.warn(`Couldn't attach - can't find terminal with id: ${id} `);
            return -1;
        }
    }
    async onAttachAttempted(id) {
        const terminal = this.processManager.get(id);
        if (terminal instanceof node_1.TaskTerminalProcess) {
            terminal.attachmentAttempted = true;
            if (terminal.exited) {
                // Didn't execute `unregisterProcess` on terminal `exit` event to enable attaching task output to terminal,
                // Fixes https://github.com/eclipse-theia/theia/issues/2961
                terminal.unregisterProcess();
            }
            else {
                this.postAttachAttempted(terminal);
            }
        }
    }
    async getProcessId(id) {
        const terminal = this.processManager.get(id);
        if (!(terminal instanceof node_1.TerminalProcess)) {
            throw new Error(`terminal "${id}" does not exist`);
        }
        return terminal.pid;
    }
    async getProcessInfo(id) {
        const terminal = this.processManager.get(id);
        if (!(terminal instanceof node_1.TerminalProcess)) {
            throw new Error(`terminal "${id}" does not exist`);
        }
        return {
            executable: terminal.executable,
            arguments: terminal.arguments,
        };
    }
    async getCwdURI(id) {
        const terminal = this.processManager.get(id);
        if (!(terminal instanceof node_1.TerminalProcess)) {
            throw new Error(`terminal "${id}" does not exist`);
        }
        return terminal.getCwdURI();
    }
    async close(id) {
        const term = this.processManager.get(id);
        if (term instanceof node_1.TerminalProcess) {
            term.kill();
        }
    }
    async getDefaultShell() {
        return shell_process_1.ShellProcess.getShellExecutablePath();
    }
    dispose() {
        // noop
    }
    async resize(id, cols, rows) {
        const term = this.processManager.get(id);
        if (term && term instanceof node_1.TerminalProcess) {
            term.resize(cols, rows);
        }
        else {
            console.warn("Couldn't resize terminal " + id + ", because it doesn't exist.");
        }
    }
    /* Set the client to receive notifications on.  */
    setClient(client) {
        this.client = client;
        if (!this.client) {
            return;
        }
        this.client.updateTerminalEnvVariables();
    }
    notifyClientOnExit(term) {
        const toDispose = new common_1.DisposableCollection();
        toDispose.push(term.onError(error => {
            this.logger.error(`Terminal pid: ${term.pid} error: ${error}, closing it.`);
            if (this.client !== undefined) {
                this.client.onTerminalError({
                    terminalId: term.id,
                    error: new Error(`Failed to execute terminal process (${error.code})`),
                    attached: term instanceof node_1.TaskTerminalProcess && term.attachmentAttempted
                });
            }
        }));
        toDispose.push(term.onExit(event => {
            if (this.client !== undefined) {
                this.client.onTerminalExitChanged({
                    terminalId: term.id,
                    code: event.code,
                    reason: base_terminal_protocol_1.TerminalExitReason.Process,
                    signal: event.signal,
                    attached: term instanceof node_1.TaskTerminalProcess && term.attachmentAttempted
                });
            }
        }));
        return toDispose;
    }
    postCreate(term) {
        const toDispose = this.notifyClientOnExit(term);
        this.terminalToDispose.set(term.id, toDispose);
    }
    postAttachAttempted(term) {
        const toDispose = this.notifyClientOnExit(term);
        this.terminalToDispose.set(term.id, toDispose);
    }
};
exports.BaseTerminalServer = BaseTerminalServer;
exports.BaseTerminalServer = BaseTerminalServer = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(node_1.ProcessManager)),
    tslib_1.__param(1, (0, inversify_1.inject)(common_1.ILogger)),
    tslib_1.__param(1, (0, inversify_1.named)('terminal')),
    tslib_1.__metadata("design:paramtypes", [node_1.ProcessManager, Object])
], BaseTerminalServer);
//# sourceMappingURL=base-terminal-server.js.map