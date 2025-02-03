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
exports.KeyValueStorageProxy = exports.InternalStorageExt = exports.GlobalState = exports.Memento = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const core_1 = require("@theia/core");
const plugin_api_rpc_1 = require("../common/plugin-api-rpc");
const rpc_protocol_1 = require("../common/rpc-protocol");
class Memento {
    constructor(pluginId, isPluginGlobalData, storage) {
        this.pluginId = pluginId;
        this.isPluginGlobalData = isPluginGlobalData;
        this.storage = storage;
        this.cache = storage.getPerPluginData(pluginId, isPluginGlobalData);
        if (!this.isPluginGlobalData) {
            this.storage.storageDataChangedEvent((data) => {
                this.cache = data[this.pluginId] ? data[this.pluginId] : {};
            });
        }
    }
    keys() {
        return Object.entries(this.cache).filter(([, value]) => value !== undefined).map(([key]) => key);
    }
    get(key, defaultValue) {
        if (key && this.cache.hasOwnProperty(key)) {
            return this.cache[key];
        }
        else {
            return defaultValue;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    update(key, value) {
        if (value === undefined) {
            delete this.cache[key];
        }
        else {
            this.cache[key] = value;
        }
        return this.storage.setPerPluginData(this.pluginId, this.cache, this.isPluginGlobalData).then(_ => undefined);
    }
}
exports.Memento = Memento;
class GlobalState extends Memento {
    /** @todo: API is not yet implemented. */
    setKeysForSync(keys) { }
}
exports.GlobalState = GlobalState;
exports.InternalStorageExt = Symbol('InternalStorageExt');
/**
 * Singleton.
 * Is used to proxy storage requests to main side.
 */
let KeyValueStorageProxy = class KeyValueStorageProxy {
    constructor(rpc) {
        this.storageDataChangedEmitter = new core_1.Emitter();
        this.storageDataChangedEvent = this.storageDataChangedEmitter.event;
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.STORAGE_MAIN);
    }
    init(initGlobalData, initWorkspaceData) {
        this.globalDataCache = initGlobalData;
        this.workspaceDataCache = initWorkspaceData;
    }
    getPerPluginData(key, isGlobal) {
        if (isGlobal) {
            const existed = this.globalDataCache[key];
            return existed ? existed : {};
        }
        else {
            const existed = this.workspaceDataCache[key];
            return existed ? existed : {};
        }
    }
    setPerPluginData(key, value, isGlobal) {
        if (isGlobal) {
            this.globalDataCache[key] = value;
        }
        else {
            this.workspaceDataCache[key] = value;
        }
        return this.proxy.$set(key, value, isGlobal);
    }
    $updatePluginsWorkspaceData(workspaceData) {
        this.workspaceDataCache = workspaceData;
        this.storageDataChangedEmitter.fire(workspaceData);
    }
};
exports.KeyValueStorageProxy = KeyValueStorageProxy;
exports.KeyValueStorageProxy = KeyValueStorageProxy = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(rpc_protocol_1.RPCProtocol)),
    tslib_1.__metadata("design:paramtypes", [Object])
], KeyValueStorageProxy);
//# sourceMappingURL=plugin-storage.js.map