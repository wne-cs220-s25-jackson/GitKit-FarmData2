"use strict";
// *****************************************************************************
// Copyright (C) 2023 STMicroelectronics and others.
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
var TestResultWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResultWidget = void 0;
const tslib_1 = require("tslib");
const browser_1 = require("@theia/core/lib/browser");
const inversify_1 = require("@theia/core/shared/inversify");
const test_output_ui_model_1 = require("./test-output-ui-model");
const core_1 = require("@theia/core");
const test_service_1 = require("../test-service");
const markdown_renderer_1 = require("@theia/core/lib/browser/markdown-rendering/markdown-renderer");
const markdown_rendering_1 = require("@theia/core/lib/common/markdown-rendering");
const uri_1 = require("@theia/core/lib/common/uri");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
const navigation_location_service_1 = require("@theia/editor/lib/browser/navigation/navigation-location-service");
const navigation_location_1 = require("@theia/editor/lib/browser/navigation/navigation-location");
let TestResultWidget = TestResultWidget_1 = class TestResultWidget extends browser_1.BaseWidget {
    constructor() {
        super();
        this.toDisposeOnRender = new core_1.DisposableCollection();
        this.input = [];
        this.addClass('theia-test-result-view');
        this.id = TestResultWidget_1.ID;
        this.title.label = core_1.nls.localizeByDefault('Test Results');
        this.title.caption = core_1.nls.localizeByDefault('Test Results');
        this.title.iconClass = (0, browser_1.codicon)('checklist');
        this.title.closable = true;
        this.scrollOptions = {
            minScrollbarLength: 35,
        };
    }
    init() {
        this.uiModel.onDidChangeSelectedTestState(e => {
            if (test_service_1.TestFailure.is(e)) {
                this.setInput(e.messages);
            }
        });
    }
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        this.content = this.node.ownerDocument.createElement('div');
        this.node.append(this.content);
    }
    setInput(messages) {
        this.input = messages;
        this.update();
    }
    onUpdateRequest(msg) {
        this.render();
        super.onUpdateRequest(msg);
    }
    render() {
        this.toDisposeOnRender.dispose();
        this.toDisposeOnRender = new core_1.DisposableCollection();
        this.content.innerHTML = '';
        this.input.forEach(message => {
            if (markdown_rendering_1.MarkdownString.is(message.message)) {
                const line = this.markdownRenderer.render(message.message);
                this.content.append(line.element);
                this.toDisposeOnRender.push(line);
            }
            else {
                this.content.append(this.node.ownerDocument.createTextNode(message.message));
            }
            if (message.stackTrace) {
                const stackTraceElement = this.node.ownerDocument.createElement('div');
                message.stackTrace.map(frame => this.renderFrame(frame, stackTraceElement));
                this.content.append(stackTraceElement);
            }
        });
    }
    renderFrame(stackFrame, stackTraceElement) {
        const frameElement = stackTraceElement.ownerDocument.createElement('div');
        frameElement.classList.add('debug-frame');
        frameElement.append(`    ${core_1.nls.localize('theia/test/stackFrameAt', 'at')} ${stackFrame.label}`);
        // Add URI information as clickable links
        if (stackFrame.uri) {
            frameElement.append(' (');
            const uri = new uri_1.URI(stackFrame.uri);
            const link = this.node.ownerDocument.createElement('a');
            let content = `${this.labelProvider.getName(uri)}`;
            if (stackFrame.position) {
                // Display Position as a 1-based position, similar to Monaco ones.
                const monacoPosition = {
                    lineNumber: stackFrame.position.line + 1,
                    column: stackFrame.position.character + 1
                };
                content += `:${monacoPosition.lineNumber}:${monacoPosition.column}`;
            }
            link.textContent = content;
            link.href = `${uri}`;
            link.onclick = () => this.openUriInWorkspace(uri, stackFrame.position);
            frameElement.append(link);
            frameElement.append(')');
        }
        stackTraceElement.append(frameElement);
    }
    async openUriInWorkspace(uri, position) {
        this.fileService.resolve(uri).then(stat => {
            if (stat.isFile) {
                this.navigationService.reveal(navigation_location_1.NavigationLocation.create(uri, position !== null && position !== void 0 ? position : { line: 0, character: 0 }));
            }
        });
    }
    dispose() {
        this.toDisposeOnRender.dispose();
    }
};
exports.TestResultWidget = TestResultWidget;
TestResultWidget.ID = 'test-result-widget';
tslib_1.__decorate([
    (0, inversify_1.inject)(test_output_ui_model_1.TestOutputUIModel),
    tslib_1.__metadata("design:type", test_output_ui_model_1.TestOutputUIModel)
], TestResultWidget.prototype, "uiModel", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(markdown_renderer_1.MarkdownRenderer),
    tslib_1.__metadata("design:type", Object)
], TestResultWidget.prototype, "markdownRenderer", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.OpenerService),
    tslib_1.__metadata("design:type", Object)
], TestResultWidget.prototype, "openerService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], TestResultWidget.prototype, "fileService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(navigation_location_service_1.NavigationLocationService),
    tslib_1.__metadata("design:type", navigation_location_service_1.NavigationLocationService)
], TestResultWidget.prototype, "navigationService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.LabelProvider),
    tslib_1.__metadata("design:type", browser_1.LabelProvider)
], TestResultWidget.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TestResultWidget.prototype, "init", null);
exports.TestResultWidget = TestResultWidget = TestResultWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], TestResultWidget);
//# sourceMappingURL=test-result-widget.js.map