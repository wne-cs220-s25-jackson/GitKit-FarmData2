"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRegistryExt = void 0;
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
const inversify_1 = require("@theia/core/shared/inversify");
const plugin_api_rpc_1 = require("../common/plugin-api-rpc");
const rpc_protocol_1 = require("../common/rpc-protocol");
let MessageRegistryExt = class MessageRegistryExt {
    initialize() {
        this.proxy = this.rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.MESSAGE_REGISTRY_MAIN);
    }
    async showMessage(type, message, optionsOrFirstItem, ...rest) {
        const options = {};
        const actions = [];
        const items = [];
        const pushItem = (item) => {
            items.push(item);
            if (typeof item === 'string') {
                actions.push({ title: item });
            }
            else {
                actions.push({ title: item.title, isCloseAffordance: item.isCloseAffordance });
                if (item.isCloseAffordance) {
                    options.onCloseActionHandle = actions.length - 1;
                }
            }
        };
        if (optionsOrFirstItem) {
            if (typeof optionsOrFirstItem === 'string' || 'title' in optionsOrFirstItem) {
                pushItem(optionsOrFirstItem);
            }
            else {
                if ('modal' in optionsOrFirstItem) {
                    options.modal = optionsOrFirstItem.modal;
                    if ('detail' in optionsOrFirstItem) {
                        options.detail = optionsOrFirstItem.detail;
                    }
                }
            }
        }
        for (const item of rest) {
            pushItem(item);
        }
        const actionHandle = await this.proxy.$showMessage(type, message, options, actions);
        return actionHandle !== undefined ? items[actionHandle] : undefined;
    }
};
exports.MessageRegistryExt = MessageRegistryExt;
tslib_1.__decorate([
    (0, inversify_1.inject)(rpc_protocol_1.RPCProtocol),
    tslib_1.__metadata("design:type", Object)
], MessageRegistryExt.prototype, "rpc", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MessageRegistryExt.prototype, "initialize", null);
exports.MessageRegistryExt = MessageRegistryExt = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MessageRegistryExt);
//# sourceMappingURL=message-registry.js.map