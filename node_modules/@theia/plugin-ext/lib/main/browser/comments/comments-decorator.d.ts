import { CommentInfoMain } from './comments-service';
import { CommentingRanges } from '../../../common/plugin-api-rpc-model';
import * as monaco from '@theia/monaco-editor-core';
export declare class CommentingRangeDecorator {
    private decorationOptions;
    private commentingRangeDecorations;
    constructor();
    update(editor: monaco.editor.ICodeEditor, commentInfos: CommentInfoMain[]): void;
    getMatchedCommentAction(line: number): {
        ownerId: string;
        extensionId: string | undefined;
        label: string | undefined;
        commentingRangesInfo: CommentingRanges;
    }[];
}
//# sourceMappingURL=comments-decorator.d.ts.map