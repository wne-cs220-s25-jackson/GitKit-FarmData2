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
// copied and modified from https://github.com/microsoft/vscode/blob/53eac52308c4611000a171cc7bf1214293473c78/src/vs/platform/undoRedo/common/undoRedoService.ts#
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceEditStack = exports.UndoRedoService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
let UndoRedoService = class UndoRedoService {
    constructor() {
        this.editStacks = new Map();
    }
    pushElement(resource, undo, redo) {
        let editStack;
        if (this.editStacks.has(resource.toString())) {
            editStack = this.editStacks.get(resource.toString());
        }
        else {
            editStack = new ResourceEditStack();
            this.editStacks.set(resource.toString(), editStack);
        }
        editStack.pushElement({ undo, redo });
    }
    removeElements(resource) {
        if (this.editStacks.has(resource.toString())) {
            this.editStacks.delete(resource.toString());
        }
    }
    undo(resource) {
        if (!this.editStacks.has(resource.toString())) {
            return;
        }
        const editStack = this.editStacks.get(resource.toString());
        const element = editStack.getClosestPastElement();
        if (!element) {
            return;
        }
        editStack.moveBackward(element);
        element.undo();
    }
    redo(resource) {
        if (!this.editStacks.has(resource.toString())) {
            return;
        }
        const editStack = this.editStacks.get(resource.toString());
        const element = editStack.getClosestFutureElement();
        if (!element) {
            return;
        }
        editStack.moveForward(element);
        element.redo();
    }
};
exports.UndoRedoService = UndoRedoService;
exports.UndoRedoService = UndoRedoService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], UndoRedoService);
class ResourceEditStack {
    constructor() {
        this.past = [];
        this.future = [];
    }
    pushElement(element) {
        this.future = [];
        this.past.push(element);
    }
    getClosestPastElement() {
        if (this.past.length === 0) {
            return undefined;
        }
        return this.past[this.past.length - 1];
    }
    getClosestFutureElement() {
        if (this.future.length === 0) {
            return undefined;
        }
        return this.future[this.future.length - 1];
    }
    moveBackward(element) {
        this.past.pop();
        this.future.push(element);
    }
    moveForward(element) {
        this.future.pop();
        this.past.push(element);
    }
}
exports.ResourceEditStack = ResourceEditStack;
//# sourceMappingURL=undo-redo-service.js.map