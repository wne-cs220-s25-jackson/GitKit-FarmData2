import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
import URI from '@theia/core/lib/common/uri';
export declare class PluginVSCodeEnvironment {
    protected readonly environments: EnvVariablesServer;
    protected _userExtensionsDirUri: URI | undefined;
    protected _deployedPluginsUri: URI | undefined;
    protected _tmpDirUri: URI | undefined;
    getUserExtensionsDirUri(): Promise<URI>;
    getDeploymentDirUri(): Promise<URI>;
    getTempDirUri(prefix?: string): Promise<URI>;
}
//# sourceMappingURL=plugin-vscode-environment.d.ts.map