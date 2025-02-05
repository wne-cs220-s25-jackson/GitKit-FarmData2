import { QuickAccessContribution, QuickAccessProvider, QuickAccessRegistry, QuickInputService } from '@theia/core/lib/browser';
import { CancellationToken, CommandContribution, CommandRegistry, CommandService } from '@theia/core/lib/common';
import { TerminalWidget } from './base/terminal-widget';
import { TerminalService } from './base/terminal-service';
import { QuickPickItem, QuickPicks } from '@theia/core/lib/browser/quick-input/quick-input-service';
export declare class TerminalQuickOpenService implements QuickAccessProvider {
    static readonly PREFIX = "term ";
    protected readonly quickInputService: QuickInputService;
    protected readonly quickAccessRegistry: QuickAccessRegistry;
    protected readonly commandService: CommandService;
    protected readonly terminalService: TerminalService;
    open(): void;
    getPicks(filter: string, token: CancellationToken): Promise<QuickPicks>;
    registerQuickAccessProvider(): void;
    /**
     * Compare two terminal widgets by label. If labels are identical, compare by the widget id.
     * @param a `TerminalWidget` for comparison
     * @param b `TerminalWidget` for comparison
     */
    protected compareItems(a: TerminalWidget, b: TerminalWidget): number;
    protected doCreateNewTerminal(): void;
    /**
     * Convert the terminal widget to the quick pick item.
     * @param {TerminalWidget} widget - the terminal widget.
     * @returns quick pick item.
     */
    protected toItem(widget: TerminalWidget): QuickPickItem;
}
/**
 * TODO: merge it to TerminalFrontendContribution.
 */
export declare class TerminalQuickOpenContribution implements CommandContribution, QuickAccessContribution {
    protected readonly terminalQuickOpenService: TerminalQuickOpenService;
    registerQuickAccessProvider(): void;
    registerCommands(commands: CommandRegistry): void;
}
//# sourceMappingURL=terminal-quick-open-service.d.ts.map