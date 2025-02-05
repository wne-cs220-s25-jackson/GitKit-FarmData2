import { IDisposable, IEvent } from '@theia/monaco-editor-core';
import { BareFontInfo } from '@theia/monaco-editor-core/esm/vs/editor/common/config/fontInfo';
import { DebugProtocol } from '@vscode/debugprotocol';
export interface DisassemblyViewRendererReference {
    onDidChangeStackFrame: IEvent<void>;
    isSourceCodeRender: boolean;
    currentInstructionAddresses: Array<string | undefined>;
    focusedInstructionAddress: string | undefined;
    focusedCurrentInstructionAddress: string | undefined;
    debugSession: {
        id: string;
    } | undefined;
    fontInfo: BareFontInfo;
}
export interface DisassembledInstructionEntry {
    allowBreakpoint: boolean;
    isBreakpointSet: boolean;
    isBreakpointEnabled: boolean;
    instruction: DebugProtocol.DisassembledInstruction;
    instructionAddress?: bigint;
}
export interface InstructionColumnTemplateData {
    currentElement: {
        element?: DisassembledInstructionEntry;
    };
    instruction: HTMLElement;
    sourcecode: HTMLElement;
    cellDisposable: IDisposable[];
    disposables: IDisposable[];
}
export interface BreakpointColumnTemplateData {
    currentElement: {
        element?: DisassembledInstructionEntry;
    };
    icon: HTMLElement;
    disposables: IDisposable[];
}
//# sourceMappingURL=disassembly-view-utilities.d.ts.map