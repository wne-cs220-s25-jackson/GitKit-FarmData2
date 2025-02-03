"use strict";
// *****************************************************************************
// Copyright (C) 2023 Ericsson and others.
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
exports.FileDialogHiddenFilesToggleRenderer = exports.HiddenFilesToggleRendererFactory = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
const inversify_1 = require("@theia/core/shared/inversify");
const React = require("@theia/core/shared/react");
const file_dialog_tree_1 = require("./file-dialog-tree");
const TOGGLE_HIDDEN_PANEL_CLASS = 'theia-ToggleHiddenPanel';
const TOGGLE_HIDDEN_CONTAINER_CLASS = 'theia-ToggleHiddenInputContainer';
const CHECKBOX_CLASS = 'theia-ToggleHiddenInputCheckbox';
exports.HiddenFilesToggleRendererFactory = Symbol('HiddenFilesToggleRendererFactory');
class FileDialogHiddenFilesToggleRenderer extends browser_1.ReactRenderer {
    constructor() {
        super(...arguments);
        this.handleCheckboxChanged = (e) => this.onCheckboxChanged(e);
    }
    init() {
        this.host.classList.add(TOGGLE_HIDDEN_PANEL_CLASS);
        this.render();
    }
    doRender() {
        return (React.createElement("div", { className: TOGGLE_HIDDEN_CONTAINER_CLASS },
            core_1.nls.localize('theia/fileDialog/showHidden', 'Show hidden files'),
            React.createElement("input", { type: 'checkbox', className: CHECKBOX_CLASS, onChange: this.handleCheckboxChanged })));
    }
    onCheckboxChanged(e) {
        const { checked } = e.target;
        this.fileDialogTree.showHidden = checked;
        e.stopPropagation();
    }
}
exports.FileDialogHiddenFilesToggleRenderer = FileDialogHiddenFilesToggleRenderer;
tslib_1.__decorate([
    (0, inversify_1.inject)(file_dialog_tree_1.FileDialogTree),
    tslib_1.__metadata("design:type", file_dialog_tree_1.FileDialogTree)
], FileDialogHiddenFilesToggleRenderer.prototype, "fileDialogTree", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], FileDialogHiddenFilesToggleRenderer.prototype, "init", null);
//# sourceMappingURL=file-dialog-hidden-files-renderer.js.map