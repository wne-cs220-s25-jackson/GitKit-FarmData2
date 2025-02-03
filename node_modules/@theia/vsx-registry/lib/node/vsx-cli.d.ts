/// <reference types="yargs" />
import { CliContribution } from '@theia/core/lib/node';
import { Argv } from '@theia/core/shared/yargs';
import { OVSXRouterConfig } from '@theia/ovsx-client';
export declare class VsxCli implements CliContribution {
    ovsxRouterConfig: OVSXRouterConfig | undefined;
    ovsxRateLimit: number;
    pluginsToInstall: string[];
    configure(conf: Argv<{}>): void;
    setArguments(args: Record<string, unknown>): Promise<void>;
}
//# sourceMappingURL=vsx-cli.d.ts.map