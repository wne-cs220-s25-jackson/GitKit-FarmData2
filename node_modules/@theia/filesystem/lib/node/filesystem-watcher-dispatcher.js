"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
exports.FileSystemWatcherServiceDispatcher = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
/**
 * This component routes watch events to the right clients.
 */
let FileSystemWatcherServiceDispatcher = class FileSystemWatcherServiceDispatcher {
    constructor() {
        /**
         * Mapping of `clientId` to actual clients.
         */
        this.clients = new Map();
    }
    onDidFilesChanged(event) {
        for (const client of this.iterRegisteredClients(event.clients)) {
            client.onDidFilesChanged(event);
        }
    }
    onError(event) {
        for (const client of this.iterRegisteredClients(event.clients)) {
            client.onError();
        }
    }
    /**
     * Listen for events targeted at `clientId`.
     */
    registerClient(clientId, client) {
        if (this.clients.has(clientId)) {
            console.warn(`FileSystemWatcherServer2Dispatcher: a client was already registered! clientId=${clientId}`);
        }
        this.clients.set(clientId, client);
    }
    unregisterClient(clientId) {
        if (!this.clients.has(clientId)) {
            console.warn(`FileSystemWatcherServer2Dispatcher: tried to remove unknown client! clientId=${clientId}`);
        }
        this.clients.delete(clientId);
    }
    /**
     * Only yield registered clients for the given `clientIds`.
     *
     * If clientIds is empty, will return all clients.
     */
    *iterRegisteredClients(clientIds) {
        if (!Array.isArray(clientIds) || clientIds.length === 0) {
            // If we receive an event targeted to "no client",
            // interpret that as notifying all clients:
            yield* this.clients.values();
        }
        else {
            for (const clientId of clientIds) {
                const client = this.clients.get(clientId);
                if (client !== undefined) {
                    yield client;
                }
            }
        }
    }
};
exports.FileSystemWatcherServiceDispatcher = FileSystemWatcherServiceDispatcher;
exports.FileSystemWatcherServiceDispatcher = FileSystemWatcherServiceDispatcher = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FileSystemWatcherServiceDispatcher);
//# sourceMappingURL=filesystem-watcher-dispatcher.js.map