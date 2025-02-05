import URI from '@theia/core/lib/common/uri';
export declare class DirectoryArchiver {
    archive(inputPath: string, outputPath: string, entries?: string[]): Promise<void>;
    findCommonParents(uris: URI[]): Promise<Map<string, string[]>>;
    protected closestCommonParentUri(left: URI, right: URI): URI | undefined;
    protected isDir(uri: URI): Promise<boolean>;
    protected equal(left: URI | URI[], right: URI | URI[]): boolean;
    protected toUriString(uri: URI): string;
}
//# sourceMappingURL=directory-archiver.d.ts.map