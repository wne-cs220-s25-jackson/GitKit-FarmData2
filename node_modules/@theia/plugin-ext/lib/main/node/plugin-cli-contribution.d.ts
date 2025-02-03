/// <reference types="yargs" />
import { Argv, Arguments } from '@theia/core/shared/yargs';
import { CliContribution } from '@theia/core/lib/node/cli';
export declare class PluginCliContribution implements CliContribution {
    static PLUGINS: string;
    static PLUGIN_MAX_SESSION_LOGS_FOLDERS: string;
    static UNCOMPRESSED_PLUGINS_IN_PLACE: string;
    /**
     * This is the default value used in VSCode, see:
     * - https://github.com/Microsoft/vscode/blob/613447d6b3f458ef7fee227e3876303bf5184580/src/vs/code/electron-browser/sharedProcess/contrib/logsDataCleaner.ts#L32
     */
    static DEFAULT_PLUGIN_MAX_SESSION_LOGS_FOLDERS: number;
    protected _localDir: string | undefined;
    protected _maxSessionLogsFolders: number;
    protected _keepUncompressedInPlace: boolean;
    configure(conf: Argv): void;
    setArguments(args: Arguments): void;
    localDir(): string | undefined;
    maxSessionLogsFolders(): number;
    copyUncompressedPlugins(): boolean;
}
//# sourceMappingURL=plugin-cli-contribution.d.ts.map