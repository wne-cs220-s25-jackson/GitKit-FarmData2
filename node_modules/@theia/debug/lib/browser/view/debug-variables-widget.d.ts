import { interfaces, Container } from '@theia/core/shared/inversify';
import { MenuPath } from '@theia/core/lib/common';
import { SourceTreeWidget } from '@theia/core/lib/browser/source-tree';
import { DebugVariablesSource } from './debug-variables-source';
import { DebugViewModel } from './debug-view-model';
export declare class DebugVariablesWidget extends SourceTreeWidget {
    static CONTEXT_MENU: MenuPath;
    static EDIT_MENU: MenuPath;
    static WATCH_MENU: MenuPath;
    static FACTORY_ID: string;
    static createContainer(parent: interfaces.Container): Container;
    static createWidget(parent: interfaces.Container): DebugVariablesWidget;
    protected readonly viewModel: DebugViewModel;
    protected readonly variables: DebugVariablesSource;
    protected init(): void;
}
//# sourceMappingURL=debug-variables-widget.d.ts.map