import URI from '@theia/core/lib/common/uri';
import { PreferenceScope } from '@theia/core/lib/browser';
import { FileStat } from '@theia/filesystem/lib/common/files';
import { SectionPreferenceProvider } from './section-preference-provider';
export declare const FolderPreferenceProviderFactory: unique symbol;
export interface FolderPreferenceProviderFactory {
    (uri: URI, section: string, folder: FileStat): FolderPreferenceProvider;
}
export declare const FolderPreferenceProviderFolder: unique symbol;
export interface FolderPreferenceProviderOptions {
    readonly configUri: URI;
    readonly sectionName: string | undefined;
}
export declare class FolderPreferenceProvider extends SectionPreferenceProvider {
    protected readonly folder: FileStat;
    private _folderUri;
    get folderUri(): URI;
    getScope(): PreferenceScope;
    getDomain(): string[];
}
//# sourceMappingURL=folder-preference-provider.d.ts.map