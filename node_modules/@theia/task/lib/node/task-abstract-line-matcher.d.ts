import { ProblemMatcher, ProblemPattern, ProblemMatch, ProblemLocationKind } from '../common/problem-matcher-protocol';
export interface ProblemData {
    kind?: ProblemLocationKind;
    file?: string;
    location?: string;
    line?: string;
    character?: string;
    endLine?: string;
    endCharacter?: string;
    message?: string;
    severity?: string;
    code?: string;
}
export declare abstract class AbstractLineMatcher {
    protected matcher: ProblemMatcher;
    protected patterns: ProblemPattern[];
    protected activePatternIndex: number;
    protected activePattern: ProblemPattern | undefined;
    protected cachedProblemData: ProblemData;
    constructor(matcher: ProblemMatcher);
    /**
     * Finds the problem identified by this line matcher.
     *
     * @param line the line of text to find the problem from
     * @return the identified problem. If the problem is not found, `undefined` is returned.
     */
    abstract match(line: string): ProblemMatch | undefined;
    /**
     * Number of problem patterns that the line matcher uses.
     */
    get patternCount(): number;
    protected getEmptyProblemData(): ProblemData;
    protected fillProblemData(data: ProblemData | null, pattern: ProblemPattern, matches: RegExpExecArray): data is ProblemData;
    private appendProperty;
    private fillProperty;
    protected getMarkerMatch(data: ProblemData): ProblemMatch | undefined;
    private getLocation;
    private parseLocationInfo;
    private createRange;
    private getZeroBasedRangeIndex;
    private getSeverity;
    private getResource;
    protected resetActivePatternIndex(defaultIndex?: number): void;
    protected nextProblemPattern(): void;
    protected doOneLineMatch(line: string): boolean;
    protected isUsingTheLastPattern(): boolean;
    protected isLastPatternLoop(): boolean;
    protected resetCachedProblemData(): void;
}
//# sourceMappingURL=task-abstract-line-matcher.d.ts.map