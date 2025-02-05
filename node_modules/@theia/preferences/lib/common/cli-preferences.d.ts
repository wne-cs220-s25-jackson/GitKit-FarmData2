export declare const CliPreferences: unique symbol;
export declare const CliPreferencesPath = "/services/cli-preferences";
export interface CliPreferences {
    getPreferences(): Promise<[string, unknown][]>;
}
//# sourceMappingURL=cli-preferences.d.ts.map