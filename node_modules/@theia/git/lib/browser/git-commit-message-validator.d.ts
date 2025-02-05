import { MaybePromise } from '@theia/core/lib/common/types';
import { ScmInputIssueType } from '@theia/scm/lib/browser/scm-input';
export declare class GitCommitMessageValidator {
    static readonly MAX_CHARS_PER_LINE = 72;
    /**
     * Validates the input and returns with either a validation result with the status and message, or `undefined` if everything went fine.
     */
    validate(input: string | undefined): MaybePromise<GitCommitMessageValidator.Result | undefined>;
    protected isLineValid(line: string, index: number): GitCommitMessageValidator.Result | undefined;
    protected maxCharsPerLine(): number;
}
export declare namespace GitCommitMessageValidator {
    /**
     * Type for the validation result with a status and a corresponding message.
     */
    type Result = Readonly<{
        message: string;
        status: ScmInputIssueType;
    }>;
    namespace Result {
        /**
         * `true` if the `message` and the `status` properties are the same on both `left` and `right`. Or both arguments are `undefined`. Otherwise, `false`.
         */
        function equal(left: Result | undefined, right: Result | undefined): boolean;
    }
}
//# sourceMappingURL=git-commit-message-validator.d.ts.map