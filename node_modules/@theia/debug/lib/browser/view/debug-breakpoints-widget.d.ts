/// <reference types="react" />
import { interfaces, Container } from '@theia/core/shared/inversify';
import { MenuPath } from '@theia/core/lib/common';
import { TreeNode, NodeProps } from '@theia/core/lib/browser';
import { SourceTreeWidget } from '@theia/core/lib/browser/source-tree';
import { DebugBreakpointsSource } from './debug-breakpoints-source';
import { BreakpointManager } from '../breakpoint/breakpoint-manager';
import { DebugViewModel } from './debug-view-model';
export declare class DebugBreakpointsWidget extends SourceTreeWidget {
    static CONTEXT_MENU: MenuPath;
    static EDIT_MENU: string[];
    static REMOVE_MENU: string[];
    static ENABLE_MENU: string[];
    static FACTORY_ID: string;
    static createContainer(parent: interfaces.Container): Container;
    static createWidget(parent: interfaces.Container): DebugBreakpointsWidget;
    protected readonly viewModel: DebugViewModel;
    protected readonly breakpoints: BreakpointManager;
    protected readonly breakpointsSource: DebugBreakpointsSource;
    protected init(): void;
    protected getDefaultNodeStyle(node: TreeNode, props: NodeProps): React.CSSProperties | undefined;
}
//# sourceMappingURL=debug-breakpoints-widget.d.ts.map