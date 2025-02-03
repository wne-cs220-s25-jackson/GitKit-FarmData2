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
exports.BrowserOnlyFileSystemProviderServer = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const remote_file_system_provider_1 = require("../common/remote-file-system-provider");
const core_1 = require("@theia/core");
/**
 * Backend component.
 *
 * JSON-RPC server exposing a wrapped file system provider remotely.
 */
let BrowserOnlyFileSystemProviderServer = class BrowserOnlyFileSystemProviderServer extends remote_file_system_provider_1.FileSystemProviderServer {
    constructor() {
        super(...arguments);
        // needed because users expect implicitly the RemoteFileSystemServer to be a RemoteFileSystemProxyFactory
        this.onDidOpenConnection = core_1.Event.None;
        this.onDidCloseConnection = core_1.Event.None;
    }
};
exports.BrowserOnlyFileSystemProviderServer = BrowserOnlyFileSystemProviderServer;
exports.BrowserOnlyFileSystemProviderServer = BrowserOnlyFileSystemProviderServer = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], BrowserOnlyFileSystemProviderServer);
//# sourceMappingURL=browser-only-filesystem-provider-server.js.map