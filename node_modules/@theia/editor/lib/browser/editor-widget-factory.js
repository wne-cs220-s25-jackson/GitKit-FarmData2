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
var EditorWidgetFactory_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorWidgetFactory = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const uri_1 = require("@theia/core/lib/common/uri");
const common_1 = require("@theia/core/lib/common");
const browser_1 = require("@theia/core/lib/browser");
const editor_widget_1 = require("./editor-widget");
const editor_1 = require("./editor");
let EditorWidgetFactory = EditorWidgetFactory_1 = class EditorWidgetFactory {
    constructor() {
        this.id = EditorWidgetFactory_1.ID;
    }
    static createID(uri, counter) {
        return EditorWidgetFactory_1.ID
            + `:${uri.toString()}`
            + (counter !== undefined ? `:${counter}` : '');
    }
    createWidget(options) {
        const uri = new uri_1.default(options.uri);
        return this.createEditor(uri, options);
    }
    async createEditor(uri, options) {
        const newEditor = await this.constructEditor(uri);
        this.setLabels(newEditor, uri);
        const labelListener = this.labelProvider.onDidChange(event => {
            if (event.affects(uri)) {
                this.setLabels(newEditor, uri);
            }
        });
        newEditor.onDispose(() => labelListener.dispose());
        newEditor.id = EditorWidgetFactory_1.createID(uri, options === null || options === void 0 ? void 0 : options.counter);
        newEditor.title.closable = true;
        return newEditor;
    }
    async constructEditor(uri) {
        const textEditor = await this.editorProvider(uri);
        return new editor_widget_1.EditorWidget(textEditor, this.selectionService);
    }
    setLabels(editor, uri) {
        editor.title.caption = uri.path.fsPath();
        if (editor.editor.isReadonly) {
            editor.title.caption += ` • ${common_1.nls.localizeByDefault('Read-only')}`;
        }
        const icon = this.labelProvider.getIcon(uri);
        editor.title.label = this.labelProvider.getName(uri);
        editor.title.iconClass = icon + ' file-icon';
    }
};
exports.EditorWidgetFactory = EditorWidgetFactory;
EditorWidgetFactory.ID = 'code-editor-opener';
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.LabelProvider),
    tslib_1.__metadata("design:type", browser_1.LabelProvider)
], EditorWidgetFactory.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(editor_1.TextEditorProvider),
    tslib_1.__metadata("design:type", Function)
], EditorWidgetFactory.prototype, "editorProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.SelectionService),
    tslib_1.__metadata("design:type", common_1.SelectionService)
], EditorWidgetFactory.prototype, "selectionService", void 0);
exports.EditorWidgetFactory = EditorWidgetFactory = EditorWidgetFactory_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], EditorWidgetFactory);
//# sourceMappingURL=editor-widget-factory.js.map