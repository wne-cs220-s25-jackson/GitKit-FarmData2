"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
var FileSystemWatcherServerClient_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemWatcherServerClient = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const filesystem_watcher_protocol_1 = require("../common/filesystem-watcher-protocol");
const filesystem_watcher_dispatcher_1 = require("./filesystem-watcher-dispatcher");
/**
 * Wraps the watcher singleton service for each frontend.
 */
let FileSystemWatcherServerClient = FileSystemWatcherServerClient_1 = class FileSystemWatcherServerClient {
    constructor() {
        /**
         * Track allocated watcherIds to de-allocate on disposal.
         */
        this.watcherIds = new Set();
        /**
         * @todo make this number precisely map to one specific frontend.
         */
        this.clientId = FileSystemWatcherServerClient_1.clientIdSequence++;
    }
    async watchFileChanges(uri, options) {
        const watcherId = await this.watcherService.watchFileChanges(this.clientId, uri, options);
        this.watcherIds.add(watcherId);
        return watcherId;
    }
    async unwatchFileChanges(watcherId) {
        this.watcherIds.delete(watcherId);
        return this.watcherService.unwatchFileChanges(watcherId);
    }
    setClient(client) {
        if (client !== undefined) {
            this.watcherDispatcher.registerClient(this.clientId, client);
        }
        else {
            this.watcherDispatcher.unregisterClient(this.clientId);
        }
    }
    dispose() {
        this.setClient(undefined);
        for (const watcherId of this.watcherIds) {
            this.unwatchFileChanges(watcherId);
        }
    }
};
exports.FileSystemWatcherServerClient = FileSystemWatcherServerClient;
FileSystemWatcherServerClient.clientIdSequence = 0;
tslib_1.__decorate([
    (0, inversify_1.inject)(filesystem_watcher_dispatcher_1.FileSystemWatcherServiceDispatcher),
    tslib_1.__metadata("design:type", filesystem_watcher_dispatcher_1.FileSystemWatcherServiceDispatcher)
], FileSystemWatcherServerClient.prototype, "watcherDispatcher", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(filesystem_watcher_protocol_1.FileSystemWatcherService),
    tslib_1.__metadata("design:type", Object)
], FileSystemWatcherServerClient.prototype, "watcherService", void 0);
exports.FileSystemWatcherServerClient = FileSystemWatcherServerClient = FileSystemWatcherServerClient_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FileSystemWatcherServerClient);
//# sourceMappingURL=filesystem-watcher-client.js.map