import URI from '@theia/core/lib/common/uri';
import { DisposableCollection } from '@theia/core/lib/common/disposable';
import { PreferenceProvider } from '@theia/core/lib/browser/preferences';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { WorkspaceFilePreferenceProviderFactory } from './workspace-file-preference-provider';
export declare class WorkspacePreferenceProvider extends PreferenceProvider {
    protected readonly workspaceService: WorkspaceService;
    protected readonly workspaceFileProviderFactory: WorkspaceFilePreferenceProviderFactory;
    protected readonly folderPreferenceProvider: PreferenceProvider;
    protected readonly toDisposeOnEnsureDelegateUpToDate: DisposableCollection;
    protected init(): void;
    getConfigUri(resourceUri?: string | undefined, sectionName?: string): URI | undefined;
    getContainingConfigUri(resourceUri?: string | undefined, sectionName?: string): URI | undefined;
    protected _delegate: PreferenceProvider | undefined;
    protected get delegate(): PreferenceProvider | undefined;
    protected ensureDelegateUpToDate(): void;
    protected createDelegate(): PreferenceProvider | undefined;
    get<T>(preferenceName: string, resourceUri?: string | undefined): T | undefined;
    resolve<T>(preferenceName: string, resourceUri?: string | undefined): {
        value?: T;
        configUri?: URI;
    };
    getPreferences(resourceUri?: string | undefined): {
        [p: string]: any;
    };
    setPreference(preferenceName: string, value: any, resourceUri?: string | undefined): Promise<boolean>;
    protected ensureResourceUri(): string | undefined;
}
//# sourceMappingURL=workspace-preference-provider.d.ts.map