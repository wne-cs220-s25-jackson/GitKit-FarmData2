import { CommandContribution, CommandHandler, CommandRegistry } from '@theia/core/lib/common/command';
import { DebugSessionManager } from './debug-session-manager';
import { DebugConfigurationManager } from './debug-configuration-manager';
import { DebugSessionOptions } from './debug-session-options';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { LabelProvider } from '@theia/core/lib/browser/label-provider';
import { QuickAccessContribution, QuickAccessProvider, QuickAccessRegistry, QuickInputService, StatusBar } from '@theia/core/lib/browser';
import { DebugPreferences } from './debug-preferences';
import { QuickPicks } from '@theia/core/lib/browser/quick-input/quick-input-service';
import { CancellationToken } from '@theia/core/lib/common';
export declare class DebugPrefixConfiguration implements CommandContribution, CommandHandler, QuickAccessContribution, QuickAccessProvider {
    static readonly PREFIX = "debug ";
    protected readonly commandRegistry: CommandRegistry;
    protected readonly debugSessionManager: DebugSessionManager;
    protected readonly preference: DebugPreferences;
    protected readonly debugConfigurationManager: DebugConfigurationManager;
    protected readonly quickInputService: QuickInputService;
    protected readonly quickAccessRegistry: QuickAccessRegistry;
    protected readonly workspaceService: WorkspaceService;
    protected readonly labelProvider: LabelProvider;
    protected readonly statusBar: StatusBar;
    readonly statusBarId = "select-run-debug-statusbar-item";
    private readonly command;
    protected init(): void;
    execute(): void;
    isEnabled(): boolean;
    isVisible(): boolean;
    registerCommands(commands: CommandRegistry): void;
    registerQuickAccessProvider(): void;
    protected resolveRootFolderName(uri: string | undefined): string | undefined;
    getPicks(filter: string, token: CancellationToken): Promise<QuickPicks>;
    /**
     * Set the current debug configuration, and execute debug start command.
     *
     * @param configurationOptions the `DebugSessionOptions`.
     */
    protected runConfiguration(configurationOptions: DebugSessionOptions): void;
    /**
     * Handle the visibility of the debug status bar.
     * @param event the preference change event.
     */
    protected handleDebugStatusBarVisibility(started?: boolean): void;
    /**
     * Update the debug status bar element based on the current configuration.
     */
    protected updateStatusBar(): void;
    /**
     * Remove the debug status bar element.
     */
    protected removeDebugStatusBar(): void;
}
//# sourceMappingURL=debug-prefix-configuration.d.ts.map