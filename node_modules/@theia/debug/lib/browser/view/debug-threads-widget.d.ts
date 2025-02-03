/// <reference types="react" />
import { interfaces, Container } from '@theia/core/shared/inversify';
import { MenuPath } from '@theia/core';
import { TreeNode, NodeProps, SelectableTreeNode } from '@theia/core/lib/browser';
import { SourceTreeWidget } from '@theia/core/lib/browser/source-tree';
import { DebugThreadsSource } from './debug-threads-source';
import { DebugViewModel } from '../view/debug-view-model';
import { DebugCallStackItemTypeKey } from '../debug-call-stack-item-type-key';
export declare class DebugThreadsWidget extends SourceTreeWidget {
    static CONTEXT_MENU: MenuPath;
    static CONTROL_MENU: string[];
    static TERMINATE_MENU: string[];
    static OPEN_MENU: string[];
    static FACTORY_ID: string;
    static createContainer(parent: interfaces.Container): Container;
    static createWidget(parent: interfaces.Container): DebugThreadsWidget;
    protected readonly threads: DebugThreadsSource;
    protected readonly viewModel: DebugViewModel;
    protected readonly debugCallStackItemTypeKey: DebugCallStackItemTypeKey;
    protected init(): void;
    protected updatingSelection: boolean;
    protected updateWidgetSelection(): void;
    protected updateModelSelection(): void;
    protected toContextMenuArgs(node: SelectableTreeNode): [number] | undefined;
    protected getDefaultNodeStyle(node: TreeNode, props: NodeProps): React.CSSProperties | undefined;
}
//# sourceMappingURL=debug-threads-widget.d.ts.map