"use strict";
// *****************************************************************************
// Copyright (C) 2021 Ericsson and others.
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
var UntitledWorkspaceExitDialog_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UntitledWorkspaceExitDialog = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@theia/core");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
let UntitledWorkspaceExitDialog = UntitledWorkspaceExitDialog_1 = class UntitledWorkspaceExitDialog extends browser_1.AbstractDialog {
    get value() {
        return this._value;
    }
    constructor(props) {
        super(props);
        this._value = 'Cancel';
        const messageNode = document.createElement('div');
        messageNode.textContent = core_1.nls.localizeByDefault('Save your workspace if you plan to open it again.');
        this.contentNode.appendChild(messageNode);
        this.dontSaveButton = this.createButton(core_1.nls.localizeByDefault("Don't Save" /* UntitledWorkspaceExitDialog.Values["Don't Save"] */));
        this.dontSaveButton.classList.add('secondary');
        this.controlPanel.appendChild(this.dontSaveButton);
        this.appendCloseButton(browser_1.Dialog.CANCEL);
        this.appendAcceptButton(core_1.nls.localizeByDefault("Save" /* UntitledWorkspaceExitDialog.Values.Save */));
    }
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        this.addAction(this.dontSaveButton, () => this.dontSave(), 'click');
    }
    addAcceptAction(element, ...additionalEventTypes) {
        this.addAction(element, () => this.doSave(), 'click');
    }
    dontSave() {
        this._value = "Don't Save" /* UntitledWorkspaceExitDialog.Values["Don't Save"] */;
        this.accept();
    }
    doSave() {
        this._value = "Save" /* UntitledWorkspaceExitDialog.Values.Save */;
        this.accept();
    }
};
exports.UntitledWorkspaceExitDialog = UntitledWorkspaceExitDialog;
exports.UntitledWorkspaceExitDialog = UntitledWorkspaceExitDialog = UntitledWorkspaceExitDialog_1 = tslib_1.__decorate([
    tslib_1.__param(0, (0, inversify_1.inject)(browser_1.DialogProps)),
    tslib_1.__metadata("design:paramtypes", [browser_1.DialogProps])
], UntitledWorkspaceExitDialog);
(function (UntitledWorkspaceExitDialog) {
    ;
})(UntitledWorkspaceExitDialog || (exports.UntitledWorkspaceExitDialog = UntitledWorkspaceExitDialog = {}));
//# sourceMappingURL=untitled-workspace-exit-dialog.js.map