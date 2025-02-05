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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * **IMPORTANT** this code is running in the plugin host process and should be closed as possible to VS Code counterpart:
 * https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/workbench/api/common/extHostFileSystem.ts
 * One should be able to diff them to see differences.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemExtImpl = exports.FsLinkProvider = void 0;
const types_impl_1 = require("./types-impl");
const plugin_api_rpc_1 = require("../common/plugin-api-rpc");
const files = require("@theia/filesystem/lib/common/files");
const typeConverter = require("./type-converters");
const uri_components_1 = require("../common/uri-components");
const link_computer_1 = require("../common/link-computer");
const strings_1 = require("@theia/core/lib/common/strings");
const buffer_1 = require("@theia/core/lib/common/buffer");
const plugin_api_rpc_model_1 = require("../common/plugin-api-rpc-model");
const common_1 = require("@theia/core/lib/common");
const plugin_context_1 = require("./plugin-context");
class FsLinkProvider {
    constructor() {
        this._schemes = [];
    }
    add(scheme) {
        this._stateMachine = undefined;
        this._schemes.push(scheme);
    }
    delete(scheme) {
        const idx = this._schemes.indexOf(scheme);
        if (idx >= 0) {
            this._schemes.splice(idx, 1);
            this._stateMachine = undefined;
        }
    }
    _initStateMachine() {
        if (!this._stateMachine) {
            // sort and compute common prefix with previous scheme
            // then build state transitions based on the data
            const schemes = this._schemes.sort();
            const edges = [];
            let prevScheme;
            let prevState;
            let lastState = 14 /* State.LastKnownState */;
            let nextState = 14 /* State.LastKnownState */;
            for (const scheme of schemes) {
                // skip the common prefix of the prev scheme
                // and continue with its last state
                let pos = !prevScheme ? 0 : (0, strings_1.commonPrefixLength)(prevScheme, scheme);
                if (pos === 0) {
                    prevState = 1 /* State.Start */;
                }
                else {
                    prevState = nextState;
                }
                for (; pos < scheme.length; pos++) {
                    // keep creating new (next) states until the
                    // end (and the BeforeColon-state) is reached
                    if (pos + 1 === scheme.length) {
                        // Save the last state here, because we need to continue for the next scheme
                        lastState = nextState;
                        nextState = 9 /* State.BeforeColon */;
                    }
                    else {
                        nextState += 1;
                    }
                    edges.push([prevState, scheme.toUpperCase().charCodeAt(pos), nextState]);
                    edges.push([prevState, scheme.toLowerCase().charCodeAt(pos), nextState]);
                    prevState = nextState;
                }
                prevScheme = scheme;
                // Restore the last state
                nextState = lastState;
            }
            // all link must match this pattern `<scheme>:/<more>`
            edges.push([9 /* State.BeforeColon */, 58 /* CharCode.Colon */, 10 /* State.AfterColon */]);
            edges.push([10 /* State.AfterColon */, 47 /* CharCode.Slash */, 12 /* State.End */]);
            this._stateMachine = new link_computer_1.StateMachine(edges);
        }
    }
    provideDocumentLinks(document) {
        this._initStateMachine();
        const result = [];
        const links = link_computer_1.LinkComputer.computeLinks({
            getLineContent(lineNumber) {
                return document.lineAt(lineNumber - 1).text;
            },
            getLineCount() {
                return document.lineCount;
            }
        }, this._stateMachine);
        for (const link of links) {
            const docLink = typeConverter.DocumentLink.to(link);
            if (docLink.target) {
                result.push(docLink);
            }
        }
        return result;
    }
}
exports.FsLinkProvider = FsLinkProvider;
class ConsumerFileSystem {
    constructor(_proxy, _capabilities) {
        this._proxy = _proxy;
        this._capabilities = _capabilities;
        this.apiObject = (0, plugin_context_1.createAPIObject)(this);
    }
    stat(uri) {
        return this._proxy.$stat(uri).catch(ConsumerFileSystem._handleError);
    }
    readDirectory(uri) {
        return this._proxy.$readdir(uri).catch(ConsumerFileSystem._handleError);
    }
    createDirectory(uri) {
        return this._proxy.$mkdir(uri).catch(ConsumerFileSystem._handleError);
    }
    readFile(uri) {
        return this._proxy.$readFile(uri).then(buff => buff.buffer).catch(ConsumerFileSystem._handleError);
    }
    writeFile(uri, content) {
        return this._proxy.$writeFile(uri, buffer_1.BinaryBuffer.wrap(content)).catch(ConsumerFileSystem._handleError);
    }
    delete(uri, options) {
        return this._proxy.$delete(uri, { ...{ recursive: false, useTrash: false }, ...options }).catch(ConsumerFileSystem._handleError);
    }
    rename(oldUri, newUri, options) {
        return this._proxy.$rename(oldUri, newUri, { ...{ overwrite: false }, ...options }).catch(ConsumerFileSystem._handleError);
    }
    copy(source, destination, options) {
        return this._proxy.$copy(source, destination, { ...{ overwrite: false }, ...options }).catch(ConsumerFileSystem._handleError);
    }
    isWritableFileSystem(scheme) {
        const capabilities = this._capabilities.get(scheme);
        if (typeof capabilities === 'number') {
            return (capabilities & 2048 /* files.FileSystemProviderCapabilities.Readonly */) === 0;
        }
        return undefined;
    }
    static _handleError(err) {
        // generic error
        if (!(err instanceof Error)) {
            throw new types_impl_1.FileSystemError(String(err));
        }
        // no provider (unknown scheme) error
        if (err.name === 'ENOPRO') {
            throw types_impl_1.FileSystemError.Unavailable(err.message);
        }
        // file system error
        switch (err.name) {
            case files.FileSystemProviderErrorCode.FileExists: throw types_impl_1.FileSystemError.FileExists(err.message);
            case files.FileSystemProviderErrorCode.FileNotFound: throw types_impl_1.FileSystemError.FileNotFound(err.message);
            case files.FileSystemProviderErrorCode.FileNotADirectory: throw types_impl_1.FileSystemError.FileNotADirectory(err.message);
            case files.FileSystemProviderErrorCode.FileIsADirectory: throw types_impl_1.FileSystemError.FileIsADirectory(err.message);
            case files.FileSystemProviderErrorCode.NoPermissions: throw types_impl_1.FileSystemError.NoPermissions(err.message);
            case files.FileSystemProviderErrorCode.Unavailable: throw types_impl_1.FileSystemError.Unavailable(err.message);
            default: throw new types_impl_1.FileSystemError(err.message, err.name);
        }
    }
}
class FileSystemExtImpl {
    constructor(rpc) {
        this._linkProvider = new FsLinkProvider();
        this._fsProvider = new Map();
        this._capabilities = new Map();
        this._usedSchemes = new Set();
        this._watches = new Map();
        this.onWillRegisterFileSystemProviderEmitter = new common_1.Emitter();
        this.onWillRegisterFileSystemProvider = this.onWillRegisterFileSystemProviderEmitter.event;
        this._handlePool = 0;
        this._proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.FILE_SYSTEM_MAIN);
        this.fileSystem = new ConsumerFileSystem(this._proxy, this._capabilities);
        // register used schemes
        Object.keys(uri_components_1.Schemes).forEach(scheme => this._usedSchemes.add(scheme));
    }
    dispose() {
        this.onWillRegisterFileSystemProviderEmitter.dispose();
    }
    registerFileSystemProvider(scheme, provider, options = {}) {
        if (this._usedSchemes.has(scheme)) {
            throw new Error(`a provider for the scheme '${scheme}' is already registered`);
        }
        this.onWillRegisterFileSystemProviderEmitter.fire(this._linkProvider);
        const handle = this._handlePool++;
        this._linkProvider.add(scheme);
        this._usedSchemes.add(scheme);
        this._fsProvider.set(handle, provider);
        let capabilities = 2 /* files.FileSystemProviderCapabilities.FileReadWrite */;
        if (options.isCaseSensitive) {
            capabilities += 1024 /* files.FileSystemProviderCapabilities.PathCaseSensitive */;
        }
        if (options.isReadonly) {
            capabilities += 2048 /* files.FileSystemProviderCapabilities.Readonly */;
        }
        if (typeof provider.copy === 'function') {
            capabilities += 8 /* files.FileSystemProviderCapabilities.FileFolderCopy */;
        }
        if (typeof provider.open === 'function' && typeof provider.close === 'function'
            && typeof provider.read === 'function' && typeof provider.write === 'function') {
            capabilities += 4 /* files.FileSystemProviderCapabilities.FileOpenReadWriteClose */;
        }
        let readonlyMessage;
        if (options.isReadonly && plugin_api_rpc_model_1.MarkdownString.is(options.isReadonly)) {
            readonlyMessage = {
                value: options.isReadonly.value,
                isTrusted: options.isReadonly.isTrusted,
                supportThemeIcons: options.isReadonly.supportThemeIcons,
                supportHtml: options.isReadonly.supportHtml,
                baseUri: options.isReadonly.baseUri,
                uris: options.isReadonly.uris
            };
        }
        this._proxy.$registerFileSystemProvider(handle, scheme, capabilities, readonlyMessage);
        const subscription = provider.onDidChangeFile(event => {
            const mapped = [];
            for (const e of event) {
                const { uri: resource, type } = e;
                if (resource.scheme !== scheme) {
                    // dropping events for wrong scheme
                    continue;
                }
                let newType;
                switch (type) {
                    case types_impl_1.FileChangeType.Changed:
                        newType = 0 /* files.FileChangeType.UPDATED */;
                        break;
                    case types_impl_1.FileChangeType.Created:
                        newType = 1 /* files.FileChangeType.ADDED */;
                        break;
                    case types_impl_1.FileChangeType.Deleted:
                        newType = 2 /* files.FileChangeType.DELETED */;
                        break;
                    default:
                        throw new Error('Unknown FileChangeType');
                }
                mapped.push({ resource, type: newType });
            }
            this._proxy.$onFileSystemChange(handle, mapped);
        });
        return {
            dispose: () => {
                subscription.dispose();
                this._linkProvider.delete(scheme);
                this._usedSchemes.delete(scheme);
                this._fsProvider.delete(handle);
                this._proxy.$unregisterProvider(handle);
            }
        };
    }
    static _asIStat(stat) {
        const { type, ctime, mtime, size, permissions } = stat;
        return { type, ctime, mtime, size, permissions };
    }
    $acceptProviderInfos(scheme, capabilities) {
        if (typeof capabilities === 'number') {
            this._capabilities.set(scheme, capabilities);
        }
        else {
            this._capabilities.delete(scheme);
        }
    }
    $stat(handle, resource) {
        return Promise.resolve(this._getFsProvider(handle).stat(types_impl_1.URI.revive(resource))).then(FileSystemExtImpl._asIStat);
    }
    $readdir(handle, resource) {
        return Promise.resolve(this._getFsProvider(handle).readDirectory(types_impl_1.URI.revive(resource)));
    }
    $readFile(handle, resource) {
        return Promise.resolve(this._getFsProvider(handle).readFile(types_impl_1.URI.revive(resource))).then(data => buffer_1.BinaryBuffer.wrap(data));
    }
    $writeFile(handle, resource, content, opts) {
        return Promise.resolve(this._getFsProvider(handle).writeFile(types_impl_1.URI.revive(resource), content.buffer, opts));
    }
    $delete(handle, resource, opts) {
        return Promise.resolve(this._getFsProvider(handle).delete(types_impl_1.URI.revive(resource), opts));
    }
    $rename(handle, oldUri, newUri, opts) {
        return Promise.resolve(this._getFsProvider(handle).rename(types_impl_1.URI.revive(oldUri), types_impl_1.URI.revive(newUri), opts));
    }
    $copy(handle, oldUri, newUri, opts) {
        const provider = this._getFsProvider(handle);
        if (!provider.copy) {
            throw new Error('FileSystemProvider does not implement "copy"');
        }
        return Promise.resolve(provider.copy(types_impl_1.URI.revive(oldUri), types_impl_1.URI.revive(newUri), opts));
    }
    $mkdir(handle, resource) {
        return Promise.resolve(this._getFsProvider(handle).createDirectory(types_impl_1.URI.revive(resource)));
    }
    $watch(handle, session, resource, opts) {
        const subscription = this._getFsProvider(handle).watch(types_impl_1.URI.revive(resource), opts);
        this._watches.set(session, subscription);
    }
    $unwatch(_handle, session) {
        const subscription = this._watches.get(session);
        if (subscription) {
            subscription.dispose();
            this._watches.delete(session);
        }
    }
    $open(handle, resource, opts) {
        const provider = this._getFsProvider(handle);
        if (!provider.open) {
            throw new Error('FileSystemProvider does not implement "open"');
        }
        return Promise.resolve(provider.open(types_impl_1.URI.revive(resource), opts));
    }
    $close(handle, fd) {
        const provider = this._getFsProvider(handle);
        if (!provider.close) {
            throw new Error('FileSystemProvider does not implement "close"');
        }
        return Promise.resolve(provider.close(fd));
    }
    $read(handle, fd, pos, length) {
        const provider = this._getFsProvider(handle);
        if (!provider.read) {
            throw new Error('FileSystemProvider does not implement "read"');
        }
        const data = buffer_1.BinaryBuffer.alloc(length);
        return Promise.resolve(provider.read(fd, pos, data.buffer, 0, length)).then(read => {
            return data.slice(0, read); // don't send zeros
        });
    }
    $write(handle, fd, pos, data) {
        const provider = this._getFsProvider(handle);
        if (!provider.write) {
            throw new Error('FileSystemProvider does not implement "write"');
        }
        return Promise.resolve(provider.write(fd, pos, data.buffer, 0, data.byteLength));
    }
    _getFsProvider(handle) {
        const provider = this._fsProvider.get(handle);
        if (!provider) {
            const err = new Error();
            err.name = 'ENOPRO';
            err.message = `no provider`;
            throw err;
        }
        return provider;
    }
}
exports.FileSystemExtImpl = FileSystemExtImpl;
//# sourceMappingURL=file-system-ext-impl.js.map