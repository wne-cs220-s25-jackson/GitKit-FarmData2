/// <reference types="react" />
import { ProblemManager } from './problem-manager';
import { ProblemTreeModel } from './problem-tree-model';
import { MarkerInfoNode, MarkerNode } from '../marker-tree';
import { TreeWidget, TreeProps, ContextMenuRenderer, TreeNode, NodeProps, TreeModel, ApplicationShell, Message } from '@theia/core/lib/browser';
import { DiagnosticSeverity } from '@theia/core/shared/vscode-languageserver-protocol';
import * as React from '@theia/core/shared/react';
import { ProblemPreferences } from './problem-preferences';
import { DisposableCollection } from '@theia/core/lib/common/disposable';
export declare const PROBLEMS_WIDGET_ID = "problems";
export declare class ProblemWidget extends TreeWidget {
    readonly model: ProblemTreeModel;
    protected readonly toDisposeOnCurrentWidgetChanged: DisposableCollection;
    protected readonly preferences: ProblemPreferences;
    protected readonly shell: ApplicationShell;
    protected readonly problemManager: ProblemManager;
    constructor(treeProps: TreeProps, model: ProblemTreeModel, contextMenuRenderer: ContextMenuRenderer);
    protected init(): void;
    protected onActivateRequest(msg: Message): void;
    protected updateFollowActiveEditor(): void;
    protected followActiveEditor(): void;
    protected autoRevealFromActiveEditor(): void;
    storeState(): object;
    protected superStoreState(): object;
    restoreState(state: object): void;
    protected superRestoreState(state: object): void;
    protected tapNode(node?: TreeNode): void;
    protected handleCopy(event: ClipboardEvent): void;
    protected handleDown(event: KeyboardEvent): void;
    protected handleUp(event: KeyboardEvent): void;
    protected renderTree(model: TreeModel): React.ReactNode;
    protected renderCaption(node: TreeNode, props: NodeProps): React.ReactNode;
    protected renderTailDecorations(node: TreeNode, props: NodeProps): JSX.Element;
    protected renderRemoveButton(node: TreeNode): React.ReactNode;
    protected decorateMarkerNode(node: MarkerNode): React.ReactNode;
    protected getSeverityClass(severity: DiagnosticSeverity): string;
    protected decorateMarkerFileNode(node: MarkerInfoNode): React.ReactNode;
}
export declare class ProblemMarkerRemoveButton extends React.Component<{
    model: ProblemTreeModel;
    node: TreeNode;
}> {
    render(): React.ReactNode;
    protected readonly remove: (e: React.MouseEvent<HTMLElement>) => void;
    protected doRemove(e: React.MouseEvent<HTMLElement>): void;
}
//# sourceMappingURL=problem-widget.d.ts.map