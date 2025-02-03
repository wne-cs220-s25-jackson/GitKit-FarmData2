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
exports.PluginIdentifiers = void 0;
var PluginIdentifiers;
(function (PluginIdentifiers) {
    /** Unpublished plugins (not from Open VSX or VSCode plugin store) may not have a `publisher` field. */
    PluginIdentifiers.UNPUBLISHED = '<unpublished>';
    /**
     * @returns a string in the format `<publisher>.<name>`
     */
    function componentsToUnversionedId({ publisher = PluginIdentifiers.UNPUBLISHED, name }) {
        return `${publisher.toLowerCase()}.${name.toLowerCase()}`;
    }
    PluginIdentifiers.componentsToUnversionedId = componentsToUnversionedId;
    /**
     * @returns a string in the format `<publisher>.<name>@<version>`.
     */
    function componentsToVersionedId({ publisher = PluginIdentifiers.UNPUBLISHED, name, version }) {
        return `${publisher.toLowerCase()}.${name.toLowerCase()}@${version}`;
    }
    PluginIdentifiers.componentsToVersionedId = componentsToVersionedId;
    function componentsToVersionWithId(components) {
        return { id: componentsToUnversionedId(components), version: components.version };
    }
    PluginIdentifiers.componentsToVersionWithId = componentsToVersionWithId;
    /**
     * @returns a string in the format `<id>@<version>`.
     */
    function idAndVersionToVersionedId({ id, version }) {
        return `${id}@${version}`;
    }
    PluginIdentifiers.idAndVersionToVersionedId = idAndVersionToVersionedId;
    /**
     * @returns a string in the format `<publisher>.<name>`.
     */
    function unversionedFromVersioned(id) {
        const endOfId = id.indexOf('@');
        return id.slice(0, endOfId);
    }
    PluginIdentifiers.unversionedFromVersioned = unversionedFromVersioned;
    /**
     * @returns `undefined` if it looks like the string passed in does not have the format of {@link PluginIdentifiers.VersionedId}.
     */
    function identifiersFromVersionedId(probablyId) {
        const endOfPublisher = probablyId.indexOf('.');
        const endOfName = probablyId.indexOf('@', endOfPublisher);
        if (endOfPublisher === -1 || endOfName === -1) {
            return undefined;
        }
        return { publisher: probablyId.slice(0, endOfPublisher), name: probablyId.slice(endOfPublisher + 1, endOfName), version: probablyId.slice(endOfName + 1) };
    }
    PluginIdentifiers.identifiersFromVersionedId = identifiersFromVersionedId;
    /**
     * @returns `undefined` if it looks like the string passed in does not have the format of {@link PluginIdentifiers.VersionedId}.
     */
    function idAndVersionFromVersionedId(probablyId) {
        const endOfPublisher = probablyId.indexOf('.');
        const endOfName = probablyId.indexOf('@', endOfPublisher);
        if (endOfPublisher === -1 || endOfName === -1) {
            return undefined;
        }
        return { id: probablyId.slice(0, endOfName), version: probablyId.slice(endOfName + 1) };
    }
    PluginIdentifiers.idAndVersionFromVersionedId = idAndVersionFromVersionedId;
})(PluginIdentifiers || (exports.PluginIdentifiers = PluginIdentifiers = {}));
//# sourceMappingURL=plugin-identifiers.js.map