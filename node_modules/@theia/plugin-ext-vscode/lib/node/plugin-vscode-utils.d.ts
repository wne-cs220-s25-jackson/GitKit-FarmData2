import { PluginVSCodeEnvironment } from '../common/plugin-vscode-environment';
export declare function decompressExtension(sourcePath: string, destPath: string): Promise<boolean>;
export declare function existsInDeploymentDir(env: PluginVSCodeEnvironment, extensionId: string): Promise<boolean>;
export declare const TMP_DIR_PREFIX = "tmp-vscode-unpacked-";
export declare function unpackToDeploymentDir(env: PluginVSCodeEnvironment, sourcePath: string, extensionId: string): Promise<string>;
export declare function getExtensionDeploymentDir(env: PluginVSCodeEnvironment, extensionId: string): Promise<string>;
export declare function getTempDir(env: PluginVSCodeEnvironment, prefix: string): Promise<string>;
//# sourceMappingURL=plugin-vscode-utils.d.ts.map