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
exports.VSXBuiltinNamespaces = exports.VSXResponseError = exports.ExtensionLike = void 0;
var ExtensionLike;
(function (ExtensionLike) {
    function id(extension) {
        return `${extension.namespace}.${extension.name}`;
    }
    ExtensionLike.id = id;
    function idWithVersion(extension) {
        if (!extension.version) {
            throw new Error(`no valid "version" value provided for "${id(extension)}"`);
        }
        return `${id(extension)}@${extension.version}`;
    }
    ExtensionLike.idWithVersion = idWithVersion;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    function fromId(id) {
        const [left, version] = id.split('@', 2);
        const [namespace, name] = left.split('.', 2);
        return {
            name,
            namespace,
            version
        };
    }
    ExtensionLike.fromId = fromId;
})(ExtensionLike || (exports.ExtensionLike = ExtensionLike = {}));
var VSXResponseError;
(function (VSXResponseError) {
    function is(error) {
        return !!error && typeof error === 'object' && typeof error.statusCode === 'number';
    }
    VSXResponseError.is = is;
})(VSXResponseError || (exports.VSXResponseError = VSXResponseError = {}));
/**
 * Builtin namespaces maintained by the framework.
 */
var VSXBuiltinNamespaces;
(function (VSXBuiltinNamespaces) {
    /**
     * Namespace for individual vscode builtin extensions.
     */
    VSXBuiltinNamespaces.VSCODE = 'vscode';
    /**
     * Namespace for vscode builtin extension packs.
     * - corresponds to: https://github.com/eclipse-theia/vscode-builtin-extensions/blob/af9cfeb2ea23e1668a8340c1c2fb5afd56be07d7/src/create-extension-pack.js#L45
     */
    VSXBuiltinNamespaces.THEIA = 'eclipse-theia';
    /**
     * Determines if the extension namespace is a builtin maintained by the framework.
     * @param namespace the extension namespace to verify.
     */
    function is(namespace) {
        return namespace === VSXBuiltinNamespaces.VSCODE
            || namespace === VSXBuiltinNamespaces.THEIA;
    }
    VSXBuiltinNamespaces.is = is;
})(VSXBuiltinNamespaces || (exports.VSXBuiltinNamespaces = VSXBuiltinNamespaces = {}));
//# sourceMappingURL=ovsx-types.js.map