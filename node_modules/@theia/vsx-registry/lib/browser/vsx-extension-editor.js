"use strict";
// *****************************************************************************
// Copyright (C) 2020 TypeFox and others.
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
var VSXExtensionEditor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VSXExtensionEditor = void 0;
const tslib_1 = require("tslib");
const React = require("@theia/core/shared/react");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const vsx_extension_1 = require("./vsx-extension");
const vsx_extensions_model_1 = require("./vsx-extensions-model");
const promise_util_1 = require("@theia/core/lib/common/promise-util");
const nls_1 = require("@theia/core/lib/common/nls");
let VSXExtensionEditor = VSXExtensionEditor_1 = class VSXExtensionEditor extends browser_1.ReactWidget {
    constructor() {
        super(...arguments);
        this.deferredScrollContainer = new promise_util_1.Deferred();
        this.resolveScrollContainer = (element) => {
            if (!element) {
                this.deferredScrollContainer.reject(new Error('element is null'));
            }
            else if (!element.scrollContainer) {
                this.deferredScrollContainer.reject(new Error('element.scrollContainer is undefined'));
            }
            else {
                this.deferredScrollContainer.resolve(element.scrollContainer);
            }
        };
    }
    init() {
        this.addClass('theia-vsx-extension-editor');
        this.id = VSXExtensionEditor_1.ID + ':' + this.extension.id;
        this.title.closable = true;
        this.updateTitle();
        this.title.iconClass = (0, browser_1.codicon)('list-selection');
        this.node.tabIndex = -1;
        this.update();
        this.toDispose.push(this.model.onDidChange(() => this.update()));
    }
    getScrollContainer() {
        return this.deferredScrollContainer.promise;
    }
    onActivateRequest(msg) {
        super.onActivateRequest(msg);
        this.node.focus();
    }
    onUpdateRequest(msg) {
        super.onUpdateRequest(msg);
        this.updateTitle();
    }
    onAfterShow(msg) {
        super.onAfterShow(msg);
        this.update();
    }
    updateTitle() {
        const label = nls_1.nls.localizeByDefault('Extension: {0}', (this.extension.displayName || this.extension.name));
        this.title.label = label;
        this.title.caption = label;
    }
    onResize(msg) {
        super.onResize(msg);
        this.update();
    }
    ;
    render() {
        return React.createElement(vsx_extension_1.VSXExtensionEditorComponent, { ref: this.resolveScrollContainer, extension: this.extension });
    }
};
exports.VSXExtensionEditor = VSXExtensionEditor;
VSXExtensionEditor.ID = 'vsx-extension-editor';
tslib_1.__decorate([
    (0, inversify_1.inject)(vsx_extension_1.VSXExtension),
    tslib_1.__metadata("design:type", vsx_extension_1.VSXExtension)
], VSXExtensionEditor.prototype, "extension", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(vsx_extensions_model_1.VSXExtensionsModel),
    tslib_1.__metadata("design:type", vsx_extensions_model_1.VSXExtensionsModel)
], VSXExtensionEditor.prototype, "model", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], VSXExtensionEditor.prototype, "init", null);
exports.VSXExtensionEditor = VSXExtensionEditor = VSXExtensionEditor_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], VSXExtensionEditor);
//# sourceMappingURL=vsx-extension-editor.js.map