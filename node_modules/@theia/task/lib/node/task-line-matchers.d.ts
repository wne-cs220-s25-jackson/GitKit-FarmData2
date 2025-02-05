import { AbstractLineMatcher } from './task-abstract-line-matcher';
import { ProblemMatcher, ProblemMatch } from '../common/problem-matcher-protocol';
export declare class StartStopLineMatcher extends AbstractLineMatcher {
    constructor(matcher: ProblemMatcher);
    /**
     * Finds the problem identified by this line matcher.
     *
     * @param line the line of text to find the problem from
     * @return the identified problem. If the problem is not found, `undefined` is returned.
     */
    match(line: string): ProblemMatch | undefined;
}
export declare class WatchModeLineMatcher extends StartStopLineMatcher {
    private beginsPattern;
    private endsPattern;
    activeOnStart: boolean;
    constructor(matcher: ProblemMatcher);
    /**
     * Finds the problem identified by this line matcher.
     *
     * @param line the line of text to find the problem from
     * @return the identified problem. If the problem is not found, `undefined` is returned.
     */
    match(line: string): ProblemMatch | undefined;
    matchBegin(line: string): boolean;
    matchEnd(line: string): boolean;
}
//# sourceMappingURL=task-line-matchers.d.ts.map