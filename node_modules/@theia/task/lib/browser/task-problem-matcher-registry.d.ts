import { Event, Emitter } from '@theia/core/lib/common';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { NamedProblemMatcher, ProblemMatcher, ProblemMatcherContribution } from '../common';
import { ProblemPatternRegistry } from './task-problem-pattern-registry';
export declare class ProblemMatcherRegistry {
    private readonly matchers;
    private readyPromise;
    protected readonly problemPatternRegistry: ProblemPatternRegistry;
    protected readonly onDidChangeProblemMatcherEmitter: Emitter<void>;
    get onDidChangeProblemMatcher(): Event<void>;
    protected init(): void;
    onReady(): Promise<void>;
    /**
     * Add a problem matcher to the registry.
     *
     * @param definition the problem matcher to be added.
     */
    register(matcher: ProblemMatcherContribution): Disposable;
    protected doRegister(matcher: ProblemMatcherContribution, toDispose: DisposableCollection): Promise<void>;
    /**
     * Finds the problem matcher from the registry by its name.
     *
     * @param name the name of the problem matcher
     * @return the problem matcher. If the task definition is not found, `undefined` is returned.
     */
    get(name: string): NamedProblemMatcher | undefined;
    /**
     * Returns all registered problem matchers in the registry.
     */
    getAll(): NamedProblemMatcher[];
    /**
     * Transforms the `ProblemMatcherContribution` to a `ProblemMatcher`
     *
     * @return the problem matcher
     */
    getProblemMatcherFromContribution(matcher: ProblemMatcherContribution): Promise<ProblemMatcher>;
    private add;
    private getFileLocationKindAndPrefix;
    private fillDefaults;
}
//# sourceMappingURL=task-problem-matcher-registry.d.ts.map