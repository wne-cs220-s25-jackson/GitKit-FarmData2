"use strict";
/********************************************************************************
 * Copyright (C) 2023 Ericsson and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
 ********************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const inversify_1 = require("@theia/core/shared/inversify");
const env_variables_1 = require("@theia/core/lib/common/env-variables");
const plugins_key_value_storage_1 = require("./plugins-key-value-storage");
const plugin_paths_protocol_1 = require("../common/plugin-paths-protocol");
const plugin_paths_service_1 = require("./paths/plugin-paths-service");
const plugin_cli_contribution_1 = require("./plugin-cli-contribution");
const logger_1 = require("@theia/core/lib/common/logger");
const mock_logger_1 = require("@theia/core/lib/common/test/mock-logger");
const mock_env_variables_server_1 = require("@theia/core/lib/browser/test/mock-env-variables-server");
const node_1 = require("@theia/core/lib/node");
const filesystem_locking_1 = require("@theia/core/lib/node/filesystem-locking");
const common_1 = require("@theia/workspace/lib/common");
const untitled_workspace_service_1 = require("@theia/workspace/lib/common/untitled-workspace-service");
const temp = require("temp");
const GlobalStorageKind = undefined;
describe('Plugins Key Value Storage', () => {
    let container;
    beforeEach(async () => {
        container = new inversify_1.Container();
        container.bind(plugins_key_value_storage_1.PluginsKeyValueStorage).toSelf().inSingletonScope();
        container.bind(plugin_cli_contribution_1.PluginCliContribution).toSelf().inSingletonScope();
        container.bind(untitled_workspace_service_1.UntitledWorkspaceService).toSelf().inSingletonScope();
        container.bind(common_1.WorkspaceFileService).toSelf().inSingletonScope();
        container.bind(node_1.FileSystemLocking).to(filesystem_locking_1.FileSystemLockingImpl).inSingletonScope();
        container.bind(env_variables_1.EnvVariablesServer).toConstantValue(new mock_env_variables_server_1.MockEnvVariablesServerImpl(node_1.FileUri.create(temp.track().mkdirSync())));
        container.bind(plugin_paths_protocol_1.PluginPathsService).to(plugin_paths_service_1.PluginPathsServiceImpl).inSingletonScope();
        container.bind(logger_1.ILogger).toConstantValue(mock_logger_1.MockLogger);
        const storage = container.get(plugins_key_value_storage_1.PluginsKeyValueStorage);
        (0, chai_1.expect)(await getNumEntries(storage), 'Expected that storage should initially be empty').to.equal(0);
    });
    afterEach(() => {
        container.get(plugins_key_value_storage_1.PluginsKeyValueStorage)['dispose']();
    });
    it('Should be able to set and overwrite a storage entry', async () => {
        const aKey = 'akey';
        const aValue = { 'this is a test': 'abc' };
        const anotherValue = { 'this is an updated value': 'def' };
        const storage = container.get(plugins_key_value_storage_1.PluginsKeyValueStorage);
        await storage.set(aKey, aValue, GlobalStorageKind);
        (0, chai_1.expect)(await getNumEntries(storage), 'Expected 1 storage entry').to.be.equal(1);
        (0, chai_1.expect)(await storage.get(aKey, GlobalStorageKind), 'Expected storage entry to have initially set value')
            .to.be.deep.equal(aValue);
        await storage.set(aKey, anotherValue, GlobalStorageKind);
        (0, chai_1.expect)(await getNumEntries(storage), 'Expected 1 storage entry').to.be.equal(1);
        (0, chai_1.expect)(await storage.get(aKey, GlobalStorageKind), 'Expected storage entry to have updated value')
            .to.be.deep.equal(anotherValue);
    });
    // This test should fail if the storage does not protect itself against concurrent accesses
    it('Should be able to save several entries to storage and retrieve them as set', async () => {
        const n = 100;
        const key = 'test';
        const valuePropName = 'test-value';
        const storage = container.get(plugins_key_value_storage_1.PluginsKeyValueStorage);
        await populateStorage(storage, key, valuePropName, n);
        await checkStorageContent(storage, key, valuePropName, n);
    });
});
const populateStorage = async (storage, keyPrefix, valuePropName, num) => {
    const tasks = [];
    for (let i = 0; i < num; i++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = {};
        value[valuePropName] = i;
        tasks.push(storage.set(keyPrefix + i, value, GlobalStorageKind));
    }
    await Promise.allSettled(tasks);
};
const getNumEntries = async (storage) => {
    const all = await storage.getAll(GlobalStorageKind);
    return Object.keys(all).length;
};
const checkStorageContent = async (storage, keyPrefix, valuePropName, num) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expectedValue = {};
    const all = await storage.getAll(GlobalStorageKind);
    for (let i = 0; i < num; i++) {
        expectedValue[valuePropName] = i;
        (0, chai_1.expect)(all[keyPrefix + i], 'Expected storage entry ' + i + ' to have kept previously set value')
            .to.be.deep.equal(expectedValue);
    }
};
//# sourceMappingURL=plugins-key-value-storage.spec.js.map