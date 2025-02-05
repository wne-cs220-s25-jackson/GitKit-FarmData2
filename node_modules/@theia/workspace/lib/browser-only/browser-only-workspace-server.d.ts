import { WorkspaceServer } from '../common/workspace-protocol';
import { ILogger } from '@theia/core';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
export declare const RECENT_WORKSPACES_LOCAL_STORAGE_KEY = "workspaces";
export declare class BrowserOnlyWorkspaceServer implements WorkspaceServer {
    protected logger: ILogger;
    protected readonly fileService: FileService;
    getRecentWorkspaces(): Promise<string[]>;
    getMostRecentlyUsedWorkspace(): Promise<string | undefined>;
    setMostRecentlyUsedWorkspace(uri: string): Promise<void>;
    removeRecentWorkspace(uri: string): Promise<void>;
}
//# sourceMappingURL=browser-only-workspace-server.d.ts.map