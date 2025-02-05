import URI from '@theia/core/lib/common/uri';
export declare namespace PreviewUri {
    const id = "code-editor-preview";
    const param: string;
    function match(uri: URI): boolean;
    function encode(uri: URI): URI;
    function decode(uri: URI): URI;
}
//# sourceMappingURL=preview-uri.d.ts.map