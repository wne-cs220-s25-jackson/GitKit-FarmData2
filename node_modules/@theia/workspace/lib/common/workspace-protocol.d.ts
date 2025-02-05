export declare const workspacePath = "/services/workspace";
/**
 * The JSON-RPC workspace interface.
 */
export declare const WorkspaceServer: unique symbol;
export interface WorkspaceServer {
    /**
     * Returns with a promise that resolves to the most recently used workspace folder URI as a string.
     * Resolves to `undefined` if the workspace folder is not yet set.
     */
    getMostRecentlyUsedWorkspace(): Promise<string | undefined>;
    /**
     * Sets the desired string representation of the URI as the most recently used workspace folder.
     */
    setMostRecentlyUsedWorkspace(uri: string): Promise<void>;
    /**
     * Removes a workspace from the list of recently opened workspaces.
     *
     * @param uri the workspace uri.
     */
    removeRecentWorkspace(uri: string): Promise<void>;
    /**
     * Returns list of recently opened workspaces as an array.
     */
    getRecentWorkspaces(): Promise<string[]>;
}
//# sourceMappingURL=workspace-protocol.d.ts.map