/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { TreeNode } from '@theia/core/lib/browser/tree/tree';
import { EditorManager } from '@theia/editor/lib/browser/editor-manager';
import { ContextMenuRenderer } from '@theia/core/lib/browser/context-menu-renderer';
import { TreeWidget, TreeProps } from '@theia/core/lib/browser/tree/tree-widget';
import { TypeHierarchyTreeModel } from './typehierarchy-tree-model';
import { TypeHierarchyTree } from './typehierarchy-tree';
export declare class TypeHierarchyTreeWidget extends TreeWidget {
    readonly model: TypeHierarchyTreeModel;
    protected readonly icons: Map<number, string>;
    readonly editorManager: EditorManager;
    constructor(props: TreeProps, model: TypeHierarchyTreeModel, contextMenuRenderer: ContextMenuRenderer);
    /**
     * Initializes the widget with the new input.
     */
    initialize(options: TypeHierarchyTree.InitOptions): Promise<void>;
    /**
     * See: `TreeWidget#renderIcon`.
     */
    protected renderIcon(node: TreeNode): React.ReactNode;
    /**
     * Opens up the node in the editor. On demand (`keepFocus`) it reveals the location in the editor.
     */
    protected openEditor(node: TreeNode, keepFocus?: boolean): Promise<void>;
}
export declare namespace TypeHierarchyTreeWidget {
    const WIDGET_ID = "theia-typehierarchy";
    const WIDGET_LABEL: string;
    /**
     * CSS styles for the `Type Hierarchy` widget.
     */
    namespace Styles {
        const TYPE_HIERARCHY_TREE_CLASS = "theia-type-hierarchy-tree";
    }
}
//# sourceMappingURL=typehierarchy-tree-widget.d.ts.map