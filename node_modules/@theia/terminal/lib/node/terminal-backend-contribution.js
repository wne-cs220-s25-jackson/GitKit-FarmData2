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
exports.TerminalBackendContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common");
const node_1 = require("@theia/process/lib/node");
const terminal_protocol_1 = require("../common/terminal-protocol");
const buffering_stream_1 = require("./buffering-stream");
let TerminalBackendContribution = class TerminalBackendContribution {
    constructor() {
        this.decoder = new TextDecoder('utf-8');
    }
    configure(service) {
        service.registerChannelHandler(`${terminal_protocol_1.terminalsPath}/:id`, (params, channel) => {
            const id = parseInt(params.id, 10);
            const termProcess = this.processManager.get(id);
            if (termProcess instanceof node_1.TerminalProcess) {
                const output = termProcess.createOutputStream();
                // Create a RPC connection to the terminal process
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                channel.onMessage(e => {
                    termProcess.write(e().readString());
                });
                const buffer = new buffering_stream_1.StringBufferingStream();
                buffer.onData(chunk => {
                    channel.getWriteBuffer().writeString(chunk).commit();
                });
                output.on('data', chunk => {
                    buffer.push(chunk);
                });
                channel.onClose(() => {
                    buffer.dispose();
                    output.dispose();
                });
            }
        });
    }
};
exports.TerminalBackendContribution = TerminalBackendContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(node_1.ProcessManager),
    tslib_1.__metadata("design:type", node_1.ProcessManager)
], TerminalBackendContribution.prototype, "processManager", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ILogger),
    (0, inversify_1.named)('terminal'),
    tslib_1.__metadata("design:type", Object)
], TerminalBackendContribution.prototype, "logger", void 0);
exports.TerminalBackendContribution = TerminalBackendContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TerminalBackendContribution);
//# sourceMappingURL=terminal-backend-contribution.js.map