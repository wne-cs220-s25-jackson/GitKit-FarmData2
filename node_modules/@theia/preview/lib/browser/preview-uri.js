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
exports.PreviewUri = void 0;
var PreviewUri;
(function (PreviewUri) {
    PreviewUri.id = 'code-editor-preview';
    PreviewUri.param = 'open-handler=' + PreviewUri.id;
    function match(uri) {
        return uri.query.indexOf(PreviewUri.param) !== -1;
    }
    PreviewUri.match = match;
    function encode(uri) {
        if (match(uri)) {
            return uri;
        }
        const params = [PreviewUri.param];
        if (uri.query) {
            params.push(...uri.query.split('&'));
        }
        const query = params.join('&');
        return uri.withQuery(query);
    }
    PreviewUri.encode = encode;
    function decode(uri) {
        if (!match(uri)) {
            return uri;
        }
        const query = uri.query.split('&').filter(p => p !== PreviewUri.param).join('&');
        return uri.withQuery(query);
    }
    PreviewUri.decode = decode;
})(PreviewUri || (exports.PreviewUri = PreviewUri = {}));
//# sourceMappingURL=preview-uri.js.map