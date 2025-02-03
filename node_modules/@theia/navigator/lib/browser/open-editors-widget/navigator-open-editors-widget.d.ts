/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { interfaces, Container } from '@theia/core/shared/inversify';
import { ApplicationShell, ContextMenuRenderer, NavigatableWidget, NodeProps, TabBar, TreeDecoration, TreeNode, TreeProps, TreeWidget, Widget } from '@theia/core/lib/browser';
import { OpenEditorNode, OpenEditorsModel } from './navigator-open-editors-tree-model';
import { CommandService } from '@theia/core/lib/common';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { AbstractNavigatorTreeWidget } from '../abstract-navigator-tree-widget';
export declare const OPEN_EDITORS_PROPS: TreeProps;
export interface OpenEditorsNodeRow extends TreeWidget.NodeRow {
    node: OpenEditorNode;
}
export declare class OpenEditorsWidget extends AbstractNavigatorTreeWidget {
    readonly model: OpenEditorsModel;
    static ID: string;
    static LABEL: string;
    protected readonly applicationShell: ApplicationShell;
    protected readonly commandService: CommandService;
    protected readonly workspaceService: WorkspaceService;
    static createContainer(parent: interfaces.Container): Container;
    static createWidget(parent: interfaces.Container): OpenEditorsWidget;
    constructor(props: TreeProps, model: OpenEditorsModel, contextMenuRenderer: ContextMenuRenderer);
    init(): void;
    get editorWidgets(): NavigatableWidget[];
    protected activeTreeNodePrefixElement: string | undefined | null;
    protected renderNode(node: OpenEditorNode, props: NodeProps): React.ReactNode;
    protected getDecorationData<K extends keyof TreeDecoration.Data>(node: TreeNode, key: K): Required<Pick<TreeDecoration.Data, K>>[K][];
    protected getWorkspaceDecoration(node: OpenEditorNode): TreeDecoration.CaptionAffix[];
    protected isGroupNode(node: OpenEditorNode): boolean;
    protected isAreaNode(node: OpenEditorNode): boolean;
    protected doRenderNodeRow({ node, depth }: OpenEditorsNodeRow): React.ReactNode;
    protected renderInteractables(node: OpenEditorNode, props: NodeProps): React.ReactNode;
    protected handleGroupActionIconClicked: (e: React.MouseEvent<HTMLAnchorElement>) => Promise<void>;
    protected doHandleGroupActionIconClicked(e: React.MouseEvent<HTMLAnchorElement>): Promise<void>;
    protected sanitizeInputFromClickHandler(groupFromTarget?: string): ApplicationShell.Area | TabBar<Widget> | undefined;
    protected renderPrefixIcon(node: OpenEditorNode): React.ReactNode;
    protected getPrefixIconClass(node: OpenEditorNode): string;
    protected closeEditor: (e: React.MouseEvent<HTMLDivElement>) => Promise<void>;
    protected doCloseEditor(e: React.MouseEvent<HTMLDivElement>): Promise<void>;
    protected tapNode(node?: TreeNode): void;
    protected handleContextMenuEvent(node: OpenEditorNode | undefined, event: React.MouseEvent<HTMLElement>): void;
    protected getPaddingLeft(node: TreeNode): number;
    storeState(): object;
    restoreState(): void;
}
//# sourceMappingURL=navigator-open-editors-widget.d.ts.map