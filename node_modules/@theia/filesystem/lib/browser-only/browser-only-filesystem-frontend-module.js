"use strict";
// *****************************************************************************
// Copyright (C) 2023 EclipseSource and others.
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
const inversify_1 = require("@theia/core/shared/inversify");
const files_1 = require("../common/files");
const opfs_filesystem_provider_1 = require("./opfs-filesystem-provider");
const remote_file_system_provider_1 = require("../common/remote-file-system-provider");
const opfs_filesystem_initialization_1 = require("./opfs-filesystem-initialization");
const browser_only_filesystem_provider_server_1 = require("./browser-only-filesystem-provider-server");
exports.default = new inversify_1.ContainerModule((bind, _unbind, isBound, rebind) => {
    bind(opfs_filesystem_initialization_1.DefaultOPFSInitialization).toSelf();
    bind(opfs_filesystem_provider_1.OPFSFileSystemProvider).toSelf();
    bind(opfs_filesystem_initialization_1.OPFSInitialization).toService(opfs_filesystem_initialization_1.DefaultOPFSInitialization);
    if (isBound(files_1.FileSystemProvider)) {
        rebind(files_1.FileSystemProvider).to(opfs_filesystem_provider_1.OPFSFileSystemProvider).inSingletonScope();
    }
    else {
        bind(files_1.FileSystemProvider).to(opfs_filesystem_provider_1.OPFSFileSystemProvider).inSingletonScope();
    }
    if (isBound(remote_file_system_provider_1.RemoteFileSystemProvider)) {
        rebind(remote_file_system_provider_1.RemoteFileSystemServer).to(browser_only_filesystem_provider_server_1.BrowserOnlyFileSystemProviderServer).inSingletonScope();
    }
    else {
        bind(remote_file_system_provider_1.RemoteFileSystemServer).to(browser_only_filesystem_provider_server_1.BrowserOnlyFileSystemProviderServer).inSingletonScope();
    }
});
//# sourceMappingURL=browser-only-filesystem-frontend-module.js.map