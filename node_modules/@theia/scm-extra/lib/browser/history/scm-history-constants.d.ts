import { Command, Event } from '@theia/core';
import { OpenViewArguments } from '@theia/core/lib/browser';
import { ScmFileChangeNode, ScmHistoryCommit } from '../scm-file-change-node';
export declare const SCM_HISTORY_ID = "scm-history";
export declare const SCM_HISTORY_LABEL: string;
export declare const SCM_HISTORY_TOGGLE_KEYBINDING = "alt+h";
export declare const SCM_HISTORY_MAX_COUNT = 100;
export declare namespace ScmHistoryCommands {
    const OPEN_FILE_HISTORY: Command;
    const OPEN_BRANCH_HISTORY: Command;
}
export interface ScmHistoryOpenViewArguments extends OpenViewArguments {
    uri: string | undefined;
}
export declare const ScmHistorySupport: unique symbol;
export interface ScmHistorySupport {
    getCommitHistory(options?: HistoryWidgetOptions): Promise<ScmHistoryCommit[]>;
    readonly onDidChangeHistory: Event<void>;
}
export interface ScmCommitNode {
    commitDetails: ScmHistoryCommit;
    authorAvatar: string;
    fileChangeNodes: ScmFileChangeNode[];
    expanded: boolean;
    selected: boolean;
}
export declare namespace ScmCommitNode {
    function is(node: unknown): node is ScmCommitNode;
}
export interface HistoryWidgetOptions {
    range?: {
        toRevision?: string;
        fromRevision?: string;
    };
    uri?: string;
    maxCount?: number;
}
export type ScmHistoryListNode = (ScmCommitNode | ScmFileChangeNode);
//# sourceMappingURL=scm-history-constants.d.ts.map