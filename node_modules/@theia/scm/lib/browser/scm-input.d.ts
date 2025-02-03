import { Disposable, DisposableCollection, Emitter } from '@theia/core/lib/common';
export interface ScmInputIssue {
    message: string;
    type: ScmInputIssueType;
}
export declare enum ScmInputIssueType {
    Error = 0,
    Warning = 1,
    Information = 2
}
export interface ScmInputValidator {
    (value: string): Promise<ScmInputIssue | undefined>;
}
export interface ScmInputOptions {
    placeholder?: string;
    validator?: ScmInputValidator;
    visible?: boolean;
    enabled?: boolean;
}
export interface ScmInputData {
    value?: string;
    issue?: ScmInputIssue;
}
export declare class ScmInput implements Disposable {
    protected readonly options: ScmInputOptions;
    protected readonly onDidChangeEmitter: Emitter<void>;
    readonly onDidChange: import("@theia/core/lib/common").Event<void>;
    protected fireDidChange(): void;
    protected readonly onDidFocusEmitter: Emitter<void>;
    readonly onDidFocus: import("@theia/core/lib/common").Event<void>;
    protected readonly toDispose: DisposableCollection;
    constructor(options?: ScmInputOptions);
    dispose(): void;
    protected _placeholder: string | undefined;
    get placeholder(): string | undefined;
    set placeholder(placeholder: string | undefined);
    protected _value: string | undefined;
    get value(): string;
    set value(value: string);
    protected _visible: boolean | undefined;
    get visible(): boolean;
    set visible(visible: boolean);
    protected _enabled: boolean;
    get enabled(): boolean;
    set enabled(enabled: boolean);
    protected _issue: ScmInputIssue | undefined;
    get issue(): ScmInputIssue | undefined;
    set issue(issue: ScmInputIssue | undefined);
    validate: () => Promise<void>;
    focus(): void;
    toJSON(): ScmInputData;
    fromJSON(data: ScmInputData | any): void;
}
//# sourceMappingURL=scm-input.d.ts.map