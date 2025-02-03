import { PreferenceSchemaProperties } from '../../common/preferences/preference-schema';
export interface OverridePreferenceName {
    preferenceName: string;
    overrideIdentifier: string;
}
export declare namespace OverridePreferenceName {
    function is(arg: unknown): arg is OverridePreferenceName;
}
export declare const OVERRIDE_PROPERTY_PATTERN: RegExp;
export declare const getOverridePattern: (identifier: string) => string;
export declare class PreferenceLanguageOverrideService {
    protected readonly overrideIdentifiers: Set<string>;
    testOverrideValue(name: string, value: unknown): value is PreferenceSchemaProperties;
    /**
     * @param overrideIdentifier the language id associated for a language override, e.g. `typescript`
     * @returns the form used to mark language overrides in preference files, e.g. `[typescript]`
     */
    markLanguageOverride(overrideIdentifier: string): string;
    /**
     * @returns the flat JSON path to an overridden preference, e.g. [typescript].editor.tabSize.
     */
    overridePreferenceName({ preferenceName, overrideIdentifier }: OverridePreferenceName): string;
    /**
     * @returns an OverridePreferenceName if the `name` contains a language override, e.g. [typescript].editor.tabSize.
     */
    overriddenPreferenceName(name: string): OverridePreferenceName | undefined;
    computeOverridePatternPropertiesKey(): string | undefined;
    getOverridePreferenceNames(preferenceName: string): IterableIterator<string>;
    /**
     * @param overrideIdentifier
     * @returns true if the addition caused a change, i.e. if the identifier was not already present in the set of identifiers, false otherwise.
     */
    addOverrideIdentifier(overrideIdentifier: string): boolean;
    /**
     * @param overrideIdentifier
     * @returns true if the deletion caused a change, i.e. if the identifier was present in the set, false otherwise.
     */
    removeOverrideIdentifier(overrideIdentifier: string): boolean;
}
//# sourceMappingURL=preference-language-override-service.d.ts.map