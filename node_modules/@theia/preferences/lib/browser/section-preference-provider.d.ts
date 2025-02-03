import URI from '@theia/core/lib/common/uri';
import { AbstractResourcePreferenceProvider } from './abstract-resource-preference-provider';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { PreferenceConfigurations } from '@theia/core/lib/browser/preferences/preference-configurations';
export declare const SectionPreferenceProviderUri: unique symbol;
export declare const SectionPreferenceProviderSection: unique symbol;
/**
 * This class encapsulates the logic of using separate files for some workspace configuration like 'launch.json' or 'tasks.json'.
 * Anything that is not a contributed section will be in the main config file.
 */
export declare abstract class SectionPreferenceProvider extends AbstractResourcePreferenceProvider {
    protected readonly workspaceService: WorkspaceService;
    protected readonly uri: URI;
    protected readonly section: string;
    protected readonly preferenceConfigurations: PreferenceConfigurations;
    private _isSection?;
    private get isSection();
    protected getUri(): URI;
    protected parse(content: string): any;
    protected getPath(preferenceName: string): string[] | undefined;
}
//# sourceMappingURL=section-preference-provider.d.ts.map