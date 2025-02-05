import { Emitter, Event } from '@theia/core/lib/common/event';
import { TabBarDecorator } from '@theia/core/lib/browser/shell/tab-bar-decorator';
import { ApplicationShell, FrontendApplication, FrontendApplicationContribution, Title, Widget } from '@theia/core/lib/browser';
import { WidgetDecoration } from '@theia/core/lib/browser/widget-decoration';
export declare class NavigatorTabBarDecorator implements TabBarDecorator, FrontendApplicationContribution {
    readonly id = "theia-navigator-tabbar-decorator";
    protected applicationShell: ApplicationShell;
    protected readonly emitter: Emitter<void>;
    private readonly toDispose;
    private readonly toDisposeOnDirtyChanged;
    onStart(app: FrontendApplication): void;
    decorate(title: Title<Widget>): WidgetDecoration.Data[];
    protected getDirtyEditorsCount(): number;
    get onDidChangeDecorations(): Event<void>;
    protected fireDidChangeDecorations(): void;
}
//# sourceMappingURL=navigator-tab-bar-decorator.d.ts.map