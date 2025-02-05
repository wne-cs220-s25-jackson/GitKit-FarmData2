import { URI } from '@theia/core';
import { FileStat } from '@theia/filesystem/lib/common/files';
export interface WorkspaceFileType {
    extension: string;
    name: string;
}
/**
 * @deprecated Since 1.39.0. Use `WorkspaceFileService#getWorkspaceFileTypes` instead.
 */
export declare const THEIA_EXT = "theia-workspace";
/**
 * @deprecated Since 1.39.0. Use `WorkspaceFileService#getWorkspaceFileTypes` instead.
 */
export declare const VSCODE_EXT = "code-workspace";
export declare class WorkspaceFileService {
    protected _defaultFileTypeIndex: number;
    get defaultFileTypeIndex(): number;
    /**
     * Check if the file should be considered as a workspace file.
     *
     * Example: We should not try to read the contents of an .exe file.
     */
    isWorkspaceFile(candidate: FileStat | URI): boolean;
    getWorkspaceFileTypes(): WorkspaceFileType[];
    getWorkspaceFileExtensions(dot?: boolean): string[];
}
//# sourceMappingURL=workspace-file-service.d.ts.map