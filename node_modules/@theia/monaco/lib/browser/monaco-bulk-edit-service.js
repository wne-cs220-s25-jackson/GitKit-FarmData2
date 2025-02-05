"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.MonacoBulkEditService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const monaco_workspace_1 = require("./monaco-workspace");
const bulkEditService_1 = require("@theia/monaco-editor-core/esm/vs/editor/browser/services/bulkEditService");
let MonacoBulkEditService = class MonacoBulkEditService {
    async apply(editsIn, options) {
        const edits = Array.isArray(editsIn) ? editsIn : bulkEditService_1.ResourceEdit.convert(editsIn);
        if (this._previewHandler && ((options === null || options === void 0 ? void 0 : options.showPreview) || edits.some(value => { var _a; return (_a = value.metadata) === null || _a === void 0 ? void 0 : _a.needsConfirmation; }))) {
            editsIn = await this._previewHandler(edits, options);
            return { ariaSummary: '', isApplied: true };
        }
        else {
            return this.workspace.applyBulkEdit(edits, options);
        }
    }
    hasPreviewHandler() {
        return Boolean(this._previewHandler);
    }
    setPreviewHandler(handler) {
        this._previewHandler = handler;
        const disposePreviewHandler = () => {
            if (this._previewHandler === handler) {
                this._previewHandler = undefined;
            }
        };
        return {
            dispose() {
                disposePreviewHandler();
            }
        };
    }
};
exports.MonacoBulkEditService = MonacoBulkEditService;
tslib_1.__decorate([
    (0, inversify_1.inject)(monaco_workspace_1.MonacoWorkspace),
    tslib_1.__metadata("design:type", monaco_workspace_1.MonacoWorkspace)
], MonacoBulkEditService.prototype, "workspace", void 0);
exports.MonacoBulkEditService = MonacoBulkEditService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MonacoBulkEditService);
//# sourceMappingURL=monaco-bulk-edit-service.js.map