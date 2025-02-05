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
exports.NotebookCellOutputModel = void 0;
const core_1 = require("@theia/core");
const common_1 = require("../../common");
const notebook_output_utils_1 = require("../notebook-output-utils");
class NotebookCellOutputModel {
    get outputId() {
        return this.rawOutput.outputId;
    }
    get outputs() {
        return this.rawOutput.outputs || [];
    }
    get metadata() {
        return this.rawOutput.metadata;
    }
    constructor(rawOutput) {
        this.rawOutput = rawOutput;
        this.didChangeDataEmitter = new core_1.Emitter();
        this.onDidChangeData = this.didChangeDataEmitter.event;
    }
    replaceData(rawData) {
        this.rawOutput = rawData;
        this.optimizeOutputItems();
        this.didChangeDataEmitter.fire();
    }
    appendData(items) {
        this.rawOutput.outputs.push(...items);
        this.optimizeOutputItems();
        this.didChangeDataEmitter.fire();
    }
    dispose() {
        this.didChangeDataEmitter.dispose();
    }
    getData() {
        return {
            outputs: this.outputs,
            metadata: this.metadata,
            outputId: this.outputId
        };
    }
    optimizeOutputItems() {
        if (this.outputs.length > 1 && this.outputs.every(item => (0, common_1.isTextStreamMime)(item.mime))) {
            // Look for the mimes in the items, and keep track of their order.
            // Merge the streams into one output item, per mime type.
            const mimeOutputs = new Map();
            const mimeTypes = [];
            this.outputs.forEach(item => {
                let items;
                if (mimeOutputs.has(item.mime)) {
                    items = mimeOutputs.get(item.mime);
                }
                else {
                    items = [];
                    mimeOutputs.set(item.mime, items);
                    mimeTypes.push(item.mime);
                }
                items.push(item.data.buffer);
            });
            this.outputs.length = 0;
            mimeTypes.forEach(mime => {
                const compressionResult = (0, notebook_output_utils_1.compressOutputItemStreams)(mimeOutputs.get(mime));
                this.outputs.push({
                    mime,
                    data: compressionResult.data
                });
            });
        }
    }
}
exports.NotebookCellOutputModel = NotebookCellOutputModel;
//# sourceMappingURL=notebook-cell-output-model.js.map