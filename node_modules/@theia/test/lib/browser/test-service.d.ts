import { CancellationToken, ContributionProvider, Disposable, Event, QuickPickService } from '@theia/core/lib/common';
import { Location, Range, Position, DocumentUri } from '@theia/core/shared/vscode-languageserver-protocol';
import { CollectionDelta, TreeDelta } from '../common/tree-delta';
import { MarkdownString } from '@theia/core/lib/common/markdown-rendering';
import URI from '@theia/core/lib/common/uri';
export declare enum TestRunProfileKind {
    Run = 1,
    Debug = 2,
    Coverage = 3
}
export interface TestRunProfile {
    readonly kind: TestRunProfileKind;
    readonly label: string;
    isDefault: boolean;
    readonly canConfigure: boolean;
    readonly tag: string;
    run(name: string, included: readonly TestItem[], excluded: readonly TestItem[], preserveFocus: boolean): void;
    configure(): void;
}
export interface TestOutputItem {
    readonly output: string;
    readonly location?: Location;
}
export declare enum TestExecutionState {
    Queued = 1,
    Running = 2,
    Passed = 3,
    Failed = 4,
    Skipped = 5,
    Errored = 6
}
export interface TestMessage {
    readonly expected?: string;
    readonly actual?: string;
    readonly location?: Location;
    readonly message: string | MarkdownString;
    readonly contextValue?: string;
    readonly stackTrace?: TestMessageStackFrame[];
}
export interface TestMessageStackFrame {
    readonly label: string;
    readonly uri?: DocumentUri;
    readonly position?: Position;
}
export declare namespace TestMessage {
    function is(obj: unknown): obj is TestMessage;
}
export interface TestState {
    readonly state: TestExecutionState;
}
export interface TestFailure extends TestState {
    readonly state: TestExecutionState.Failed | TestExecutionState.Errored;
    readonly messages: TestMessage[];
    readonly duration?: number;
}
export declare namespace TestFailure {
    function is(obj: unknown): obj is TestFailure;
}
export interface TestSuccess extends TestState {
    readonly state: TestExecutionState.Passed;
    readonly duration?: number;
}
export interface TestStateChangedEvent {
    test: TestItem;
    oldState: TestState | undefined;
    newState: TestState | undefined;
}
export interface TestRun {
    cancel(): void;
    readonly id: string;
    readonly name: string;
    readonly isRunning: boolean;
    readonly controller: TestController;
    onDidChangeProperty: Event<{
        name?: string;
        isRunning?: boolean;
    }>;
    getTestState(item: TestItem): TestState | undefined;
    onDidChangeTestState: Event<TestStateChangedEvent[]>;
    getOutput(item?: TestItem): readonly TestOutputItem[];
    onDidChangeTestOutput: Event<[TestItem | undefined, TestOutputItem][]>;
    readonly items: readonly TestItem[];
}
export declare namespace TestRun {
    function is(obj: unknown): obj is TestRun;
}
export interface TestItem {
    readonly id: string;
    readonly label: string;
    readonly range?: Range;
    readonly sortKey?: string;
    readonly tags: string[];
    readonly uri?: URI;
    readonly busy: boolean;
    readonly tests: readonly TestItem[];
    readonly description?: string;
    readonly error?: string | MarkdownString;
    readonly parent: TestItem | undefined;
    readonly controller: TestController | undefined;
    readonly canResolveChildren: boolean;
    resolveChildren(): void;
    readonly path: string[];
}
export declare namespace TestItem {
    function is(obj: unknown): obj is TestItem;
}
export interface TestController {
    readonly id: string;
    readonly label: string;
    readonly tests: readonly TestItem[];
    readonly testRunProfiles: readonly TestRunProfile[];
    readonly testRuns: readonly TestRun[];
    readonly onItemsChanged: Event<TreeDelta<string, TestItem>[]>;
    readonly onRunsChanged: Event<CollectionDelta<TestRun, TestRun>>;
    readonly onProfilesChanged: Event<CollectionDelta<TestRunProfile, TestRunProfile>>;
    refreshTests(token: CancellationToken): Promise<void>;
    clearRuns(): void;
}
export interface TestService {
    clearResults(): void;
    configureProfile(): void;
    selectDefaultProfile(): void;
    runTestsWithProfile(tests: TestItem[]): void;
    runTests(profileKind: TestRunProfileKind, tests: TestItem[]): void;
    runAllTests(profileKind: TestRunProfileKind): void;
    getControllers(): TestController[];
    registerTestController(controller: TestController): Disposable;
    onControllersChanged: Event<CollectionDelta<string, TestController>>;
    refresh(): void;
    cancelRefresh(): void;
    isRefreshing: boolean;
    onDidChangeIsRefreshing: Event<void>;
}
export declare namespace TestServices {
    function withTestRun(service: TestService, controllerId: string, runId: string): TestRun;
}
export declare const TestContribution: unique symbol;
export interface TestContribution {
    registerTestControllers(service: TestService): void;
}
export declare const TestService: unique symbol;
export declare class DefaultTestService implements TestService {
    quickpickService: QuickPickService;
    private testRunCounter;
    private onDidChangeIsRefreshingEmitter;
    onDidChangeIsRefreshing: Event<void>;
    private controllers;
    private refreshing;
    private onControllersChangedEmitter;
    protected readonly contributionProvider: ContributionProvider<TestContribution>;
    protected registerContributions(): void;
    onControllersChanged: Event<CollectionDelta<string, TestController>>;
    registerTestController(controller: TestController): Disposable;
    getControllers(): TestController[];
    refresh(): void;
    cancelRefresh(): void;
    get isRefreshing(): boolean;
    runAllTests(profileKind: TestRunProfileKind): void;
    protected runTestForController(controller: TestController, profileKind: TestRunProfileKind, items: readonly TestItem[]): Promise<void>;
    protected pickProfile(runProfiles: readonly TestRunProfile[], title: string): Promise<TestRunProfile | undefined>;
    protected pickProfileKind(): Promise<TestRunProfileKind | undefined>;
    runTests(profileKind: TestRunProfileKind, items: TestItem[]): void;
    runTestsWithProfile(items: TestItem[]): void;
    selectDefaultProfile(): void;
    configureProfile(): void;
    clearResults(): void;
}
//# sourceMappingURL=test-service.d.ts.map