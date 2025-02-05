import { ILogger } from '@theia/core';
import { PluginPathsService } from '../../common/plugin-paths-protocol';
import { UntitledWorkspaceService } from '@theia/workspace/lib/common';
import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
import { PluginCliContribution } from '../plugin-cli-contribution';
export declare class PluginPathsServiceImpl implements PluginPathsService {
    protected readonly logger: ILogger;
    protected readonly envServer: EnvVariablesServer;
    protected readonly cliContribution: PluginCliContribution;
    protected readonly untitledWorkspaceService: UntitledWorkspaceService;
    getHostLogPath(): Promise<string>;
    getHostStoragePath(workspaceUri: string | undefined, rootUris: string[]): Promise<string | undefined>;
    protected buildWorkspaceId(workspaceUri: string, rootUris: string[]): Promise<string>;
    /**
     * Creates a hash digest of the given string.
     */
    protected createHash(str: string): string;
    /**
     * Generate time folder name in format: YYYYMMDDTHHMMSS, for example: 20181205T093828
     */
    private generateTimeFolderName;
    private getLogsDirPath;
    private getWorkspaceStorageDirPath;
    private cleanupOldLogs;
}
//# sourceMappingURL=plugin-paths-service.d.ts.map