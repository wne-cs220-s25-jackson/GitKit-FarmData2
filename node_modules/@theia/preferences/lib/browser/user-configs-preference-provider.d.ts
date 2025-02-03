import URI from '@theia/core/lib/common/uri';
import { PreferenceProvider, PreferenceResolveResult } from '@theia/core/lib/browser/preferences/preference-provider';
import { PreferenceConfigurations } from '@theia/core/lib/browser/preferences/preference-configurations';
import { UserPreferenceProvider, UserPreferenceProviderFactory } from './user-preference-provider';
/**
 * Binds together preference section prefs providers for user-level preferences.
 */
export declare class UserConfigsPreferenceProvider extends PreferenceProvider {
    protected readonly providerFactory: UserPreferenceProviderFactory;
    protected readonly configurations: PreferenceConfigurations;
    protected readonly providers: Map<string, UserPreferenceProvider>;
    protected init(): void;
    protected doInit(): Promise<void>;
    protected createProviders(): void;
    getConfigUri(resourceUri?: string, sectionName?: string): URI | undefined;
    resolve<T>(preferenceName: string, resourceUri?: string): PreferenceResolveResult<T>;
    getPreferences(resourceUri?: string): {
        [p: string]: any;
    };
    setPreference(preferenceName: string, value: any, resourceUri?: string): Promise<boolean>;
    protected createProvider(uri: URI, sectionName: string): UserPreferenceProvider;
}
//# sourceMappingURL=user-configs-preference-provider.d.ts.map