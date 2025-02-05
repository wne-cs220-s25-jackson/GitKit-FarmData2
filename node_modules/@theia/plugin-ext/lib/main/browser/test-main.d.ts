import { TreeCollection } from '@theia/test/lib/common/collections';
import { TestController, TestItem, TestOutputItem, TestRun, TestRunProfile, TestState, TestStateChangedEvent } from '@theia/test/lib/browser/test-service';
import { AccumulatingTreeDeltaEmitter, CollectionDelta, TreeDelta, TreeDeltaBuilder } from '@theia/test/lib/common/tree-delta';
import { Range } from '@theia/core/shared/vscode-languageserver-protocol';
import { MarkdownString } from '@theia/core/lib/common/markdown-rendering';
import { CancellationToken, Event, URI } from '@theia/core';
import { TestControllerUpdate, TestingExt, TestingMain } from '../../common';
import { RPCProtocol } from '../../common/rpc-protocol';
import { interfaces } from '@theia/core/shared/inversify';
import { TestItemDTO, TestOutputDTO, TestRunDTO, TestRunProfileDTO, TestStateChangeDTO } from '../../common/test-types';
import { TestRunProfileKind } from '../../plugin/types-impl';
import { CommandRegistryMainImpl } from './command-registry-main';
export declare class TestItemCollection extends TreeCollection<string, TestItemImpl, TestItemImpl | TestControllerImpl> {
    add(item: TestItemImpl): TestItemImpl | undefined;
}
export declare class TestItemImpl implements TestItem {
    readonly uri: URI;
    readonly id: string;
    update(value: Partial<TestItemDTO>): void;
    constructor(uri: URI, id: string);
    protected notifyPropertyChange(property: keyof TestItemImpl, value: any): void;
    _deltaBuilder: TreeDeltaBuilder<string, TestItemImpl> | undefined;
    get deltaBuilder(): TreeDeltaBuilder<string, TestItemImpl> | undefined;
    _path: string[] | undefined;
    get path(): string[];
    get parent(): TestItem | undefined;
    private _parent?;
    get realParent(): TestItemImpl | TestControllerImpl | undefined;
    set realParent(v: TestItemImpl | TestControllerImpl | undefined);
    get controller(): TestControllerImpl | undefined;
    protected iterate(toDo: (v: TestItemImpl) => boolean): boolean;
    label: string;
    range?: Range;
    sortKey?: string | undefined;
    tags: string[];
    busy: boolean;
    canResolveChildren: boolean;
    description?: string | undefined;
    error?: string | MarkdownString | undefined;
    items: TestItemCollection;
    get tests(): readonly TestItemImpl[];
    resolveChildren(): void;
}
declare class TestRunProfileImpl implements TestRunProfile {
    private proxy;
    private controllerId;
    readonly id: string;
    readonly kind: TestRunProfileKind;
    label: string;
    private _isDefault;
    set isDefault(isDefault: boolean);
    get isDefault(): boolean;
    tag: string;
    canConfigure: boolean;
    update(update: Partial<TestRunProfileDTO>): void;
    constructor(proxy: TestingExt, controllerId: string, id: string, kind: TestRunProfileKind, label: string, isDefault: boolean, tag: string);
    configure(): void;
    run(name: string, included: TestItem[], excluded: TestItem[], preserveFocus: boolean): void;
}
declare class TestRunImpl implements TestRun {
    readonly controller: TestControllerImpl;
    readonly proxy: TestingExt;
    readonly id: string;
    private testStates;
    private outputIndices;
    private outputs;
    private onDidChangePropertyEmitter;
    onDidChangeProperty: Event<{
        name?: string;
        isRunning?: boolean;
    }>;
    constructor(controller: TestControllerImpl, proxy: TestingExt, id: string, name: string);
    isRunning: boolean;
    name: string;
    ended(): void;
    protected notifyPropertyChange(property: 'name' | 'isRunning', value: unknown): void;
    cancel(): void;
    getTestState(item: TestItem): TestState | undefined;
    private onDidChangeTestStateEmitter;
    onDidChangeTestState: Event<TestStateChangedEvent[]>;
    getOutput(item?: TestItem | undefined): readonly TestOutputItem[];
    private onDidChangeTestOutputEmitter;
    onDidChangeTestOutput: Event<[TestItem | undefined, TestOutputItem][]>;
    applyChanges(stateChanges: TestStateChangeDTO[], outputChanges: TestOutputDTO[]): void;
    get items(): readonly TestItem[];
}
interface TestCollectionHolder {
    items: TestItemCollection;
}
declare class TestControllerImpl implements TestController {
    private readonly proxy;
    readonly id: string;
    label: string;
    private _profiles;
    private _runs;
    readonly deltaBuilder: AccumulatingTreeDeltaEmitter<string, TestItemImpl>;
    canRefresh: boolean;
    private canResolveChildren;
    readonly items: TestItemCollection;
    constructor(proxy: TestingExt, id: string, label: string);
    refreshTests(token: CancellationToken): Promise<void>;
    applyDelta(diff: TreeDelta<string, TestItemDTO>[]): void;
    withProfile(profileId: string): TestRunProfileImpl;
    withRun(runId: string): TestRunImpl;
    protected applyDeltasToCollection(root: TestCollectionHolder, deltas: TreeDelta<string, TestItemDTO>[]): void;
    protected applyDeltaToCollection(root: TestCollectionHolder, delta: TreeDelta<string, TestItemDTO>): void;
    findItem(path: string[]): TestItemImpl | undefined;
    protected findNodeInRoot(root: TestCollectionHolder, path: string[], startIndex: number): TestCollectionHolder | undefined;
    protected createTestItem(value: TestItemDTO): TestItemImpl;
    get controller(): TestControllerImpl;
    get testRunProfiles(): readonly TestRunProfile[];
    update(change: Partial<TestControllerUpdate>): void;
    addProfile(profile: TestRunProfileImpl): void;
    addRun(runId: string, runName: string, isRunning: boolean): TestRunImpl;
    onProfilesChanged: Event<CollectionDelta<TestRunProfile, TestRunProfile>>;
    removeProfile(profileId: string): void;
    get testRuns(): readonly TestRun[];
    onRunsChanged: Event<CollectionDelta<TestRun, TestRun>>;
    get tests(): readonly TestItemImpl[];
    onItemsChanged: Event<TreeDelta<string, TestItemImpl>[]>;
    resolveChildren(item: TestItem): void;
    clearRuns(): void;
}
export declare class TestingMainImpl implements TestingMain {
    private testService;
    private testExecutionProgressService;
    private controllerRegistrations;
    private proxy;
    canRefresh: boolean;
    constructor(rpc: RPCProtocol, container: interfaces.Container, commandRegistry: CommandRegistryMainImpl);
    $registerTestController(controllerId: string, label: string): void;
    $updateController(controllerId: string, patch: Partial<TestControllerUpdate>): void;
    $unregisterTestController(controllerId: string): void;
    private withController;
    $notifyDelta(controllerId: string, diff: TreeDelta<string, TestItemDTO>[]): void;
    $notifyTestRunProfileCreated(controllerId: string, profile: TestRunProfileDTO): void;
    $updateTestRunProfile(controllerId: string, profileId: string, update: Partial<TestRunProfileDTO>): void;
    $removeTestRunProfile(controllerId: string, profileId: string): void;
    $notifyTestRunCreated(controllerId: string, run: TestRunDTO, preserveFocus: boolean): void;
    $notifyTestStateChanged(controllerId: string, runId: string, stateChanges: TestStateChangeDTO[], outputChanges: TestOutputDTO[]): void;
    $notifyTestRunEnded(controllerId: string, runId: string): void;
}
export {};
//# sourceMappingURL=test-main.d.ts.map