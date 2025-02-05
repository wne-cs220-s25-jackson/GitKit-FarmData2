/// <reference types="yargs" />
import { Argv, Arguments } from '@theia/core/shared/yargs';
import { CliContribution } from '@theia/core/lib/node';
export declare class HostedPluginCliContribution implements CliContribution {
    static EXTENSION_TESTS_PATH: string;
    static PLUGIN_HOST_TERMINATE_TIMEOUT: string;
    static PLUGIN_HOST_STOP_TIMEOUT: string;
    protected _extensionTestsPath: string | undefined;
    get extensionTestsPath(): string | undefined;
    protected _pluginHostTerminateTimeout: number;
    get pluginHostTerminateTimeout(): number;
    protected _pluginHostStopTimeout: number;
    get pluginHostStopTimeout(): number;
    configure(conf: Argv): void;
    setArguments(args: Arguments): void;
}
//# sourceMappingURL=hosted-plugin-cli-contribution.d.ts.map