export interface Marker<T> {
    /**
     * the uri this marker is associated with.
     */
    uri: string;
    owner: string;
    /**
     * the kind, e.g. 'problem'
     */
    kind?: string;
    data: T;
}
export declare namespace Marker {
    function is(value: unknown): value is Marker<object>;
    function is<T>(value: unknown, subTypeCheck: (value: unknown) => value is T): value is Marker<T>;
}
//# sourceMappingURL=marker.d.ts.map