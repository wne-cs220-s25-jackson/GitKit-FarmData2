/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { TreeElement } from '@theia/core/lib/browser/source-tree';
import { FunctionBreakpoint } from '../breakpoint/breakpoint-marker';
import { DebugBreakpoint, DebugBreakpointOptions, DebugBreakpointDecoration } from './debug-breakpoint';
export declare class DebugFunctionBreakpoint extends DebugBreakpoint<FunctionBreakpoint> implements TreeElement {
    readonly origin: FunctionBreakpoint;
    constructor(origin: FunctionBreakpoint, options: DebugBreakpointOptions);
    setEnabled(enabled: boolean): void;
    protected isEnabled(): boolean;
    protected isSupported(): boolean;
    remove(): void;
    get name(): string;
    protected doRender(): React.ReactNode;
    protected doGetDecoration(): DebugBreakpointDecoration;
    protected getBreakpointDecoration(message?: string[]): DebugBreakpointDecoration;
    open(): Promise<void>;
}
//# sourceMappingURL=debug-function-breakpoint.d.ts.map