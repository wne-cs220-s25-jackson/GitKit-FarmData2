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
exports.PluginsKeyValueStorage = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const node_1 = require("@theia/core/lib/node");
const fs = require("@theia/core/shared/fs-extra");
const path = require("path");
const file_uri_1 = require("@theia/core/lib/common/file-uri");
const promise_util_1 = require("@theia/core/lib/common/promise-util");
const env_variables_1 = require("@theia/core/lib/common/env-variables");
const const_1 = require("./paths/const");
const plugin_paths_protocol_1 = require("../common/plugin-paths-protocol");
let PluginsKeyValueStorage = class PluginsKeyValueStorage {
    constructor() {
        this.stores = Object.create(null);
        this.storesToSync = new Set();
        this.deferredGlobalDataPath = new promise_util_1.Deferred();
    }
    init() {
        this.deferredGlobalDataPath.resolve(this.getGlobalDataPath().catch(error => {
            console.error('Failed to initialize global state path:', error);
            return undefined;
        }));
        process.once('beforeExit', () => this.dispose());
        this.syncStores();
    }
    async set(key, value, kind) {
        const store = await this.getStore(kind);
        if (!store) {
            console.warn('Cannot save data: no opened workspace');
            return false;
        }
        if (value === undefined || Object.keys(value).length === 0) {
            delete store.values[key];
        }
        else {
            store.values[key] = value;
        }
        this.storesToSync.add(store);
        return true;
    }
    async get(key, kind) {
        var _a;
        const store = await this.getStore(kind);
        return (_a = store === null || store === void 0 ? void 0 : store.values[key]) !== null && _a !== void 0 ? _a : {};
    }
    async getAll(kind) {
        var _a;
        const store = await this.getStore(kind);
        return (_a = store === null || store === void 0 ? void 0 : store.values) !== null && _a !== void 0 ? _a : {};
    }
    async getGlobalDataPath() {
        const configDirUri = await this.envServer.getConfigDirUri();
        const globalStorageFsPath = path.join(file_uri_1.FileUri.fsPath(configDirUri), const_1.PluginPaths.PLUGINS_GLOBAL_STORAGE_DIR);
        await fs.ensureDir(globalStorageFsPath);
        return path.join(globalStorageFsPath, 'global-state.json');
    }
    async initializeStore(storePath) {
        return this.fsLocking.lockPath(storePath, async (resolved) => {
            const values = await this.readFromFile(resolved);
            return {
                values,
                fsPath: storePath
            };
        });
    }
    async getStore(kind) {
        var _a;
        var _b;
        const dataPath = await this.getDataPath(kind);
        if (dataPath) {
            return (_a = (_b = this.stores)[dataPath]) !== null && _a !== void 0 ? _a : (_b[dataPath] = await this.initializeStore(dataPath));
        }
    }
    syncStores() {
        this.syncStoresTimeout = setTimeout(async () => {
            await Promise.all(Array.from(this.storesToSync, async ({ fsPath, values }) => {
                await this.fsLocking.lockPath(fsPath, async (storePath) => {
                    await this.writeToFile(storePath, values);
                });
            }));
            this.storesToSync.clear();
            if (this.syncStoresTimeout) {
                this.syncStores();
            }
        }, this.getSyncStoreTimeout());
    }
    getSyncStoreTimeout() {
        // 0-10s + 1min
        return 10000 * Math.random() + 60000;
    }
    async getDataPath(kind) {
        if (!kind) {
            return this.deferredGlobalDataPath.promise;
        }
        const storagePath = await this.pluginPathsService.getHostStoragePath(kind.workspace, kind.roots);
        if (storagePath) {
            return path.join(storagePath, 'workspace-state.json');
        }
    }
    async readFromFile(pathToFile) {
        if (!await fs.pathExists(pathToFile)) {
            return {};
        }
        try {
            return await fs.readJSON(pathToFile);
        }
        catch (error) {
            console.error('Failed to parse data from "', pathToFile, '". Reason:', error);
            return {};
        }
    }
    async writeToFile(pathToFile, data) {
        await fs.ensureDir(path.dirname(pathToFile));
        await fs.writeJSON(pathToFile, data);
    }
    dispose() {
        clearTimeout(this.syncStoresTimeout);
        this.syncStoresTimeout = undefined;
    }
};
exports.PluginsKeyValueStorage = PluginsKeyValueStorage;
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_paths_protocol_1.PluginPathsService),
    tslib_1.__metadata("design:type", Object)
], PluginsKeyValueStorage.prototype, "pluginPathsService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(env_variables_1.EnvVariablesServer),
    tslib_1.__metadata("design:type", Object)
], PluginsKeyValueStorage.prototype, "envServer", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(node_1.FileSystemLocking),
    tslib_1.__metadata("design:type", Object)
], PluginsKeyValueStorage.prototype, "fsLocking", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PluginsKeyValueStorage.prototype, "init", null);
exports.PluginsKeyValueStorage = PluginsKeyValueStorage = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginsKeyValueStorage);
//# sourceMappingURL=plugins-key-value-storage.js.map