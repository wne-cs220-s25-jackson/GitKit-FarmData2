import URI from '@theia/core/lib/common/uri';
export declare namespace OutputUri {
    const SCHEME = "output";
    function is(uri: string | URI): boolean;
    function create(name: string): URI;
    function channelName(uri: string | URI): string;
}
//# sourceMappingURL=output-uri.d.ts.map