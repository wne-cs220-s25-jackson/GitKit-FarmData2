"use strict";
// *****************************************************************************
// Copyright (C) 2017-2018 Ericsson and others.
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
exports.SearchInWorkspaceService = exports.SearchInWorkspaceClientImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const search_in_workspace_interface_1 = require("../common/search-in-workspace-interface");
const browser_1 = require("@theia/workspace/lib/browser");
const core_1 = require("@theia/core");
/**
 * Class that will receive the search results from the server.  This is separate
 * from the SearchInWorkspaceService class only to avoid a cycle in the
 * dependency injection.
 */
let SearchInWorkspaceClientImpl = class SearchInWorkspaceClientImpl {
    onResult(searchId, result) {
        this.service.onResult(searchId, result);
    }
    onDone(searchId, error) {
        this.service.onDone(searchId, error);
    }
    setService(service) {
        this.service = service;
    }
};
exports.SearchInWorkspaceClientImpl = SearchInWorkspaceClientImpl;
exports.SearchInWorkspaceClientImpl = SearchInWorkspaceClientImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], SearchInWorkspaceClientImpl);
/**
 * Service to search text in the workspace files.
 */
let SearchInWorkspaceService = class SearchInWorkspaceService {
    constructor() {
        // All the searches that we have started, that are not done yet (onDone
        // with that searchId has not been called).
        this.pendingSearches = new Map();
        // Due to the asynchronicity of the node backend, it's possible that we
        // start a search, receive an event for that search, and then receive
        // the search id for that search.We therefore need to keep those
        // events until we get the search id and return it to the caller.
        // Otherwise the caller would discard the event because it doesn't know
        // the search id yet.
        this.pendingOnDones = new Map();
        this.lastKnownSearchId = -1;
    }
    init() {
        this.client.setService(this);
    }
    isEnabled() {
        return this.workspaceService.opened;
    }
    onResult(searchId, result) {
        const callbacks = this.pendingSearches.get(searchId);
        if (callbacks) {
            callbacks.onResult(searchId, result);
        }
    }
    onDone(searchId, error) {
        const callbacks = this.pendingSearches.get(searchId);
        if (callbacks) {
            this.pendingSearches.delete(searchId);
            callbacks.onDone(searchId, error);
        }
        else {
            if (searchId > this.lastKnownSearchId) {
                this.logger.debug(`Got an onDone for a searchId we don't know about (${searchId}), stashing it for later with error = `, error);
                this.pendingOnDones.set(searchId, error);
            }
            else {
                // It's possible to receive an onDone for a search we have cancelled.  Just ignore it.
                this.logger.debug(`Got an onDone for a searchId we don't know about (${searchId}), but it's probably an old one, error = `, error);
            }
        }
    }
    // Start a search of the string "what" in the workspace.
    async search(what, callbacks, opts) {
        if (!this.workspaceService.opened) {
            throw new Error('Search failed: no workspace root.');
        }
        const roots = await this.workspaceService.roots;
        return this.doSearch(what, roots.map(r => r.resource.toString()), callbacks, opts);
    }
    async doSearch(what, rootsUris, callbacks, opts) {
        const searchId = await this.searchServer.search(what, rootsUris, opts);
        this.pendingSearches.set(searchId, callbacks);
        this.lastKnownSearchId = searchId;
        this.logger.debug('Service launched search ' + searchId);
        // Check if we received an onDone before search() returned.
        if (this.pendingOnDones.has(searchId)) {
            this.logger.debug('Ohh, we have a stashed onDone for that searchId');
            const error = this.pendingOnDones.get(searchId);
            this.pendingOnDones.delete(searchId);
            // Call the client's searchId, but first give it a
            // chance to record the returned searchId.
            setTimeout(() => {
                this.onDone(searchId, error);
            }, 0);
        }
        return searchId;
    }
    async searchWithCallback(what, rootsUris, callbacks, opts) {
        return this.doSearch(what, rootsUris, callbacks, opts);
    }
    // Cancel an ongoing search.
    cancel(searchId) {
        this.pendingSearches.delete(searchId);
        this.searchServer.cancel(searchId);
    }
};
exports.SearchInWorkspaceService = SearchInWorkspaceService;
tslib_1.__decorate([
    (0, inversify_1.inject)(search_in_workspace_interface_1.SearchInWorkspaceServer),
    tslib_1.__metadata("design:type", Object)
], SearchInWorkspaceService.prototype, "searchServer", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(SearchInWorkspaceClientImpl),
    tslib_1.__metadata("design:type", SearchInWorkspaceClientImpl)
], SearchInWorkspaceService.prototype, "client", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.WorkspaceService),
    tslib_1.__metadata("design:type", browser_1.WorkspaceService)
], SearchInWorkspaceService.prototype, "workspaceService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(core_1.ILogger),
    tslib_1.__metadata("design:type", Object)
], SearchInWorkspaceService.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], SearchInWorkspaceService.prototype, "init", null);
exports.SearchInWorkspaceService = SearchInWorkspaceService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], SearchInWorkspaceService);
//# sourceMappingURL=search-in-workspace-service.js.map