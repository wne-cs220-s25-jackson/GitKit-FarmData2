"use strict";
// *****************************************************************************
// Copyright (C) 2021 SAP SE or an SAP affiliate company and others.
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
// copied and modified from https://github.com/microsoft/vscode/blob/53eac52308c4611000a171cc7bf1214293473c78/src/vs/workbench/contrib/customEditor/browser/customEditors.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = exports.CustomEditorModelManager = exports.CustomEditorService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
let CustomEditorService = class CustomEditorService {
    constructor() {
        this._models = new CustomEditorModelManager();
    }
    get models() { return this._models; }
};
exports.CustomEditorService = CustomEditorService;
exports.CustomEditorService = CustomEditorService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], CustomEditorService);
class CustomEditorModelManager {
    constructor() {
        this.references = new Map();
    }
    add(resource, viewType, model) {
        const key = this.key(resource, viewType);
        const existing = this.references.get(key);
        if (existing) {
            throw new Error('Model already exists');
        }
        this.references.set(key, { viewType, model, counter: 0 });
        return this.tryRetain(resource, viewType);
    }
    async get(resource, viewType) {
        const key = this.key(resource, viewType);
        const entry = this.references.get(key);
        return entry === null || entry === void 0 ? void 0 : entry.model;
    }
    tryRetain(resource, viewType) {
        const key = this.key(resource, viewType);
        const entry = this.references.get(key);
        if (!entry) {
            return undefined;
        }
        entry.counter++;
        return entry.model.then(model => ({
            object: model,
            dispose: once(() => {
                if (--entry.counter <= 0) {
                    entry.model.then(x => x.dispose());
                    this.references.delete(key);
                }
            }),
        }));
    }
    disposeAllModelsForView(viewType) {
        for (const [key, value] of this.references) {
            if (value.viewType === viewType) {
                value.model.then(x => x.dispose());
                this.references.delete(key);
            }
        }
    }
    key(resource, viewType) {
        return `${resource.toString()}@@@${viewType}`;
    }
}
exports.CustomEditorModelManager = CustomEditorModelManager;
function once(fn) {
    const _this = this;
    let didCall = false;
    let result;
    return function () {
        if (didCall) {
            return result;
        }
        didCall = true;
        result = fn.apply(_this, arguments);
        return result;
    };
}
exports.once = once;
//# sourceMappingURL=custom-editor-service.js.map