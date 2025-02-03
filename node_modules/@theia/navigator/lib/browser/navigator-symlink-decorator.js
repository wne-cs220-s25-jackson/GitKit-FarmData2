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
exports.NavigatorSymlinkDecorator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
const browser_2 = require("@theia/filesystem/lib/browser");
const decorations_service_1 = require("@theia/core/lib/browser/decorations-service");
let NavigatorSymlinkDecorator = class NavigatorSymlinkDecorator {
    constructor() {
        this.id = 'theia-navigator-symlink-decorator';
        this.onDidChangeDecorationsEmitter = new core_1.Emitter();
    }
    init() {
        this.decorationsService.onDidChangeDecorations(() => {
            this.fireDidChangeDecorations((tree) => this.collectDecorator(tree));
        });
    }
    async decorations(tree) {
        return this.collectDecorator(tree);
    }
    collectDecorator(tree) {
        const result = new Map();
        if (tree.root === undefined) {
            return result;
        }
        for (const node of new browser_1.DepthFirstTreeIterator(tree.root)) {
            if (browser_2.FileStatNode.is(node) && node.fileStat.isSymbolicLink) {
                const decorations = {
                    tailDecorations: [{ data: '⤷', tooltip: core_1.nls.localizeByDefault('Symbolic Link') }]
                };
                result.set(node.id, decorations);
            }
        }
        return result;
    }
    get onDidChangeDecorations() {
        return this.onDidChangeDecorationsEmitter.event;
    }
    fireDidChangeDecorations(event) {
        this.onDidChangeDecorationsEmitter.fire(event);
    }
};
exports.NavigatorSymlinkDecorator = NavigatorSymlinkDecorator;
tslib_1.__decorate([
    (0, inversify_1.inject)(decorations_service_1.DecorationsService),
    tslib_1.__metadata("design:type", Object)
], NavigatorSymlinkDecorator.prototype, "decorationsService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], NavigatorSymlinkDecorator.prototype, "init", null);
exports.NavigatorSymlinkDecorator = NavigatorSymlinkDecorator = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NavigatorSymlinkDecorator);
//# sourceMappingURL=navigator-symlink-decorator.js.map