import { URI as Uri } from 'vscode-uri';
import { Path } from './path';
export declare class URI {
    static fromComponents(components: UriComponents): URI;
    static fromComponents(components: undefined): undefined;
    static fromFilePath(path: string): URI;
    private readonly codeUri;
    private _path;
    constructor(uri?: string | Uri);
    /**
     * TODO move implementation to `DefaultUriLabelProviderContribution.getName`
     *
     * @deprecated use `LabelProvider.getName` instead
     */
    get displayName(): string;
    /**
     * Return all uri from the current to the top most.
     */
    get allLocations(): URI[];
    get parent(): URI;
    relative(uri: URI): Path | undefined;
    resolve(path: string | Path): URI;
    /**
     * @returns a new, absolute URI if one can be computed from the path segments passed in.
     */
    resolveToAbsolute(...pathSegments: Array<string | Path>): URI | undefined;
    /**
     * return a new URI replacing the current with the given scheme
     */
    withScheme(scheme: string): URI;
    /**
     * return a new URI replacing the current with the given authority
     */
    withAuthority(authority: string): URI;
    /**
     * return this URI without a authority
     */
    withoutAuthority(): URI;
    /**
     * return a new URI replacing the current with the given path
     */
    withPath(path: string | Path): URI;
    /**
     * return this URI without a path
     */
    withoutPath(): URI;
    /**
     * return a new URI replacing the current with the given query
     */
    withQuery(query: string): URI;
    /**
     * return this URI without a query
     */
    withoutQuery(): URI;
    /**
     * return a new URI replacing the current with the given fragment
     */
    withFragment(fragment: string): URI;
    /**
     * return this URI without a fragment
     */
    withoutFragment(): URI;
    /**
     * return a new URI replacing the current with its normalized path, resolving '..' and '.' segments
     */
    normalizePath(): URI;
    get scheme(): string;
    get authority(): string;
    get path(): Path;
    get query(): string;
    get fragment(): string;
    toString(skipEncoding?: boolean): string;
    isEqual(uri: URI, caseSensitive?: boolean): boolean;
    isEqualOrParent(uri: URI, caseSensitive?: boolean): boolean;
    static getDistinctParents(uris: URI[]): URI[];
    private hasSameOrigin;
    toComponents(): UriComponents;
}
export interface UriComponents {
    scheme: string;
    authority: string;
    path: string;
    query: string;
    fragment: string;
    external?: string;
}
export default URI;
//# sourceMappingURL=uri.d.ts.map