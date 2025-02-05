import { ILogger } from '@theia/core';
import { Deferred } from '@theia/core/lib/common/promise-util';
import { Git, Repository, WorkingDirectoryStatus, GitFileChange, Branch, GitResult, CommitWithChanges, GitFileBlame, Remote, StashEntry } from '../common';
import { GitRepositoryManager } from './git-repository-manager';
import { GitLocator } from './git-locator/git-locator-protocol';
import { GitExecProvider } from './git-exec-provider';
import { GitEnvProvider } from './env/git-env-provider';
import { GitInit } from './init/git-init';
/**
 * Parsing and converting raw Git output into Git model instances.
 */
export declare abstract class OutputParser<T> {
    /** This is the `NUL` delimiter. Equals `%x00`. */
    static readonly LINE_DELIMITER = "\0";
    abstract parse(repositoryUri: string, raw: string, delimiter?: string): T[];
    abstract parse(repositoryUri: string, items: string[]): T[];
    abstract parse(repositoryUri: string, input: string | string[], delimiter?: string): T[];
    protected toUri(repositoryUri: string, pathSegment: string): string;
    protected split(input: string | string[], delimiter: string): string[];
}
/**
 * Status parser for converting raw Git `--name-status` output into file change objects.
 */
export declare class NameStatusParser extends OutputParser<GitFileChange> {
    parse(repositoryUri: string, input: string | string[], delimiter?: string): GitFileChange[];
}
/**
 * Built-in Git placeholders for tuning the `--format` option for `git diff` or `git log`.
 */
export declare enum CommitPlaceholders {
    HASH = "%H",
    SHORT_HASH = "%h",
    AUTHOR_EMAIL = "%aE",
    AUTHOR_NAME = "%aN",
    AUTHOR_DATE = "%aI",
    AUTHOR_RELATIVE_DATE = "%ar",
    SUBJECT = "%s",
    BODY = "%b"
}
/**
 * Parser for converting raw, Git commit details into `CommitWithChanges` instances.
 */
export declare class CommitDetailsParser extends OutputParser<CommitWithChanges> {
    static readonly ENTRY_DELIMITER = "\u0001";
    static readonly COMMIT_CHUNK_DELIMITER = "\u0002";
    static readonly DEFAULT_PLACEHOLDERS: CommitPlaceholders[];
    protected readonly nameStatusParser: NameStatusParser;
    parse(repositoryUri: string, input: string | string[], delimiter?: string): CommitWithChanges[];
    getFormat(...placeholders: CommitPlaceholders[]): string;
}
export declare class GitBlameParser {
    parse(fileUri: string, gitBlameOutput: string, commitBody: (sha: string) => Promise<string>): Promise<GitFileBlame | undefined>;
    protected parseEntries(rawOutput: string): GitBlameParser.Entry[];
    protected createFileBlame(uri: string, blameEntries: GitBlameParser.Entry[], commitBody: (sha: string) => Promise<string>): Promise<GitFileBlame>;
}
export declare namespace GitBlameParser {
    interface Entry {
        fileName?: string;
        sha?: string;
        previousSha?: string;
        line?: number;
        lineCount?: number;
        author?: string;
        authorMail?: string;
        authorTime?: number;
        summary?: string;
    }
    function isUncommittedSha(sha: string | undefined): boolean;
    function pumpEntry(entry: Entry, outputLine: string): boolean;
}
/**
 * `dugite-extra` based Git implementation.
 */
export declare class DugiteGit implements Git {
    protected readonly limit = 1000;
    protected readonly logger: ILogger;
    protected readonly locator: GitLocator;
    protected readonly manager: GitRepositoryManager;
    protected readonly nameStatusParser: NameStatusParser;
    protected readonly commitDetailsParser: CommitDetailsParser;
    protected readonly blameParser: GitBlameParser;
    protected readonly execProvider: GitExecProvider;
    protected readonly envProvider: GitEnvProvider;
    protected readonly gitInit: GitInit;
    protected ready: Deferred<void>;
    protected gitEnv: Deferred<Object>;
    protected init(): void;
    dispose(): void;
    clone(remoteUrl: string, options: Git.Options.Clone): Promise<Repository>;
    repositories(workspaceRootUri: string, options: Git.Options.Repositories): Promise<Repository[]>;
    status(repository: Repository): Promise<WorkingDirectoryStatus>;
    add(repository: Repository, uri: string | string[]): Promise<void>;
    unstage(repository: Repository, uri: string | string[], options?: Git.Options.Unstage): Promise<void>;
    branch(repository: Repository, options: {
        type: 'current';
    }): Promise<Branch | undefined>;
    branch(repository: Repository, options: {
        type: 'local' | 'remote' | 'all';
    }): Promise<Branch[]>;
    branch(repository: Repository, options: Git.Options.BranchCommand.Create | Git.Options.BranchCommand.Rename | Git.Options.BranchCommand.Delete): Promise<void>;
    checkout(repository: Repository, options: Git.Options.Checkout.CheckoutBranch | Git.Options.Checkout.WorkingTreeFile): Promise<void>;
    commit(repository: Repository, message?: string, options?: Git.Options.Commit): Promise<void>;
    fetch(repository: Repository, options?: Git.Options.Fetch): Promise<void>;
    push(repository: Repository, { remote, localBranch, remoteBranch, setUpstream, force }?: Git.Options.Push): Promise<void>;
    pull(repository: Repository, { remote, branch, rebase }?: Git.Options.Pull): Promise<void>;
    reset(repository: Repository, options: Git.Options.Reset): Promise<void>;
    merge(repository: Repository, options: Git.Options.Merge): Promise<void>;
    show(repository: Repository, uri: string, options?: Git.Options.Show): Promise<string>;
    stash(repository: Repository, options?: Readonly<{
        action?: 'push';
        message?: string;
    }>): Promise<void>;
    stash(repository: Repository, options: Readonly<{
        action: 'list';
    }>): Promise<StashEntry[]>;
    stash(repository: Repository, options: Readonly<{
        action: 'clear';
    }>): Promise<void>;
    stash(repository: Repository, options: Readonly<{
        action: 'apply' | 'pop' | 'drop';
        id?: string;
    }>): Promise<void>;
    remote(repository: Repository): Promise<string[]>;
    remote(repository: Repository, options: {
        verbose: true;
    }): Promise<Remote[]>;
    exec(repository: Repository, args: string[], options?: Git.Options.Execution): Promise<GitResult>;
    diff(repository: Repository, options?: Git.Options.Diff): Promise<GitFileChange[]>;
    log(repository: Repository, options?: Git.Options.Log): Promise<CommitWithChanges[]>;
    revParse(repository: Repository, options: Git.Options.RevParse): Promise<string | undefined>;
    blame(repository: Repository, uri: string, options?: Git.Options.Blame): Promise<GitFileBlame | undefined>;
    lsFiles(repository: Repository, uri: string, options?: Git.Options.LsFiles): Promise<any>;
    private getCommitish;
    private resolveContainingPath;
    private getRemotes;
    private getDefaultRemote;
    private getCurrentBranch;
    private getResetMode;
    private mapBranch;
    private mapTip;
    private mapCommitIdentity;
    private mapStatus;
    private mapAheadBehind;
    private mapFileChanges;
    private isNestedGitRepository;
    private mapFileChange;
    private mapFileStatus;
    private mapRange;
    private getFsPath;
    private getUri;
    private fail;
}
//# sourceMappingURL=dugite-git.d.ts.map