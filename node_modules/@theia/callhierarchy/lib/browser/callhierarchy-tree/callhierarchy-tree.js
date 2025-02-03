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
exports.CallerNode = exports.ItemNode = exports.CallHierarchyTree = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const ts_md5_1 = require("ts-md5");
const cancellation_1 = require("@theia/core/lib/common/cancellation");
let CallHierarchyTree = class CallHierarchyTree extends browser_1.TreeImpl {
    set callHierarchyService(callHierarchyService) {
        this._callHierarchyService = callHierarchyService;
    }
    get callHierarchyService() {
        return this._callHierarchyService;
    }
    async resolveChildren(parent) {
        if (!this.callHierarchyService) {
            return Promise.resolve([]);
        }
        if (parent.children.length > 0) {
            return Promise.resolve([...parent.children]);
        }
        let definition;
        if (ItemNode.is(parent)) {
            definition = parent.definition;
        }
        else if (CallerNode.is(parent)) {
            definition = parent.caller.from;
        }
        if (definition) {
            const cancellationSource = new cancellation_1.CancellationTokenSource();
            const callers = await this.callHierarchyService.getCallers(definition, cancellationSource.token);
            if (!callers) {
                return Promise.resolve([]);
            }
            return this.toNodes(callers, parent);
        }
        return Promise.resolve([]);
    }
    toNodes(callers, parent) {
        return callers.map(caller => this.toNode(caller, parent));
    }
    toNode(caller, parent) {
        return CallerNode.create(caller, parent);
    }
};
exports.CallHierarchyTree = CallHierarchyTree;
exports.CallHierarchyTree = CallHierarchyTree = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], CallHierarchyTree);
var ItemNode;
(function (ItemNode) {
    function is(node) {
        return !!node && 'definition' in node;
    }
    ItemNode.is = is;
    function create(definition, parent) {
        const name = definition.name;
        const id = createId(definition, parent);
        return {
            id, definition, name, parent,
            visible: true,
            children: [],
            expanded: false,
            selected: false,
        };
    }
    ItemNode.create = create;
})(ItemNode || (exports.ItemNode = ItemNode = {}));
var CallerNode;
(function (CallerNode) {
    function is(node) {
        return !!node && 'caller' in node;
    }
    CallerNode.is = is;
    function create(caller, parent) {
        const callerDefinition = caller.from;
        const name = callerDefinition.name;
        const id = createId(callerDefinition, parent);
        return {
            id, caller, name, parent,
            visible: true,
            children: [],
            expanded: false,
            selected: false,
        };
    }
    CallerNode.create = create;
})(CallerNode || (exports.CallerNode = CallerNode = {}));
function createId(definition, parent) {
    const idPrefix = (parent) ? parent.id + '/' : '';
    const id = idPrefix + ts_md5_1.Md5.hashStr(JSON.stringify(definition));
    return id;
}
//# sourceMappingURL=callhierarchy-tree.js.map