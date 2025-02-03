/// <reference types="react" />
import { TreeWidget, TreeProps, ContextMenuRenderer, TreeNode, TreeModel, NodeProps, QuickViewService } from '@theia/core/lib/browser';
import * as React from '@theia/core/shared/react';
import { BulkEditInfoNode, BulkEditNode } from './bulk-edit-tree';
import { BulkEditTreeModel } from './bulk-edit-tree-model';
import { FileResourceResolver } from '@theia/filesystem/lib/browser';
import { EditorManager } from '@theia/editor/lib/browser';
import { ResourceEdit } from '@theia/monaco-editor-core/esm/vs/editor/browser/services/bulkEditService';
export declare const BULK_EDIT_TREE_WIDGET_ID = "bulkedit";
export declare const BULK_EDIT_WIDGET_NAME: string;
export declare class BulkEditTreeWidget extends TreeWidget {
    readonly treeProps: TreeProps;
    readonly model: BulkEditTreeModel;
    readonly contextMenuRenderer: ContextMenuRenderer;
    private editorWidgets;
    protected readonly fileResourceResolver: FileResourceResolver;
    protected readonly editorManager: EditorManager;
    protected readonly quickView: QuickViewService;
    constructor(treeProps: TreeProps, model: BulkEditTreeModel, contextMenuRenderer: ContextMenuRenderer);
    initModel(edits: ResourceEdit[]): Promise<void>;
    protected tapNode(node?: TreeNode): void;
    protected handleDown(event: KeyboardEvent): void;
    protected handleUp(event: KeyboardEvent): void;
    protected renderTree(model: TreeModel): React.ReactNode;
    protected renderCaption(node: TreeNode, props: NodeProps): React.ReactNode;
    protected decorateBulkEditNode(node: BulkEditNode): React.ReactNode;
    protected decorateBulkEditInfoNode(node: BulkEditInfoNode): React.ReactNode;
    private getFileContentsMap;
    private doOpen;
    private createReplacePreview;
    private getEditorOptions;
    private disposeEditors;
}
//# sourceMappingURL=bulk-edit-tree-widget.d.ts.map