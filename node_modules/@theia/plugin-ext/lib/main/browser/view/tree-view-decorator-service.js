"use strict";
/********************************************************************************
 * Copyright (C) 2021 1C-Soft LLC and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
 ********************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindTreeViewDecoratorUtilities = exports.TreeViewDecoratorService = exports.TreeViewDecoratorAdapter = exports.TreeViewDecorator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const tree_decorator_1 = require("@theia/core/lib/browser/tree/tree-decorator");
const core_1 = require("@theia/core");
const uri_1 = require("@theia/core/lib/common/uri");
const browser_1 = require("@theia/filesystem/lib/browser");
exports.TreeViewDecorator = Symbol('TreeViewDecorator');
let TreeViewDecoratorAdapter = class TreeViewDecoratorAdapter extends browser_1.FileTreeDecoratorAdapter {
    getUriForNode(node) {
        if (this.isTreeItem(node)) {
            return new uri_1.default(node.resourceUri).toString();
        }
    }
    isTreeItem(node) {
        return (0, core_1.isObject)(node) && !!node.resourceUri;
    }
};
exports.TreeViewDecoratorAdapter = TreeViewDecoratorAdapter;
exports.TreeViewDecoratorAdapter = TreeViewDecoratorAdapter = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TreeViewDecoratorAdapter);
let TreeViewDecoratorService = class TreeViewDecoratorService extends tree_decorator_1.AbstractTreeDecoratorService {
    constructor(contributions) {
        super(contributions.getContributions());
    }
};
exports.TreeViewDecoratorService = TreeViewDecoratorService;
exports.TreeViewDecoratorService = TreeViewDecoratorService = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(core_1.ContributionProvider)),
    tslib_1.__param(0, (0, inversify_1.named)(exports.TreeViewDecorator)),
    tslib_1.__metadata("design:paramtypes", [Object])
], TreeViewDecoratorService);
function bindTreeViewDecoratorUtilities(bind) {
    bind(TreeViewDecoratorAdapter).toSelf().inSingletonScope();
    (0, core_1.bindContributionProvider)(bind, exports.TreeViewDecorator);
    bind(exports.TreeViewDecorator).toService(TreeViewDecoratorAdapter);
}
exports.bindTreeViewDecoratorUtilities = bindTreeViewDecoratorUtilities;
//# sourceMappingURL=tree-view-decorator-service.js.map