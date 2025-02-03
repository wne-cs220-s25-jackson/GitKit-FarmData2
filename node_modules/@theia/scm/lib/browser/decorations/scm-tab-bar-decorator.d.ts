import { Event, Emitter } from '@theia/core/lib/common/event';
import { ScmService } from '../scm-service';
import { TabBarDecorator } from '@theia/core/lib/browser/shell/tab-bar-decorator';
import { Title, Widget } from '@theia/core/lib/browser';
import { WidgetDecoration } from '@theia/core/lib/browser/widget-decoration';
export declare class ScmTabBarDecorator implements TabBarDecorator {
    readonly id = "theia-scm-tabbar-decorator";
    protected readonly emitter: Emitter<void>;
    private readonly toDispose;
    private readonly toDisposeOnDidChange;
    protected readonly scmService: ScmService;
    protected init(): void;
    decorate(title: Title<Widget>): WidgetDecoration.Data[];
    protected collectChangesCount(): number;
    get onDidChangeDecorations(): Event<void>;
    protected fireDidChangeDecorations(): void;
}
//# sourceMappingURL=scm-tab-bar-decorator.d.ts.map