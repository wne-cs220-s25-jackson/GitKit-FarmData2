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
exports.toNotebookWorspaceEdit = exports.NotebooksMainImpl = void 0;
const core_1 = require("@theia/core");
const common_1 = require("@theia/notebook/lib/common");
const browser_1 = require("@theia/notebook/lib/browser");
const common_2 = require("../../../common");
const notebook_dto_1 = require("./notebook-dto");
const hosted_plugin_1 = require("../../../hosted/browser/hosted-plugin");
const notebook_model_1 = require("@theia/notebook/lib/browser/view-model/notebook-model");
const notebook_cell_model_1 = require("@theia/notebook/lib/browser/view-model/notebook-cell-model");
const notebook_cell_status_bar_service_1 = require("@theia/notebook/lib/browser/service/notebook-cell-status-bar-service");
class NotebooksMainImpl {
    constructor(rpc, container, commands) {
        this.disposables = new core_1.DisposableCollection();
        this.notebookSerializer = new Map();
        this.notebookCellStatusBarRegistrations = new Map();
        this.notebookService = container.get(browser_1.NotebookService);
        this.cellStatusBarService = container.get(notebook_cell_status_bar_service_1.NotebookCellStatusBarService);
        const plugins = container.get(hosted_plugin_1.HostedPluginSupport);
        this.proxy = rpc.getProxy(common_2.MAIN_RPC_CONTEXT.NOTEBOOKS_EXT);
        this.notebookService.onWillUseNotebookSerializer(event => plugins.activateByNotebookSerializer(event));
        this.notebookService.markReady();
        commands.registerArgumentProcessor({
            processArgument: arg => {
                if (arg instanceof notebook_model_1.NotebookModel) {
                    return common_1.NotebookModelResource.create(arg.uri);
                }
                else if (arg instanceof notebook_cell_model_1.NotebookCellModel) {
                    return common_1.NotebookCellModelResource.create(arg.uri);
                }
                return arg;
            }
        });
    }
    dispose() {
        this.disposables.dispose();
        for (const disposable of this.notebookSerializer.values()) {
            disposable.dispose();
        }
    }
    $registerNotebookSerializer(handle, viewType, options) {
        const disposables = new core_1.DisposableCollection();
        disposables.push(this.notebookService.registerNotebookSerializer(viewType, {
            options,
            toNotebook: async (data) => {
                const dto = await this.proxy.$dataToNotebook(handle, data, core_1.CancellationToken.None);
                return notebook_dto_1.NotebookDto.fromNotebookDataDto(dto);
            },
            fromNotebook: (data) => this.proxy.$notebookToData(handle, notebook_dto_1.NotebookDto.toNotebookDataDto(data), core_1.CancellationToken.None)
        }));
        this.notebookSerializer.set(handle, disposables);
    }
    $unregisterNotebookSerializer(handle) {
        var _a;
        (_a = this.notebookSerializer.get(handle)) === null || _a === void 0 ? void 0 : _a.dispose();
        this.notebookSerializer.delete(handle);
    }
    $emitCellStatusBarEvent(eventHandle) {
        const emitter = this.notebookCellStatusBarRegistrations.get(eventHandle);
        if (emitter instanceof core_1.Emitter) {
            emitter.fire(undefined);
        }
    }
    async $registerNotebookCellStatusBarItemProvider(handle, eventHandle, viewType) {
        const that = this;
        const provider = {
            async provideCellStatusBarItems(notebookUri, index, token) {
                var _a;
                const result = await that.proxy.$provideNotebookCellStatusBarItems(handle, notebookUri.toComponents(), index, token);
                return {
                    items: (_a = result === null || result === void 0 ? void 0 : result.items) !== null && _a !== void 0 ? _a : [],
                    dispose() {
                        if (result) {
                            that.proxy.$releaseNotebookCellStatusBarItems(result.cacheId);
                        }
                    }
                };
            },
            viewType
        };
        if (typeof eventHandle === 'number') {
            const emitter = new core_1.Emitter();
            this.notebookCellStatusBarRegistrations.set(eventHandle, emitter);
            provider.onDidChangeStatusBarItems = emitter.event;
        }
        const disposable = this.cellStatusBarService.registerCellStatusBarItemProvider(provider);
        this.notebookCellStatusBarRegistrations.set(handle, disposable);
    }
    async $unregisterNotebookCellStatusBarItemProvider(handle, eventHandle) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const unregisterThing = (statusBarHandle) => {
            var _a;
            const entry = this.notebookCellStatusBarRegistrations.get(statusBarHandle);
            if (entry) {
                (_a = this.notebookCellStatusBarRegistrations.get(statusBarHandle)) === null || _a === void 0 ? void 0 : _a.dispose();
                this.notebookCellStatusBarRegistrations.delete(statusBarHandle);
            }
        };
        unregisterThing(handle);
        if (typeof eventHandle === 'number') {
            unregisterThing(eventHandle);
        }
    }
}
exports.NotebooksMainImpl = NotebooksMainImpl;
function toNotebookWorspaceEdit(dto) {
    return {
        edits: dto.edits.map((edit) => ({
            resource: core_1.URI.fromComponents(edit.resource),
            edit: edit.cellEdit.editType === 1 /* CellEditType.Replace */ ? {
                ...edit.cellEdit,
                cells: edit.cellEdit.cells.map(cell => notebook_dto_1.NotebookDto.fromNotebookCellDataDto(cell))
            } : edit.cellEdit
        }))
    };
}
exports.toNotebookWorspaceEdit = toNotebookWorspaceEdit;
//# sourceMappingURL=notebooks-main.js.map