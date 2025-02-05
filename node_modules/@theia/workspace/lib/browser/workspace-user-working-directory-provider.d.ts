import { UserWorkingDirectoryProvider } from '@theia/core/lib/browser/user-working-directory-provider';
import URI from '@theia/core/lib/common/uri';
import { WorkspaceService } from './workspace-service';
import { MaybePromise } from '@theia/core';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
export declare class WorkspaceUserWorkingDirectoryProvider extends UserWorkingDirectoryProvider {
    protected readonly workspaceService: WorkspaceService;
    protected readonly fileService: FileService;
    getUserWorkingDir(): Promise<URI>;
    protected getFromWorkspace(): MaybePromise<URI | undefined>;
    protected ensureIsDirectory(uri?: URI): Promise<URI | undefined>;
}
//# sourceMappingURL=workspace-user-working-directory-provider.d.ts.map