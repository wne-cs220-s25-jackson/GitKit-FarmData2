import { interfaces } from 'inversify';
import { ContributionProvider, Emitter, Event, Disposable } from '../../common';
import { PreferenceScope } from './preference-scope';
import { PreferenceProvider, PreferenceProviderDataChange } from './preference-provider';
import { PreferenceSchema, PreferenceSchemaProperties, PreferenceDataSchema, PreferenceItem, PreferenceSchemaProperty, PreferenceDataProperty } from '../../common/preferences/preference-schema';
import { FrontendApplicationConfig } from '@theia/application-package/lib/application-props';
import { PreferenceConfigurations } from './preference-configurations';
export { PreferenceSchema, PreferenceSchemaProperties, PreferenceDataSchema, PreferenceItem, PreferenceSchemaProperty, PreferenceDataProperty };
import { JSONValue } from '@phosphor/coreutils';
export declare const PreferenceContribution: unique symbol;
export declare const DefaultOverridesPreferenceSchemaId = "defaultOverrides";
/**
 * A {@link PreferenceContribution} allows adding additional custom preferences.
 * For this, the {@link PreferenceContribution} has to provide a valid JSON Schema specifying which preferences
 * are available including their types and description.
 *
 * ### Example usage
 * ```typescript
 * const MyPreferencesSchema: PreferenceSchema = {
 *     'type': 'object',
 *     'properties': {
 *         'myext.decorations.enabled': {
 *             'type': 'boolean',
 *             'description': 'Show file status',
 *             'default': true
 *         },
 *         // [...]
 *     }
 * }
 * @injectable()
 * export class MyPreferenceContribution implements PreferenceContribution{
 *     schema= MyPreferencesSchema;
 * }
 * ```
 */
export interface PreferenceContribution {
    readonly schema: PreferenceSchema;
}
export declare function bindPreferenceSchemaProvider(bind: interfaces.Bind): void;
/**
 * Specialized {@link FrontendApplicationConfig} to configure default
 * preference values for the {@link PreferenceSchemaProvider}.
 */
export interface FrontendApplicationPreferenceConfig extends FrontendApplicationConfig {
    preferences: {
        [preferenceName: string]: any;
    };
}
export declare namespace FrontendApplicationPreferenceConfig {
    function is(config: FrontendApplicationConfig): config is FrontendApplicationPreferenceConfig;
}
/**
 * The {@link PreferenceSchemaProvider} collects all {@link PreferenceContribution}s and combines
 * the preference schema provided by these contributions into one collective schema. The preferences which
 * are provided by this {@link PreferenceProvider} are derived from this combined schema.
 */
export declare class PreferenceSchemaProvider extends PreferenceProvider {
    protected readonly preferences: {
        [name: string]: any;
    };
    protected readonly combinedSchema: PreferenceDataSchema;
    protected readonly workspaceSchema: PreferenceDataSchema;
    protected readonly folderSchema: PreferenceDataSchema;
    protected readonly preferenceContributions: ContributionProvider<PreferenceContribution>;
    protected readonly configurations: PreferenceConfigurations;
    protected readonly onDidPreferenceSchemaChangedEmitter: Emitter<void>;
    readonly onDidPreferenceSchemaChanged: Event<void>;
    protected fireDidPreferenceSchemaChanged(): void;
    protected init(): void;
    /**
     * Register a new overrideIdentifier. Existing identifiers are not replaced.
     *
     * Allows overriding existing values while keeping both values in store.
     * For example to store different editor settings, e.g. "[markdown].editor.autoIndent",
     * "[json].editor.autoIndent" and "editor.autoIndent"
     * @param overrideIdentifier the new overrideIdentifier
     */
    registerOverrideIdentifier(overrideIdentifier: string): void;
    protected readonly overridePatternProperties: Required<Pick<PreferenceDataProperty, 'properties' | 'additionalProperties'>> & PreferenceDataProperty;
    protected overridePatternPropertiesKey: string | undefined;
    protected updateOverridePatternPropertiesKey(): void;
    protected doUnsetSchema(changes: PreferenceProviderDataChange[]): PreferenceProviderDataChange[];
    protected validateSchema(schema: PreferenceSchema): void;
    protected doSetSchema(schema: PreferenceSchema): PreferenceProviderDataChange[];
    protected doSetPreferenceValue(preferenceName: string, newValue: any, { scope, domain }: {
        scope: PreferenceScope;
        domain?: string[];
    }): PreferenceProviderDataChange;
    getDefaultValue(property: PreferenceItem): JSONValue;
    protected getConfiguredDefault(preferenceName: string): any;
    getCombinedSchema(): PreferenceDataSchema;
    getSchema(scope: PreferenceScope): PreferenceDataSchema;
    setSchema(schema: PreferenceSchema): Disposable;
    getPreferences(): {
        [name: string]: any;
    };
    setPreference(): Promise<boolean>;
    isValidInScope(preferenceName: string, scope: PreferenceScope): boolean;
    getPreferenceNames(): IterableIterator<string>;
    getOverridePreferenceNames(preferenceName: string): IterableIterator<string>;
    getSchemaProperty(key: string): PreferenceDataProperty | undefined;
    /**
     * {@link property} will be assigned to field {@link key} in the schema.
     * Pass a new object to invalidate old schema.
     */
    updateSchemaProperty(key: string, property: PreferenceDataProperty): void;
    protected updateSchemaProps(key: string, property: PreferenceDataProperty): void;
    protected updateSchemaPropsDefault(key: string, property: PreferenceDataProperty): void;
    protected removePropFromSchemas(key: string): void;
    protected readConfiguredPreferences(): void;
}
//# sourceMappingURL=preference-contribution.d.ts.map