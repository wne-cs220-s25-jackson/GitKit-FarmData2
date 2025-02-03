import { Event } from '../../../common';
import URI from '../../../common/uri';
import { PreferenceChange, PreferenceChanges, PreferenceInspection, PreferenceService } from '../preference-service';
import { PreferenceScope } from '../preference-scope';
import { OverridePreferenceName } from '../preference-language-override-service';
export declare class MockPreferenceService implements PreferenceService {
    constructor();
    dispose(): void;
    get<T>(preferenceName: string): T | undefined;
    get<T>(preferenceName: string, defaultValue: T): T;
    get<T>(preferenceName: string, defaultValue: T, resourceUri: string): T;
    resolve<T>(preferenceName: string, defaultValue?: T, resourceUri?: string): {
        configUri?: URI;
        value?: T;
    };
    inspect<T>(preferenceName: string, resourceUri?: string): PreferenceInspection<T> | undefined;
    inspectInScope<T>(preferenceName: string, scope: PreferenceScope, resourceUri?: string, forceLanguageOverride?: boolean): T | undefined;
    set(preferenceName: string, value: any): Promise<void>;
    updateValue(): Promise<void>;
    readonly ready: Promise<void>;
    readonly isReady = true;
    readonly onPreferenceChanged: Event<PreferenceChange>;
    readonly onPreferencesChanged: Event<PreferenceChanges>;
    overridePreferenceName(options: OverridePreferenceName): string;
    overriddenPreferenceName(preferenceName: string): OverridePreferenceName | undefined;
    validate(name: string, value: any): boolean;
    getConfigUri(scope: PreferenceScope, resourceUri?: string): URI | undefined;
}
//# sourceMappingURL=mock-preference-service.d.ts.map