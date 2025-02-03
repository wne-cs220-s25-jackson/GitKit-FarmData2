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
exports.TypeHierarchyAdapter = void 0;
const id_generator_1 = require("../../common/id-generator");
const type_converters_1 = require("../type-converters");
const types = require("../types-impl");
class TypeHierarchyAdapter {
    constructor(provider, documents) {
        this.provider = provider;
        this.documents = documents;
        this.idGenerator = new id_generator_1.IdGenerator('');
        this.cache = new Map();
    }
    fromTypeHierarchyItem(item, sessionId) {
        const sessionCache = this.cache.get(sessionId);
        const itemId = sessionCache.size.toString(36);
        const definition = {
            _itemId: itemId,
            _sessionId: sessionId,
            kind: type_converters_1.SymbolKind.fromSymbolKind(item.kind),
            tags: item.tags,
            name: item.name,
            detail: item.detail,
            uri: item.uri,
            range: (0, type_converters_1.fromRange)(item.range),
            selectionRange: (0, type_converters_1.fromRange)(item.selectionRange),
        };
        sessionCache.set(itemId, item);
        return definition;
    }
    async prepareSession(uri, position, token) {
        const documentData = this.documents.getDocumentData(uri);
        if (!documentData) {
            return Promise.reject(new Error(`There is no document for ${uri}`));
        }
        const definition = await this.provider.prepareTypeHierarchy(documentData.document, new types.Position(position.lineNumber, position.column), token);
        if (!definition) {
            return undefined;
        }
        const sessionId = this.idGenerator.nextId();
        this.cache.set(sessionId, new Map());
        return Array.isArray(definition) ? definition.map(item => this.fromTypeHierarchyItem(item, sessionId)) : [this.fromTypeHierarchyItem(definition, sessionId)];
    }
    async provideSupertypes(sessionId, itemId, token) {
        const item = this.fetchItemFromCatch(sessionId, itemId);
        if (!item) {
            throw new Error('missing type hierarchy item');
        }
        const supertypes = await this.provider.provideTypeHierarchySupertypes(item, token);
        if (!supertypes) {
            return undefined;
        }
        return supertypes.map(supertype => this.fromTypeHierarchyItem(supertype, sessionId));
    }
    async provideSubtypes(sessionId, itemId, token) {
        const item = this.fetchItemFromCatch(sessionId, itemId);
        if (!item) {
            throw new Error('missing type hierarchy item');
        }
        const subTypes = await this.provider.provideTypeHierarchySubtypes(item, token);
        if (!subTypes) {
            return undefined;
        }
        return subTypes.map(subtype => this.fromTypeHierarchyItem(subtype, sessionId));
    }
    fetchItemFromCatch(sessionId, itemId) {
        var _a;
        return (_a = this.cache.get(sessionId)) === null || _a === void 0 ? void 0 : _a.get(itemId);
    }
    releaseSession(session) {
        if (session !== undefined) {
            return Promise.resolve(this.cache.delete(session));
        }
        else {
            this.cache.clear();
            return Promise.resolve(true);
        }
    }
}
exports.TypeHierarchyAdapter = TypeHierarchyAdapter;
//# sourceMappingURL=type-hierarchy.js.map