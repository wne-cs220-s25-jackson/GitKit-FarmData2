"use strict";
// *****************************************************************************
// Copyright (C) 2024 TypeFox and others.
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
exports.DomInputUndoRedoHandler = exports.UndoRedoHandlerService = exports.UndoRedoHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../common");
exports.UndoRedoHandler = Symbol('UndoRedoHandler');
let UndoRedoHandlerService = class UndoRedoHandlerService {
    init() {
        this.handlers = this.provider.getContributions().sort((a, b) => b.priority - a.priority);
    }
    undo() {
        for (const handler of this.handlers) {
            const selection = handler.select();
            if (selection) {
                handler.undo(selection);
                return;
            }
        }
    }
    redo() {
        for (const handler of this.handlers) {
            const selection = handler.select();
            if (selection) {
                handler.redo(selection);
                return;
            }
        }
    }
};
exports.UndoRedoHandlerService = UndoRedoHandlerService;
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(exports.UndoRedoHandler),
    tslib_1.__metadata("design:type", Object)
], UndoRedoHandlerService.prototype, "provider", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], UndoRedoHandlerService.prototype, "init", null);
exports.UndoRedoHandlerService = UndoRedoHandlerService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], UndoRedoHandlerService);
let DomInputUndoRedoHandler = class DomInputUndoRedoHandler {
    constructor() {
        this.priority = 1000;
    }
    select() {
        const element = document.activeElement;
        if (element && ['input', 'textarea'].includes(element.tagName.toLowerCase())) {
            return element;
        }
        return undefined;
    }
    undo(item) {
        document.execCommand('undo');
    }
    redo(item) {
        document.execCommand('redo');
    }
};
exports.DomInputUndoRedoHandler = DomInputUndoRedoHandler;
exports.DomInputUndoRedoHandler = DomInputUndoRedoHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DomInputUndoRedoHandler);
//# sourceMappingURL=undo-redo-handler.js.map