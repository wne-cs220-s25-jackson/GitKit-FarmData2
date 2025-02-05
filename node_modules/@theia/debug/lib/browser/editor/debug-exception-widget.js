"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
exports.DebugExceptionWidget = exports.DebugExceptionMonacoEditorZoneWidget = void 0;
const tslib_1 = require("tslib");
const React = require("@theia/core/shared/react");
const client_1 = require("@theia/core/shared/react-dom/client");
const monaco = require("@theia/monaco-editor-core");
const inversify_1 = require("@theia/core/shared/inversify");
const disposable_1 = require("@theia/core/lib/common/disposable");
const monaco_editor_zone_widget_1 = require("@theia/monaco/lib/browser/monaco-editor-zone-widget");
const debug_editor_1 = require("./debug-editor");
const nls_1 = require("@theia/core/lib/common/nls");
const widgets_1 = require("@theia/core/lib/browser/widgets");
class DebugExceptionMonacoEditorZoneWidget extends monaco_editor_zone_widget_1.MonacoEditorZoneWidget {
    computeContainerHeight(zoneHeight) {
        // reset height to match it to the content
        this.containerNode.style.height = 'initial';
        const height = this.containerNode.offsetHeight;
        const result = super.computeContainerHeight(zoneHeight);
        result.height = height;
        return result;
    }
}
exports.DebugExceptionMonacoEditorZoneWidget = DebugExceptionMonacoEditorZoneWidget;
let DebugExceptionWidget = class DebugExceptionWidget {
    constructor() {
        this.toDispose = new disposable_1.DisposableCollection();
    }
    init() {
        this.doInit();
    }
    async doInit() {
        this.toDispose.push(this.zone = new DebugExceptionMonacoEditorZoneWidget(this.editor.getControl()));
        this.zone.containerNode.classList.add('theia-debug-exception-widget');
        this.containerNodeRoot = (0, client_1.createRoot)(this.zone.containerNode);
        this.toDispose.push(disposable_1.Disposable.create(() => this.containerNodeRoot.unmount()));
        this.toDispose.push(this.editor.getControl().onDidLayoutChange(() => this.layout()));
    }
    dispose() {
        this.toDispose.dispose();
    }
    show({ info, lineNumber, column }) {
        this.render(info, () => {
            const fontInfo = this.editor.getControl().getOption(monaco.editor.EditorOption.fontInfo);
            this.zone.containerNode.style.fontSize = `${fontInfo.fontSize}px`;
            this.zone.containerNode.style.lineHeight = `${fontInfo.lineHeight}px`;
            if (lineNumber !== undefined && column !== undefined) {
                const afterLineNumber = lineNumber;
                const afterColumn = column;
                this.zone.show({ showFrame: true, afterLineNumber, afterColumn, heightInLines: 0, frameWidth: 1 });
            }
            this.layout();
        });
    }
    hide() {
        this.zone.hide();
    }
    render(info, cb) {
        const stackTrace = info.details && info.details.stackTrace;
        const exceptionTitle = info.id ?
            nls_1.nls.localizeByDefault('Exception has occurred: {0}', info.id) :
            nls_1.nls.localizeByDefault('Exception has occurred.');
        this.containerNodeRoot.render(React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'title', ref: cb },
                exceptionTitle,
                React.createElement("span", { id: "exception-close", className: (0, widgets_1.codicon)('close', true), onClick: () => this.hide(), title: nls_1.nls.localizeByDefault('Close') })),
            info.description && React.createElement("div", { className: 'description' }, info.description),
            stackTrace && React.createElement("div", { className: 'stack-trace' }, stackTrace)));
    }
    layout() {
        // reset height to match it to the content
        this.zone.containerNode.style.height = 'initial';
        const lineHeight = this.editor.getControl().getOption(monaco.editor.EditorOption.lineHeight);
        const heightInLines = Math.ceil(this.zone.containerNode.offsetHeight / lineHeight);
        this.zone.layout(heightInLines);
    }
};
exports.DebugExceptionWidget = DebugExceptionWidget;
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_editor_1.DebugEditor),
    tslib_1.__metadata("design:type", Object)
], DebugExceptionWidget.prototype, "editor", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DebugExceptionWidget.prototype, "init", null);
exports.DebugExceptionWidget = DebugExceptionWidget = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DebugExceptionWidget);
//# sourceMappingURL=debug-exception-widget.js.map