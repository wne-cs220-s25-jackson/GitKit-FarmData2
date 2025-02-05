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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoratedTreeNode = exports.TreeDecoration = exports.AbstractTreeDecoratorService = exports.NoopTreeDecoratorService = exports.TreeDecoratorService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const widget_decoration_1 = require("../widget-decoration");
exports.TreeDecoratorService = Symbol('TreeDecoratorService');
/**
 * The default tree decorator service. Does nothing at all. One has to rebind to a concrete implementation
 * if decorators have to be supported in the tree widget.
 */
let NoopTreeDecoratorService = class NoopTreeDecoratorService {
    constructor() {
        this.emitter = new common_1.Emitter();
        this.onDidChangeDecorations = this.emitter.event;
    }
    dispose() {
        this.emitter.dispose();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDecorations() {
        return new Map();
    }
    deflateDecorators() {
        return {};
    }
    inflateDecorators() {
        return new Map();
    }
};
exports.NoopTreeDecoratorService = NoopTreeDecoratorService;
exports.NoopTreeDecoratorService = NoopTreeDecoratorService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NoopTreeDecoratorService);
/**
 * Abstract decorator service implementation which emits events from all known tree decorators and caches the current state.
 */
let AbstractTreeDecoratorService = class AbstractTreeDecoratorService {
    constructor(decorators) {
        this.decorators = decorators;
        this.onDidChangeDecorationsEmitter = new common_1.Emitter();
        this.onDidChangeDecorations = this.onDidChangeDecorationsEmitter.event;
        this.toDispose = new common_1.DisposableCollection();
        this.toDispose.push(this.onDidChangeDecorationsEmitter);
        this.toDispose.pushAll(this.decorators.map(decorator => decorator.onDidChangeDecorations(data => this.onDidChangeDecorationsEmitter.fire(undefined))));
    }
    dispose() {
        this.toDispose.dispose();
    }
    async getDecorations(tree) {
        const changes = new Map();
        for (const decorator of this.decorators) {
            for (const [id, data] of (await decorator.decorations(tree)).entries()) {
                if (changes.has(id)) {
                    changes.get(id).push(data);
                }
                else {
                    changes.set(id, [data]);
                }
            }
        }
        return changes;
    }
    deflateDecorators(decorations) {
        // eslint-disable-next-line no-null/no-null
        const state = Object.create(null);
        for (const [id, data] of decorations) {
            state[id] = data;
        }
        return state;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inflateDecorators(state) {
        const decorators = new Map();
        for (const id of Object.keys(state)) {
            decorators.set(id, state[id]);
        }
        return decorators;
    }
};
exports.AbstractTreeDecoratorService = AbstractTreeDecoratorService;
exports.AbstractTreeDecoratorService = AbstractTreeDecoratorService = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.unmanaged)()),
    tslib_1.__metadata("design:paramtypes", [Array])
], AbstractTreeDecoratorService);
/**
 * @deprecated import from `@theia/core/lib/browser/widget-decoration` instead.
 */
exports.TreeDecoration = widget_decoration_1.WidgetDecoration;
var DecoratedTreeNode;
(function (DecoratedTreeNode) {
    /**
     * Type-guard for decorated tree nodes.
     */
    function is(node) {
        return !!node && 'decorationData' in node;
    }
    DecoratedTreeNode.is = is;
})(DecoratedTreeNode || (exports.DecoratedTreeNode = DecoratedTreeNode = {}));
//# sourceMappingURL=tree-decorator.js.map