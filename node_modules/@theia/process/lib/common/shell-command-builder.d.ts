import { ShellQuotedString, ShellQuotingFunctions } from '../common/shell-quoting';
export interface ProcessInfo {
    executable: string;
    arguments: string[];
}
export interface CommandLineOptions {
    cwd: string;
    args: string[];
    env?: {
        [key: string]: string | null;
    };
}
/**
 * Create command lines ready to be sent to a shell's stdin for evaluation.
 */
export declare class ShellCommandBuilder {
    /**
     * Constructs a command line to run in a shell. The shell could be
     * re-used/long-lived, this means we cannot spawn a new process with a nice
     * and fresh environment, we need to encode environment modifications into
     * the returned command.
     *
     * Inspired by VS Code implementation, see:
     * https://github.com/microsoft/vscode/blob/f395cac4fff0721a8099126172c01411812bcb4a/src/vs/workbench/contrib/debug/node/terminals.ts#L79
     *
     * @param hostProcessInfo the host terminal process infos
     * @param commandOptions program to execute in the host terminal
     */
    buildCommand(hostProcessInfo: ProcessInfo | undefined, commandOptions: CommandLineOptions): string;
    protected buildForBash(args: Array<string | ShellQuotedString>, cwd?: string, env?: Array<[string, string | null]>): string;
    protected buildForPowershell(args: Array<string | ShellQuotedString>, cwd?: string, env?: Array<[string, string | null]>): string;
    protected buildForCmd(args: Array<string | ShellQuotedString>, cwd?: string, env?: Array<[string, string | null]>): string;
    protected buildForDefault(args: Array<string | ShellQuotedString>, cwd?: string, env?: Array<[string, string | null]>): string;
    /**
     * This method will try to leave `arg[0]` unescaped if possible. The reason
     * is that shells like `cmd` expect their own commands like `dir` to be
     * unescaped.
     *
     * @returns empty string if `args` is empty, otherwise an escaped command.
     */
    protected createShellCommandLine(args: (string | ShellQuotedString)[], quotingFunctions: ShellQuotingFunctions): string;
    protected quoteExecutableIfNecessary(exec: string | ShellQuotedString, quotingFunctions: ShellQuotingFunctions): string;
    /**
     * If this method returns `false` then we definitely need quoting.
     *
     * May return false positives.
     */
    protected needsQuoting(arg: string): boolean;
}
//# sourceMappingURL=shell-command-builder.d.ts.map