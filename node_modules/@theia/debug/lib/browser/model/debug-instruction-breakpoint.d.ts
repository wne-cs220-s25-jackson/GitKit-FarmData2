/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { InstructionBreakpoint } from '../breakpoint/breakpoint-marker';
import { DebugBreakpoint, DebugBreakpointDecoration, DebugBreakpointOptions } from './debug-breakpoint';
export declare class DebugInstructionBreakpoint extends DebugBreakpoint<InstructionBreakpoint> {
    readonly origin: InstructionBreakpoint;
    constructor(origin: InstructionBreakpoint, options: DebugBreakpointOptions);
    setEnabled(enabled: boolean): void;
    protected isEnabled(): boolean;
    protected isSupported(): boolean;
    remove(): void;
    protected doRender(): React.ReactNode;
    protected getBreakpointDecoration(message?: string[]): DebugBreakpointDecoration;
}
//# sourceMappingURL=debug-instruction-breakpoint.d.ts.map