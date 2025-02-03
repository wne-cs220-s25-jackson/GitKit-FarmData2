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
var GithubPluginDeployerResolver_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubPluginDeployerResolver = void 0;
const tslib_1 = require("tslib");
const request_1 = require("@theia/core/shared/@theia/request");
const inversify_1 = require("@theia/core/shared/inversify");
const promise_util_1 = require("@theia/core/lib/common/promise-util");
const fs_1 = require("fs");
const path = require("path");
const temp_dir_util_1 = require("./temp-dir-util");
/**
 * Resolver that handle the github: protocol
 * github:<org>/<repo>/<filename>@latest
 * github:<org>/<repo>/<filename>@<version>
 */
let GithubPluginDeployerResolver = GithubPluginDeployerResolver_1 = class GithubPluginDeployerResolver {
    constructor() {
        this.unpackedFolder = new promise_util_1.Deferred();
        (0, temp_dir_util_1.getTempDirPathAsync)('github-remote').then(async (unpackedFolder) => {
            try {
                await fs_1.promises.mkdir(unpackedFolder, { recursive: true });
                this.unpackedFolder.resolve(unpackedFolder);
            }
            catch (err) {
                this.unpackedFolder.reject(err);
            }
        });
    }
    /**
     * Grab the remote file specified by Github URL
     */
    async resolve(pluginResolverContext) {
        // download the file
        // extract data
        const extracted = /^github:(.*)\/(.*)\/(.*)$/gm.exec(pluginResolverContext.getOriginId());
        if (!extracted || extracted === null || extracted.length !== 4) {
            throw new Error('Invalid extension' + pluginResolverContext.getOriginId());
        }
        const orgName = extracted[1];
        const repoName = extracted[2];
        const file = extracted[3];
        // get version if any
        const splitFile = file.split('@');
        let version;
        let filename;
        if (splitFile.length === 1) {
            filename = file;
            version = 'latest';
        }
        else {
            filename = splitFile[0];
            version = splitFile[1];
        }
        // latest version, need to get the redirect
        const url = GithubPluginDeployerResolver_1.GITHUB_ENDPOINT + orgName + '/' + repoName + '/releases/latest';
        // if latest, resolve first the real version
        if (version === 'latest') {
            // disable redirect to grab the release
            const followRedirects = 0;
            const response = await this.request.request({ url, followRedirects });
            // should have a redirect
            if (response.res.statusCode === 302) {
                const redirectLocation = response.res.headers.location;
                if (!redirectLocation) {
                    throw new Error('Invalid github link with latest not being found');
                }
                // parse redirect link
                const taggedValueArray = /^https:\/\/.*tag\/(.*)/gm.exec(redirectLocation);
                if (!taggedValueArray || taggedValueArray.length !== 2) {
                    throw new Error('The redirect link for latest is invalid ' + redirectLocation);
                }
                // grab version of tag
                return this.grabGithubFile(pluginResolverContext, orgName, repoName, filename, taggedValueArray[1]);
            }
        }
        else {
            return this.grabGithubFile(pluginResolverContext, orgName, repoName, filename, version);
        }
    }
    /*
     * Grab the github file specified by the plugin's ID
     */
    async grabGithubFile(pluginResolverContext, orgName, repoName, filename, version) {
        const unpackedFolder = await this.unpackedFolder.promise;
        const unpackedPath = path.resolve(unpackedFolder, path.basename(version + filename));
        try {
            await fs_1.promises.access(unpackedPath);
            // use of cache. If file is already there use it directly
            return;
        }
        catch { }
        const url = GithubPluginDeployerResolver_1.GITHUB_ENDPOINT + orgName + '/' + repoName + '/releases/download/' + version + '/' + filename;
        const response = await this.request.request({ url });
        if (request_1.RequestContext.isSuccess(response)) {
            await fs_1.promises.writeFile(unpackedPath, response.buffer);
            pluginResolverContext.addPlugin(pluginResolverContext.getOriginId(), unpackedPath);
        }
        else {
            throw new Error(`Could not download the plugin from GitHub. URL: ${url}. HTTP status code: ${response.res.statusCode}`);
        }
    }
    /**
     * Handle only the plugins that starts with github:
     */
    accept(pluginId) {
        return pluginId.startsWith(GithubPluginDeployerResolver_1.PREFIX);
    }
};
exports.GithubPluginDeployerResolver = GithubPluginDeployerResolver;
GithubPluginDeployerResolver.PREFIX = 'github:';
GithubPluginDeployerResolver.GITHUB_ENDPOINT = 'https://github.com/';
tslib_1.__decorate([
    (0, inversify_1.inject)(request_1.RequestService),
    tslib_1.__metadata("design:type", Object)
], GithubPluginDeployerResolver.prototype, "request", void 0);
exports.GithubPluginDeployerResolver = GithubPluginDeployerResolver = GithubPluginDeployerResolver_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], GithubPluginDeployerResolver);
//# sourceMappingURL=plugin-github-resolver.js.map