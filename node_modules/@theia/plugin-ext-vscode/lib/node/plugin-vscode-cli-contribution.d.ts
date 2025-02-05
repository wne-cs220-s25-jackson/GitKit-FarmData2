/// <reference types="yargs" />
/// <reference types="node" />
import { Argv, Arguments } from '@theia/core/shared/yargs';
import { CliContribution } from '@theia/core/lib/node/cli';
import { PluginHostEnvironmentVariable } from '@theia/plugin-ext/lib/common';
import { Deferred } from '@theia/core/lib/common/promise-util';
/**
 * CLI Contribution allowing to override the VS Code API version which is returned by `vscode.version` API call.
 */
export declare class PluginVsCodeCliContribution implements CliContribution, PluginHostEnvironmentVariable {
    /**
     * CLI argument name to define the supported VS Code API version.
     */
    static VSCODE_API_VERSION: string;
    protected vsCodeApiVersion?: string;
    protected vsCodeApiVersionDeferred: Deferred<string>;
    get vsCodeApiVersionPromise(): Promise<string>;
    configure(conf: Argv): void;
    setArguments(args: Arguments): void;
    process(env: NodeJS.ProcessEnv): void;
}
//# sourceMappingURL=plugin-vscode-cli-contribution.d.ts.map