"use strict";
// *****************************************************************************
// Copyright (C) 2023 Arduino SA and others.
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
const disposable_1 = require("@theia/core/lib/common/disposable");
const encoding_service_1 = require("@theia/core/lib/common/encoding-service");
const logger_1 = require("@theia/core/lib/common/logger");
const mock_logger_1 = require("@theia/core/lib/common/test/mock-logger");
const file_uri_1 = require("@theia/core/lib/common/file-uri");
const ipc_connection_provider_1 = require("@theia/core/lib/node/messaging/ipc-connection-provider");
const inversify_1 = require("@theia/core/shared/inversify");
const assert_1 = require("assert");
const fs_1 = require("fs");
const path_1 = require("path");
const temp = require("temp");
const uuid_1 = require("@theia/core/lib/common/uuid");
const files_1 = require("../common/files");
const disk_file_system_provider_1 = require("./disk-file-system-provider");
const filesystem_backend_module_1 = require("./filesystem-backend-module");
const tracked = temp.track();
describe('disk-file-system-provider', () => {
    let toDisposeAfter;
    let fsProvider;
    before(() => {
        fsProvider = createContainer().get(disk_file_system_provider_1.DiskFileSystemProvider);
        toDisposeAfter = new disposable_1.DisposableCollection(fsProvider, disposable_1.Disposable.create(() => tracked.cleanupSync()));
    });
    after(() => {
        toDisposeAfter.dispose();
    });
    describe('stat', () => {
        it("should omit the 'permissions' property of the stat if the file can be both read and write", async () => {
            const tempDirPath = tracked.mkdirSync();
            const tempFilePath = (0, path_1.join)(tempDirPath, `${(0, uuid_1.generateUuid)()}.txt`);
            await fs_1.promises.writeFile(tempFilePath, 'some content', { encoding: 'utf8' });
            let content = await fs_1.promises.readFile(tempFilePath, { encoding: 'utf8' });
            (0, assert_1.equal)(content, 'some content');
            await fs_1.promises.writeFile(tempFilePath, 'other content', { encoding: 'utf8' });
            content = await fs_1.promises.readFile(tempFilePath, { encoding: 'utf8' });
            (0, assert_1.equal)(content, 'other content');
            const stat = await fsProvider.stat(file_uri_1.FileUri.create(tempFilePath));
            (0, assert_1.equal)(stat.permissions, undefined);
        });
        it("should set the 'permissions' property to `Readonly` if the file can be read but not write", async () => {
            const tempDirPath = tracked.mkdirSync();
            const tempFilePath = (0, path_1.join)(tempDirPath, `${(0, uuid_1.generateUuid)()}.txt`);
            await fs_1.promises.writeFile(tempFilePath, 'readonly content', {
                encoding: 'utf8',
            });
            await fs_1.promises.chmod(tempFilePath, '444'); // read-only for owner/group/world
            try {
                await fsProvider.writeFile(file_uri_1.FileUri.create(tempFilePath), new Uint8Array(), { create: false, overwrite: true });
                (0, assert_1.fail)('Expected an EACCES error for readonly (chmod 444) files');
            }
            catch (err) {
                (0, assert_1.equal)(err instanceof files_1.FileSystemProviderError, true);
                (0, assert_1.equal)(err.code, files_1.FileSystemProviderErrorCode.NoPermissions);
            }
            const content = await fs_1.promises.readFile(tempFilePath, { encoding: 'utf8' });
            (0, assert_1.equal)(content, 'readonly content');
            const stat = await fsProvider.stat(file_uri_1.FileUri.create(tempFilePath));
            (0, assert_1.equal)(stat.permissions, files_1.FilePermission.Readonly);
        });
    });
    describe('delete', () => {
        it('delete is able to delete folder', async () => {
            const tempDirPath = tracked.mkdirSync();
            const testFolder = (0, path_1.join)(tempDirPath, 'test');
            const folderUri = file_uri_1.FileUri.create(testFolder);
            for (const recursive of [true, false]) {
                // Note: useTrash = true fails on Linux
                const useTrash = false;
                if ((fsProvider.capabilities & 16777216 /* FileSystemProviderCapabilities.Access */) === 0 && useTrash) {
                    continue;
                }
                await fsProvider.mkdir(folderUri);
                if (recursive) {
                    await fsProvider.writeFile(file_uri_1.FileUri.create((0, path_1.join)(testFolder, 'test.file')), Buffer.from('test'), { overwrite: false, create: true });
                    await fsProvider.mkdir(file_uri_1.FileUri.create((0, path_1.join)(testFolder, 'subFolder')));
                }
                await fsProvider.delete(folderUri, { recursive, useTrash });
            }
        });
        it('delete is able to delete file', async () => {
            const tempDirPath = tracked.mkdirSync();
            const testFile = (0, path_1.join)(tempDirPath, 'test.file');
            const testFileUri = file_uri_1.FileUri.create(testFile);
            for (const recursive of [true, false]) {
                for (const useTrash of [true, false]) {
                    await fsProvider.writeFile(testFileUri, Buffer.from('test'), { overwrite: false, create: true });
                    await fsProvider.delete(testFileUri, { recursive, useTrash });
                }
            }
        });
    });
    function createContainer() {
        const container = new inversify_1.Container({ defaultScope: 'Singleton' });
        const module = new inversify_1.ContainerModule(bind => {
            bind(disk_file_system_provider_1.DiskFileSystemProvider).toSelf().inSingletonScope();
            bind(encoding_service_1.EncodingService).toSelf().inSingletonScope();
            (0, filesystem_backend_module_1.bindFileSystemWatcherServer)(bind);
            bind(mock_logger_1.MockLogger).toSelf().inSingletonScope();
            bind(logger_1.ILogger).toService(mock_logger_1.MockLogger);
            bind(ipc_connection_provider_1.IPCConnectionProvider).toSelf().inSingletonScope();
        });
        container.load(module);
        return container;
    }
});
//# sourceMappingURL=disk-file-system-provider.spec.js.map