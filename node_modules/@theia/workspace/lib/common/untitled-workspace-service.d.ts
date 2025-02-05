import URI from '@theia/core/lib/common/uri';
import { MaybePromise } from '@theia/core';
import { WorkspaceFileService } from './workspace-file-service';
export declare class UntitledWorkspaceService {
    protected readonly workspaceFileService: WorkspaceFileService;
    isUntitledWorkspace(candidate?: URI): boolean;
    getUntitledWorkspaceUri(configDirUri: URI, isAcceptable: (candidate: URI) => MaybePromise<boolean>, warnOnHits?: () => unknown): Promise<URI>;
}
//# sourceMappingURL=untitled-workspace-service.d.ts.map