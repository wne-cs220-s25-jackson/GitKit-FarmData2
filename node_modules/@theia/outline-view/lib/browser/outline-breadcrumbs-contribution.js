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
exports.OutlineBreadcrumb = exports.OutlineBreadcrumbsContribution = exports.BreadcrumbPopupOutlineView = exports.OUTLINE_BREADCRUMB_CONTAINER_CLASS = exports.BreadcrumbPopupOutlineViewFactory = exports.OutlineBreadcrumbType = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const outline_view_service_1 = require("./outline-view-service");
const outline_view_widget_1 = require("./outline-view-widget");
const common_1 = require("@theia/core/lib/common");
exports.OutlineBreadcrumbType = Symbol('OutlineBreadcrumb');
exports.BreadcrumbPopupOutlineViewFactory = Symbol('BreadcrumbPopupOutlineViewFactory');
exports.OUTLINE_BREADCRUMB_CONTAINER_CLASS = 'outline-element';
class BreadcrumbPopupOutlineView extends outline_view_widget_1.OutlineViewWidget {
    tapNode(node) {
        if (common_1.UriSelection.is(node) && outline_view_widget_1.OutlineSymbolInformationNode.hasRange(node)) {
            (0, browser_1.open)(this.openerService, node.uri, { selection: node.range });
        }
        else {
            this.outlineViewService.didTapNode(node);
            super.tapNode(node);
        }
    }
    cloneState(roots) {
        const nodes = this.reconcileTreeState(roots);
        const root = this.getRoot(nodes);
        this.model.root = this.inflateFromStorage(this.deflateForStorage(root));
    }
}
exports.BreadcrumbPopupOutlineView = BreadcrumbPopupOutlineView;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.OpenerService),
    tslib_1.__metadata("design:type", Object)
], BreadcrumbPopupOutlineView.prototype, "openerService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(outline_view_service_1.OutlineViewService),
    tslib_1.__metadata("design:type", outline_view_service_1.OutlineViewService)
], BreadcrumbPopupOutlineView.prototype, "outlineViewService", void 0);
let OutlineBreadcrumbsContribution = class OutlineBreadcrumbsContribution {
    constructor() {
        this.type = exports.OutlineBreadcrumbType;
        this.priority = 200;
        this.currentUri = undefined;
        this.currentBreadcrumbs = [];
        this.roots = [];
        this.onDidChangeBreadcrumbsEmitter = new common_1.Emitter();
    }
    get onDidChangeBreadcrumbs() {
        return this.onDidChangeBreadcrumbsEmitter.event;
    }
    init() {
        this.outlineView = this.outlineFactory();
        this.outlineView.node.style.height = 'auto';
        this.outlineView.node.style.maxHeight = '200px';
        this.outlineViewService.onDidChangeOutline(roots => {
            if (roots.length > 0) {
                this.roots = roots;
                const first = roots[0];
                if (common_1.UriSelection.is(first)) {
                    this.updateOutlineItems(first.uri, this.findSelectedNode(roots));
                }
            }
            else {
                this.currentBreadcrumbs = [];
                this.roots = [];
            }
        });
        this.outlineViewService.onDidSelect(node => {
            if (common_1.UriSelection.is(node)) {
                this.updateOutlineItems(node.uri, node);
            }
        });
    }
    async updateOutlineItems(uri, selectedNode) {
        this.currentUri = uri;
        const outlinePath = this.toOutlinePath(selectedNode);
        if (outlinePath && selectedNode) {
            this.currentBreadcrumbs = outlinePath.map((node, index) => new OutlineBreadcrumb(node, uri, index.toString(), this.labelProvider.getName(node), 'symbol-icon-center codicon codicon-symbol-' + node.iconClass, exports.OUTLINE_BREADCRUMB_CONTAINER_CLASS));
            if (selectedNode.children && selectedNode.children.length > 0) {
                this.currentBreadcrumbs.push(new OutlineBreadcrumb(selectedNode.children, uri, this.currentBreadcrumbs.length.toString(), '…', '', exports.OUTLINE_BREADCRUMB_CONTAINER_CLASS));
            }
        }
        else {
            this.currentBreadcrumbs = [];
            if (this.roots) {
                this.currentBreadcrumbs.push(new OutlineBreadcrumb(this.roots, uri, this.currentBreadcrumbs.length.toString(), '…', '', exports.OUTLINE_BREADCRUMB_CONTAINER_CLASS));
            }
        }
        this.onDidChangeBreadcrumbsEmitter.fire(uri);
    }
    async computeBreadcrumbs(uri) {
        if (this.currentUri && uri.toString() === this.currentUri.toString()) {
            return this.currentBreadcrumbs;
        }
        return [];
    }
    async attachPopupContent(breadcrumb, parent) {
        if (!OutlineBreadcrumb.is(breadcrumb)) {
            return undefined;
        }
        const node = Array.isArray(breadcrumb.node) ? breadcrumb.node[0] : breadcrumb.node;
        if (!node.parent) {
            return undefined;
        }
        const siblings = node.parent.children.filter((child) => outline_view_widget_1.OutlineSymbolInformationNode.is(child));
        const toDisposeOnHide = new common_1.DisposableCollection();
        this.outlineView.cloneState(siblings);
        this.outlineView.model.selectNode(node);
        this.outlineView.model.collapseAll();
        browser_1.Widget.attach(this.outlineView, parent);
        this.outlineView.activate();
        toDisposeOnHide.pushAll([
            this.outlineView.model.onExpansionChanged(expandedNode => browser_1.SelectableTreeNode.is(expandedNode) && this.outlineView.model.selectNode(expandedNode)),
            common_1.Disposable.create(() => {
                this.outlineView.model.root = undefined;
                browser_1.Widget.detach(this.outlineView);
            }),
        ]);
        return toDisposeOnHide;
    }
    /**
     * Returns the path of the given outline node.
     */
    toOutlinePath(node, path = []) {
        if (!node) {
            return undefined;
        }
        if (node.id === 'outline-view-root') {
            return path;
        }
        if (node.parent) {
            return this.toOutlinePath(node.parent, [node, ...path]);
        }
        else {
            return [node, ...path];
        }
    }
    /**
     * Find the node that is selected. Returns after the first match.
     */
    findSelectedNode(roots) {
        const result = roots.find(node => node.selected);
        if (result) {
            return result;
        }
        for (const node of roots) {
            const result2 = this.findSelectedNode(node.children.map(child => child));
            if (result2) {
                return result2;
            }
        }
    }
};
exports.OutlineBreadcrumbsContribution = OutlineBreadcrumbsContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.LabelProvider),
    tslib_1.__metadata("design:type", browser_1.LabelProvider)
], OutlineBreadcrumbsContribution.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(outline_view_service_1.OutlineViewService),
    tslib_1.__metadata("design:type", outline_view_service_1.OutlineViewService)
], OutlineBreadcrumbsContribution.prototype, "outlineViewService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.BreadcrumbsService),
    tslib_1.__metadata("design:type", browser_1.BreadcrumbsService)
], OutlineBreadcrumbsContribution.prototype, "breadcrumbsService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(exports.BreadcrumbPopupOutlineViewFactory),
    tslib_1.__metadata("design:type", Function)
], OutlineBreadcrumbsContribution.prototype, "outlineFactory", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OutlineBreadcrumbsContribution.prototype, "init", null);
exports.OutlineBreadcrumbsContribution = OutlineBreadcrumbsContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], OutlineBreadcrumbsContribution);
class OutlineBreadcrumb {
    constructor(node, uri, index, label, iconClass, containerClass) {
        this.node = node;
        this.uri = uri;
        this.index = index;
        this.label = label;
        this.iconClass = iconClass;
        this.containerClass = containerClass;
    }
    get id() {
        return this.type.toString() + '_' + this.uri.toString() + '_' + this.index;
    }
    get type() {
        return exports.OutlineBreadcrumbType;
    }
    get longLabel() {
        return this.label;
    }
}
exports.OutlineBreadcrumb = OutlineBreadcrumb;
(function (OutlineBreadcrumb) {
    function is(breadcrumb) {
        return 'node' in breadcrumb && 'uri' in breadcrumb;
    }
    OutlineBreadcrumb.is = is;
})(OutlineBreadcrumb || (exports.OutlineBreadcrumb = OutlineBreadcrumb = {}));
//# sourceMappingURL=outline-breadcrumbs-contribution.js.map