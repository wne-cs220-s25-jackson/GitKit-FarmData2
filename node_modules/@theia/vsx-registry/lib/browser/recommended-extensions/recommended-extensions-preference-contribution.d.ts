import { PreferenceSchema } from '@theia/core/lib/browser';
import { interfaces } from '@theia/core/shared/inversify';
export interface RecommendedExtensions {
    recommendations?: string[];
    unwantedRecommendations?: string[];
}
export declare const recommendedExtensionsPreferencesSchema: PreferenceSchema;
export declare const IGNORE_RECOMMENDATIONS_ID = "extensions.ignoreRecommendations";
export declare const recommendedExtensionNotificationPreferencesSchema: PreferenceSchema;
export declare const ExtensionNotificationPreferences: unique symbol;
export declare function bindExtensionPreferences(bind: interfaces.Bind): void;
//# sourceMappingURL=recommended-extensions-preference-contribution.d.ts.map