import { DebugConfigurationProvider, DebugConfigurationProviderDescriptor, DebugConfigurationProviderTriggerKind, DebugExt } from '../../../common/plugin-api-rpc';
import { DebugConfiguration } from '@theia/debug/lib/common/debug-configuration';
export declare class PluginDebugConfigurationProvider implements DebugConfigurationProvider {
    protected readonly debugExt: DebugExt;
    handle: number;
    type: string;
    triggerKind: DebugConfigurationProviderTriggerKind;
    provideDebugConfigurations: (folder: string | undefined) => Promise<DebugConfiguration[]>;
    resolveDebugConfiguration: (folder: string | undefined, debugConfiguration: DebugConfiguration) => Promise<DebugConfiguration | undefined | null>;
    resolveDebugConfigurationWithSubstitutedVariables: (folder: string | undefined, debugConfiguration: DebugConfiguration) => Promise<DebugConfiguration | undefined | null>;
    constructor(description: DebugConfigurationProviderDescriptor, debugExt: DebugExt);
}
//# sourceMappingURL=plugin-debug-configuration-provider.d.ts.map