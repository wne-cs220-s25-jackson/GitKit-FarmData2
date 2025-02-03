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
exports.PluginPathsServiceImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const uri_1 = require("@theia/core/lib/common/uri");
const path = require("path");
const fs = require("@theia/core/shared/fs-extra");
const promises_1 = require("fs/promises");
const fs_extra_1 = require("@theia/core/shared/fs-extra");
const crypto = require("crypto");
const core_1 = require("@theia/core");
const node_1 = require("@theia/core/lib/node");
const const_1 = require("./const");
const common_1 = require("@theia/workspace/lib/common");
const env_variables_1 = require("@theia/core/lib/common/env-variables");
const plugin_cli_contribution_1 = require("../plugin-cli-contribution");
const SESSION_TIMESTAMP_PATTERN = /^\d{8}T\d{6}$/;
// Service to provide configuration paths for plugin api.
let PluginPathsServiceImpl = class PluginPathsServiceImpl {
    async getHostLogPath() {
        const parentLogsDir = await this.getLogsDirPath();
        if (!parentLogsDir) {
            throw new Error('Unable to get parent log directory');
        }
        const pluginDirPath = path.join(parentLogsDir, this.generateTimeFolderName(), 'host');
        await fs.mkdirs(pluginDirPath);
        // no `await` as We should never wait for the cleanup
        this.cleanupOldLogs(parentLogsDir);
        return pluginDirPath;
    }
    async getHostStoragePath(workspaceUri, rootUris) {
        const parentStorageDir = await this.getWorkspaceStorageDirPath();
        if (!parentStorageDir) {
            throw new Error('Unable to get parent storage directory');
        }
        if (!workspaceUri) {
            return undefined;
        }
        await fs.mkdirs(parentStorageDir);
        const storageDirName = await this.buildWorkspaceId(workspaceUri, rootUris);
        const storageDirPath = path.join(parentStorageDir, storageDirName);
        await fs.mkdirs(storageDirPath);
        return storageDirPath;
    }
    async buildWorkspaceId(workspaceUri, rootUris) {
        const configDirUri = await this.envServer.getConfigDirUri();
        const untitledWorkspace = await this.untitledWorkspaceService.getUntitledWorkspaceUri(new uri_1.default(configDirUri), async (uri) => !await fs.pathExists(uri.path.fsPath()));
        if (untitledWorkspace.toString() === workspaceUri) {
            // if workspace is temporary
            // then let create a storage path for each set of workspace roots
            const rootsStr = rootUris.sort().join(',');
            return this.createHash(rootsStr);
        }
        else {
            return this.createHash(workspaceUri);
        }
    }
    /**
     * Creates a hash digest of the given string.
     */
    createHash(str) {
        try {
            // md5 is not FIPS-approved but we have to continue use it as there're existing storage folders based on it
            return crypto.createHash('md5').update(str).digest('hex');
        }
        catch (e) {
            if (e.message.indexOf('disabled for FIPS') > -1) {
                // SHA256 is FIPS-compliant
                return crypto.createHash('sha256').update(str).digest('hex');
            }
            else {
                throw e;
            }
        }
        // see more details in the issues 8378
    }
    /**
     * Generate time folder name in format: YYYYMMDDTHHMMSS, for example: 20181205T093828
     */
    generateTimeFolderName() {
        const timeStamp = new Date().toISOString().replace(/[-:]|(\..*)/g, '');
        // Helps ensure our timestamp generation logic is "valid".
        // Changes to the timestamp structure may break old logs deletion logic.
        if (!SESSION_TIMESTAMP_PATTERN.test(timeStamp)) {
            this.logger.error(`Generated log folder name: "${timeStamp}" does not match expected pattern: ${SESSION_TIMESTAMP_PATTERN}`);
        }
        return timeStamp;
    }
    async getLogsDirPath() {
        const configDirUri = await this.envServer.getConfigDirUri();
        return path.join(node_1.FileUri.fsPath(configDirUri), const_1.PluginPaths.PLUGINS_LOGS_DIR);
    }
    async getWorkspaceStorageDirPath() {
        const configDirUri = await this.envServer.getConfigDirUri();
        return path.join(node_1.FileUri.fsPath(configDirUri), const_1.PluginPaths.PLUGINS_WORKSPACE_STORAGE_DIR);
    }
    async cleanupOldLogs(parentLogsDir) {
        const dirEntries = await (0, promises_1.readdir)(parentLogsDir, { withFileTypes: true });
        const subDirEntries = dirEntries.filter(dirent => dirent.isDirectory());
        const subDirNames = subDirEntries.map(dirent => dirent.name);
        // We never clean a folder that is not a Theia logs session folder.
        // Even if it does appears under the `parentLogsDir`...
        const sessionSubDirNames = subDirNames.filter((dirName) => SESSION_TIMESTAMP_PATTERN.test(dirName));
        // [].sort is ascending order and we need descending order (newest first).
        const sortedSessionSubDirNames = sessionSubDirNames.sort().reverse();
        const maxSessionLogsFolders = this.cliContribution.maxSessionLogsFolders();
        // [5,4,3,2,1].slice(2) --> [2,1] --> only keep N latest session folders.
        const oldSessionSubDirNames = sortedSessionSubDirNames.slice(maxSessionLogsFolders);
        oldSessionSubDirNames.forEach((sessionDir) => {
            const sessionDirPath = path.resolve(parentLogsDir, sessionDir);
            // we are not waiting for the async `remove` to finish before returning
            // in order to minimize impact on Theia startup time.
            (0, fs_extra_1.remove)(sessionDirPath);
        });
    }
};
exports.PluginPathsServiceImpl = PluginPathsServiceImpl;
tslib_1.__decorate([
    (0, inversify_1.inject)(core_1.ILogger),
    tslib_1.__metadata("design:type", Object)
], PluginPathsServiceImpl.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(env_variables_1.EnvVariablesServer),
    tslib_1.__metadata("design:type", Object)
], PluginPathsServiceImpl.prototype, "envServer", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_cli_contribution_1.PluginCliContribution),
    tslib_1.__metadata("design:type", plugin_cli_contribution_1.PluginCliContribution)
], PluginPathsServiceImpl.prototype, "cliContribution", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.UntitledWorkspaceService),
    tslib_1.__metadata("design:type", common_1.UntitledWorkspaceService)
], PluginPathsServiceImpl.prototype, "untitledWorkspaceService", void 0);
exports.PluginPathsServiceImpl = PluginPathsServiceImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginPathsServiceImpl);
//# sourceMappingURL=plugin-paths-service.js.map