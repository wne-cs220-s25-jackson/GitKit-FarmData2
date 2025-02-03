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
var NotebookKernelService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookKernelService = exports.SourceCommand = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@theia/core");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const notebook_service_1 = require("./notebook-service");
class KernelInfo {
    constructor(kernel) {
        this.kernel = kernel;
        this.score = -1;
        this.handle = KernelInfo.instanceCounter++;
    }
}
KernelInfo.instanceCounter = 0;
class SourceCommand {
    constructor(command, model) {
        this.command = command;
        this.model = model;
        this.onDidChangeStateEmitter = new core_1.Emitter();
        this.onDidChangeState = this.onDidChangeStateEmitter.event;
    }
    async run(commandService) {
        if (this.execution) {
            return this.execution;
        }
        this.execution = this.runCommand(commandService);
        this.onDidChangeStateEmitter.fire();
        await this.execution;
        this.execution = undefined;
        this.onDidChangeStateEmitter.fire();
    }
    async runCommand(commandService) {
        try {
            await commandService.executeCommand(this.command.id, {
                uri: this.model.uri,
            });
        }
        catch (error) {
            console.warn(`Kernel source command failed: ${error}`);
        }
    }
    dispose() {
        this.onDidChangeStateEmitter.dispose();
    }
}
exports.SourceCommand = SourceCommand;
const NOTEBOOK_KERNEL_BINDING_STORAGE_KEY = 'notebook.kernel.bindings';
let NotebookKernelService = NotebookKernelService_1 = class NotebookKernelService {
    constructor() {
        this.kernels = new Map();
        this.notebookBindings = {};
        this.kernelDetectionTasks = new Map();
        this.onDidChangeKernelDetectionTasksEmitter = new core_1.Emitter();
        this.onDidChangeKernelDetectionTasks = this.onDidChangeKernelDetectionTasksEmitter.event;
        this.onDidChangeSourceActionsEmitter = new core_1.Emitter();
        this.kernelSourceActionProviders = new Map();
        this.onDidChangeSourceActions = this.onDidChangeSourceActionsEmitter.event;
        this.onDidAddKernelEmitter = new core_1.Emitter();
        this.onDidAddKernel = this.onDidAddKernelEmitter.event;
        this.onDidRemoveKernelEmitter = new core_1.Emitter();
        this.onDidRemoveKernel = this.onDidRemoveKernelEmitter.event;
        this.onDidChangeSelectedNotebookKernelBindingEmitter = new core_1.Emitter();
        this.onDidChangeSelectedKernel = this.onDidChangeSelectedNotebookKernelBindingEmitter.event;
        this.onDidChangeNotebookAffinityEmitter = new core_1.Emitter();
        this.onDidChangeNotebookAffinity = this.onDidChangeNotebookAffinityEmitter.event;
    }
    init() {
        this.notebookService.onDidAddNotebookDocument(model => this.tryAutoBindNotebook(model));
        this.storageService.getData(NOTEBOOK_KERNEL_BINDING_STORAGE_KEY).then((value) => {
            if (value) {
                this.notebookBindings = value;
            }
        });
    }
    registerKernel(kernel) {
        if (this.kernels.has(kernel.id)) {
            throw new Error(`Notebook Controller with id '${kernel.id}' already exists`);
        }
        this.kernels.set(kernel.id, new KernelInfo(kernel));
        this.onDidAddKernelEmitter.fire(kernel);
        // auto associate the new kernel to existing notebooks it was
        // associated to in the past.
        for (const notebook of this.notebookService.getNotebookModels()) {
            this.tryAutoBindNotebook(notebook, kernel);
        }
        return core_1.Disposable.create(() => {
            if (this.kernels.delete(kernel.id)) {
                this.onDidRemoveKernelEmitter.fire(kernel);
            }
        });
    }
    /**
     * Helps to find the best matching kernel for a notebook.
     * @param notebook notebook to get the matching kernel for
     * @returns and object containing:
     *  all kernels sorted to match the notebook best first (affinity ascending, score descending, label))
     *  the selected kernel (if any)
     *  specific suggested kernels (if any)
     *  hidden kernels (if any)
     */
    getMatchingKernel(notebook) {
        const kernels = [];
        for (const info of this.kernels.values()) {
            const score = NotebookKernelService_1.score(info.kernel, notebook);
            if (score) {
                kernels.push({
                    score,
                    kernel: info.kernel,
                    instanceAffinity: 1 /* vscode.NotebookControllerPriority.Default */,
                });
            }
        }
        kernels
            .sort((a, b) => b.instanceAffinity - a.instanceAffinity || a.score - b.score || a.kernel.label.localeCompare(b.kernel.label));
        const all = kernels.map(obj => obj.kernel);
        // bound kernel
        const selected = this.getSelectedNotebookKernel(notebook);
        const suggestions = kernels.filter(item => item.instanceAffinity > 1).map(item => item.kernel); // TODO implement notebookAffinity
        const hidden = kernels.filter(item => item.instanceAffinity < 0).map(item => item.kernel);
        return { all, selected, suggestions, hidden };
    }
    getSelectedNotebookKernel(notebook) {
        var _a;
        const selectedId = this.notebookBindings[`${notebook.viewType}/${notebook.uri}`];
        return selectedId ? (_a = this.kernels.get(selectedId)) === null || _a === void 0 ? void 0 : _a.kernel : undefined;
    }
    selectKernelForNotebook(kernel, notebook) {
        const key = `${notebook.viewType}/${notebook.uri}`;
        const oldKernel = this.notebookBindings[key];
        if (oldKernel !== (kernel === null || kernel === void 0 ? void 0 : kernel.id)) {
            if (kernel) {
                this.notebookBindings[key] = kernel.id;
            }
            else {
                delete this.notebookBindings[key];
            }
            this.storageService.setData(NOTEBOOK_KERNEL_BINDING_STORAGE_KEY, this.notebookBindings);
            this.onDidChangeSelectedNotebookKernelBindingEmitter.fire({ notebook: notebook.uri, oldKernel, newKernel: kernel === null || kernel === void 0 ? void 0 : kernel.id });
        }
    }
    getSelectedOrSuggestedKernel(notebook) {
        const info = this.getMatchingKernel(notebook);
        if (info.selected) {
            return info.selected;
        }
        return info.all.length === 1 ? info.all[0] : undefined;
    }
    getKernel(id) {
        var _a;
        return (_a = this.kernels.get(id)) === null || _a === void 0 ? void 0 : _a.kernel;
    }
    static score(kernel, notebook) {
        if (kernel.viewType === notebook.viewType) {
            return 10;
        }
        else if (kernel.viewType === '*') {
            return 5;
        }
        else {
            return 0;
        }
    }
    tryAutoBindNotebook(notebook, onlyThisKernel) {
        const id = this.notebookBindings[`${notebook.viewType}/${notebook.uri}`];
        if (!id) {
            // no kernel associated
            return;
        }
        const existingKernel = this.kernels.get(id);
        if (!existingKernel || !NotebookKernelService_1.score(existingKernel.kernel, notebook)) {
            // associated kernel not known, not matching
            return;
        }
        if (!onlyThisKernel || existingKernel.kernel === onlyThisKernel) {
            this.onDidChangeSelectedNotebookKernelBindingEmitter.fire({ notebook: notebook.uri, oldKernel: undefined, newKernel: existingKernel.kernel.id });
        }
    }
    registerNotebookKernelDetectionTask(notebookType) {
        var _a;
        const all = (_a = this.kernelDetectionTasks.get(notebookType)) !== null && _a !== void 0 ? _a : [];
        all.push(notebookType);
        this.kernelDetectionTasks.set(notebookType, all);
        this.onDidChangeKernelDetectionTasksEmitter.fire(notebookType);
        return core_1.Disposable.create(() => {
            var _a;
            const allTasks = (_a = this.kernelDetectionTasks.get(notebookType)) !== null && _a !== void 0 ? _a : [];
            const taskIndex = allTasks.indexOf(notebookType);
            if (taskIndex >= 0) {
                allTasks.splice(taskIndex, 1);
                this.kernelDetectionTasks.set(notebookType, allTasks);
                this.onDidChangeKernelDetectionTasksEmitter.fire(notebookType);
            }
        });
    }
    getKernelDetectionTasks(notebook) {
        var _a;
        return (_a = this.kernelDetectionTasks.get(notebook.viewType)) !== null && _a !== void 0 ? _a : [];
    }
    registerKernelSourceActionProvider(viewType, provider) {
        var _a, _b;
        const providers = (_a = this.kernelSourceActionProviders.get(viewType)) !== null && _a !== void 0 ? _a : [];
        providers.push(provider);
        this.kernelSourceActionProviders.set(viewType, providers);
        this.onDidChangeSourceActionsEmitter.fire({ viewType: viewType });
        const eventEmitterDisposable = (_b = provider.onDidChangeSourceActions) === null || _b === void 0 ? void 0 : _b.call(provider, () => {
            this.onDidChangeSourceActionsEmitter.fire({ viewType: viewType });
        });
        return core_1.Disposable.create(() => {
            var _a;
            const sourceProviders = (_a = this.kernelSourceActionProviders.get(viewType)) !== null && _a !== void 0 ? _a : [];
            const providerIndex = sourceProviders.indexOf(provider);
            if (providerIndex >= 0) {
                sourceProviders.splice(providerIndex, 1);
                this.kernelSourceActionProviders.set(viewType, sourceProviders);
            }
            eventEmitterDisposable === null || eventEmitterDisposable === void 0 ? void 0 : eventEmitterDisposable.dispose();
        });
    }
    async getKernelSourceActionsFromProviders(notebook) {
        var _a;
        const viewType = notebook.viewType;
        const providers = (_a = this.kernelSourceActionProviders.get(viewType)) !== null && _a !== void 0 ? _a : [];
        const promises = providers.map(provider => provider.provideKernelSourceActions());
        const allActions = await Promise.all(promises);
        return allActions.flat();
    }
};
exports.NotebookKernelService = NotebookKernelService;
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_service_1.NotebookService),
    tslib_1.__metadata("design:type", notebook_service_1.NotebookService)
], NotebookKernelService.prototype, "notebookService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.StorageService),
    tslib_1.__metadata("design:type", Object)
], NotebookKernelService.prototype, "storageService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], NotebookKernelService.prototype, "init", null);
exports.NotebookKernelService = NotebookKernelService = NotebookKernelService_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NotebookKernelService);
//# sourceMappingURL=notebook-kernel-service.js.map