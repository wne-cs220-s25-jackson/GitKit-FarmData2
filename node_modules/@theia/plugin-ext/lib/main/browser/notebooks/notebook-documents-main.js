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
exports.NotebookDocumentsMainImpl = void 0;
const core_1 = require("@theia/core");
const uri_1 = require("@theia/core/lib/common/uri");
const browser_1 = require("@theia/notebook/lib/browser");
const common_1 = require("@theia/notebook/lib/common");
const notebook_monaco_text_model_service_1 = require("@theia/notebook/lib/browser/service/notebook-monaco-text-model-service");
const common_2 = require("../../../common");
const notebook_dto_1 = require("./notebook-dto");
const notebook_open_handler_1 = require("@theia/notebook/lib/browser/notebook-open-handler");
class NotebookDocumentsMainImpl {
    constructor(rpc, container) {
        this.disposables = new core_1.DisposableCollection();
        this.documentEventListenersMapping = new Map();
        this.proxy = rpc.getProxy(common_2.MAIN_RPC_CONTEXT.NOTEBOOK_DOCUMENTS_EXT);
        this.notebookModelResolverService = container.get(browser_1.NotebookModelResolverService);
        this.notebookOpenHandler = container.get(notebook_open_handler_1.NotebookOpenHandler);
        // forward dirty and save events
        this.disposables.push(this.notebookModelResolverService.onDidChangeDirty(model => this.proxy.$acceptDirtyStateChanged(model.uri.toComponents(), model.isDirty())));
        this.disposables.push(this.notebookModelResolverService.onDidSaveNotebook(e => this.proxy.$acceptModelSaved(e)));
        this.notebookMonacoTextModelService = container.get(notebook_monaco_text_model_service_1.NotebookMonacoTextModelService);
    }
    get onDidAddNotebookCellModel() {
        return this.notebookMonacoTextModelService.onDidCreateNotebookCellModel;
    }
    dispose() {
        this.disposables.dispose();
        // this.modelReferenceCollection.dispose();
        this.documentEventListenersMapping.forEach(value => value.dispose());
    }
    handleNotebooksAdded(notebooks) {
        for (const notebook of notebooks) {
            const listener = notebook.onDidChangeContent(events => {
                const eventDto = {
                    versionId: 1, // TODO implement version ID support
                    rawEvents: []
                };
                for (const e of events) {
                    switch (e.kind) {
                        case common_1.NotebookCellsChangeType.ModelChange:
                            eventDto.rawEvents.push({
                                kind: e.kind,
                                changes: e.changes.map(diff => ({ ...diff, newItems: diff.newItems.map(notebook_dto_1.NotebookDto.toNotebookCellDto) }))
                            });
                            break;
                        case common_1.NotebookCellsChangeType.Move:
                            eventDto.rawEvents.push({
                                kind: e.kind,
                                index: e.index,
                                length: e.length,
                                newIdx: e.newIdx,
                            });
                            break;
                        case common_1.NotebookCellsChangeType.Output:
                            eventDto.rawEvents.push({
                                kind: e.kind,
                                index: e.index,
                                outputs: e.outputs.map(notebook_dto_1.NotebookDto.toNotebookOutputDto)
                            });
                            break;
                        case common_1.NotebookCellsChangeType.OutputItem:
                            eventDto.rawEvents.push({
                                kind: e.kind,
                                index: e.index,
                                outputId: e.outputId,
                                outputItems: e.outputItems.map(notebook_dto_1.NotebookDto.toNotebookOutputItemDto),
                                append: e.append
                            });
                            break;
                        case common_1.NotebookCellsChangeType.ChangeCellLanguage:
                        case common_1.NotebookCellsChangeType.ChangeCellContent:
                        case common_1.NotebookCellsChangeType.ChangeCellMetadata:
                        case common_1.NotebookCellsChangeType.ChangeCellInternalMetadata:
                            eventDto.rawEvents.push(e);
                            break;
                        case common_1.NotebookCellsChangeType.ChangeDocumentMetadata:
                            eventDto.rawEvents.push({
                                kind: e.kind,
                                metadata: e.metadata
                            });
                            break;
                    }
                }
                const hasDocumentMetadataChangeEvent = events.find(e => e.kind === common_1.NotebookCellsChangeType.ChangeDocumentMetadata);
                // using the model resolver service to know if the model is dirty or not.
                // assuming this is the first listener it can mean that at first the model
                // is marked as dirty and that another event is fired
                this.proxy.$acceptModelChanged(notebook.uri.toComponents(), eventDto, notebook.isDirty(), hasDocumentMetadataChangeEvent ? notebook.metadata : undefined);
            });
            this.documentEventListenersMapping.set(notebook.uri.toString(), new core_1.DisposableCollection(listener));
        }
    }
    handleNotebooksRemoved(uris) {
        var _a;
        for (const uri of uris) {
            (_a = this.documentEventListenersMapping.get(uri.toString())) === null || _a === void 0 ? void 0 : _a.dispose();
            this.documentEventListenersMapping.delete(uri.toString());
        }
    }
    async $tryCreateNotebook(options) {
        const ref = await this.notebookModelResolverService.resolveUntitledResource({ untitledResource: undefined }, options.viewType);
        // untitled notebooks are disposed when they get saved. we should not hold a reference
        // to such a disposed notebook and therefore dispose the reference as well
        // ref.onWillDispose(() => {
        //     ref.dispose();
        // });
        const uriComponents = ref.uri.toComponents();
        // untitled notebooks are dirty by default
        this.proxy.$acceptDirtyStateChanged(uriComponents, true);
        // apply content changes...
        if (options.content) {
            const data = notebook_dto_1.NotebookDto.fromNotebookDataDto(options.content);
            ref.setData(data);
            // Create and send a change events
            const rawEvents = [];
            if (options.content.cells && options.content.cells.length > 0) {
                rawEvents.push({
                    kind: common_1.NotebookCellsChangeType.ModelChange,
                    changes: [{ start: 0, startHandle: 0, deleteCount: 0, newItems: ref.cells.map(notebook_dto_1.NotebookDto.toNotebookCellDto) }]
                });
            }
            if (options.content.metadata) {
                rawEvents.push({
                    kind: common_1.NotebookCellsChangeType.ChangeDocumentMetadata,
                    metadata: options.content.metadata
                });
            }
            if (rawEvents.length > 0) {
                this.proxy.$acceptModelChanged(uriComponents, { versionId: 1, rawEvents }, true);
            }
        }
        return uriComponents;
    }
    async $tryOpenNotebook(uriComponents) {
        const uri = uri_1.URI.fromComponents(uriComponents);
        await this.notebookModelResolverService.resolve(uri);
        return uri.toComponents();
    }
    async $trySaveNotebook(uriComponents) {
        const uri = uri_1.URI.fromComponents(uriComponents);
        const ref = await this.notebookModelResolverService.resolve(uri);
        await ref.save();
        ref.dispose();
        return true;
    }
}
exports.NotebookDocumentsMainImpl = NotebookDocumentsMainImpl;
//# sourceMappingURL=notebook-documents-main.js.map