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
exports.NotebookService = exports.NotebookProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@theia/core");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("../../common");
const notebook_model_1 = require("../view-model/notebook-model");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
const notebook_cell_model_1 = require("../view-model/notebook-cell-model");
const promise_util_1 = require("@theia/core/lib/common/promise-util");
const notebook_monaco_text_model_service_1 = require("./notebook-monaco-text-model-service");
exports.NotebookProvider = Symbol('notebook provider');
let NotebookService = class NotebookService {
    constructor() {
        this.willUseNotebookSerializerEmitter = new core_1.Emitter();
        this.onWillUseNotebookSerializer = this.willUseNotebookSerializerEmitter.event;
        this.disposables = new core_1.DisposableCollection();
        this.notebookProviders = new Map();
        this.notebookModels = new Map();
        this.didRegisterNotebookSerializerEmitter = new core_1.Emitter();
        this.onDidRegisterNotebookSerializer = this.didRegisterNotebookSerializerEmitter.event;
        this.didRemoveViewTypeEmitter = new core_1.Emitter();
        this.onDidRemoveViewType = this.didRemoveViewTypeEmitter.event;
        this.willOpenNotebookTypeEmitter = new core_1.Emitter();
        this.onWillOpenNotebook = this.willOpenNotebookTypeEmitter.event;
        this.didAddNotebookDocumentEmitter = new core_1.Emitter();
        this.onDidAddNotebookDocument = this.didAddNotebookDocumentEmitter.event;
        this.didRemoveNotebookDocumentEmitter = new core_1.Emitter();
        this.onDidRemoveNotebookDocument = this.didRemoveNotebookDocumentEmitter.event;
        this.ready = new promise_util_1.Deferred();
    }
    dispose() {
        this.disposables.dispose();
    }
    /**
     * Marks the notebook service as ready. From this point on, the service will start dispatching the `onNotebookSerializer` event.
     */
    markReady() {
        this.ready.resolve();
    }
    registerNotebookSerializer(viewType, serializer) {
        if (this.notebookProviders.has(viewType)) {
            throw new Error(`notebook provider for viewtype '${viewType}' already exists`);
        }
        this.notebookProviders.set(viewType, { notebookType: viewType, serializer });
        this.didRegisterNotebookSerializerEmitter.fire(viewType);
        return core_1.Disposable.create(() => {
            this.notebookProviders.delete(viewType);
            this.didRemoveViewTypeEmitter.fire(viewType);
        });
    }
    async createNotebookModel(data, viewType, resource) {
        const dataProvider = await this.getNotebookDataProvider(viewType);
        const serializer = dataProvider.serializer;
        const model = this.notebookModelFactory({ data, resource, viewType, serializer });
        this.notebookModels.set(resource.uri.toString(), model);
        // Resolve cell text models right after creating the notebook model
        // This ensures that all text models are available in the plugin host
        await this.textModelService.createTextModelsForNotebook(model);
        this.didAddNotebookDocumentEmitter.fire(model);
        model.onDidDispose(() => {
            this.notebookModels.delete(resource.uri.toString());
            this.didRemoveNotebookDocumentEmitter.fire(model);
        });
        return model;
    }
    async getNotebookDataProvider(viewType) {
        try {
            return await this.waitForNotebookProvider(viewType);
        }
        catch {
            throw new Error(`No provider registered for view type: '${viewType}'`);
        }
    }
    /**
     * When the application starts up, notebook providers from plugins are not registered yet.
     * It takes a few seconds for the plugin host to start so that notebook data providers can be registered.
     * This methods waits until the notebook provider is registered.
     */
    waitForNotebookProvider(type) {
        const existing = this.notebookProviders.get(type);
        if (existing) {
            return Promise.resolve(existing);
        }
        const deferred = new promise_util_1.Deferred();
        // 20 seconds of timeout
        const timeoutDuration = 20000;
        // Must declare these variables where they can be captured by the closure
        let disposable;
        // eslint-disable-next-line
        let timeout;
        // eslint-disable-next-line
        disposable = this.onDidRegisterNotebookSerializer(viewType => {
            if (viewType === type) {
                clearTimeout(timeout);
                disposable.dispose();
                const newProvider = this.notebookProviders.get(type);
                if (!newProvider) {
                    deferred.reject(new Error(`Notebook provider for type ${type} is invalid`));
                }
                else {
                    deferred.resolve(newProvider);
                }
            }
        });
        timeout = setTimeout(() => {
            clearTimeout(timeout);
            disposable.dispose();
            deferred.reject(new Error(`Timed out while waiting for notebook serializer for type ${type} to be registered`));
        }, timeoutDuration);
        this.ready.promise.then(() => {
            this.willUseNotebookSerializerEmitter.fire(type);
        });
        return deferred.promise;
    }
    getNotebookEditorModel(uri) {
        return this.notebookModels.get(uri.toString());
    }
    getNotebookModels() {
        return this.notebookModels.values();
    }
    async willOpenNotebook(type) {
        return this.willOpenNotebookTypeEmitter.sequence(async (listener) => listener(type));
    }
    listNotebookDocuments() {
        return [...this.notebookModels.values()];
    }
    applyWorkspaceEdit(workspaceEdit) {
        try {
            workspaceEdit.edits.forEach(edit => {
                const notebook = this.getNotebookEditorModel(edit.resource);
                notebook === null || notebook === void 0 ? void 0 : notebook.applyEdits([edit.edit], true);
            });
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
    getCodeCellLanguage(model) {
        var _a;
        const firstCodeCell = model.cells.find(cellModel => cellModel.cellKind === common_1.CellKind.Code);
        const cellLanguage = (_a = firstCodeCell === null || firstCodeCell === void 0 ? void 0 : firstCodeCell.language) !== null && _a !== void 0 ? _a : 'plaintext';
        return cellLanguage;
    }
};
exports.NotebookService = NotebookService;
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], NotebookService.prototype, "fileService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_model_1.NotebookModelFactory),
    tslib_1.__metadata("design:type", Function)
], NotebookService.prototype, "notebookModelFactory", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_cell_model_1.NotebookCellModelFactory),
    tslib_1.__metadata("design:type", Function)
], NotebookService.prototype, "notebookCellModelFactory", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_monaco_text_model_service_1.NotebookMonacoTextModelService),
    tslib_1.__metadata("design:type", notebook_monaco_text_model_service_1.NotebookMonacoTextModelService)
], NotebookService.prototype, "textModelService", void 0);
exports.NotebookService = NotebookService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NotebookService);
//# sourceMappingURL=notebook-service.js.map