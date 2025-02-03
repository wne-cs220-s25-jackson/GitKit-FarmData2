import URI from '@theia/core/lib/common/uri';
/**
 * Static methods for identifying a plugin as the target of the VSCode deployment system.
 * In practice, this means that it will be resolved and deployed by the Open-VSX system.
 */
export declare namespace VSCodeExtensionUri {
    const SCHEME = "vscode-extension";
    function fromId(id: string, version?: string): URI;
    function fromVersionedId(versionedId: string): URI;
    function toId(uri: URI): {
        id: string;
        version?: string;
    } | undefined;
}
//# sourceMappingURL=plugin-vscode-uri.d.ts.map