import { interfaces } from 'inversify';
import { PreferenceProvider } from '../preference-provider';
import { PreferenceScope } from '../preference-scope';
export declare class MockPreferenceProvider extends PreferenceProvider {
    protected scope: PreferenceScope;
    readonly prefs: {
        [p: string]: any;
    };
    constructor(scope: PreferenceScope);
    markReady(): void;
    getPreferences(): {
        [p: string]: any;
    };
    setPreference(preferenceName: string, newValue: any, resourceUri?: string): Promise<boolean>;
}
export declare function bindMockPreferenceProviders(bind: interfaces.Bind, unbind: interfaces.Unbind): void;
//# sourceMappingURL=mock-preference-provider.d.ts.map