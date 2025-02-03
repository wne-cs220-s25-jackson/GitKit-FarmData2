import { WorkspaceServer } from '../workspace-protocol';
export declare class MockWorkspaceServer implements WorkspaceServer {
    getRecentWorkspaces(): Promise<string[]>;
    getMostRecentlyUsedWorkspace(): Promise<string | undefined>;
    setMostRecentlyUsedWorkspace(uri: string): Promise<void>;
    removeRecentWorkspace(uri: string): Promise<void>;
}
//# sourceMappingURL=mock-workspace-server.d.ts.map