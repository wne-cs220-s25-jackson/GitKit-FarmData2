import { DebugConfiguration } from '../common/debug-configuration';
import { DebugService, DebuggerDescription } from '../common/debug-service';
import { IJSONSchema, IJSONSchemaSnippet } from '@theia/core/lib/common/json-schema';
import { CommandIdVariables } from '@theia/variable-resolver/lib/common/variable-types';
import { DebugAdapterSessionManager } from './debug-adapter-session-manager';
import { DebugAdapterContributionRegistry } from '../common/debug-adapter-contribution-registry';
import { Event } from '@theia/core';
/**
 * DebugService implementation.
 */
export declare class DebugServiceImpl implements DebugService {
    protected readonly sessionManager: DebugAdapterSessionManager;
    protected readonly registry: DebugAdapterContributionRegistry;
    get onDidChangeDebugConfigurationProviders(): Event<void>;
    dispose(): void;
    debugTypes(): Promise<string[]>;
    getDebuggersForLanguage(language: string): Promise<DebuggerDescription[]>;
    getSchemaAttributes(debugType: string): Promise<IJSONSchema[]>;
    getConfigurationSnippets(): Promise<IJSONSchemaSnippet[]>;
    provideDebuggerVariables(debugType: string): Promise<CommandIdVariables>;
    provideDebugConfigurations(debugType: string, workspaceFolderUri?: string): Promise<DebugConfiguration[]>;
    provideDynamicDebugConfigurations(): Promise<Record<string, DebugConfiguration[]>>;
    fetchDynamicDebugConfiguration(name: string, type: string, folder?: string): Promise<DebugConfiguration | undefined>;
    resolveDebugConfiguration(config: DebugConfiguration, workspaceFolderUri?: string): Promise<DebugConfiguration>;
    resolveDebugConfigurationWithSubstitutedVariables(config: DebugConfiguration, workspaceFolderUri?: string): Promise<DebugConfiguration>;
    protected readonly sessions: Set<string>;
    createDebugSession(config: DebugConfiguration, _workspaceFolderUri?: string): Promise<string>;
    terminateDebugSession(sessionId?: string): Promise<void>;
    protected doStop(sessionId: string): Promise<void>;
}
//# sourceMappingURL=debug-service-impl.d.ts.map