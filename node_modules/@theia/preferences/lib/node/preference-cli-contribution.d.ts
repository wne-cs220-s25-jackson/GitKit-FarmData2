/// <reference types="yargs" />
import { Argv } from '@theia/core/shared/yargs';
import { CliContribution } from '@theia/core/lib/node/cli';
import { CliPreferences } from '../common/cli-preferences';
export declare class PreferenceCliContribution implements CliContribution, CliPreferences {
    protected preferences: [string, unknown][];
    configure(conf: Argv<{}>): void;
    setArguments(args: Record<string, unknown>): void;
    getPreferences(): Promise<[string, unknown][]>;
}
//# sourceMappingURL=preference-cli-contribution.d.ts.map