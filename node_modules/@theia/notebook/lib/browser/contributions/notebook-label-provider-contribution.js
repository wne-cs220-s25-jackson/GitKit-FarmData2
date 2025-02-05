"use strict";
// *****************************************************************************
// Copyright (C) 2024 TypeFox and others.
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
exports.NotebookLabelProviderContribution = void 0;
const tslib_1 = require("tslib");
const browser_1 = require("@theia/core/lib/browser");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("../../common");
const notebook_service_1 = require("../service/notebook-service");
const notebook_outline_contribution_1 = require("./notebook-outline-contribution");
const markdownit = require("@theia/core/shared/markdown-it");
let NotebookLabelProviderContribution = class NotebookLabelProviderContribution {
    constructor() {
        this.markdownIt = markdownit();
    }
    canHandle(element) {
        if (notebook_outline_contribution_1.NotebookCellOutlineNode.is(element)) {
            return 200;
        }
        return 0;
    }
    getIcon(element) {
        const cell = this.findCellByUri(element.uri);
        if (cell) {
            return cell.cellKind === common_1.CellKind.Markup ? (0, browser_1.codicon)('markdown') : (0, browser_1.codicon)('code');
        }
        return '';
    }
    getName(element) {
        const cell = this.findCellByUri(element.uri);
        if (cell) {
            return cell.cellKind === common_1.CellKind.Code ?
                cell.text.split('\n')[0] :
                this.extractPlaintext(this.markdownIt.parse(cell.text.split('\n')[0], {}));
        }
        return '';
    }
    getLongName(element) {
        const cell = this.findCellByUri(element.uri);
        if (cell) {
            return cell.cellKind === common_1.CellKind.Code ?
                cell.text.split('\n')[0] :
                this.extractPlaintext(this.markdownIt.parse(cell.text.split('\n')[0], {}));
        }
        return '';
    }
    extractPlaintext(parsedMarkdown) {
        return parsedMarkdown.map(token => token.children ? this.extractPlaintext(token.children) : token.content).join('');
    }
    findCellByUri(uri) {
        var _a;
        const parsed = common_1.CellUri.parse(uri);
        if (parsed) {
            return (_a = this.notebookService.getNotebookEditorModel(parsed.notebook)) === null || _a === void 0 ? void 0 : _a.cells.find(cell => cell.handle === (parsed === null || parsed === void 0 ? void 0 : parsed.handle));
        }
        return undefined;
    }
};
exports.NotebookLabelProviderContribution = NotebookLabelProviderContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_service_1.NotebookService),
    tslib_1.__metadata("design:type", notebook_service_1.NotebookService)
], NotebookLabelProviderContribution.prototype, "notebookService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.LabelProvider),
    tslib_1.__metadata("design:type", browser_1.LabelProvider)
], NotebookLabelProviderContribution.prototype, "labelProvider", void 0);
exports.NotebookLabelProviderContribution = NotebookLabelProviderContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NotebookLabelProviderContribution);
//# sourceMappingURL=notebook-label-provider-contribution.js.map