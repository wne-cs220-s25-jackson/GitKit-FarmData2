export declare const pluginPathsServicePath = "/services/plugin-paths";
export declare const PluginPathsService: unique symbol;
export interface PluginPathsService {
    /** Returns hosted log path. Create directory by this path if it is not exist on the file system. */
    getHostLogPath(): Promise<string>;
    /** Returns storage path for given workspace */
    getHostStoragePath(workspaceUri: string | undefined, rootUris: string[]): Promise<string | undefined>;
}
//# sourceMappingURL=plugin-paths-protocol.d.ts.map