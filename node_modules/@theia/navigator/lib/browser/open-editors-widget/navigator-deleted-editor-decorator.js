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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigatorDeletedEditorDecorator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const filesystem_frontend_contribution_1 = require("@theia/filesystem/lib/browser/filesystem-frontend-contribution");
const core_1 = require("@theia/core");
const browser_2 = require("@theia/filesystem/lib/browser");
let NavigatorDeletedEditorDecorator = class NavigatorDeletedEditorDecorator {
    constructor() {
        this.id = 'theia-deleted-editor-decorator';
        this.onDidChangeDecorationsEmitter = new core_1.Emitter();
        this.onDidChangeDecorations = this.onDidChangeDecorationsEmitter.event;
        this.deletedURIs = new Set();
    }
    init() {
        this.fileSystemContribution.onDidChangeEditorFile(({ editor, type }) => {
            var _a;
            const uri = (_a = editor.getResourceUri()) === null || _a === void 0 ? void 0 : _a.toString();
            if (uri) {
                if (type === 2 /* FileChangeType.DELETED */) {
                    this.deletedURIs.add(uri);
                }
                else if (type === 1 /* FileChangeType.ADDED */) {
                    this.deletedURIs.delete(uri);
                }
                this.fireDidChangeDecorations((tree) => this.collectDecorators(tree));
            }
        });
        this.shell.onDidAddWidget(() => {
            const newDeletedURIs = new Set();
            this.shell.widgets.forEach(widget => {
                var _a;
                if (browser_1.NavigatableWidget.is(widget)) {
                    const uri = (_a = widget.getResourceUri()) === null || _a === void 0 ? void 0 : _a.toString();
                    if (uri && this.deletedURIs.has(uri)) {
                        newDeletedURIs.add(uri);
                    }
                }
            });
            this.deletedURIs = newDeletedURIs;
        });
    }
    decorations(tree) {
        return this.collectDecorators(tree);
    }
    collectDecorators(tree) {
        const result = new Map();
        if (tree.root === undefined) {
            return result;
        }
        for (const node of new browser_1.DepthFirstTreeIterator(tree.root)) {
            if (browser_2.FileStatNode.is(node)) {
                const uri = node.uri.toString();
                if (this.deletedURIs.has(uri)) {
                    const deletedDecoration = {
                        fontData: {
                            style: 'line-through',
                        }
                    };
                    result.set(node.id, deletedDecoration);
                }
            }
        }
        return result;
    }
    fireDidChangeDecorations(event) {
        this.onDidChangeDecorationsEmitter.fire(event);
    }
};
exports.NavigatorDeletedEditorDecorator = NavigatorDeletedEditorDecorator;
tslib_1.__decorate([
    (0, inversify_1.inject)(filesystem_frontend_contribution_1.FileSystemFrontendContribution),
    tslib_1.__metadata("design:type", filesystem_frontend_contribution_1.FileSystemFrontendContribution)
], NavigatorDeletedEditorDecorator.prototype, "fileSystemContribution", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.ApplicationShell),
    tslib_1.__metadata("design:type", browser_1.ApplicationShell)
], NavigatorDeletedEditorDecorator.prototype, "shell", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], NavigatorDeletedEditorDecorator.prototype, "init", null);
exports.NavigatorDeletedEditorDecorator = NavigatorDeletedEditorDecorator = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NavigatorDeletedEditorDecorator);
//# sourceMappingURL=navigator-deleted-editor-decorator.js.map