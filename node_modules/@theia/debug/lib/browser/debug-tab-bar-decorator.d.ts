import { DebugSessionManager } from './debug-session-manager';
import { Emitter, Event } from '@theia/core/lib/common/event';
import { TabBarDecorator } from '@theia/core/lib/browser/shell/tab-bar-decorator';
import { Title, Widget } from '@theia/core/lib/browser';
import { WidgetDecoration } from '@theia/core/lib/browser/widget-decoration';
import { DisposableCollection } from '@theia/core/lib/common';
export declare class DebugTabBarDecorator implements TabBarDecorator {
    readonly id = "theia-debug-tabbar-decorator";
    protected readonly emitter: Emitter<void>;
    protected toDispose: DisposableCollection;
    protected readonly debugSessionManager: DebugSessionManager;
    protected init(): void;
    decorate(title: Title<Widget>): WidgetDecoration.Data[];
    get onDidChangeDecorations(): Event<void>;
    protected fireDidChangeDecorations(): void;
}
//# sourceMappingURL=debug-tab-bar-decorator.d.ts.map