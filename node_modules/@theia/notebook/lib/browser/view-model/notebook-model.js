"use strict";
// *****************************************************************************
// Copyright (C) 2023 Typefox and others.
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
exports.NotebookModel = exports.NotebookModelResolverServiceProxy = exports.createNotebookModelContainer = exports.NotebookModelFactory = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
const common_1 = require("../../common");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
const notebook_cell_model_1 = require("./notebook-cell-model");
const inversify_1 = require("@theia/core/shared/inversify");
const undo_redo_service_1 = require("@theia/editor/lib/browser/undo-redo-service");
exports.NotebookModelFactory = Symbol('NotebookModelFactory');
function createNotebookModelContainer(parent, props) {
    const child = parent.createChild();
    child.bind(NotebookModelProps).toConstantValue(props);
    child.bind(NotebookModel).toSelf();
    return child;
}
exports.createNotebookModelContainer = createNotebookModelContainer;
exports.NotebookModelResolverServiceProxy = Symbol('NotebookModelResolverServiceProxy');
const NotebookModelProps = Symbol('NotebookModelProps');
let NotebookModel = class NotebookModel {
    constructor() {
        this.onDirtyChangedEmitter = new core_1.Emitter();
        this.onDirtyChanged = this.onDirtyChangedEmitter.event;
        this.onDidSaveNotebookEmitter = new core_1.Emitter();
        this.onDidSaveNotebook = this.onDidSaveNotebookEmitter.event;
        this.onDidAddOrRemoveCellEmitter = new core_1.Emitter();
        this.onDidAddOrRemoveCell = this.onDidAddOrRemoveCellEmitter.event;
        this.onDidChangeContentEmitter = new core_1.QueueableEmitter();
        this.onDidChangeContent = this.onDidChangeContentEmitter.event;
        this.onContentChangedEmitter = new core_1.Emitter();
        this.onContentChanged = this.onContentChangedEmitter.event;
        this.onDidChangeSelectedCellEmitter = new core_1.Emitter();
        this.onDidChangeSelectedCell = this.onDidChangeSelectedCellEmitter.event;
        this.onDidDisposeEmitter = new core_1.Emitter();
        this.onDidDispose = this.onDidDisposeEmitter.event;
        this.nextHandle = 0;
        this._dirty = false;
        this._selectedText = '';
        this.dirtyCells = [];
        this.metadata = {};
    }
    get onDidChangeReadOnly() {
        var _a;
        return (_a = this.props.resource.onDidChangeReadOnly) !== null && _a !== void 0 ? _a : core_1.Event.None;
    }
    set dirty(dirty) {
        const oldState = this._dirty;
        this._dirty = dirty;
        if (oldState !== dirty) {
            this.onDirtyChangedEmitter.fire();
        }
    }
    get dirty() {
        return this._dirty;
    }
    get readOnly() {
        var _a;
        return (_a = this.props.resource.readOnly) !== null && _a !== void 0 ? _a : false;
    }
    set selectedText(value) {
        this._selectedText = value;
    }
    get selectedText() {
        return this._selectedText;
    }
    get uri() {
        return this.props.resource.uri;
    }
    get viewType() {
        return this.props.viewType;
    }
    initialize() {
        this.dirty = false;
        this.cells = this.props.data.cells.map((cell, index) => this.cellModelFactory({
            uri: common_1.CellUri.generate(this.props.resource.uri, index),
            handle: index,
            source: cell.source,
            language: cell.language,
            cellKind: cell.cellKind,
            outputs: cell.outputs,
            metadata: cell.metadata,
            internalMetadata: cell.internalMetadata,
            collapseState: cell.collapseState
        }));
        this.addCellOutputListeners(this.cells);
        this.metadata = this.props.data.metadata;
        this.nextHandle = this.cells.length;
    }
    dispose() {
        this.onDirtyChangedEmitter.dispose();
        this.onDidSaveNotebookEmitter.dispose();
        this.onDidAddOrRemoveCellEmitter.dispose();
        this.onDidChangeContentEmitter.dispose();
        this.onDidChangeSelectedCellEmitter.dispose();
        this.cells.forEach(cell => cell.dispose());
        this.onDidDisposeEmitter.fire();
    }
    async save(options) {
        this.dirtyCells = [];
        this.dirty = false;
        const serializedNotebook = await this.serialize();
        this.fileService.writeFile(this.uri, serializedNotebook);
        this.onDidSaveNotebookEmitter.fire();
    }
    createSnapshot() {
        return {
            read: () => JSON.stringify(this.getData())
        };
    }
    serialize() {
        return this.props.serializer.fromNotebook(this.getData());
    }
    async applySnapshot(snapshot) {
        const rawData = browser_1.Saveable.Snapshot.read(snapshot);
        if (!rawData) {
            throw new Error('could not read notebook snapshot');
        }
        const data = JSON.parse(rawData);
        this.setData(data);
    }
    async revert(options) {
        if (!(options === null || options === void 0 ? void 0 : options.soft)) {
            // Load the data from the file again
            try {
                const data = await this.modelResolverService.resolveExistingNotebookData(this.props.resource, this.props.viewType);
                this.setData(data, false);
            }
            catch (err) {
                console.error('Failed to revert notebook', err);
            }
        }
        this.dirty = false;
    }
    isDirty() {
        return this.dirty;
    }
    cellDirtyChanged(cell, dirtyState) {
        if (dirtyState) {
            this.dirtyCells.push(cell);
        }
        else {
            this.dirtyCells.splice(this.dirtyCells.indexOf(cell), 1);
        }
        this.dirty = this.dirtyCells.length > 0;
        // Only fire `onContentChangedEmitter` here, because `onDidChangeContentEmitter` is used for model level changes only
        // However, this event indicates that the content of a cell has changed
        this.onContentChangedEmitter.fire();
    }
    setData(data, markDirty = true) {
        // Replace all cells in the model
        this.dirtyCells = [];
        this.replaceCells(0, this.cells.length, data.cells, false, false);
        this.metadata = data.metadata;
        this.dirty = markDirty;
        this.onDidChangeContentEmitter.fire();
    }
    getData() {
        return {
            cells: this.cells.map(cell => cell.getData()),
            metadata: this.metadata
        };
    }
    undo() {
        if (!this.readOnly) {
            this.undoRedoService.undo(this.uri);
        }
    }
    redo() {
        if (!this.readOnly) {
            this.undoRedoService.redo(this.uri);
        }
    }
    setSelectedCell(cell, scrollIntoView) {
        if (this.selectedCell !== cell) {
            this.selectedCell = cell;
            this.onDidChangeSelectedCellEmitter.fire({ cell, scrollIntoView: scrollIntoView !== null && scrollIntoView !== void 0 ? scrollIntoView : true });
        }
    }
    addCellOutputListeners(cells) {
        for (const cell of cells) {
            cell.onDidChangeOutputs(() => {
                this.dirty = true;
            });
            cell.onDidRequestCellEditChange(() => {
                this.onContentChangedEmitter.fire();
            });
        }
    }
    getVisibleCells() {
        return this.cells;
    }
    applyEdits(rawEdits, computeUndoRedo) {
        var _a, _b, _c;
        const editsWithDetails = rawEdits.map((edit, index) => {
            let cellIndex = -1;
            if ('index' in edit) {
                cellIndex = edit.index;
            }
            else if ('handle' in edit) {
                cellIndex = this.getCellIndexByHandle(edit.handle);
            }
            else if ('outputId' in edit) {
                cellIndex = this.cells.findIndex(cell => cell.outputs.some(output => output.outputId === edit.outputId));
            }
            return {
                edit,
                cellIndex,
                end: edit.editType === 1 /* CellEditType.Replace */ ? edit.index + edit.count : cellIndex,
                originalIndex: index
            };
        });
        for (const { edit, cellIndex } of editsWithDetails) {
            const cell = this.cells[cellIndex];
            if (cell) {
                this.cellDirtyChanged(cell, true);
            }
            let scrollIntoView = true;
            switch (edit.editType) {
                case 1 /* CellEditType.Replace */:
                    this.replaceCells(edit.index, edit.count, edit.cells, computeUndoRedo, true);
                    scrollIntoView = edit.cells.length > 0;
                    break;
                case 2 /* CellEditType.Output */: {
                    if (edit.append) {
                        cell.spliceNotebookCellOutputs({ deleteCount: 0, newOutputs: edit.outputs, start: cell.outputs.length });
                    }
                    else {
                        // could definitely be more efficient. See vscode __spliceNotebookCellOutputs2
                        // For now, just replace the whole existing output with the new output
                        cell.spliceNotebookCellOutputs({ start: 0, deleteCount: (_a = edit.deleteCount) !== null && _a !== void 0 ? _a : cell.outputs.length, newOutputs: edit.outputs });
                    }
                    this.onDidChangeContentEmitter.queue({ kind: common_1.NotebookCellsChangeType.Output, index: cellIndex, outputs: cell.outputs, append: (_b = edit.append) !== null && _b !== void 0 ? _b : false });
                    break;
                }
                case 7 /* CellEditType.OutputItems */:
                    cell.changeOutputItems(edit.outputId, !!edit.append, edit.items);
                    this.onDidChangeContentEmitter.queue({
                        kind: common_1.NotebookCellsChangeType.OutputItem, index: cellIndex, outputItems: edit.items,
                        outputId: edit.outputId, append: (_c = edit.append) !== null && _c !== void 0 ? _c : false
                    });
                    break;
                case 3 /* CellEditType.Metadata */:
                    this.changeCellMetadata(this.cells[cellIndex], edit.metadata, false);
                    break;
                case 8 /* CellEditType.PartialMetadata */:
                    this.changeCellMetadataPartial(this.cells[cellIndex], edit.metadata, false);
                    break;
                case 9 /* CellEditType.PartialInternalMetadata */:
                    this.changeCellInternalMetadataPartial(this.cells[cellIndex], edit.internalMetadata);
                    break;
                case 4 /* CellEditType.CellLanguage */:
                    this.changeCellLanguage(this.cells[cellIndex], edit.language, computeUndoRedo);
                    break;
                case 5 /* CellEditType.DocumentMetadata */:
                    this.updateNotebookMetadata(edit.metadata, false);
                    break;
                case 6 /* CellEditType.Move */:
                    this.moveCellToIndex(cellIndex, edit.length, edit.newIdx, computeUndoRedo);
                    break;
            }
            // if selected cell is affected update it because it can potentially have been replaced
            if (cell === this.selectedCell) {
                this.setSelectedCell(this.cells[Math.min(cellIndex, this.cells.length - 1)], scrollIntoView);
            }
        }
        this.fireContentChange();
    }
    fireContentChange() {
        this.onDidChangeContentEmitter.fire();
        this.onContentChangedEmitter.fire();
    }
    replaceCells(start, deleteCount, newCells, computeUndoRedo, requestEdit) {
        var _a, _b;
        const cells = newCells.map(cell => {
            const handle = this.nextHandle++;
            return this.cellModelFactory({
                uri: common_1.CellUri.generate(this.uri, handle),
                handle: handle,
                source: cell.source,
                language: cell.language,
                cellKind: cell.cellKind,
                outputs: cell.outputs,
                metadata: cell.metadata,
                internalMetadata: cell.internalMetadata,
                collapseState: cell.collapseState
            });
        });
        this.addCellOutputListeners(cells);
        const changes = [{
                start,
                deleteCount,
                newItems: cells,
                startHandle: (_b = (_a = this.cells[start]) === null || _a === void 0 ? void 0 : _a.handle) !== null && _b !== void 0 ? _b : -1 // -1 in case of new Cells are added at the end.
            }];
        const deletedCells = this.cells.splice(start, deleteCount, ...cells);
        for (const cell of deletedCells) {
            cell.dispose();
        }
        if (computeUndoRedo) {
            this.undoRedoService.pushElement(this.uri, async () => {
                this.replaceCells(start, newCells.length, deletedCells.map(cell => cell.getData()), false, false);
                this.fireContentChange();
            }, async () => {
                this.replaceCells(start, deleteCount, newCells, false, false);
                this.fireContentChange();
            });
        }
        this.onDidAddOrRemoveCellEmitter.fire({ rawEvent: { kind: common_1.NotebookCellsChangeType.ModelChange, changes }, newCellIds: cells.map(cell => cell.handle) });
        this.onDidChangeContentEmitter.queue({ kind: common_1.NotebookCellsChangeType.ModelChange, changes });
        if (cells.length > 0 && requestEdit) {
            this.setSelectedCell(cells[cells.length - 1]);
            cells[cells.length - 1].requestEdit();
        }
    }
    changeCellInternalMetadataPartial(cell, internalMetadata) {
        var _a;
        const newInternalMetadata = {
            ...cell.internalMetadata
        };
        let k;
        // eslint-disable-next-line guard-for-in
        for (k in internalMetadata) {
            newInternalMetadata[k] = ((_a = internalMetadata[k]) !== null && _a !== void 0 ? _a : undefined);
        }
        cell.internalMetadata = newInternalMetadata;
        this.onDidChangeContentEmitter.queue({ kind: common_1.NotebookCellsChangeType.ChangeCellInternalMetadata, index: this.cells.indexOf(cell), internalMetadata: newInternalMetadata });
    }
    updateNotebookMetadata(metadata, computeUndoRedo) {
        const oldMetadata = this.metadata;
        if (computeUndoRedo) {
            this.undoRedoService.pushElement(this.uri, async () => this.updateNotebookMetadata(oldMetadata, false), async () => this.updateNotebookMetadata(metadata, false));
        }
        this.metadata = metadata;
        this.onDidChangeContentEmitter.queue({ kind: common_1.NotebookCellsChangeType.ChangeDocumentMetadata, metadata: this.metadata });
    }
    changeCellMetadataPartial(cell, metadata, computeUndoRedo) {
        var _a;
        const newMetadata = {
            ...cell.metadata
        };
        let k;
        // eslint-disable-next-line guard-for-in
        for (k in metadata) {
            const value = (_a = metadata[k]) !== null && _a !== void 0 ? _a : undefined;
            newMetadata[k] = value;
        }
        this.changeCellMetadata(cell, newMetadata, computeUndoRedo);
    }
    changeCellMetadata(cell, metadata, computeUndoRedo) {
        const triggerDirtyChange = this.isCellMetadataChanged(cell.metadata, metadata);
        if (triggerDirtyChange) {
            if (computeUndoRedo) {
                const oldMetadata = cell.metadata;
                cell.metadata = metadata;
                this.undoRedoService.pushElement(this.uri, async () => { cell.metadata = oldMetadata; }, async () => { cell.metadata = metadata; });
            }
        }
        cell.metadata = metadata;
        this.onDidChangeContentEmitter.queue({ kind: common_1.NotebookCellsChangeType.ChangeCellMetadata, index: this.cells.indexOf(cell), metadata: cell.metadata });
    }
    changeCellLanguage(cell, languageId, computeUndoRedo) {
        if (cell.language === languageId) {
            return;
        }
        cell.language = languageId;
        this.onDidChangeContentEmitter.queue({ kind: common_1.NotebookCellsChangeType.ChangeCellLanguage, index: this.cells.indexOf(cell), language: languageId });
    }
    moveCellToIndex(fromIndex, length, toIndex, computeUndoRedo) {
        if (computeUndoRedo) {
            this.undoRedoService.pushElement(this.uri, async () => {
                this.moveCellToIndex(toIndex, length, fromIndex, false);
                this.fireContentChange();
            }, async () => {
                this.moveCellToIndex(fromIndex, length, toIndex, false);
                this.fireContentChange();
            });
        }
        const cells = this.cells.splice(fromIndex, length);
        this.cells.splice(toIndex, 0, ...cells);
        this.onDidChangeContentEmitter.queue({ kind: common_1.NotebookCellsChangeType.Move, index: fromIndex, length, newIdx: toIndex, cells });
        return true;
    }
    getCellIndexByHandle(handle) {
        return this.cells.findIndex(c => c.handle === handle);
    }
    getCellByHandle(handle) {
        return this.cells.find(c => c.handle === handle);
    }
    isCellMetadataChanged(a, b) {
        const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
        for (const key of keys) {
            if (a[key] !== b[key]) {
                return true;
            }
        }
        return false;
    }
    findMatches(options) {
        const matches = [];
        for (const cell of this.cells) {
            matches.push(...cell.findMatches(options));
        }
        return matches;
    }
    replaceAll(matches, text) {
        var _a;
        const matchMap = new Map();
        for (const match of matches) {
            if (match instanceof notebook_cell_model_1.NotebookCodeEditorFindMatch) {
                if (!matchMap.has(match.cell)) {
                    matchMap.set(match.cell, []);
                }
                (_a = matchMap.get(match.cell)) === null || _a === void 0 ? void 0 : _a.push(match);
            }
        }
        for (const [cell, cellMatches] of matchMap) {
            cell.replaceAll(cellMatches, text);
        }
    }
};
exports.NotebookModel = NotebookModel;
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], NotebookModel.prototype, "fileService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(undo_redo_service_1.UndoRedoService),
    tslib_1.__metadata("design:type", undo_redo_service_1.UndoRedoService)
], NotebookModel.prototype, "undoRedoService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(NotebookModelProps),
    tslib_1.__metadata("design:type", Object)
], NotebookModel.prototype, "props", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_cell_model_1.NotebookCellModelFactory),
    tslib_1.__metadata("design:type", Function)
], NotebookModel.prototype, "cellModelFactory", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(exports.NotebookModelResolverServiceProxy),
    tslib_1.__metadata("design:type", Function)
], NotebookModel.prototype, "modelResolverService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], NotebookModel.prototype, "initialize", null);
exports.NotebookModel = NotebookModel = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NotebookModel);
//# sourceMappingURL=notebook-model.js.map