/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { DisposableCollection } from '@theia/core/lib/common/disposable';
import { ContextMenuRenderer, NodeProps, TreeProps, TreeNode, CompressedTreeWidget, CompressedNodeProps } from '@theia/core/lib/browser';
import { FileUploadService } from '../file-upload-service';
import { DirNode } from './file-tree';
import { FileTreeModel } from './file-tree-model';
import { IconThemeService } from '@theia/core/lib/browser/icon-theme-service';
export declare const FILE_TREE_CLASS = "theia-FileTree";
export declare const FILE_STAT_NODE_CLASS = "theia-FileStatNode";
export declare const DIR_NODE_CLASS = "theia-DirNode";
export declare const FILE_STAT_ICON_CLASS = "theia-FileStatIcon";
export declare class FileTreeWidget extends CompressedTreeWidget {
    readonly model: FileTreeModel;
    protected readonly toCancelNodeExpansion: DisposableCollection;
    protected readonly uploadService: FileUploadService;
    protected readonly iconThemeService: IconThemeService;
    constructor(props: TreeProps, model: FileTreeModel, contextMenuRenderer: ContextMenuRenderer);
    protected createNodeClassNames(node: TreeNode, props: NodeProps): string[];
    protected renderIcon(node: TreeNode, props: NodeProps): React.ReactNode;
    protected createContainerAttributes(): React.HTMLAttributes<HTMLElement>;
    protected createNodeAttributes(node: TreeNode, props: NodeProps): React.Attributes & React.HTMLAttributes<HTMLElement>;
    protected getNodeTooltip(node: TreeNode): string | undefined;
    protected getCaptionChildEventHandlers(node: TreeNode, props: CompressedNodeProps): React.Attributes & React.HtmlHTMLAttributes<HTMLElement>;
    protected getNodeDragHandlers(node: TreeNode, props: CompressedNodeProps): React.Attributes & React.HtmlHTMLAttributes<HTMLElement>;
    protected handleDragStartEvent(node: TreeNode, event: React.DragEvent): void;
    protected handleDragEnterEvent(node: TreeNode | undefined, event: React.DragEvent): void;
    protected handleDragOverEvent(node: TreeNode | undefined, event: React.DragEvent): void;
    protected handleDragLeaveEvent(node: TreeNode | undefined, event: React.DragEvent): void;
    protected handleDropEvent(node: TreeNode | undefined, event: React.DragEvent): Promise<void>;
    protected getDropTargetDirNode(node: TreeNode | undefined): DirNode | undefined;
    protected getDropEffect(event: React.DragEvent): 'copy' | 'move';
    protected setTreeNodeAsData(data: DataTransfer, node: TreeNode): void;
    protected setSelectedTreeNodesAsData(data: DataTransfer, sourceNode: TreeNode, relatedNodes: TreeNode[]): void;
    protected getTreeNodeFromData(data: DataTransfer): TreeNode | undefined;
    protected getSelectedTreeNodesFromData(data: DataTransfer): TreeNode[];
    protected get hidesExplorerArrows(): boolean;
    protected renderExpansionToggle(node: TreeNode, props: NodeProps): React.ReactNode;
    protected getPaddingLeft(node: TreeNode, props: NodeProps): number;
    protected needsExpansionTogglePadding(node: TreeNode): boolean;
    protected deflateForStorage(node: TreeNode): object;
    protected inflateFromStorage(node: any, parent?: TreeNode): TreeNode;
    protected getDepthPadding(depth: number): number;
}
//# sourceMappingURL=file-tree-widget.d.ts.map