import { ProblemMatcher, ProblemMatch } from '../common/problem-matcher-protocol';
export declare class ProblemCollector {
    problemMatchers: ProblemMatcher[];
    private lineMatchers;
    constructor(problemMatchers: ProblemMatcher[]);
    processLine(line: string): ProblemMatch[];
    isTaskActiveOnStart(): boolean;
    matchBeginMatcher(line: string): boolean;
    matchEndMatcher(line: string): boolean;
}
//# sourceMappingURL=task-problem-collector.d.ts.map