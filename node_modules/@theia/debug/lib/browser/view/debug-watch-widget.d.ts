import { interfaces, Container } from '@theia/core/shared/inversify';
import { MenuPath } from '@theia/core/lib/common';
import { SourceTreeWidget } from '@theia/core/lib/browser/source-tree';
import { DebugWatchSource } from './debug-watch-source';
import { DebugViewModel } from './debug-view-model';
export declare class DebugWatchWidget extends SourceTreeWidget {
    static CONTEXT_MENU: MenuPath;
    static EDIT_MENU: string[];
    static REMOVE_MENU: string[];
    static FACTORY_ID: string;
    static createContainer(parent: interfaces.Container): Container;
    static createWidget(parent: interfaces.Container): DebugWatchWidget;
    readonly viewModel: DebugViewModel;
    protected readonly variables: DebugWatchSource;
    protected init(): void;
}
//# sourceMappingURL=debug-watch-widget.d.ts.map