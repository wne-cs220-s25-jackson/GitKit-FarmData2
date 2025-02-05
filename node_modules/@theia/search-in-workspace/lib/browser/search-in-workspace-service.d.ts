import { SearchInWorkspaceServer, SearchInWorkspaceClient, SearchInWorkspaceResult, SearchInWorkspaceOptions } from '../common/search-in-workspace-interface';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { ILogger } from '@theia/core';
/**
 * Class that will receive the search results from the server.  This is separate
 * from the SearchInWorkspaceService class only to avoid a cycle in the
 * dependency injection.
 */
export declare class SearchInWorkspaceClientImpl implements SearchInWorkspaceClient {
    private service;
    onResult(searchId: number, result: SearchInWorkspaceResult): void;
    onDone(searchId: number, error?: string): void;
    setService(service: SearchInWorkspaceClient): void;
}
export type SearchInWorkspaceCallbacks = SearchInWorkspaceClient;
/**
 * Service to search text in the workspace files.
 */
export declare class SearchInWorkspaceService implements SearchInWorkspaceClient {
    private pendingSearches;
    private pendingOnDones;
    private lastKnownSearchId;
    protected readonly searchServer: SearchInWorkspaceServer;
    protected readonly client: SearchInWorkspaceClientImpl;
    protected readonly workspaceService: WorkspaceService;
    protected readonly logger: ILogger;
    protected init(): void;
    isEnabled(): boolean;
    onResult(searchId: number, result: SearchInWorkspaceResult): void;
    onDone(searchId: number, error?: string): void;
    search(what: string, callbacks: SearchInWorkspaceCallbacks, opts?: SearchInWorkspaceOptions): Promise<number>;
    protected doSearch(what: string, rootsUris: string[], callbacks: SearchInWorkspaceCallbacks, opts?: SearchInWorkspaceOptions): Promise<number>;
    searchWithCallback(what: string, rootsUris: string[], callbacks: SearchInWorkspaceClient, opts?: SearchInWorkspaceOptions | undefined): Promise<number>;
    cancel(searchId: number): void;
}
//# sourceMappingURL=search-in-workspace-service.d.ts.map