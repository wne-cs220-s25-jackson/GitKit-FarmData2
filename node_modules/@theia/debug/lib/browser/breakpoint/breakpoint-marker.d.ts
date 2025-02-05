import { Marker } from '@theia/markers/lib/common/marker';
import { DebugProtocol } from '@vscode/debugprotocol/lib/debugProtocol';
import { URI } from '@theia/core/lib/common';
export declare const BREAKPOINT_KIND = "breakpoint";
export interface BaseBreakpoint {
    id: string;
    enabled: boolean;
}
export interface SourceBreakpoint extends BaseBreakpoint {
    uri: string;
    raw: DebugProtocol.SourceBreakpoint;
}
export declare namespace SourceBreakpoint {
    function create(uri: URI, data: DebugProtocol.SourceBreakpoint, origin?: SourceBreakpoint): SourceBreakpoint;
}
export interface BreakpointMarker extends Marker<SourceBreakpoint> {
    kind: 'breakpoint';
}
export declare namespace BreakpointMarker {
    function is(node: Marker<object>): node is BreakpointMarker;
}
export interface ExceptionBreakpoint {
    enabled: boolean;
    condition?: string;
    raw: DebugProtocol.ExceptionBreakpointsFilter;
}
export declare namespace ExceptionBreakpoint {
    function create(data: DebugProtocol.ExceptionBreakpointsFilter, origin?: ExceptionBreakpoint): ExceptionBreakpoint;
}
export interface FunctionBreakpoint extends BaseBreakpoint {
    raw: DebugProtocol.FunctionBreakpoint;
}
export declare namespace FunctionBreakpoint {
    function create(data: DebugProtocol.FunctionBreakpoint, origin?: FunctionBreakpoint): FunctionBreakpoint;
}
export interface InstructionBreakpoint extends BaseBreakpoint, DebugProtocol.InstructionBreakpoint {
}
export declare namespace InstructionBreakpoint {
    function create(raw: DebugProtocol.InstructionBreakpoint, existing?: InstructionBreakpoint): InstructionBreakpoint;
    function is(arg: BaseBreakpoint): arg is InstructionBreakpoint;
}
//# sourceMappingURL=breakpoint-marker.d.ts.map