import { Disposable } from '@theia/core/lib/common/disposable';
import { NamedProblemPattern, ProblemPatternContribution } from '../common';
export declare class ProblemPatternRegistry {
    private readonly patterns;
    private readyPromise;
    protected init(): void;
    onReady(): Promise<void>;
    /**
     * Add a problem pattern to the registry.
     *
     * @param definition the problem pattern to be added.
     */
    register(value: ProblemPatternContribution | ProblemPatternContribution[]): Disposable;
    /**
     * Finds the problem pattern(s) from the registry with the given name.
     *
     * @param key the name of the problem patterns
     * @return a problem pattern or an array of the problem patterns associated with the name. If no problem patterns are found, `undefined` is returned.
     */
    get(key: string): undefined | NamedProblemPattern | NamedProblemPattern[];
    private add;
    private fillDefaults;
}
//# sourceMappingURL=task-problem-pattern-registry.d.ts.map