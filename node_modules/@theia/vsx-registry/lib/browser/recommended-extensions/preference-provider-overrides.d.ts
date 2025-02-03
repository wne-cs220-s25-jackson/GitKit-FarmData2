import { FolderPreferenceProvider, UserPreferenceProvider } from '@theia/preferences/lib/browser';
import { interfaces } from '@theia/core/shared/inversify';
import { WorkspaceFilePreferenceProvider } from '@theia/preferences/lib/browser/workspace-file-preference-provider';
/**
 * The overrides in this file are required because the base preference providers assume that a
 * section name (extensions) will not be used as a prefix (extensions.ignoreRecommendations).
 */
export declare class FolderPreferenceProviderWithExtensions extends FolderPreferenceProvider {
    protected getPath(preferenceName: string): string[] | undefined;
}
export declare class UserPreferenceProviderWithExtensions extends UserPreferenceProvider {
    protected getPath(preferenceName: string): string[] | undefined;
}
export declare class WorkspaceFilePreferenceProviderWithExtensions extends WorkspaceFilePreferenceProvider {
    protected belongsInSection(firstSegment: string, remainder: string): boolean;
}
export declare function bindPreferenceProviderOverrides(bind: interfaces.Bind, unbind: interfaces.Unbind): void;
//# sourceMappingURL=preference-provider-overrides.d.ts.map