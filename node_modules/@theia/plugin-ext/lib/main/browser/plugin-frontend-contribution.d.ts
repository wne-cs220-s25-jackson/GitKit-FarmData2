import { CommandRegistry, CommandContribution, Command } from '@theia/core/lib/common';
import { OpenUriCommandHandler } from './commands';
import { TabBarToolbarContribution, TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
export declare class PluginApiFrontendContribution implements CommandContribution, TabBarToolbarContribution {
    protected readonly openUriCommandHandler: OpenUriCommandHandler;
    static readonly COLLAPSE_ALL_COMMAND: Command;
    registerCommands(commands: CommandRegistry): void;
    registerToolbarItems(registry: TabBarToolbarRegistry): void;
}
//# sourceMappingURL=plugin-frontend-contribution.d.ts.map