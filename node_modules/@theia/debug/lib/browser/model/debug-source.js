"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.DebugSource = exports.DebugSourceData = void 0;
const uri_1 = require("@theia/core/lib/common/uri");
const vscode_uri_1 = require("@theia/core/shared/vscode-uri");
const debug_uri_utils_1 = require("../../common/debug-uri-utils");
class DebugSourceData {
}
exports.DebugSourceData = DebugSourceData;
class DebugSource extends DebugSourceData {
    constructor(session, editorManager, labelProvider) {
        super();
        this.session = session;
        this.editorManager = editorManager;
        this.labelProvider = labelProvider;
    }
    get uri() {
        return DebugSource.toUri(this.raw);
    }
    update(data) {
        Object.assign(this, data);
    }
    open(options) {
        return this.editorManager.open(this.uri, options);
    }
    async load() {
        const source = this.raw;
        const sourceReference = source.sourceReference;
        const response = await this.session.sendRequest('source', {
            sourceReference,
            source
        });
        return response.body.content;
    }
    get inMemory() {
        return this.uri.scheme === debug_uri_utils_1.DEBUG_SCHEME;
    }
    get name() {
        if (this.inMemory) {
            return this.raw.name || this.uri.path.base || this.uri.path.fsPath();
        }
        return this.labelProvider.getName(this.uri);
    }
    get longName() {
        if (this.inMemory) {
            return this.name;
        }
        return this.labelProvider.getLongName(this.uri);
    }
    static toUri(raw) {
        if (raw.sourceReference && raw.sourceReference > 0) {
            return new uri_1.default().withScheme(debug_uri_utils_1.DEBUG_SCHEME).withPath(raw.name).withQuery(String(raw.sourceReference));
        }
        if (!raw.path) {
            throw new Error('Unrecognized source type: ' + JSON.stringify(raw));
        }
        if (raw.path.match(debug_uri_utils_1.SCHEME_PATTERN)) {
            return new uri_1.default(raw.path);
        }
        return new uri_1.default(vscode_uri_1.URI.file(raw.path));
    }
}
exports.DebugSource = DebugSource;
DebugSource.SCHEME = debug_uri_utils_1.DEBUG_SCHEME;
DebugSource.SCHEME_PATTERN = debug_uri_utils_1.SCHEME_PATTERN;
//# sourceMappingURL=debug-source.js.map