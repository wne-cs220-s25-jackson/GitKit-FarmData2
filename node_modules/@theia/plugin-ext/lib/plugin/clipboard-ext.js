"use strict";
// *****************************************************************************
// Copyright (C) 2019 RedHat and others.
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
exports.ClipboardExt = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const rpc_protocol_1 = require("../common/rpc-protocol");
const common_1 = require("../common");
let ClipboardExt = class ClipboardExt {
    initialize() {
        this.proxy = this.rpc.getProxy(common_1.PLUGIN_RPC_CONTEXT.CLIPBOARD_MAIN);
    }
    readText() {
        return this.proxy.$readText();
    }
    writeText(value) {
        return this.proxy.$writeText(value);
    }
};
exports.ClipboardExt = ClipboardExt;
tslib_1.__decorate([
    (0, inversify_1.inject)(rpc_protocol_1.RPCProtocol),
    tslib_1.__metadata("design:type", Object)
], ClipboardExt.prototype, "rpc", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ClipboardExt.prototype, "initialize", null);
exports.ClipboardExt = ClipboardExt = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ClipboardExt);
//# sourceMappingURL=clipboard-ext.js.map