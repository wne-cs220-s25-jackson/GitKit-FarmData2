import { AbstractViewContribution, Widget } from '@theia/core/lib/browser';
import { TestService } from '../test-service';
import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
import { TestRunTreeWidget } from './test-run-widget';
import { CommandRegistry, MenuModelRegistry } from '@theia/core';
import { TabBarToolbarContribution, TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
export declare const TEST_RUNS_CONTEXT_MENU: string[];
export declare const TEST_RUNS_INLINE_MENU: string[];
export declare class TestRunViewContribution extends AbstractViewContribution<TestRunTreeWidget> implements TabBarToolbarContribution {
    protected readonly testService: TestService;
    protected readonly contextKeys: ContextKeyService;
    constructor();
    registerToolbarItems(registry: TabBarToolbarRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerCommands(commands: CommandRegistry): void;
    protected withWidget<T>(widget: Widget | undefined, cb: (widget: TestRunTreeWidget) => T): T | false;
}
//# sourceMappingURL=test-run-view-contribution.d.ts.map