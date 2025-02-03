"use strict";
// *****************************************************************************
// Copyright (C) 2020 TypeFox and others.
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
exports.OutputResource = void 0;
const common_1 = require("@theia/core/lib/common");
class OutputResource {
    constructor(uri, editorModelRef) {
        this.uri = uri;
        this.editorModelRef = editorModelRef;
        this.onDidChangeContentsEmitter = new common_1.Emitter();
        this.toDispose = new common_1.DisposableCollection(this.onDidChangeContentsEmitter);
        this.editorModelRef.promise.then(modelRef => {
            if (this.toDispose.disposed) {
                modelRef.dispose();
                return;
            }
            const textModel = modelRef.object.textEditorModel;
            this._textModel = textModel;
            this.toDispose.push(modelRef);
            this.toDispose.push(this._textModel.onDidChangeContent(() => this.onDidChangeContentsEmitter.fire()));
        });
    }
    get textModel() {
        return this._textModel;
    }
    get onDidChangeContents() {
        return this.onDidChangeContentsEmitter.event;
    }
    async readContents(options) {
        if (this._textModel) {
            const modelRef = await this.editorModelRef.promise;
            return modelRef.object.textEditorModel.getValue();
        }
        return '';
    }
    dispose() {
        this.toDispose.dispose();
    }
}
exports.OutputResource = OutputResource;
//# sourceMappingURL=output-resource.js.map