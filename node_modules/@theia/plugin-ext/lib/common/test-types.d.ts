import { MarkdownString } from '@theia/core/lib/common/markdown-rendering';
import { UriComponents } from './uri-components';
import { Location, Range } from './plugin-api-rpc-model';
import * as languageProtocol from '@theia/core/shared/vscode-languageserver-protocol';
export declare enum TestRunProfileKind {
    Run = 1,
    Debug = 2,
    Coverage = 3
}
export interface TestRunProfileDTO {
    readonly id: string;
    readonly label: string;
    readonly kind: TestRunProfileKind;
    readonly isDefault: boolean;
    readonly tag: string;
    readonly canConfigure: boolean;
}
export interface TestRunDTO {
    readonly id: string;
    readonly name: string;
    readonly isRunning: boolean;
}
export interface TestOutputDTO {
    readonly output: string;
    readonly location?: Location;
    readonly itemPath?: string[];
}
export declare enum TestExecutionState {
    Queued = 1,
    Running = 2,
    Passed = 3,
    Failed = 4,
    Skipped = 5,
    Errored = 6
}
export interface TestStateChangeDTO {
    readonly state: TestExecutionState;
    readonly itemPath: string[];
}
export interface TestFailureDTO extends TestStateChangeDTO {
    readonly state: TestExecutionState.Failed | TestExecutionState.Errored;
    readonly messages: TestMessageDTO[];
    readonly duration?: number;
}
export declare namespace TestFailureDTO {
    function is(ref: unknown): ref is TestFailureDTO;
}
export interface TestSuccessDTO extends TestStateChangeDTO {
    readonly state: TestExecutionState.Passed;
    readonly duration?: number;
}
export interface TestMessageStackFrameDTO {
    uri?: languageProtocol.DocumentUri;
    position?: languageProtocol.Position;
    label: string;
}
export interface TestMessageDTO {
    readonly expected?: string;
    readonly actual?: string;
    readonly location?: languageProtocol.Location;
    readonly message: string | MarkdownString;
    readonly contextValue?: string;
    readonly stackTrace?: TestMessageStackFrameDTO[];
}
export interface TestItemDTO {
    readonly id: string;
    readonly label: string;
    readonly range?: Range;
    readonly sortKey?: string;
    readonly tags: string[];
    readonly uri?: UriComponents;
    readonly busy: boolean;
    readonly canResolveChildren: boolean;
    readonly description?: string;
    readonly error?: string | MarkdownString;
    readonly children?: TestItemDTO[];
}
export interface TestRunRequestDTO {
    controllerId: string;
    profileId: string;
    name: string;
    includedTests: string[][];
    excludedTests: string[][];
    preserveFocus: boolean;
}
export interface TestItemReference {
    typeTag: '$type_test_item_reference';
    controllerId: string;
    testPath: string[];
}
export declare namespace TestItemReference {
    function is(ref: unknown): ref is TestItemReference;
    function create(controllerId: string, testPath: string[]): TestItemReference;
}
export interface TestMessageArg {
    testItemReference: TestItemReference | undefined;
    testMessage: TestMessageDTO;
}
export declare namespace TestMessageArg {
    function is(arg: unknown): arg is TestMessageArg;
    function create(testItemReference: TestItemReference | undefined, testMessageDTO: TestMessageDTO): TestMessageArg;
}
//# sourceMappingURL=test-types.d.ts.map