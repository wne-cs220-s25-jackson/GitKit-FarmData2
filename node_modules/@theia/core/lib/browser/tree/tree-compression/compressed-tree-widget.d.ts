import '../../../../src/browser/tree/tree-compression/tree-compression.css';
import * as React from 'react';
import { ArrayUtils } from '../../../common/types';
import { ContextMenuRenderer } from '../../context-menu-renderer';
import { CompressionToggle, TreeCompressionService } from './tree-compression-service';
import { CompositeTreeNode, TreeNode } from '../tree';
import { NodeProps, TreeProps, TreeWidget } from '../tree-widget';
import { TreeViewWelcomeWidget } from '../tree-view-welcome-widget';
import { CompressedTreeModel } from './compressed-tree-model';
export interface CompressedChildren {
    compressionChain?: ArrayUtils.HeadAndTail<TreeNode>;
}
export interface CompressedNodeRow extends TreeWidget.NodeRow, CompressedChildren {
}
export interface CompressedNodeProps extends NodeProps, CompressedChildren {
}
export declare class CompressedTreeWidget extends TreeViewWelcomeWidget {
    readonly model: CompressedTreeModel;
    protected readonly compressionToggle: CompressionToggle;
    protected readonly compressionService: TreeCompressionService;
    constructor(props: TreeProps, model: CompressedTreeModel, contextMenuRenderer: ContextMenuRenderer);
    protected rows: Map<string, CompressedNodeRow>;
    toggleCompression(newCompression?: boolean): void;
    protected shouldRenderIndent(node: TreeNode): boolean;
    protected shouldDisplayNode(node: TreeNode): boolean;
    protected getDepthForNode(node: TreeNode, depths: Map<CompositeTreeNode | undefined, number>): number;
    protected toNodeRow(node: TreeNode, index: number, depth: number): CompressedNodeRow;
    protected doRenderNodeRow({ node, depth, compressionChain }: CompressedNodeRow): React.ReactNode;
    protected rowIsSelected(node: TreeNode, props: CompressedNodeProps): boolean;
    protected getCaptionAttributes(node: TreeNode, props: CompressedNodeProps): React.Attributes & React.HTMLAttributes<HTMLElement>;
    protected getCaptionChildren(node: TreeNode, props: CompressedNodeProps): React.ReactNode;
    protected getCaptionChildEventHandlers(node: TreeNode, props: CompressedNodeProps): React.Attributes & React.HtmlHTMLAttributes<HTMLElement>;
    protected handleUp(event: KeyboardEvent): void;
    protected handleDown(event: KeyboardEvent): void;
    protected handleLeft(event: KeyboardEvent): Promise<void>;
    protected handleRight(event: KeyboardEvent): Promise<void>;
    protected getSeparatorContent(node: TreeNode, props: CompressedNodeProps): React.ReactNode;
}
//# sourceMappingURL=compressed-tree-widget.d.ts.map