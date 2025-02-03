import { TestController, TestExecutionState, TestItem, TestRun, TestService } from '../test-service';
/**
 * This class manages the state of "internal" nodes in the test tree
 */
export declare class TestExecutionStateManager {
    protected readonly testService: TestService;
    private executionStates;
    init(): void;
    addController(controller: TestController): void;
    addRun(run: TestRun): void;
    protected updateState(run: TestRun, item: TestItem, oldState: TestExecutionState | undefined, newState: TestExecutionState | undefined): void;
    getComputedState(run: TestRun, item: TestItem): TestExecutionState | undefined;
}
//# sourceMappingURL=test-execution-state-manager.d.ts.map