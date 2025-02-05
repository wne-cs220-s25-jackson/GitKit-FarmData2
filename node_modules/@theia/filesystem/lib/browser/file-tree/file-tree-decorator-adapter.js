"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
exports.FileTreeDecoratorAdapter = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const uri_1 = require("@theia/core/lib/common/uri");
const common_1 = require("@theia/core/lib/common");
const decorations_service_1 = require("@theia/core/lib/browser/decorations-service");
const browser_1 = require("@theia/core/lib/browser");
const color_registry_1 = require("@theia/core/lib/browser/color-registry");
const file_tree_1 = require("./file-tree");
let FileTreeDecoratorAdapter = class FileTreeDecoratorAdapter {
    constructor() {
        this.id = 'decorations-service-tree-decorator-adapter';
        this.bubbleTooltip = common_1.nls.localizeByDefault('Contains emphasized items');
        this.onDidChangeDecorationsEmitter = new common_1.Emitter();
        this.decorationsByUri = new Map();
        this.parentDecorations = new Map();
    }
    get onDidChangeDecorations() {
        return this.onDidChangeDecorationsEmitter.event;
    }
    init() {
        this.decorationsService.onDidChangeDecorations(newDecorations => {
            this.updateDecorations(this.decorationsByUri.keys(), newDecorations.keys());
            this.fireDidChangeDecorations();
        });
    }
    decorations(tree) {
        return this.collectDecorations(tree);
    }
    collectDecorations(tree) {
        const decorations = new Map();
        if (tree.root) {
            for (const node of new browser_1.TopDownTreeIterator(tree.root)) {
                const uri = this.getUriForNode(node);
                if (uri) {
                    const stringified = uri.toString();
                    const ownDecoration = this.decorationsByUri.get(stringified);
                    const bubbledDecoration = this.parentDecorations.get(stringified);
                    const combined = this.mergeDecorations(ownDecoration, bubbledDecoration);
                    if (combined) {
                        decorations.set(node.id, combined);
                    }
                }
            }
        }
        return decorations;
    }
    mergeDecorations(ownDecoration, bubbledDecoration) {
        var _a, _b;
        if (!ownDecoration) {
            return bubbledDecoration;
        }
        else if (!bubbledDecoration) {
            return ownDecoration;
        }
        else {
            const tailDecorations = ((_a = bubbledDecoration.tailDecorations) !== null && _a !== void 0 ? _a : []).concat((_b = ownDecoration.tailDecorations) !== null && _b !== void 0 ? _b : []);
            return {
                ...bubbledDecoration,
                tailDecorations
            };
        }
    }
    updateDecorations(oldKeys, newKeys) {
        this.parentDecorations.clear();
        const newDecorations = new Map();
        const handleUri = (rawUri) => {
            if (!newDecorations.has(rawUri)) {
                const uri = new uri_1.default(rawUri);
                const decorations = this.decorationsService.getDecoration(uri, false);
                if (decorations.length) {
                    newDecorations.set(rawUri, this.toTheiaDecoration(decorations, false));
                    this.propagateDecorationsByUri(uri, decorations);
                }
            }
        };
        for (const rawUri of oldKeys) {
            handleUri(rawUri);
        }
        for (const rawUri of newKeys) {
            handleUri(rawUri);
        }
        this.decorationsByUri = newDecorations;
    }
    toTheiaDecoration(decorations, bubble) {
        const color = decorations[0].colorId ? `var(${this.colorRegistry.toCssVariableName(decorations[0].colorId)})` : undefined;
        const fontData = color ? { color } : undefined;
        return {
            priority: decorations[0].weight,
            fontData,
            tailDecorations: decorations.map(decoration => this.toTailDecoration(decoration, fontData, bubble))
        };
    }
    toTailDecoration(decoration, fontData, bubble) {
        var _a;
        if (bubble) {
            return { icon: 'circle', fontData, tooltip: this.bubbleTooltip };
        }
        return { data: (_a = decoration.letter) !== null && _a !== void 0 ? _a : '', fontData, tooltip: decoration.tooltip };
    }
    propagateDecorationsByUri(child, decorations) {
        const highestPriorityBubblingDecoration = decorations.find(decoration => decoration.bubble);
        if (highestPriorityBubblingDecoration) {
            const bubbleDecoration = this.toTheiaDecoration([highestPriorityBubblingDecoration], true);
            let parent = child.parent;
            let handledRoot = false;
            while (!handledRoot) {
                handledRoot = parent.path.isRoot;
                const parentString = parent.toString();
                const existingDecoration = this.parentDecorations.get(parentString);
                if (!existingDecoration || this.compareWeight(bubbleDecoration, existingDecoration) < 0) {
                    this.parentDecorations.set(parentString, bubbleDecoration);
                }
                else {
                    break;
                }
                parent = parent.parent;
            }
        }
    }
    /**
     *  Sort higher priorities earlier. I.e. positive number means right higher than left.
     */
    compareWeight(left, right) {
        var _a, _b;
        return ((_a = right.weight) !== null && _a !== void 0 ? _a : 0) - ((_b = left.weight) !== null && _b !== void 0 ? _b : 0);
    }
    getUriForNode(node) {
        return file_tree_1.FileStatNode.getUri(node);
    }
    fireDidChangeDecorations() {
        this.onDidChangeDecorationsEmitter.fire(tree => this.collectDecorations(tree));
    }
};
exports.FileTreeDecoratorAdapter = FileTreeDecoratorAdapter;
tslib_1.__decorate([
    (0, inversify_1.inject)(decorations_service_1.DecorationsService),
    tslib_1.__metadata("design:type", Object)
], FileTreeDecoratorAdapter.prototype, "decorationsService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(color_registry_1.ColorRegistry),
    tslib_1.__metadata("design:type", color_registry_1.ColorRegistry)
], FileTreeDecoratorAdapter.prototype, "colorRegistry", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], FileTreeDecoratorAdapter.prototype, "init", null);
exports.FileTreeDecoratorAdapter = FileTreeDecoratorAdapter = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FileTreeDecoratorAdapter);
//# sourceMappingURL=file-tree-decorator-adapter.js.map