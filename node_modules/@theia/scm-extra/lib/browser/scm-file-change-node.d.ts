import { ScmCommit } from '@theia/scm/lib/browser/scm-provider';
import URI from '@theia/core/lib/common/uri';
export interface ScmFileChangeNode {
    readonly fileChange: ScmFileChange;
    readonly commitId: string;
    selected?: boolean;
}
export declare namespace ScmFileChangeNode {
    function is(node: unknown): node is ScmFileChangeNode;
}
export interface ScmHistoryCommit extends ScmCommit {
    readonly commitDetailUri: URI;
    readonly fileChanges: ScmFileChange[];
    readonly commitDetailOptions: {};
}
export interface ScmFileChange {
    readonly uri: string;
    getCaption(): string;
    getStatusCaption(): string;
    getStatusAbbreviation(): string;
    getClassNameForStatus(): string;
    getUriToOpen(): URI;
}
//# sourceMappingURL=scm-file-change-node.d.ts.map