"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginWorker = void 0;
const tslib_1 = require("tslib");
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
const channel_1 = require("@theia/core/lib/common/message-rpc/channel");
const uint8_array_message_buffer_1 = require("@theia/core/lib/common/message-rpc/uint8-array-message-buffer");
const inversify_1 = require("@theia/core/shared/inversify");
const rpc_protocol_1 = require("../../common/rpc-protocol");
let PluginWorker = class PluginWorker {
    constructor() {
        this.worker = new Worker(new URL('./worker/worker-main', 
        // @ts-expect-error (TS1343)
        // We compile to CommonJS but `import.meta` is still available in the browser
        import.meta.url));
        const channel = new channel_1.BasicChannel(() => {
            const writer = new uint8_array_message_buffer_1.Uint8ArrayWriteBuffer();
            writer.onCommit(buffer => {
                this.worker.postMessage(buffer);
            });
            return writer;
        });
        this.rpc = new rpc_protocol_1.RPCProtocolImpl(channel);
        // eslint-disable-next-line arrow-body-style
        this.worker.onmessage = buffer => channel.onMessageEmitter.fire(() => {
            return new uint8_array_message_buffer_1.Uint8ArrayReadBuffer(buffer.data);
        });
        this.worker.onerror = e => channel.onErrorEmitter.fire(e);
    }
};
exports.PluginWorker = PluginWorker;
exports.PluginWorker = PluginWorker = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], PluginWorker);
//# sourceMappingURL=plugin-worker.js.map