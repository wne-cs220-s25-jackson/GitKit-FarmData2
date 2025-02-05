/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { TreeElement } from '@theia/core/lib/browser/source-tree';
import { BreakpointManager } from '../breakpoint/breakpoint-manager';
import { ExceptionBreakpoint } from '../breakpoint/breakpoint-marker';
export declare class DebugExceptionBreakpoint implements TreeElement {
    readonly data: ExceptionBreakpoint;
    readonly breakpoints: BreakpointManager;
    readonly id: string;
    constructor(data: ExceptionBreakpoint, breakpoints: BreakpointManager);
    render(): React.ReactNode;
    protected toggle: () => void;
    editCondition(): Promise<void>;
}
//# sourceMappingURL=debug-exception-breakpoint.d.ts.map