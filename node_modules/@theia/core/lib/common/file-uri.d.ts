import URI from './uri';
export declare namespace FileUri {
    /**
     * Creates a new file URI from the filesystem path argument.
     * @param fsPath the filesystem path.
     */
    function create(fsPath_: string): URI;
    /**
     * Returns with the platform specific FS path that is represented by the URI argument.
     *
     * @param uri the file URI that has to be resolved to a platform specific FS path.
     */
    function fsPath(uri: URI | string): string;
}
//# sourceMappingURL=file-uri.d.ts.map