/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { DebugProtocol } from '@vscode/debugprotocol/lib/debugProtocol';
import URI from '@theia/core/lib/common/uri';
import { EditorManager } from '@theia/editor/lib/browser';
import { LabelProvider } from '@theia/core/lib/browser';
import { TreeElement } from '@theia/core/lib/browser/source-tree';
import { DebugSession } from '../debug-session';
import { BaseBreakpoint } from '../breakpoint/breakpoint-marker';
import { BreakpointManager } from '../breakpoint/breakpoint-manager';
export declare class DebugBreakpointData {
    readonly raw?: DebugProtocol.Breakpoint;
}
export declare class DebugBreakpointOptions {
    readonly labelProvider: LabelProvider;
    readonly breakpoints: BreakpointManager;
    readonly editorManager: EditorManager;
    readonly session?: DebugSession;
}
export declare class DebugBreakpointDecoration {
    readonly className: string;
    readonly message: string[];
}
export declare abstract class DebugBreakpoint<T extends BaseBreakpoint = BaseBreakpoint> extends DebugBreakpointOptions implements TreeElement {
    readonly uri: URI;
    readonly raw?: DebugProtocol.Breakpoint;
    constructor(uri: URI, options: DebugBreakpointOptions);
    abstract get origin(): T;
    update(data: DebugBreakpointData): void;
    get idFromAdapter(): number | undefined;
    get id(): string;
    get enabled(): boolean;
    get installed(): boolean;
    get verified(): boolean;
    get message(): string;
    abstract setEnabled(enabled: boolean): void;
    abstract remove(): void;
    protected readonly setBreakpointEnabled: (event: React.ChangeEvent<HTMLInputElement>) => void;
    render(): React.ReactNode;
    protected isEnabled(): boolean;
    protected abstract doRender(): React.ReactNode;
    getDecoration(): DebugBreakpointDecoration;
    protected getUnverifiedBreakpointDecoration(): DebugBreakpointDecoration;
    protected getDisabledBreakpointDecoration(message?: string): DebugBreakpointDecoration;
    protected doGetDecoration(messages?: string[]): DebugBreakpointDecoration;
    protected abstract getBreakpointDecoration(message?: string[]): DebugBreakpointDecoration;
}
//# sourceMappingURL=debug-breakpoint.d.ts.map