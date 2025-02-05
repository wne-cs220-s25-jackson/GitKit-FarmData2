"use strict";
// *****************************************************************************
// Copyright (C) 2024 TypeFox and others.
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
exports.VSCodeFileServiceContribution = exports.VSCodeFileSystemProvider = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const files_1 = require("../common/files");
const core_1 = require("@theia/core");
const json_schema_store_1 = require("@theia/core/lib/browser/json-schema-store");
const buffer_1 = require("@theia/core/lib/common/buffer");
let VSCodeFileSystemProvider = class VSCodeFileSystemProvider {
    constructor() {
        this.capabilities = 2048 /* FileSystemProviderCapabilities.Readonly */ + 2 /* FileSystemProviderCapabilities.FileReadWrite */;
        this.onDidChangeCapabilities = core_1.Event.None;
        this.onDidChangeFileEmitter = new core_1.Emitter();
        this.onDidChangeFile = this.onDidChangeFileEmitter.event;
        this.onFileWatchError = core_1.Event.None;
    }
    watch(resource, opts) {
        return core_1.Disposable.NULL;
    }
    async stat(resource) {
        if (this.store.hasSchema(resource)) {
            const currentTime = Date.now();
            return {
                type: files_1.FileType.File,
                permissions: files_1.FilePermission.Readonly,
                mtime: currentTime,
                ctime: currentTime,
                size: 0
            };
        }
        throw new Error('Not Found!');
    }
    mkdir(resource) {
        return Promise.resolve();
    }
    readdir(resource) {
        return Promise.resolve([]);
    }
    delete(resource, opts) {
        return Promise.resolve();
    }
    rename(from, to, opts) {
        return Promise.resolve();
    }
    async readFile(resource) {
        if (resource.scheme !== 'vscode') {
            throw new Error('Not Supported!');
        }
        let content;
        if (resource.authority === 'schemas') {
            content = this.store.getSchema(resource);
        }
        if (typeof content === 'string') {
            return buffer_1.BinaryBuffer.fromString(content).buffer;
        }
        throw new Error('Not Found!');
    }
    writeFile(resource, content, opts) {
        throw new Error('Not Supported!');
    }
};
exports.VSCodeFileSystemProvider = VSCodeFileSystemProvider;
tslib_1.__decorate([
    (0, inversify_1.inject)(json_schema_store_1.JsonSchemaDataStore),
    tslib_1.__metadata("design:type", json_schema_store_1.JsonSchemaDataStore)
], VSCodeFileSystemProvider.prototype, "store", void 0);
exports.VSCodeFileSystemProvider = VSCodeFileSystemProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], VSCodeFileSystemProvider);
let VSCodeFileServiceContribution = class VSCodeFileServiceContribution {
    registerFileSystemProviders(service) {
        service.registerProvider('vscode', this.provider);
    }
};
exports.VSCodeFileServiceContribution = VSCodeFileServiceContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(VSCodeFileSystemProvider),
    tslib_1.__metadata("design:type", VSCodeFileSystemProvider)
], VSCodeFileServiceContribution.prototype, "provider", void 0);
exports.VSCodeFileServiceContribution = VSCodeFileServiceContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], VSCodeFileServiceContribution);
//# sourceMappingURL=vscode-file-service-contribution.js.map