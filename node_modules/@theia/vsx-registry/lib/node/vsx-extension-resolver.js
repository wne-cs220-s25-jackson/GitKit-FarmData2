"use strict";
// *****************************************************************************
// Copyright (C) 2020 TypeFox and others.
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
var VSXExtensionResolver_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VSXExtensionResolver = void 0;
const tslib_1 = require("tslib");
const path = require("path");
const semver = require("semver");
const fs = require("@theia/core/shared/fs-extra");
const inversify_1 = require("@theia/core/shared/inversify");
const uri_1 = require("@theia/core/lib/common/uri");
const plugin_protocol_1 = require("@theia/plugin-ext/lib/common/plugin-protocol");
const node_1 = require("@theia/core/lib/node");
const plugin_vscode_uri_1 = require("@theia/plugin-ext-vscode/lib/common/plugin-vscode-uri");
const ovsx_client_provider_1 = require("../common/ovsx-client-provider");
const ovsx_client_1 = require("@theia/ovsx-client");
const request_1 = require("@theia/core/shared/@theia/request");
const plugin_vscode_environment_1 = require("@theia/plugin-ext-vscode/lib/common/plugin-vscode-environment");
const plugin_uninstallation_manager_1 = require("@theia/plugin-ext/lib/main/node/plugin-uninstallation-manager");
let VSXExtensionResolver = VSXExtensionResolver_1 = class VSXExtensionResolver {
    accept(pluginId) {
        return !!plugin_vscode_uri_1.VSCodeExtensionUri.toId(new uri_1.default(pluginId));
    }
    async resolve(context, options) {
        const id = plugin_vscode_uri_1.VSCodeExtensionUri.toId(new uri_1.default(context.getOriginId()));
        if (!id) {
            return;
        }
        let extension;
        const filter = await this.vsxApiFilter();
        const version = (options === null || options === void 0 ? void 0 : options.version) || id.version;
        if (version) {
            console.log(`[${id.id}]: trying to resolve version ${version}...`);
            extension = await filter.findLatestCompatibleExtension({
                extensionId: id.id,
                extensionVersion: version,
                includeAllVersions: true,
                targetPlatform: VSXExtensionResolver_1.TARGET_PLATFORM
            });
        }
        else {
            console.log(`[${id.id}]: trying to resolve latest version...`);
            extension = await filter.findLatestCompatibleExtension({
                extensionId: id.id,
                includeAllVersions: true,
                targetPlatform: VSXExtensionResolver_1.TARGET_PLATFORM
            });
        }
        if (!extension) {
            return;
        }
        if (extension.error) {
            throw new Error(extension.error);
        }
        const resolvedId = id.id + '-' + extension.version;
        const downloadUrl = extension.files.download;
        console.log(`[${id.id}]: resolved to '${resolvedId}'`);
        if (!(options === null || options === void 0 ? void 0 : options.ignoreOtherVersions)) {
            const existingVersion = this.hasSameOrNewerVersion(id.id, extension);
            if (existingVersion) {
                console.log(`[${id.id}]: is already installed with the same or newer version '${existingVersion}'`);
                return;
            }
        }
        const downloadDir = await this.getTempDir();
        await fs.ensureDir(downloadDir);
        const downloadedExtensionPath = path.resolve(downloadDir, path.basename(downloadUrl));
        console.log(`[${resolvedId}]: trying to download from "${downloadUrl}"...`, 'to path', downloadDir);
        if (!await this.download(downloadUrl, downloadedExtensionPath)) {
            console.log(`[${resolvedId}]: not found`);
            return;
        }
        console.log(`[${resolvedId}]: downloaded to ${downloadedExtensionPath}"`);
        context.addPlugin(resolvedId, downloadedExtensionPath);
    }
    async getTempDir() {
        const tempDir = node_1.FileUri.fsPath(await this.environment.getTempDirUri(VSXExtensionResolver_1.TEMP_DIR_PREFIX));
        if (!await fs.pathExists(tempDir)) {
            await fs.mkdirs(tempDir);
        }
        return tempDir;
    }
    hasSameOrNewerVersion(id, extension) {
        const existingPlugins = this.pluginDeployerHandler.getDeployedPluginsById(id)
            .filter(plugin => !this.uninstallationManager.isUninstalled(plugin_protocol_1.PluginIdentifiers.componentsToVersionedId(plugin.metadata.model)));
        const sufficientVersion = existingPlugins.find(existingPlugin => {
            const existingVersion = semver.clean(existingPlugin.metadata.model.version);
            const desiredVersion = semver.clean(extension.version);
            if (desiredVersion && existingVersion && semver.gte(existingVersion, desiredVersion)) {
                return existingVersion;
            }
        });
        return sufficientVersion === null || sufficientVersion === void 0 ? void 0 : sufficientVersion.metadata.model.version;
    }
    async download(downloadUrl, downloadPath) {
        if (await fs.pathExists(downloadPath)) {
            return true;
        }
        const context = await this.requestService.request({ url: downloadUrl });
        if (context.res.statusCode === 404) {
            return false;
        }
        else if (context.res.statusCode !== 200) {
            throw new Error('Request returned status code: ' + context.res.statusCode);
        }
        else {
            await fs.writeFile(downloadPath, context.buffer);
            return true;
        }
    }
};
exports.VSXExtensionResolver = VSXExtensionResolver;
VSXExtensionResolver.TEMP_DIR_PREFIX = 'vscode-download';
VSXExtensionResolver.TARGET_PLATFORM = `${process.platform}-${process.arch}`;
tslib_1.__decorate([
    (0, inversify_1.inject)(ovsx_client_provider_1.OVSXClientProvider),
    tslib_1.__metadata("design:type", Function)
], VSXExtensionResolver.prototype, "clientProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_protocol_1.PluginDeployerHandler),
    tslib_1.__metadata("design:type", Object)
], VSXExtensionResolver.prototype, "pluginDeployerHandler", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(request_1.RequestService),
    tslib_1.__metadata("design:type", Object)
], VSXExtensionResolver.prototype, "requestService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_vscode_environment_1.PluginVSCodeEnvironment),
    tslib_1.__metadata("design:type", plugin_vscode_environment_1.PluginVSCodeEnvironment)
], VSXExtensionResolver.prototype, "environment", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_uninstallation_manager_1.PluginUninstallationManager),
    tslib_1.__metadata("design:type", plugin_uninstallation_manager_1.PluginUninstallationManager)
], VSXExtensionResolver.prototype, "uninstallationManager", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(ovsx_client_1.OVSXApiFilterProvider),
    tslib_1.__metadata("design:type", Function)
], VSXExtensionResolver.prototype, "vsxApiFilter", void 0);
exports.VSXExtensionResolver = VSXExtensionResolver = VSXExtensionResolver_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], VSXExtensionResolver);
//# sourceMappingURL=vsx-extension-resolver.js.map