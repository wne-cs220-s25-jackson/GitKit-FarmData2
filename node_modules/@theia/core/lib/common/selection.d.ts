import URI from './uri';
export interface UriSelection {
    readonly uri: URI;
}
export declare namespace UriSelection {
    function is(arg: unknown): arg is UriSelection;
    function getUri(selection: unknown): URI | undefined;
    function getUris(selection: unknown): URI[];
}
//# sourceMappingURL=selection.d.ts.map