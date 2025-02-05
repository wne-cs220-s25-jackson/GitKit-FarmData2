import { Disposable, Event } from '@theia/core/lib/common';
import URI from '@theia/core/lib/common/uri';
export interface ScmProvider extends Disposable {
    readonly id: string;
    readonly label: string;
    readonly rootUri: string;
    readonly acceptInputCommand?: ScmCommand;
    readonly groups: ScmResourceGroup[];
    readonly onDidChange: Event<void>;
    readonly onDidChangeResources?: Event<void>;
    readonly statusBarCommands?: ScmCommand[];
    readonly onDidChangeStatusBarCommands?: Event<ScmCommand[] | undefined>;
    readonly onDidChangeCommitTemplate: Event<string>;
    readonly amendSupport?: ScmAmendSupport;
}
export declare const ScmResourceGroup: unique symbol;
export interface ScmResourceGroup extends Disposable {
    readonly id: string;
    readonly label: string;
    readonly resources: ScmResource[];
    readonly hideWhenEmpty?: boolean;
    readonly provider: ScmProvider;
}
export interface ScmResource {
    /** The uri of the underlying resource inside the workspace. */
    readonly sourceUri: URI;
    readonly decorations?: ScmResourceDecorations;
    open(): Promise<void>;
    readonly group: ScmResourceGroup;
}
export interface ScmResourceDecorations {
    icon?: string;
    iconDark?: string;
    tooltip?: string;
    source?: string;
    letter?: string;
    color?: string;
    strikeThrough?: boolean;
}
export interface ScmCommand {
    title: string;
    tooltip?: string;
    command?: string;
    arguments?: any[];
}
export interface ScmCommit {
    readonly id: string;
    readonly summary: string;
    readonly authorName: string;
    readonly authorEmail: string;
    readonly authorDateRelative: string;
}
export interface ScmAmendSupport {
    getInitialAmendingCommits(amendingHeadCommitId: string, latestCommitId: string | undefined): Promise<ScmCommit[]>;
    getMessage(commit: string): Promise<string>;
    reset(commit: string): Promise<void>;
    getLastCommit(): Promise<ScmCommit | undefined>;
}
//# sourceMappingURL=scm-provider.d.ts.map