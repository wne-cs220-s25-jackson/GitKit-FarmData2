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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentWorkspacePathsData = exports.FileWorkspaceHandlerContribution = exports.DefaultWorkspaceServer = exports.WorkspaceCliContribution = exports.WorkspaceHandlerContribution = void 0;
const tslib_1 = require("tslib");
const path = require("path");
const fs = require("@theia/core/shared/fs-extra");
const jsoncparser = require("jsonc-parser");
const inversify_1 = require("@theia/core/shared/inversify");
const node_1 = require("@theia/core/lib/node");
const promise_util_1 = require("@theia/core/lib/common/promise-util");
const common_1 = require("../common");
const env_variables_1 = require("@theia/core/lib/common/env-variables");
const uri_1 = require("@theia/core/lib/common/uri");
const core_1 = require("@theia/core");
exports.WorkspaceHandlerContribution = Symbol('workspaceHandlerContribution');
let WorkspaceCliContribution = class WorkspaceCliContribution {
    constructor() {
        this.workspaceRoot = new promise_util_1.Deferred();
    }
    configure(conf) {
        conf.usage('$0 [workspace-directories] [options]');
        conf.option('root-dir', {
            description: 'DEPRECATED: Sets the workspace directory.',
        });
    }
    async setArguments(args) {
        const workspaceArguments = args._.map(probablyAlreadyString => String(probablyAlreadyString));
        if (workspaceArguments.length === 0 && args['root-dir']) {
            workspaceArguments.push(String(args['root-dir']));
        }
        if (workspaceArguments.length === 0) {
            this.workspaceRoot.resolve(undefined);
        }
        else if (workspaceArguments.length === 1) {
            this.workspaceRoot.resolve(this.normalizeWorkspaceArg(workspaceArguments[0]));
        }
        else {
            this.workspaceRoot.resolve(this.buildWorkspaceForMultipleArguments(workspaceArguments));
        }
    }
    normalizeWorkspaceArg(raw) {
        return path.resolve(raw).replace(/\/$/, '');
    }
    async buildWorkspaceForMultipleArguments(workspaceArguments) {
        var _a;
        try {
            const dirs = await Promise.all(workspaceArguments.map(async (maybeDir) => { var _a; return (_a = (await fs.stat(maybeDir).catch(() => undefined))) === null || _a === void 0 ? void 0 : _a.isDirectory(); }));
            const folders = workspaceArguments.filter((_, index) => dirs[index]).map(dir => ({ path: this.normalizeWorkspaceArg(dir) }));
            if (folders.length < 2) {
                return (_a = folders[0]) === null || _a === void 0 ? void 0 : _a.path;
            }
            const untitledWorkspaceUri = await this.untitledWorkspaceService.getUntitledWorkspaceUri(new uri_1.default(await this.envVariablesServer.getConfigDirUri()), async (uri) => !await fs.pathExists(uri.path.fsPath()));
            const untitledWorkspacePath = untitledWorkspaceUri.path.fsPath();
            await fs.ensureDir(path.dirname(untitledWorkspacePath));
            await fs.writeFile(untitledWorkspacePath, JSON.stringify({ folders }, undefined, 4));
            return untitledWorkspacePath;
        }
        catch {
            return undefined;
        }
    }
};
exports.WorkspaceCliContribution = WorkspaceCliContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(env_variables_1.EnvVariablesServer),
    tslib_1.__metadata("design:type", Object)
], WorkspaceCliContribution.prototype, "envVariablesServer", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.UntitledWorkspaceService),
    tslib_1.__metadata("design:type", common_1.UntitledWorkspaceService)
], WorkspaceCliContribution.prototype, "untitledWorkspaceService", void 0);
exports.WorkspaceCliContribution = WorkspaceCliContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], WorkspaceCliContribution);
let DefaultWorkspaceServer = class DefaultWorkspaceServer {
    constructor() {
        this.root = new promise_util_1.Deferred();
        /**
         * Untitled workspaces that are not among the most recent N workspaces will be deleted on start. Increase this number to keep older files,
         * lower it to delete stale untitled workspaces more aggressively.
         */
        this.untitledWorkspaceStaleThreshold = 10;
    }
    init() {
        this.doInit();
    }
    async doInit() {
        const root = await this.getRoot();
        this.root.resolve(root);
    }
    async onStart() {
        await this.removeOldUntitledWorkspaces();
    }
    async getRoot() {
        let root = await this.getWorkspaceURIFromCli();
        if (!root) {
            const data = await this.readRecentWorkspacePathsFromUserHome();
            if (data && data.recentRoots) {
                root = data.recentRoots[0];
            }
        }
        return root;
    }
    getMostRecentlyUsedWorkspace() {
        return this.root.promise;
    }
    async setMostRecentlyUsedWorkspace(rawUri) {
        const uri = rawUri && new uri_1.default(rawUri).toString(); // the empty string is used as a signal from the frontend not to load a workspace.
        this.root = new promise_util_1.Deferred();
        this.root.resolve(uri);
        const recentRoots = Array.from(new Set([uri, ...await this.getRecentWorkspaces()]));
        this.writeToUserHome({ recentRoots });
    }
    async removeRecentWorkspace(rawUri) {
        const uri = rawUri && new uri_1.default(rawUri).toString(); // the empty string is used as a signal from the frontend not to load a workspace.
        const recentRoots = await this.getRecentWorkspaces();
        const index = recentRoots.indexOf(uri);
        if (index !== -1) {
            recentRoots.splice(index, 1);
            this.writeToUserHome({
                recentRoots
            });
        }
    }
    async getRecentWorkspaces() {
        const data = await this.readRecentWorkspacePathsFromUserHome();
        if (data && data.recentRoots) {
            const allRootUris = await Promise.all(data.recentRoots.map(async (element) => element && await this.workspaceStillExist(element) ? element : undefined));
            return allRootUris.filter(core_1.notEmpty);
        }
        return [];
    }
    async workspaceStillExist(workspaceRootUri) {
        const uri = new uri_1.default(workspaceRootUri);
        for (const handler of this.workspaceHandlers.getContributions()) {
            if (handler.canHandle(uri)) {
                return handler.workspaceStillExists(uri);
            }
        }
        return false;
    }
    async getWorkspaceURIFromCli() {
        const arg = await this.cliParams.workspaceRoot.promise;
        return arg !== undefined ? node_1.FileUri.create(arg).toString() : undefined;
    }
    /**
     * Writes the given uri as the most recently used workspace root to the user's home directory.
     * @param uri most recently used uri
     */
    async writeToUserHome(data) {
        const file = await this.getUserStoragePath();
        await this.writeToFile(file, data);
    }
    async writeToFile(fsPath, data) {
        if (!await fs.pathExists(fsPath)) {
            await fs.mkdirs(path.resolve(fsPath, '..'));
        }
        await fs.writeJson(fsPath, data);
    }
    /**
     * Reads the most recently used workspace root from the user's home directory.
     */
    async readRecentWorkspacePathsFromUserHome() {
        const fsPath = await this.getUserStoragePath();
        const data = await this.readJsonFromFile(fsPath);
        return RecentWorkspacePathsData.create(data);
    }
    async readJsonFromFile(fsPath) {
        if (await fs.pathExists(fsPath)) {
            const rawContent = await fs.readFile(fsPath, 'utf-8');
            const strippedContent = jsoncparser.stripComments(rawContent);
            return jsoncparser.parse(strippedContent);
        }
    }
    async getUserStoragePath() {
        const configDirUri = await this.envServer.getConfigDirUri();
        return path.resolve(node_1.FileUri.fsPath(configDirUri), 'recentworkspace.json');
    }
    /**
     * Removes untitled workspaces that are not among the most recently used workspaces.
     * Use the `untitledWorkspaceStaleThreshold` to configure when to delete workspaces.
     */
    async removeOldUntitledWorkspaces() {
        const recents = (await this.getRecentWorkspaces()).map(node_1.FileUri.fsPath);
        const olderUntitledWorkspaces = recents
            .slice(this.untitledWorkspaceStaleThreshold)
            .filter(workspace => this.untitledWorkspaceService.isUntitledWorkspace(node_1.FileUri.create(workspace)));
        await Promise.all(olderUntitledWorkspaces.map(workspace => fs.promises.unlink(node_1.FileUri.fsPath(workspace)).catch(() => { })));
        if (olderUntitledWorkspaces.length > 0) {
            await this.writeToUserHome({ recentRoots: await this.getRecentWorkspaces() });
        }
    }
};
exports.DefaultWorkspaceServer = DefaultWorkspaceServer;
tslib_1.__decorate([
    (0, inversify_1.inject)(WorkspaceCliContribution),
    tslib_1.__metadata("design:type", WorkspaceCliContribution)
], DefaultWorkspaceServer.prototype, "cliParams", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(env_variables_1.EnvVariablesServer),
    tslib_1.__metadata("design:type", Object)
], DefaultWorkspaceServer.prototype, "envServer", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.UntitledWorkspaceService),
    tslib_1.__metadata("design:type", common_1.UntitledWorkspaceService)
], DefaultWorkspaceServer.prototype, "untitledWorkspaceService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(core_1.ContributionProvider),
    (0, inversify_1.named)(exports.WorkspaceHandlerContribution),
    tslib_1.__metadata("design:type", Object)
], DefaultWorkspaceServer.prototype, "workspaceHandlers", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DefaultWorkspaceServer.prototype, "init", null);
exports.DefaultWorkspaceServer = DefaultWorkspaceServer = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DefaultWorkspaceServer);
let FileWorkspaceHandlerContribution = class FileWorkspaceHandlerContribution {
    canHandle(uri) {
        return uri.scheme === 'file';
    }
    async workspaceStillExists(uri) {
        return fs.pathExists(uri.path.fsPath());
    }
};
exports.FileWorkspaceHandlerContribution = FileWorkspaceHandlerContribution;
exports.FileWorkspaceHandlerContribution = FileWorkspaceHandlerContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FileWorkspaceHandlerContribution);
var RecentWorkspacePathsData;
(function (RecentWorkspacePathsData) {
    /**
     * Parses `data` as `RecentWorkspacePathsData` but removes any non-string array entry.
     *
     * Returns undefined if the given `data` does not contain a `recentRoots` array property.
     */
    function create(data) {
        if (typeof data !== 'object' || !data || !Array.isArray(data.recentRoots)) {
            return;
        }
        return {
            recentRoots: data.recentRoots.filter(root => typeof root === 'string')
        };
    }
    RecentWorkspacePathsData.create = create;
})(RecentWorkspacePathsData || (exports.RecentWorkspacePathsData = RecentWorkspacePathsData = {}));
//# sourceMappingURL=default-workspace-server.js.map