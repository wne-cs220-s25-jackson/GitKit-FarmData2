"use strict";
// *****************************************************************************
// Copyright (C) 2024 Typefox and others.
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
exports.NotebookClipboardService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const clipboard_service_1 = require("@theia/core/lib/browser/clipboard-service");
const core_1 = require("@theia/core");
let NotebookClipboardService = class NotebookClipboardService {
    copyCell(cell) {
        this.copiedCell = cell.getData();
        if (core_1.environment.electron.is()) {
            this.clipboardService.writeText(cell.text);
        }
    }
    getCell() {
        return this.copiedCell;
    }
};
exports.NotebookClipboardService = NotebookClipboardService;
tslib_1.__decorate([
    (0, inversify_1.inject)(clipboard_service_1.ClipboardService),
    tslib_1.__metadata("design:type", Object)
], NotebookClipboardService.prototype, "clipboardService", void 0);
exports.NotebookClipboardService = NotebookClipboardService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NotebookClipboardService);
//# sourceMappingURL=notebook-clipboard-service.js.map