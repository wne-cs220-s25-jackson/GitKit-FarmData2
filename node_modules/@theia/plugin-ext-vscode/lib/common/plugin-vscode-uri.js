"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
exports.VSCodeExtensionUri = void 0;
const uri_1 = require("@theia/core/lib/common/uri");
/**
 * Static methods for identifying a plugin as the target of the VSCode deployment system.
 * In practice, this means that it will be resolved and deployed by the Open-VSX system.
 */
var VSCodeExtensionUri;
(function (VSCodeExtensionUri) {
    VSCodeExtensionUri.SCHEME = 'vscode-extension';
    function fromId(id, version) {
        if (typeof version === 'string') {
            return new uri_1.default().withScheme(VSCodeExtensionUri.SCHEME).withAuthority(id).withPath(`/${version}`);
        }
        else {
            return new uri_1.default().withScheme(VSCodeExtensionUri.SCHEME).withAuthority(id);
        }
    }
    VSCodeExtensionUri.fromId = fromId;
    function fromVersionedId(versionedId) {
        const versionAndId = versionedId.split('@');
        return fromId(versionAndId[0], versionAndId[1]);
    }
    VSCodeExtensionUri.fromVersionedId = fromVersionedId;
    function toId(uri) {
        if (uri.scheme === VSCodeExtensionUri.SCHEME) {
            return { id: uri.authority, version: uri.path.isRoot ? undefined : uri.path.base };
        }
        return undefined;
    }
    VSCodeExtensionUri.toId = toId;
})(VSCodeExtensionUri || (exports.VSCodeExtensionUri = VSCodeExtensionUri = {}));
//# sourceMappingURL=plugin-vscode-uri.js.map