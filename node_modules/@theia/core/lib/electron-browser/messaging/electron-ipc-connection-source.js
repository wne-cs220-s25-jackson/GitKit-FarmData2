"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.ElectronIpcRendererChannel = exports.ElectronIpcConnectionSource = exports.ElectronIpcConnectionProvider = exports.ElectronMainConnectionProvider = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const uint8_array_message_buffer_1 = require("../../common/message-rpc/uint8-array-message-buffer");
exports.ElectronMainConnectionProvider = Symbol('ElectronMainConnectionProvider');
/**
 * Connection provider between the Theia frontend and the electron-main process via IPC.
 */
var ElectronIpcConnectionProvider;
(function (ElectronIpcConnectionProvider) {
    function createProxy(container, path, arg) {
        return container.get(exports.ElectronMainConnectionProvider).createProxy(path, arg);
    }
    ElectronIpcConnectionProvider.createProxy = createProxy;
})(ElectronIpcConnectionProvider || (exports.ElectronIpcConnectionProvider = ElectronIpcConnectionProvider = {}));
let ElectronIpcConnectionSource = class ElectronIpcConnectionSource {
    constructor() {
        this.onConnectionDidOpenEmitter = new common_1.Emitter();
        this.onConnectionDidOpen = this.onConnectionDidOpenEmitter.event;
    }
    onStart() {
        const channel = new ElectronIpcRendererChannel();
        this.onConnectionDidOpenEmitter.fire(channel);
    }
};
exports.ElectronIpcConnectionSource = ElectronIpcConnectionSource;
exports.ElectronIpcConnectionSource = ElectronIpcConnectionSource = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ElectronIpcConnectionSource);
class ElectronIpcRendererChannel extends common_1.AbstractChannel {
    constructor() {
        super();
        this.toDispose.push(window.electronTheiaCore.onData(data => this.onMessageEmitter.fire(() => new uint8_array_message_buffer_1.Uint8ArrayReadBuffer(data))));
    }
    getWriteBuffer() {
        const writer = new uint8_array_message_buffer_1.Uint8ArrayWriteBuffer();
        writer.onCommit(buffer => window.electronTheiaCore.sendData(buffer));
        return writer;
    }
}
exports.ElectronIpcRendererChannel = ElectronIpcRendererChannel;
//# sourceMappingURL=electron-ipc-connection-source.js.map