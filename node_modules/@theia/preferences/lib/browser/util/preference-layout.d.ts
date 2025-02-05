export interface PreferenceLayout {
    id: string;
    label: string;
    children?: PreferenceLayout[];
    settings?: string[];
}
export declare const COMMONLY_USED_SECTION_PREFIX = "commonly-used";
export declare const COMMONLY_USED_LAYOUT: {
    id: string;
    label: string;
    settings: string[];
};
export declare const DEFAULT_LAYOUT: PreferenceLayout[];
export declare class PreferenceLayoutProvider {
    getLayout(): PreferenceLayout[];
    getCommonlyUsedLayout(): PreferenceLayout;
    hasCategory(id: string): boolean;
    getLayoutForPreference(preferenceId: string): PreferenceLayout | undefined;
    protected findItemInSection(section: PreferenceLayout, preferenceId: string): PreferenceLayout | undefined;
    protected matchesSetting(preferenceId: string, setting: string): boolean;
    protected createRegExp(setting: string): RegExp;
}
//# sourceMappingURL=preference-layout.d.ts.map