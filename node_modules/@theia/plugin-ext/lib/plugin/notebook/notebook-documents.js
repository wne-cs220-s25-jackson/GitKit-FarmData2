"use strict";
// *****************************************************************************
// Copyright (C) 2023 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookDocumentsExtImpl = void 0;
const core_1 = require("@theia/core");
const types_impl_1 = require("../types-impl");
class NotebookDocumentsExtImpl {
    constructor(notebooksAndEditors) {
        this.notebooksAndEditors = notebooksAndEditors;
        this.didSaveNotebookDocumentEmitter = new core_1.Emitter();
        this.onDidSaveNotebookDocument = this.didSaveNotebookDocumentEmitter.event;
        this.didChangeNotebookDocumentEmitter = new core_1.Emitter();
        this.onDidChangeNotebookDocument = this.didChangeNotebookDocumentEmitter.event;
    }
    $acceptModelChanged(uri, event, isDirty, newMetadata) {
        const document = this.notebooksAndEditors.getNotebookDocument(types_impl_1.URI.from(uri));
        const e = document.acceptModelChanged(event, isDirty, newMetadata);
        this.didChangeNotebookDocumentEmitter.fire(e);
    }
    $acceptDirtyStateChanged(uri, isDirty) {
        const document = this.notebooksAndEditors.getNotebookDocument(types_impl_1.URI.from(uri));
        document.acceptDirty(isDirty);
    }
    $acceptModelSaved(uri) {
        const document = this.notebooksAndEditors.getNotebookDocument(types_impl_1.URI.from(uri));
        this.didSaveNotebookDocumentEmitter.fire(document.apiNotebook);
    }
}
exports.NotebookDocumentsExtImpl = NotebookDocumentsExtImpl;
//# sourceMappingURL=notebook-documents.js.map