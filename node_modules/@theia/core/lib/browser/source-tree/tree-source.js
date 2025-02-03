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
exports.TreeSource = exports.CompositeTreeElement = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
var CompositeTreeElement;
(function (CompositeTreeElement) {
    function is(element) {
        return (0, common_1.isObject)(element) && 'getElements' in element;
    }
    CompositeTreeElement.is = is;
    function hasElements(element) {
        return is(element) && element.hasElements !== false;
    }
    CompositeTreeElement.hasElements = hasElements;
})(CompositeTreeElement || (exports.CompositeTreeElement = CompositeTreeElement = {}));
let TreeSource = class TreeSource {
    fireDidChange() {
        this.onDidChangeEmitter.fire(undefined);
    }
    constructor(options = {}) {
        this.onDidChangeEmitter = new common_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
        this.toDispose = new common_1.DisposableCollection(this.onDidChangeEmitter);
        this.id = options.id;
        this.placeholder = options.placeholder;
    }
    dispose() {
        this.toDispose.dispose();
    }
};
exports.TreeSource = TreeSource;
exports.TreeSource = TreeSource = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.unmanaged)()),
    tslib_1.__metadata("design:paramtypes", [Object])
], TreeSource);
//# sourceMappingURL=tree-source.js.map