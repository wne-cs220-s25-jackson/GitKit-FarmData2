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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStorageContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const uri_1 = require("@theia/core/lib/common/uri");
const disposable_1 = require("@theia/core/lib/common/disposable");
const env_variables_1 = require("@theia/core/lib/common/env-variables");
const delegating_file_system_provider_1 = require("@theia/filesystem/lib/common/delegating-file-system-provider");
const user_storage_uri_1 = require("./user-storage-uri");
let UserStorageContribution = class UserStorageContribution {
    registerFileSystemProviders(service) {
        service.onWillActivateFileSystemProvider(event => {
            if (event.scheme === user_storage_uri_1.UserStorageUri.scheme) {
                event.waitUntil((async () => {
                    const provider = await this.createProvider(service);
                    service.registerProvider(user_storage_uri_1.UserStorageUri.scheme, provider);
                })());
            }
        });
    }
    getDelegate(service) {
        return service.activateProvider('file');
    }
    async getCongigDirUri() {
        return new uri_1.default(await this.environments.getConfigDirUri());
    }
    async createProvider(service) {
        const delegate = await this.getDelegate(service);
        const configDirUri = await this.getCongigDirUri();
        return new delegating_file_system_provider_1.DelegatingFileSystemProvider(delegate, {
            uriConverter: {
                to: resource => {
                    const relativePath = user_storage_uri_1.UserStorageUri.relative(resource);
                    if (relativePath) {
                        return configDirUri.resolve(relativePath).normalizePath();
                    }
                    return undefined;
                },
                from: resource => {
                    const relativePath = configDirUri.relative(resource);
                    if (relativePath) {
                        return user_storage_uri_1.UserStorageUri.resolve(relativePath);
                    }
                    return undefined;
                }
            }
        }, new disposable_1.DisposableCollection(delegate.watch(configDirUri, { excludes: [], recursive: true })));
    }
};
exports.UserStorageContribution = UserStorageContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(env_variables_1.EnvVariablesServer),
    tslib_1.__metadata("design:type", Object)
], UserStorageContribution.prototype, "environments", void 0);
exports.UserStorageContribution = UserStorageContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], UserStorageContribution);
//# sourceMappingURL=user-storage-contribution.js.map