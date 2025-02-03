"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.OpenUriCommandHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const command_1 = require("@theia/core/lib/common/command");
const browser_1 = require("@theia/core/lib/browser");
const window_service_1 = require("@theia/core/lib/browser/window/window-service");
const DOMPurify = require("@theia/core/shared/dompurify");
const nls_1 = require("@theia/core/lib/common/nls");
let OpenUriCommandHandler = class OpenUriCommandHandler {
    constructor(windowService, commandService) {
        this.windowService = windowService;
        this.commandService = commandService;
        this.openNewTabDialog = new OpenNewTabDialog(windowService);
    }
    execute(resource) {
        if (!resource) {
            return;
        }
        const uriString = resource.toString();
        if (uriString.startsWith('http://') || uriString.startsWith('https://')) {
            this.openWebUri(uriString);
        }
        else {
            this.commandService.executeCommand('editor.action.openLink', uriString);
        }
    }
    openWebUri(uri) {
        try {
            this.windowService.openNewWindow(uri);
        }
        catch (err) {
            // browser has blocked opening of a new tab
            this.openNewTabDialog.showOpenNewTabDialog(uri);
        }
    }
};
exports.OpenUriCommandHandler = OpenUriCommandHandler;
OpenUriCommandHandler.COMMAND_METADATA = {
    id: 'theia.open'
};
exports.OpenUriCommandHandler = OpenUriCommandHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(window_service_1.WindowService)),
    tslib_1.__param(1, (0, inversify_1.inject)(command_1.CommandService)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], OpenUriCommandHandler);
class OpenNewTabDialog extends browser_1.AbstractDialog {
    constructor(windowService) {
        super({
            title: nls_1.nls.localize('theia/plugin/blockNewTab', 'Your browser prevented opening of a new tab')
        });
        this.windowService = windowService;
        this.linkNode = document.createElement('a');
        this.linkNode.target = '_blank';
        this.linkNode.setAttribute('style', 'color: var(--theia-editorWidget-foreground);');
        this.contentNode.appendChild(this.linkNode);
        const messageNode = document.createElement('div');
        messageNode.innerText = 'You are going to open: ';
        messageNode.appendChild(this.linkNode);
        this.contentNode.appendChild(messageNode);
        this.appendCloseButton();
        this.openButton = this.appendAcceptButton(nls_1.nls.localizeByDefault('Open'));
    }
    showOpenNewTabDialog(uri) {
        this.value = uri;
        this.linkNode.innerHTML = DOMPurify.sanitize(uri);
        this.linkNode.href = uri;
        this.openButton.onclick = () => {
            this.windowService.openNewWindow(uri);
        };
        // show dialog window to user
        this.open();
    }
}
//# sourceMappingURL=commands.js.map