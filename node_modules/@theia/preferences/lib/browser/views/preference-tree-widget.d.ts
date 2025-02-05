/// <reference types="react" />
import { TreeNode, TreeProps, TreeWidget } from '@theia/core/lib/browser';
import React = require('@theia/core/shared/react');
import { PreferenceTreeModel, PreferenceTreeNodeRow, PreferenceTreeNodeProps } from '../preference-tree-model';
import { Preference } from '../util/preference-types';
export declare class PreferencesTreeWidget extends TreeWidget {
    static ID: string;
    protected shouldFireSelectionEvents: boolean;
    protected firstVisibleLeafNodeID: string;
    readonly model: PreferenceTreeModel;
    protected readonly treeProps: TreeProps;
    init(): void;
    doUpdateRows(): void;
    protected isVisibleNode(node: Preference.TreeNode): boolean;
    protected doRenderNodeRow({ depth, visibleChildren, node, isExpansible }: PreferenceTreeNodeRow): React.ReactNode;
    protected renderNode(node: TreeNode, props: PreferenceTreeNodeProps): React.ReactNode;
    protected renderExpansionToggle(node: TreeNode, props: PreferenceTreeNodeProps): React.ReactNode;
    protected toNodeName(node: TreeNode): string;
}
//# sourceMappingURL=preference-tree-widget.d.ts.map