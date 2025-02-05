"use strict";
// *****************************************************************************
// Copyright (C) 2019 Red Hat, Inc. and others.
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
exports.TerminalCopyOnSelectionHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
let TerminalCopyOnSelectionHandler = class TerminalCopyOnSelectionHandler {
    constructor() {
        this.copyListener = (ev) => {
            if (this.interceptCopy && ev.clipboardData) {
                ev.clipboardData.setData('text/plain', this.textToCopy);
                ev.preventDefault();
            }
        };
    }
    init() {
        document.addEventListener('copy', this.copyListener);
    }
    async clipBoardCopyIsGranted() {
        // Unfortunately Firefox doesn't support permission check `clipboard-write`, so let try to copy anyway,
        if (browser_1.isFirefox) {
            return true;
        }
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const permissions = navigator.permissions;
            const { state } = await permissions.query({ name: 'clipboard-write' });
            if (state === 'granted') {
                return true;
            }
        }
        catch (e) { }
        return false;
    }
    executeCommandCopy() {
        try {
            this.interceptCopy = true;
            document.execCommand('copy');
            this.interceptCopy = false;
        }
        catch (e) {
            // do nothing
        }
    }
    async writeToClipBoard() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const clipboard = navigator.clipboard;
        if (!clipboard) {
            this.executeCommandCopy();
            return;
        }
        try {
            await clipboard.writeText(this.textToCopy);
        }
        catch (e) {
            this.executeCommandCopy();
        }
    }
    async copy(text) {
        this.textToCopy = text;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const permissions = navigator.permissions;
        if (permissions && permissions.query && await this.clipBoardCopyIsGranted()) {
            await this.writeToClipBoard();
        }
        else {
            this.executeCommandCopy();
        }
    }
};
exports.TerminalCopyOnSelectionHandler = TerminalCopyOnSelectionHandler;
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TerminalCopyOnSelectionHandler.prototype, "init", null);
exports.TerminalCopyOnSelectionHandler = TerminalCopyOnSelectionHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TerminalCopyOnSelectionHandler);
//# sourceMappingURL=terminal-copy-on-selection-handler.js.map