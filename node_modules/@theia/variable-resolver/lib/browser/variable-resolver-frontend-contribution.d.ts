import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { Command, CommandContribution, CommandRegistry, ContributionProvider } from '@theia/core/lib/common';
import { VariableContribution, VariableRegistry } from './variable';
import { VariableQuickOpenService } from './variable-quick-open-service';
export declare const LIST_VARIABLES: Command;
export declare class VariableResolverFrontendContribution implements FrontendApplicationContribution, CommandContribution {
    protected readonly contributionProvider: ContributionProvider<VariableContribution>;
    protected readonly variableRegistry: VariableRegistry;
    protected readonly variableQuickOpenService: VariableQuickOpenService;
    constructor(contributionProvider: ContributionProvider<VariableContribution>, variableRegistry: VariableRegistry, variableQuickOpenService: VariableQuickOpenService);
    onStart(): void;
    registerCommands(commands: CommandRegistry): void;
}
//# sourceMappingURL=variable-resolver-frontend-contribution.d.ts.map