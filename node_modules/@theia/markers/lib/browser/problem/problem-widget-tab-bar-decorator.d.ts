import { Event, Emitter } from '@theia/core/lib/common/event';
import { ProblemManager } from './problem-manager';
import { TabBarDecorator } from '@theia/core/lib/browser/shell/tab-bar-decorator';
import { Title, Widget } from '@theia/core/lib/browser';
import { WidgetDecoration } from '@theia/core/lib/browser/widget-decoration';
export declare class ProblemWidgetTabBarDecorator implements TabBarDecorator {
    readonly id = "theia-problems-widget-tabbar-decorator";
    protected readonly emitter: Emitter<void>;
    protected readonly problemManager: ProblemManager;
    protected init(): void;
    decorate(title: Title<Widget>): WidgetDecoration.Data[];
    get onDidChangeDecorations(): Event<void>;
    protected fireDidChangeDecorations(): void;
}
//# sourceMappingURL=problem-widget-tab-bar-decorator.d.ts.map