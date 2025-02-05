/// <reference types="react" />
import { interfaces, Container } from '@theia/core/shared/inversify';
import { MenuPath } from '@theia/core';
import { TreeNode, NodeProps, SelectableTreeNode } from '@theia/core/lib/browser';
import { SourceTreeWidget } from '@theia/core/lib/browser/source-tree';
import { DebugStackFramesSource } from './debug-stack-frames-source';
import { DebugViewModel } from './debug-view-model';
import { DebugCallStackItemTypeKey } from '../debug-call-stack-item-type-key';
export declare class DebugStackFramesWidget extends SourceTreeWidget {
    static CONTEXT_MENU: MenuPath;
    static FACTORY_ID: string;
    static createContainer(parent: interfaces.Container): Container;
    static createWidget(parent: interfaces.Container): DebugStackFramesWidget;
    protected readonly frames: DebugStackFramesSource;
    protected readonly viewModel: DebugViewModel;
    protected readonly debugCallStackItemTypeKey: DebugCallStackItemTypeKey;
    protected init(): void;
    protected updatingSelection: boolean;
    protected updateWidgetSelection(): Promise<void>;
    protected updateModelSelection(): Promise<void>;
    protected toContextMenuArgs(node: SelectableTreeNode): [string | number] | undefined;
    protected tapNode(node?: TreeNode): void;
    protected getDefaultNodeStyle(node: TreeNode, props: NodeProps): React.CSSProperties | undefined;
}
//# sourceMappingURL=debug-stack-frames-widget.d.ts.map