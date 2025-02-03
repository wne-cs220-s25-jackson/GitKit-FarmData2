"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputChannelRegistryExtImpl = void 0;
const plugin_api_rpc_1 = require("../common/plugin-api-rpc");
const types_1 = require("../common/types");
const log_output_channel_1 = require("./output-channel/log-output-channel");
const output_channel_item_1 = require("./output-channel/output-channel-item");
class OutputChannelRegistryExtImpl {
    constructor(rpc) {
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.OUTPUT_CHANNEL_REGISTRY_MAIN);
    }
    createOutputChannel(name, pluginInfo, options) {
        name = name.trim();
        if (!name) {
            throw new Error('illegal argument \'name\'. must not be falsy');
        }
        const isLogOutput = options && (0, types_1.isObject)(options);
        return isLogOutput
            ? this.doCreateLogOutputChannel(name, pluginInfo)
            : this.doCreateOutputChannel(name, pluginInfo);
    }
    doCreateOutputChannel(name, pluginInfo) {
        return new output_channel_item_1.OutputChannelImpl(name, this.proxy, pluginInfo);
    }
    doCreateLogOutputChannel(name, pluginInfo) {
        return new log_output_channel_1.LogOutputChannelImpl(name, this.proxy, pluginInfo);
    }
}
exports.OutputChannelRegistryExtImpl = OutputChannelRegistryExtImpl;
//# sourceMappingURL=output-channel-registry.js.map