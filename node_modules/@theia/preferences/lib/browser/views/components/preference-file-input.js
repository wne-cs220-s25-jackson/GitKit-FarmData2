"use strict";
// *****************************************************************************
// Copyright (C) 2022 EclipseSource and others.
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
var PreferenceSingleFilePathInputRendererContribution_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceSingleFilePathInputRenderer = exports.PreferenceSingleFilePathInputRendererContribution = exports.FileNodeTypeDetails = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@theia/core/lib/common");
const nls_1 = require("@theia/core/lib/common/nls");
const inversify_1 = require("@theia/core/shared/inversify");
const file_dialog_service_1 = require("@theia/filesystem/lib/browser/file-dialog/file-dialog-service");
const browser_1 = require("@theia/workspace/lib/browser");
const preference_node_renderer_creator_1 = require("./preference-node-renderer-creator");
const preference_string_input_1 = require("./preference-string-input");
var FileNodeTypeDetails;
(function (FileNodeTypeDetails) {
    function is(typeDetails) {
        return (0, common_1.isObject)(typeDetails) && !!typeDetails.isFilepath;
    }
    FileNodeTypeDetails.is = is;
})(FileNodeTypeDetails || (exports.FileNodeTypeDetails = FileNodeTypeDetails = {}));
let PreferenceSingleFilePathInputRendererContribution = PreferenceSingleFilePathInputRendererContribution_1 = class PreferenceSingleFilePathInputRendererContribution extends preference_node_renderer_creator_1.PreferenceLeafNodeRendererContribution {
    constructor() {
        super(...arguments);
        this.id = PreferenceSingleFilePathInputRendererContribution_1.ID;
    }
    canHandleLeafNode(node) {
        var _a;
        const typeDetails = node.preference.data.typeDetails;
        return FileNodeTypeDetails.is(typeDetails) && !((_a = typeDetails.selectionProps) === null || _a === void 0 ? void 0 : _a.canSelectMany) ? 5 : 0;
    }
    createLeafNodeRenderer(container) {
        return container.get(PreferenceSingleFilePathInputRenderer);
    }
};
exports.PreferenceSingleFilePathInputRendererContribution = PreferenceSingleFilePathInputRendererContribution;
PreferenceSingleFilePathInputRendererContribution.ID = 'preference-single-file-path-input-renderer';
exports.PreferenceSingleFilePathInputRendererContribution = PreferenceSingleFilePathInputRendererContribution = PreferenceSingleFilePathInputRendererContribution_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PreferenceSingleFilePathInputRendererContribution);
let PreferenceSingleFilePathInputRenderer = class PreferenceSingleFilePathInputRenderer extends preference_string_input_1.PreferenceStringInputRenderer {
    get typeDetails() {
        return this.preferenceNode.preference.data.typeDetails;
    }
    createInputWrapper() {
        const inputWrapper = document.createElement('div');
        inputWrapper.classList.add('preference-file-container');
        return inputWrapper;
    }
    createInteractable(parent) {
        const inputWrapper = this.createInputWrapper();
        super.createInteractable(inputWrapper);
        this.interactable.classList.add('preference-file-input');
        this.createBrowseButton(inputWrapper);
        parent.appendChild(inputWrapper);
    }
    createBrowseButton(parent) {
        const button = document.createElement('button');
        button.classList.add('theia-button', 'main', 'preference-file-button');
        button.textContent = nls_1.nls.localize('theia/core/file/browse', 'Browse');
        const handler = this.browse.bind(this);
        button.onclick = handler;
        button.onkeydown = handler;
        button.tabIndex = 0;
        button.setAttribute('aria-label', 'Submit Preference Input');
        parent.appendChild(button);
    }
    async browse() {
        var _a;
        const selectionProps = this.typeDetails.selectionProps;
        const title = ((_a = selectionProps === null || selectionProps === void 0 ? void 0 : selectionProps.title) !== null && _a !== void 0 ? _a : selectionProps === null || selectionProps === void 0 ? void 0 : selectionProps.canSelectFolders) ? browser_1.WorkspaceCommands.OPEN_FOLDER.dialogLabel : browser_1.WorkspaceCommands.OPEN_FILE.dialogLabel;
        const selection = await this.fileDialogService.showOpenDialog({ title, ...selectionProps });
        if (selection) {
            this.setPreferenceImmediately(selection.path.fsPath());
        }
    }
    setPreferenceImmediately(value) {
        this.interactable.value = value;
        return super.setPreferenceImmediately(value);
    }
};
exports.PreferenceSingleFilePathInputRenderer = PreferenceSingleFilePathInputRenderer;
tslib_1.__decorate([
    (0, inversify_1.inject)(file_dialog_service_1.FileDialogService),
    tslib_1.__metadata("design:type", Object)
], PreferenceSingleFilePathInputRenderer.prototype, "fileDialogService", void 0);
exports.PreferenceSingleFilePathInputRenderer = PreferenceSingleFilePathInputRenderer = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PreferenceSingleFilePathInputRenderer);
//# sourceMappingURL=preference-file-input.js.map