import { VariableContribution, VariableRegistry } from './variable';
import { ApplicationServer } from '@theia/core/lib/common/application-protocol';
import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
import { CommandService } from '@theia/core/lib/common/command';
import { PreferenceService } from '@theia/core/lib/browser/preferences/preference-service';
import { ResourceContextKey } from '@theia/core/lib/browser/resource-context-key';
import { QuickInputService } from '@theia/core/lib/browser';
export declare class CommonVariableContribution implements VariableContribution {
    protected readonly env: EnvVariablesServer;
    protected readonly commands: CommandService;
    protected readonly preferences: PreferenceService;
    protected readonly resourceContextKey: ResourceContextKey;
    protected readonly quickInputService: QuickInputService;
    protected readonly appServer: ApplicationServer;
    registerVariables(variables: VariableRegistry): Promise<void>;
}
//# sourceMappingURL=common-variable-contribution.d.ts.map