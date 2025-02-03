/// <reference types="react" />
import { Message } from '@theia/core/shared/@phosphor/messaging';
import { CommandService } from '@theia/core/lib/common';
import { TreeModel, ContextMenuRenderer, TreeProps, TreeNode } from '@theia/core/lib/browser';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { FileNavigatorModel } from './navigator-model';
import * as React from '@theia/core/shared/react';
import { NavigatorContextKeyService } from './navigator-context-key-service';
import { AbstractNavigatorTreeWidget } from './abstract-navigator-tree-widget';
export declare const FILE_NAVIGATOR_ID = "files";
export declare const LABEL: string;
export declare const CLASS = "theia-Files";
export declare class FileNavigatorWidget extends AbstractNavigatorTreeWidget {
    readonly model: FileNavigatorModel;
    protected readonly commandService: CommandService;
    protected readonly contextKeyService: NavigatorContextKeyService;
    protected readonly workspaceService: WorkspaceService;
    constructor(props: TreeProps, model: FileNavigatorModel, contextMenuRenderer: ContextMenuRenderer);
    protected init(): void;
    protected doUpdateRows(): void;
    getContainerTreeNode(): TreeNode | undefined;
    protected renderTree(model: TreeModel): React.ReactNode;
    protected shouldShowWelcomeView(): boolean;
    protected onAfterAttach(msg: Message): void;
    protected handleCopy(event: ClipboardEvent): void;
    protected handlePaste(event: ClipboardEvent): void;
    protected canOpenWorkspaceFileAndFolder: boolean;
    protected readonly openWorkspace: () => void;
    protected doOpenWorkspace(): void;
    protected readonly openFolder: () => void;
    protected doOpenFolder(): void;
    protected readonly addFolder: () => void;
    protected doAddFolder(): void;
    protected readonly keyUpHandler: (e: React.KeyboardEvent) => void;
    /**
     * When a multi-root workspace is opened, a user can remove all the folders from it.
     * Instead of displaying an empty navigator tree, this will show a button to add more folders.
     */
    protected renderEmptyMultiRootWorkspace(): React.ReactNode;
    protected isEmptyMultiRootWorkspace(model: TreeModel): boolean;
    protected tapNode(node?: TreeNode): void;
    protected onAfterShow(msg: Message): void;
    protected onAfterHide(msg: Message): void;
    protected updateSelectionContextKeys(): void;
}
//# sourceMappingURL=navigator-widget.d.ts.map