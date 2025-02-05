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
exports.FilepathBreadcrumbsContribution = exports.FilepathBreadcrumbType = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@theia/core");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const filepath_breadcrumb_1 = require("./filepath-breadcrumb");
const filepath_breadcrumbs_container_1 = require("./filepath-breadcrumbs-container");
const file_tree_1 = require("../file-tree");
const file_service_1 = require("../file-service");
exports.FilepathBreadcrumbType = Symbol('FilepathBreadcrumb');
let FilepathBreadcrumbsContribution = class FilepathBreadcrumbsContribution {
    constructor() {
        this.onDidChangeBreadcrumbsEmitter = new core_1.Emitter();
        this.type = exports.FilepathBreadcrumbType;
        this.priority = 100;
    }
    get onDidChangeBreadcrumbs() {
        return this.onDidChangeBreadcrumbsEmitter.event;
    }
    async computeBreadcrumbs(uri) {
        if (uri.scheme !== 'file') {
            return [];
        }
        const getContainerClass = this.getContainerClassCreator(uri);
        const getIconClass = this.getIconClassCreator(uri);
        return uri.allLocations
            .map((location, index) => {
            const icon = getIconClass(location, index);
            const containerClass = getContainerClass(location, index);
            return new filepath_breadcrumb_1.FilepathBreadcrumb(location, this.labelProvider.getName(location), this.labelProvider.getLongName(location), icon, containerClass);
        })
            .filter(b => this.filterBreadcrumbs(uri, b))
            .reverse();
    }
    getContainerClassCreator(fileURI) {
        return (location, index) => location.isEqual(fileURI) ? 'file' : 'folder';
    }
    getIconClassCreator(fileURI) {
        return (location, index) => location.isEqual(fileURI) ? this.labelProvider.getIcon(location) + ' file-icon' : '';
    }
    filterBreadcrumbs(_, breadcrumb) {
        return !breadcrumb.uri.path.isRoot;
    }
    async attachPopupContent(breadcrumb, parent) {
        if (!filepath_breadcrumb_1.FilepathBreadcrumb.is(breadcrumb)) {
            return undefined;
        }
        const folderFileStat = await this.fileSystem.resolve(breadcrumb.uri.parent);
        if (folderFileStat) {
            const rootNode = await this.createRootNode(folderFileStat);
            if (rootNode) {
                const { model } = this.breadcrumbsFileTreeWidget;
                await model.navigateTo({ ...rootNode, visible: false });
                browser_1.Widget.attach(this.breadcrumbsFileTreeWidget, parent);
                const toDisposeOnTreePopulated = model.onChanged(() => {
                    if (browser_1.CompositeTreeNode.is(model.root) && model.root.children.length > 0) {
                        toDisposeOnTreePopulated.dispose();
                        const targetNode = model.getNode(breadcrumb.uri.path.toString());
                        if (targetNode && browser_1.SelectableTreeNode.is(targetNode)) {
                            model.selectNode(targetNode);
                        }
                        this.breadcrumbsFileTreeWidget.activate();
                    }
                });
                return {
                    dispose: () => {
                        // Clear model otherwise the next time a popup is opened the old model is rendered first
                        // and is shown for a short time period.
                        toDisposeOnTreePopulated.dispose();
                        this.breadcrumbsFileTreeWidget.model.root = undefined;
                        browser_1.Widget.detach(this.breadcrumbsFileTreeWidget);
                    }
                };
            }
        }
    }
    async createRootNode(folderToOpen) {
        const folderUri = folderToOpen.resource;
        const rootUri = folderToOpen.isDirectory ? folderUri : folderUri.parent;
        const rootStat = await this.fileSystem.resolve(rootUri);
        if (rootStat) {
            return file_tree_1.DirNode.createRoot(rootStat);
        }
    }
};
exports.FilepathBreadcrumbsContribution = FilepathBreadcrumbsContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.LabelProvider),
    tslib_1.__metadata("design:type", browser_1.LabelProvider)
], FilepathBreadcrumbsContribution.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], FilepathBreadcrumbsContribution.prototype, "fileSystem", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(filepath_breadcrumbs_container_1.BreadcrumbsFileTreeWidget),
    tslib_1.__metadata("design:type", filepath_breadcrumbs_container_1.BreadcrumbsFileTreeWidget)
], FilepathBreadcrumbsContribution.prototype, "breadcrumbsFileTreeWidget", void 0);
exports.FilepathBreadcrumbsContribution = FilepathBreadcrumbsContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FilepathBreadcrumbsContribution);
//# sourceMappingURL=filepath-breadcrumbs-contribution.js.map