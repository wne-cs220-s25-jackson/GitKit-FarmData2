import { DebugSessionContributionRegistry, DebugSessionContribution } from '@theia/debug/lib/browser/debug-session-contribution';
import { ContributionProvider } from '@theia/core/lib/common/contribution-provider';
import { Disposable } from '@theia/core/lib/common/disposable';
/**
 * Debug session contribution registrator.
 */
export interface PluginDebugSessionContributionRegistrator {
    /**
     * Registers [DebugSessionContribution](#DebugSessionContribution).
     * @param contrib contribution
     */
    registerDebugSessionContribution(contrib: DebugSessionContribution): Disposable;
    /**
     * Unregisters [DebugSessionContribution](#DebugSessionContribution).
     * @param debugType the debug type
     */
    unregisterDebugSessionContribution(debugType: string): void;
}
/**
 * Plugin debug session contribution registry implementation with functionality
 * to register / unregister plugin contributions.
 */
export declare class PluginDebugSessionContributionRegistry implements DebugSessionContributionRegistry, PluginDebugSessionContributionRegistrator {
    protected readonly contribs: Map<string, DebugSessionContribution>;
    protected readonly contributions: ContributionProvider<DebugSessionContribution>;
    protected init(): void;
    get(debugType: string): DebugSessionContribution | undefined;
    registerDebugSessionContribution(contrib: DebugSessionContribution): Disposable;
    unregisterDebugSessionContribution(debugType: string): void;
}
//# sourceMappingURL=plugin-debug-session-contribution-registry.d.ts.map