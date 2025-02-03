export declare enum PreferenceScope {
    Default = 0,
    User = 1,
    Workspace = 2,
    Folder = 3
}
export declare namespace PreferenceScope {
    function is(scope: unknown): scope is PreferenceScope;
    /**
     * @returns preference scopes from broadest to narrowest: Default -> Folder.
     */
    function getScopes(): PreferenceScope[];
    /**
     * @returns preference scopes from narrowest to broadest. Folder -> Default.
     */
    function getReversedScopes(): PreferenceScope[];
    function getScopeNames(scope?: PreferenceScope): string[];
    function fromString(strScope: string): PreferenceScope | undefined;
}
//# sourceMappingURL=preference-scope.d.ts.map