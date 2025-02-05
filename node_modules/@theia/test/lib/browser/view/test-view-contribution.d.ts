import { AbstractViewContribution, FrontendApplicationContribution, ViewContainerTitleOptions, Widget } from '@theia/core/lib/browser';
import { Command, CommandRegistry, MenuModelRegistry } from '@theia/core';
import { TestService } from '../test-service';
import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
import { TestTreeWidget } from './test-tree-widget';
import { TabBarToolbarContribution, TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { NavigationLocationService } from '@theia/editor/lib/browser/navigation/navigation-location-service';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
export declare const PLUGIN_TEST_VIEW_TITLE_MENU: string[];
export declare namespace TestViewCommands {
    /**
     * Command which refreshes all test.
     */
    const REFRESH: Command;
    /**
     * Command which cancels the refresh
     */
    const CANCEL_REFRESH: Command;
    const RUN_ALL_TESTS: Command;
    const DEBUG_ALL_TESTS: Command;
    const RUN_TEST: Command;
    const RUN_TEST_WITH_PROFILE: Command;
    const DEBUG_TEST: Command;
    const CANCEL_ALL_RUNS: Command;
    const CANCEL_RUN: Command;
    const GOTO_TEST: Command;
    const CONFIGURE_PROFILES: Command;
    const SELECT_DEFAULT_PROFILES: Command;
    const CLEAR_ALL_RESULTS: Command;
}
export declare const TEST_VIEW_CONTEXT_MENU: string[];
export declare const TEST_VIEW_INLINE_MENU: string[];
export declare const TEST_VIEW_CONTAINER_ID = "test-view-container";
export declare const TEST_VIEW_CONTAINER_TITLE_OPTIONS: ViewContainerTitleOptions;
export declare class TestViewContribution extends AbstractViewContribution<TestTreeWidget> implements FrontendApplicationContribution, TabBarToolbarContribution {
    protected readonly testService: TestService;
    protected readonly contextKeys: ContextKeyService;
    navigationService: NavigationLocationService;
    fileSystem: FileService;
    constructor();
    initializeLayout(): Promise<void>;
    registerCommands(commands: CommandRegistry): void;
    protected cancelAllRuns(): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerToolbarItems(toolbar: TabBarToolbarRegistry): void;
    protected withWidget<T>(widget: Widget | undefined, cb: (widget: TestTreeWidget) => T): T | false;
}
//# sourceMappingURL=test-view-contribution.d.ts.map