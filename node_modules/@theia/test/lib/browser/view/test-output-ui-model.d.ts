import { TestController, TestOutputItem, TestRun, TestService, TestState, TestStateChangedEvent } from '../test-service';
import { Disposable, Emitter, Event } from '@theia/core';
import { TestContextKeyService } from './test-context-key-service';
export interface ActiveRunEvent {
    controller: TestController;
    activeRun: TestRun | undefined;
}
export interface TestOutputSource {
    readonly output: readonly TestOutputItem[];
    onDidAddTestOutput: Event<TestOutputItem[]>;
}
export interface ActiveTestStateChangedEvent {
    controller: TestController;
    testRun: TestRun;
    statedDelta: TestStateChangedEvent[];
}
interface ActiveTestRunInfo {
    run: TestRun;
    toDispose: Disposable;
}
export declare class TestOutputUIModel {
    protected readonly testContextKeys: TestContextKeyService;
    protected testService: TestService;
    protected readonly activeRuns: Map<string, ActiveTestRunInfo>;
    protected readonly controllerListeners: Map<string, Disposable>;
    private _selectedOutputSource;
    private _selectedTestState;
    init(): void;
    protected removeController(id: string): void;
    protected addController(controller: TestController): void;
    getActiveTestRun(controller: TestController): TestRun | undefined;
    protected readonly onDidChangeActiveTestRunEmitter: Emitter<ActiveRunEvent>;
    onDidChangeActiveTestRun: Event<ActiveRunEvent>;
    setActiveTestRun(run: TestRun): void;
    doSetActiveRun(controller: TestController, run: TestRun | undefined): void;
    private onDidChangeActiveTestStateEmitter;
    onDidChangeActiveTestState: Event<ActiveTestStateChangedEvent>;
    get selectedOutputSource(): TestOutputSource | undefined;
    set selectedOutputSource(element: TestOutputSource | undefined);
    protected readonly onDidChangeSelectedOutputSourceEmitter: Emitter<TestOutputSource | undefined>;
    readonly onDidChangeSelectedOutputSource: Event<TestOutputSource | undefined>;
    get selectedTestState(): TestState | undefined;
    set selectedTestState(element: TestState | undefined);
    protected readonly onDidChangeSelectedTestStateEmitter: Emitter<TestState | undefined>;
    readonly onDidChangeSelectedTestState: Event<TestState | undefined>;
}
export {};
//# sourceMappingURL=test-output-ui-model.d.ts.map