import * as yargs from 'yargs';
import { ContributionProvider } from '../common/contribution-provider';
import { MaybePromise } from '../common/types';
export declare const CliContribution: unique symbol;
/**
 * Call back for extension to contribute options to the cli.
 */
export interface CliContribution {
    configure(conf: yargs.Argv): void;
    setArguments(args: yargs.Arguments): MaybePromise<void>;
}
export declare class CliManager {
    protected readonly contributionsProvider: ContributionProvider<CliContribution>;
    constructor(contributionsProvider: ContributionProvider<CliContribution>);
    initializeCli<T>(argv: string[], postSetArguments: () => Promise<void>, defaultCommand: () => Promise<void>): Promise<void>;
    protected isExit(): boolean;
}
//# sourceMappingURL=cli.d.ts.map