import { interfaces, Container } from '@theia/core/shared/inversify';
import { MenuPath } from '@theia/core';
import { TreeProps } from '@theia/core/lib/browser/tree';
import { SourceTreeWidget, TreeElementNode } from '@theia/core/lib/browser/source-tree';
import { ConsoleItem } from './console-session';
export declare class ConsoleContentWidget extends SourceTreeWidget {
    static CONTEXT_MENU: MenuPath;
    static createContainer(parent: interfaces.Container, props?: Partial<TreeProps>): Container;
    protected createTreeElementNodeClassNames(node: TreeElementNode): string[];
    protected toClassName(item: ConsoleItem): string | undefined;
}
//# sourceMappingURL=console-content-widget.d.ts.map