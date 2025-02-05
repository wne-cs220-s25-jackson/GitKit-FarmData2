"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
exports.FileTreeWidget = exports.FILE_STAT_ICON_CLASS = exports.DIR_NODE_CLASS = exports.FILE_STAT_NODE_CLASS = exports.FILE_TREE_CLASS = void 0;
const tslib_1 = require("tslib");
const React = require("@theia/core/shared/react");
const inversify_1 = require("@theia/core/shared/inversify");
const disposable_1 = require("@theia/core/lib/common/disposable");
const uri_1 = require("@theia/core/lib/common/uri");
const selection_1 = require("@theia/core/lib/common/selection");
const cancellation_1 = require("@theia/core/lib/common/cancellation");
const browser_1 = require("@theia/core/lib/browser");
const file_upload_service_1 = require("../file-upload-service");
const file_tree_1 = require("./file-tree");
const file_tree_model_1 = require("./file-tree-model");
const icon_theme_service_1 = require("@theia/core/lib/browser/icon-theme-service");
const shell_1 = require("@theia/core/lib/browser/shell");
const files_1 = require("../../common/files");
const core_1 = require("@theia/core");
exports.FILE_TREE_CLASS = 'theia-FileTree';
exports.FILE_STAT_NODE_CLASS = 'theia-FileStatNode';
exports.DIR_NODE_CLASS = 'theia-DirNode';
exports.FILE_STAT_ICON_CLASS = 'theia-FileStatIcon';
let FileTreeWidget = class FileTreeWidget extends browser_1.CompressedTreeWidget {
    constructor(props, model, contextMenuRenderer) {
        super(props, model, contextMenuRenderer);
        this.model = model;
        this.toCancelNodeExpansion = new disposable_1.DisposableCollection();
        this.addClass(exports.FILE_TREE_CLASS);
        this.toDispose.push(this.toCancelNodeExpansion);
    }
    createNodeClassNames(node, props) {
        const classNames = super.createNodeClassNames(node, props);
        if (file_tree_1.FileStatNode.is(node)) {
            classNames.push(exports.FILE_STAT_NODE_CLASS);
        }
        if (file_tree_1.DirNode.is(node)) {
            classNames.push(exports.DIR_NODE_CLASS);
        }
        return classNames;
    }
    renderIcon(node, props) {
        const icon = this.toNodeIcon(node);
        if (icon) {
            return React.createElement("div", { className: icon + ' file-icon' });
        }
        // eslint-disable-next-line no-null/no-null
        return null;
    }
    createContainerAttributes() {
        const attrs = super.createContainerAttributes();
        return {
            ...attrs,
            onDragEnter: event => this.handleDragEnterEvent(this.model.root, event),
            onDragOver: event => this.handleDragOverEvent(this.model.root, event),
            onDragLeave: event => this.handleDragLeaveEvent(this.model.root, event),
            onDrop: event => this.handleDropEvent(this.model.root, event)
        };
    }
    createNodeAttributes(node, props) {
        return {
            ...super.createNodeAttributes(node, props),
            ...this.getNodeDragHandlers(node, props),
            title: this.getNodeTooltip(node)
        };
    }
    getNodeTooltip(node) {
        var _a, _b;
        const operativeNode = (_b = (_a = this.compressionService.getCompressionChain(node)) === null || _a === void 0 ? void 0 : _a.tail()) !== null && _b !== void 0 ? _b : node;
        const uri = selection_1.UriSelection.getUri(operativeNode);
        return uri ? uri.path.fsPath() : undefined;
    }
    getCaptionChildEventHandlers(node, props) {
        return {
            ...super.getCaptionChildEventHandlers(node, props),
            ...this.getNodeDragHandlers(node, props),
        };
    }
    getNodeDragHandlers(node, props) {
        return {
            onDragStart: event => this.handleDragStartEvent(node, event),
            onDragEnter: event => this.handleDragEnterEvent(node, event),
            onDragOver: event => this.handleDragOverEvent(node, event),
            onDragLeave: event => this.handleDragLeaveEvent(node, event),
            onDrop: event => this.handleDropEvent(node, event),
            draggable: file_tree_1.FileStatNode.is(node),
        };
    }
    handleDragStartEvent(node, event) {
        event.stopPropagation();
        if (event.dataTransfer) {
            let selectedNodes;
            if (this.model.selectedNodes.find(selected => browser_1.TreeNode.equals(selected, node))) {
                selectedNodes = [...this.model.selectedNodes];
            }
            else {
                selectedNodes = [node];
            }
            this.setSelectedTreeNodesAsData(event.dataTransfer, node, selectedNodes);
            const uris = selectedNodes.filter(file_tree_1.FileStatNode.is).map(n => n.fileStat.resource);
            if (uris.length > 0) {
                shell_1.ApplicationShell.setDraggedEditorUris(event.dataTransfer, uris);
            }
            let label;
            if (selectedNodes.length === 1) {
                label = this.toNodeName(node);
            }
            else {
                label = String(selectedNodes.length);
            }
            const dragImage = document.createElement('div');
            dragImage.className = 'theia-file-tree-drag-image';
            dragImage.textContent = label;
            document.body.appendChild(dragImage);
            event.dataTransfer.setDragImage(dragImage, -10, -10);
            setTimeout(() => document.body.removeChild(dragImage), 0);
        }
    }
    handleDragEnterEvent(node, event) {
        event.preventDefault();
        event.stopPropagation();
        this.toCancelNodeExpansion.dispose();
        const containing = file_tree_1.DirNode.getContainingDir(node);
        if (!!containing && !containing.selected) {
            this.model.selectNode(containing);
        }
    }
    handleDragOverEvent(node, event) {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = this.getDropEffect(event);
        if (!this.toCancelNodeExpansion.disposed) {
            return;
        }
        const timer = setTimeout(() => {
            const containing = file_tree_1.DirNode.getContainingDir(node);
            if (!!containing && !containing.expanded) {
                this.model.expandNode(containing);
            }
        }, 500);
        this.toCancelNodeExpansion.push(disposable_1.Disposable.create(() => clearTimeout(timer)));
    }
    handleDragLeaveEvent(node, event) {
        event.preventDefault();
        event.stopPropagation();
        this.toCancelNodeExpansion.dispose();
    }
    async handleDropEvent(node, event) {
        try {
            event.preventDefault();
            event.stopPropagation();
            event.dataTransfer.dropEffect = this.getDropEffect(event);
            const containing = this.getDropTargetDirNode(node);
            if (containing) {
                const resources = this.getSelectedTreeNodesFromData(event.dataTransfer);
                if (resources.length > 0) {
                    for (const treeNode of resources) {
                        if (event.dataTransfer.dropEffect === 'copy' && file_tree_1.FileStatNode.is(treeNode)) {
                            await this.model.copy(treeNode.uri, containing);
                        }
                        else {
                            await this.model.move(treeNode, containing);
                        }
                    }
                }
                else {
                    await this.uploadService.upload(containing.uri, { source: event.dataTransfer });
                }
            }
        }
        catch (e) {
            if (!(0, cancellation_1.isCancelled)(e)) {
                console.error(e);
            }
        }
    }
    getDropTargetDirNode(node) {
        if (browser_1.CompositeTreeNode.is(node) && node.id === 'WorkspaceNodeId') {
            if (node.children.length === 1) {
                return file_tree_1.DirNode.getContainingDir(node.children[0]);
            }
            else if (node.children.length > 1) {
                // move file to the last root folder in multi-root scenario
                return file_tree_1.DirNode.getContainingDir(node.children[node.children.length - 1]);
            }
        }
        return file_tree_1.DirNode.getContainingDir(node);
    }
    getDropEffect(event) {
        const isCopy = core_1.isOSX ? event.altKey : event.ctrlKey;
        return isCopy ? 'copy' : 'move';
    }
    setTreeNodeAsData(data, node) {
        data.setData('tree-node', node.id);
    }
    setSelectedTreeNodesAsData(data, sourceNode, relatedNodes) {
        this.setTreeNodeAsData(data, sourceNode);
        data.setData('selected-tree-nodes', JSON.stringify(relatedNodes.map(node => node.id)));
    }
    getTreeNodeFromData(data) {
        const id = data.getData('tree-node');
        return this.model.getNode(id);
    }
    getSelectedTreeNodesFromData(data) {
        const resources = data.getData('selected-tree-nodes');
        if (!resources) {
            return [];
        }
        const ids = JSON.parse(resources);
        return ids.map(id => this.model.getNode(id)).filter(node => node !== undefined);
    }
    get hidesExplorerArrows() {
        const theme = this.iconThemeService.getDefinition(this.iconThemeService.current);
        return !!theme && !!theme.hidesExplorerArrows;
    }
    renderExpansionToggle(node, props) {
        if (this.hidesExplorerArrows) {
            // eslint-disable-next-line no-null/no-null
            return null;
        }
        return super.renderExpansionToggle(node, props);
    }
    getPaddingLeft(node, props) {
        if (this.hidesExplorerArrows) {
            // additional left padding instead of top-level expansion toggle
            return super.getPaddingLeft(node, props) + this.props.leftPadding;
        }
        return super.getPaddingLeft(node, props);
    }
    needsExpansionTogglePadding(node) {
        const theme = this.iconThemeService.getDefinition(this.iconThemeService.current);
        if (theme && (theme.hidesExplorerArrows || (theme.hasFileIcons && !theme.hasFolderIcons))) {
            return false;
        }
        return super.needsExpansionTogglePadding(node);
    }
    deflateForStorage(node) {
        const deflated = super.deflateForStorage(node);
        if (file_tree_1.FileStatNode.is(node) && file_tree_1.FileStatNodeData.is(deflated)) {
            deflated.uri = node.uri.toString();
            delete deflated['fileStat'];
            deflated.stat = files_1.FileStat.toStat(node.fileStat);
        }
        return deflated;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inflateFromStorage(node, parent) {
        if (file_tree_1.FileStatNodeData.is(node)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const fileStatNode = node;
            const resource = new uri_1.default(node.uri);
            fileStatNode.uri = resource;
            let stat;
            // in order to support deprecated FileStat
            if (node.fileStat) {
                stat = {
                    type: node.fileStat.isDirectory ? files_1.FileType.Directory : files_1.FileType.File,
                    mtime: node.fileStat.mtime,
                    size: node.fileStat.size
                };
                delete node['fileStat'];
            }
            else if (node.stat) {
                stat = node.stat;
                delete node['stat'];
            }
            if (stat) {
                fileStatNode.fileStat = files_1.FileStat.fromStat(resource, stat);
            }
        }
        const inflated = super.inflateFromStorage(node, parent);
        if (file_tree_1.DirNode.is(inflated)) {
            inflated.fileStat.children = [];
            for (const child of inflated.children) {
                if (file_tree_1.FileStatNode.is(child)) {
                    inflated.fileStat.children.push(child.fileStat);
                }
            }
        }
        return inflated;
    }
    getDepthPadding(depth) {
        // add additional depth so file nodes are rendered with padding in relation to the top level root node.
        return super.getDepthPadding(depth + 1);
    }
};
exports.FileTreeWidget = FileTreeWidget;
tslib_1.__decorate([
    (0, inversify_1.inject)(file_upload_service_1.FileUploadService),
    tslib_1.__metadata("design:type", file_upload_service_1.FileUploadService)
], FileTreeWidget.prototype, "uploadService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(icon_theme_service_1.IconThemeService),
    tslib_1.__metadata("design:type", icon_theme_service_1.IconThemeService)
], FileTreeWidget.prototype, "iconThemeService", void 0);
exports.FileTreeWidget = FileTreeWidget = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(browser_1.TreeProps)),
    tslib_1.__param(1, (0, inversify_1.inject)(file_tree_model_1.FileTreeModel)),
    tslib_1.__param(2, (0, inversify_1.inject)(browser_1.ContextMenuRenderer)),
    tslib_1.__metadata("design:paramtypes", [Object, file_tree_model_1.FileTreeModel,
        browser_1.ContextMenuRenderer])
], FileTreeWidget);
//# sourceMappingURL=file-tree-widget.js.map