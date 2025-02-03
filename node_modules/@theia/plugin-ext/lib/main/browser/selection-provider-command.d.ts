import { Command, CommandContribution, CommandRegistry } from '@theia/core/lib/common/command';
import { UriAwareCommandHandler, UriCommandHandler } from '@theia/core/lib/common/uri-command-handler';
import URI from '@theia/core/lib/common/uri';
import { SelectionService } from '@theia/core';
export declare namespace SelectionProviderCommands {
    const GET_SELECTED_CONTEXT: Command;
}
export declare class SelectionProviderCommandContribution implements CommandContribution {
    protected readonly selectionService: SelectionService;
    registerCommands(commands: CommandRegistry): void;
    protected newMultiUriAwareCommandHandler(handler: UriCommandHandler<URI[]>): UriAwareCommandHandler<URI[]>;
}
//# sourceMappingURL=selection-provider-command.d.ts.map