/// <reference types="react" />
import { ContextMenuRenderer, TreeWidget, NodeProps, TreeProps, TreeNode, TreeModel } from '@theia/core/lib/browser';
import { LabelProvider } from '@theia/core/lib/browser/label-provider';
import { CallHierarchyTreeModel } from './callhierarchy-tree-model';
import { CallHierarchyItem, CallHierarchyIncomingCall } from '../callhierarchy';
import { Location } from '@theia/core/shared/vscode-languageserver-protocol';
import { EditorManager } from '@theia/editor/lib/browser';
import * as React from '@theia/core/shared/react';
export declare const HIERARCHY_TREE_CLASS = "theia-CallHierarchyTree";
export declare const DEFINITION_NODE_CLASS = "theia-CallHierarchyTreeNode";
export declare const DEFINITION_ICON_CLASS = "theia-CallHierarchyTreeNodeIcon";
export declare class CallHierarchyTreeWidget extends TreeWidget {
    readonly props: TreeProps;
    readonly model: CallHierarchyTreeModel;
    protected readonly labelProvider: LabelProvider;
    readonly editorManager: EditorManager;
    constructor(props: TreeProps, model: CallHierarchyTreeModel, contextMenuRenderer: ContextMenuRenderer, labelProvider: LabelProvider, editorManager: EditorManager);
    initializeModel(selection: Location | undefined, languageId: string | undefined): void;
    protected createNodeClassNames(node: TreeNode, props: NodeProps): string[];
    protected createNodeAttributes(node: TreeNode, props: NodeProps): React.Attributes & React.HTMLAttributes<HTMLElement>;
    protected renderTree(model: TreeModel): React.ReactNode;
    protected renderCaption(node: TreeNode, props: NodeProps): React.ReactNode;
    protected decorateDefinitionCaption(definition: CallHierarchyItem): React.ReactNode;
    protected decorateCallerCaption(caller: CallHierarchyIncomingCall): React.ReactNode;
    protected toIconClass(symbolKind: number): "file" | "module" | "namespace" | "package" | "class" | "method" | "property" | "field" | "constructor" | "enum" | "interface" | "function" | "variable" | "constant" | "string" | "number" | "boolean" | "array" | "unknown";
    private openEditor;
    private doOpenEditor;
    storeState(): object;
    restoreState(oldState: object): void;
}
//# sourceMappingURL=callhierarchy-tree-widget.d.ts.map