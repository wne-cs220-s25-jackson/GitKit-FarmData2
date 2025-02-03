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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookOutputResourceResolver = exports.NotebookCellResourceResolver = exports.NotebookCellResource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@theia/core");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("../common");
const notebook_service_1 = require("./service/notebook-service");
class NotebookCellResource {
    get onDidChangeContents() {
        return this.onDidChangeContentsEmitter.event;
    }
    get onDidChangeReadOnly() {
        return this.notebook.onDidChangeReadOnly;
    }
    get readOnly() {
        return this.notebook.readOnly;
    }
    constructor(uri, notebook, cell) {
        this.onDidChangeContentsEmitter = new core_1.Emitter();
        this.uri = uri;
        this.notebook = notebook;
        this.cell = cell;
    }
    readContents(options) {
        return Promise.resolve(this.cell.source);
    }
    dispose() {
        this.onDidChangeContentsEmitter.dispose();
    }
}
exports.NotebookCellResource = NotebookCellResource;
let NotebookCellResourceResolver = class NotebookCellResourceResolver {
    async resolve(uri) {
        if (uri.scheme !== common_1.CellUri.cellUriScheme) {
            throw new Error(`Cannot resolve cell uri with scheme '${uri.scheme}'`);
        }
        const parsedUri = common_1.CellUri.parse(uri);
        if (!parsedUri) {
            throw new Error(`Cannot parse uri '${uri.toString()}'`);
        }
        const notebookModel = this.notebookService.getNotebookEditorModel(parsedUri.notebook);
        if (!notebookModel) {
            throw new Error(`No notebook found for uri '${parsedUri.notebook}'`);
        }
        const notebookCellModel = notebookModel.cells.find(cell => cell.handle === parsedUri.handle);
        if (!notebookCellModel) {
            throw new Error(`No cell found with handle '${parsedUri.handle}' in '${parsedUri.notebook}'`);
        }
        return new NotebookCellResource(uri, notebookModel, notebookCellModel);
    }
};
exports.NotebookCellResourceResolver = NotebookCellResourceResolver;
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_service_1.NotebookService),
    tslib_1.__metadata("design:type", notebook_service_1.NotebookService)
], NotebookCellResourceResolver.prototype, "notebookService", void 0);
exports.NotebookCellResourceResolver = NotebookCellResourceResolver = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NotebookCellResourceResolver);
let NotebookOutputResourceResolver = class NotebookOutputResourceResolver {
    async resolve(uri) {
        if (uri.scheme !== common_1.CellUri.outputUriScheme) {
            throw new Error(`Cannot resolve output uri with scheme '${uri.scheme}'`);
        }
        const parsedUri = common_1.CellUri.parseCellOutputUri(uri);
        if (!parsedUri) {
            throw new Error(`Cannot parse uri '${uri.toString()}'`);
        }
        const notebookModel = this.notebookService.getNotebookEditorModel(parsedUri.notebook);
        if (!notebookModel) {
            throw new Error(`No notebook found for uri '${parsedUri.notebook}'`);
        }
        const ouputModel = notebookModel.cells.flatMap(cell => cell.outputs).find(output => output.outputId === parsedUri.outputId);
        if (!ouputModel) {
            throw new Error(`No output found with id '${parsedUri.outputId}' in '${parsedUri.notebook}'`);
        }
        return {
            uri: uri,
            dispose: () => { },
            readContents: async () => ouputModel.outputs[0].data.toString(),
            readOnly: true,
        };
    }
};
exports.NotebookOutputResourceResolver = NotebookOutputResourceResolver;
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_service_1.NotebookService),
    tslib_1.__metadata("design:type", notebook_service_1.NotebookService)
], NotebookOutputResourceResolver.prototype, "notebookService", void 0);
exports.NotebookOutputResourceResolver = NotebookOutputResourceResolver = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NotebookOutputResourceResolver);
//# sourceMappingURL=notebook-cell-resource-resolver.js.map