import { StorageService } from '@theia/core/lib/browser/storage-service';
import { WorkspaceService } from './workspace-service';
import { FileStat } from '@theia/filesystem/lib/common/files';
export declare class WorkspaceStorageService implements StorageService {
    private prefix;
    private initialized;
    protected storageService: StorageService;
    protected workspaceService: WorkspaceService;
    protected init(): void;
    setData<T>(key: string, data: T): Promise<void>;
    getData<T>(key: string, defaultValue?: T): Promise<T | undefined>;
    protected prefixWorkspaceURI(originalKey: string): string;
    protected getPrefix(workspaceStat: FileStat | undefined): string;
    private updatePrefix;
}
//# sourceMappingURL=workspace-storage-service.d.ts.map