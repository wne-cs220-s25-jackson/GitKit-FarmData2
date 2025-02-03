"use strict";
// *****************************************************************************
// Copyright (C) 2018 Ericsson
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
exports.MonacoStatusBarContribution = exports.EDITOR_STATUS_EOL = exports.EDITOR_STATUS_TABBING_CONFIG = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
const browser_2 = require("@theia/editor/lib/browser");
const monaco_editor_1 = require("./monaco-editor");
exports.EDITOR_STATUS_TABBING_CONFIG = 'editor-status-tabbing-config';
exports.EDITOR_STATUS_EOL = 'editor-status-eol';
let MonacoStatusBarContribution = class MonacoStatusBarContribution {
    constructor() {
        this.toDispose = new core_1.DisposableCollection();
    }
    canHandle(widget) {
        if (widget instanceof browser_2.EditorWidget) {
            return Boolean(this.getModel(widget));
        }
        return false;
    }
    activate(statusBar, editor) {
        this.toDispose.dispose();
        const editorModel = this.getModel(editor);
        if (editorModel) {
            this.setConfigTabSizeWidget(statusBar, editorModel);
            this.setLineEndingWidget(statusBar, editorModel);
            this.toDispose.push(editorModel.onDidChangeOptions(() => {
                this.setConfigTabSizeWidget(statusBar, editorModel);
                this.setLineEndingWidget(statusBar, editorModel);
            }));
            let previous = editorModel.getEOL();
            this.toDispose.push(editorModel.onDidChangeContent(e => {
                if (previous !== e.eol) {
                    previous = e.eol;
                    this.setLineEndingWidget(statusBar, editorModel);
                }
            }));
        }
        else {
            this.deactivate(statusBar);
        }
    }
    deactivate(statusBar) {
        this.toDispose.dispose();
        this.removeConfigTabSizeWidget(statusBar);
        this.removeLineEndingWidget(statusBar);
    }
    setConfigTabSizeWidget(statusBar, model) {
        const modelOptions = model.getOptions();
        const tabSize = modelOptions.tabSize;
        const indentSize = modelOptions.indentSize;
        const spaceOrTabSizeMessage = modelOptions.insertSpaces
            ? core_1.nls.localizeByDefault('Spaces: {0}', indentSize)
            : core_1.nls.localizeByDefault('Tab Size: {0}', tabSize);
        statusBar.setElement(exports.EDITOR_STATUS_TABBING_CONFIG, {
            text: spaceOrTabSizeMessage,
            alignment: browser_1.StatusBarAlignment.RIGHT,
            priority: 10,
            command: browser_2.EditorCommands.CONFIG_INDENTATION.id,
            tooltip: core_1.nls.localizeByDefault('Select Indentation')
        });
    }
    removeConfigTabSizeWidget(statusBar) {
        statusBar.removeElement(exports.EDITOR_STATUS_TABBING_CONFIG);
    }
    setLineEndingWidget(statusBar, model) {
        const eol = model.getEOL();
        const text = eol === '\n' ? 'LF' : 'CRLF';
        statusBar.setElement(exports.EDITOR_STATUS_EOL, {
            text: `${text}`,
            alignment: browser_1.StatusBarAlignment.RIGHT,
            priority: 11,
            command: browser_2.EditorCommands.CONFIG_EOL.id,
            tooltip: core_1.nls.localizeByDefault('Select End of Line Sequence')
        });
    }
    removeLineEndingWidget(statusBar) {
        statusBar.removeElement(exports.EDITOR_STATUS_EOL);
    }
    getModel(editor) {
        const monacoEditor = monaco_editor_1.MonacoEditor.get(editor);
        return monacoEditor && monacoEditor.getControl().getModel() || undefined;
    }
};
exports.MonacoStatusBarContribution = MonacoStatusBarContribution;
exports.MonacoStatusBarContribution = MonacoStatusBarContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MonacoStatusBarContribution);
//# sourceMappingURL=monaco-status-bar-contribution.js.map