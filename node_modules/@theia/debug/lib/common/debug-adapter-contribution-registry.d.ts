import { ContributionProvider } from '@theia/core';
import { DebugConfiguration } from './debug-configuration';
import { DebuggerDescription } from './debug-service';
import { DebugAdapterContribution, DebugAdapterExecutable, DebugAdapterSessionFactory } from './debug-model';
import { IJSONSchema, IJSONSchemaSnippet } from '@theia/core/lib/common/json-schema';
/**
 * Contributions registry.
 */
export declare class DebugAdapterContributionRegistry {
    protected readonly contributions: ContributionProvider<DebugAdapterContribution>;
    protected getContributions(debugType: string): IterableIterator<DebugAdapterContribution>;
    /**
     * Finds and returns an array of registered debug types.
     * @returns An array of registered debug types
     */
    protected _debugTypes: string[] | undefined;
    debugTypes(): string[];
    getDebuggersForLanguage(language: string): Promise<DebuggerDescription[]>;
    /**
     * Provides initial [debug configuration](#DebugConfiguration).
     * @param debugType The registered debug type
     * @returns An array of [debug configurations](#DebugConfiguration)
     */
    provideDebugConfigurations(debugType: string, workspaceFolderUri?: string): Promise<DebugConfiguration[]>;
    /**
     * Resolves a [debug configuration](#DebugConfiguration) by filling in missing values
     * or by adding/changing/removing attributes before variable substitution.
     * @param debugConfiguration The [debug configuration](#DebugConfiguration) to resolve.
     * @returns The resolved debug configuration.
     */
    resolveDebugConfiguration(config: DebugConfiguration, workspaceFolderUri?: string): Promise<DebugConfiguration>;
    /**
     * Resolves a [debug configuration](#DebugConfiguration) by filling in missing values
     * or by adding/changing/removing attributes with substituted variables.
     * @param debugConfiguration The [debug configuration](#DebugConfiguration) to resolve.
     * @returns The resolved debug configuration.
     */
    resolveDebugConfigurationWithSubstitutedVariables(config: DebugConfiguration, workspaceFolderUri?: string): Promise<DebugConfiguration>;
    /**
     * Provides schema attributes.
     * @param debugType The registered debug type
     * @returns Schema attributes for the given debug type
     */
    getSchemaAttributes(debugType: string): Promise<IJSONSchema[]>;
    getConfigurationSnippets(): Promise<IJSONSchemaSnippet[]>;
    /**
     * Provides a [debug adapter executable](#DebugAdapterExecutable)
     * based on [debug configuration](#DebugConfiguration) to launch a new debug adapter.
     * @param config The resolved [debug configuration](#DebugConfiguration).
     * @returns The [debug adapter executable](#DebugAdapterExecutable).
     */
    provideDebugAdapterExecutable(config: DebugConfiguration): Promise<DebugAdapterExecutable>;
    /**
     * Returns a [debug adapter session factory](#DebugAdapterSessionFactory).
     * @param debugType The registered debug type
     * @returns An [debug adapter session factory](#DebugAdapterSessionFactory)
     */
    debugAdapterSessionFactory(debugType: string): DebugAdapterSessionFactory | undefined;
}
//# sourceMappingURL=debug-adapter-contribution-registry.d.ts.map