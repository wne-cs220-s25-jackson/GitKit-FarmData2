import { BaseWidget, LabelProvider, Message, OpenerService, Widget } from '@theia/core/lib/browser';
import { InstructionBreakpoint } from '../breakpoint/breakpoint-marker';
import { BreakpointManager } from '../breakpoint/breakpoint-manager';
import { DebugSessionManager } from '../debug-session-manager';
import { Emitter, IDisposable } from '@theia/monaco-editor-core';
import { BareFontInfo } from '@theia/monaco-editor-core/esm/vs/editor/common/config/fontInfo';
import { WorkbenchTable } from '@theia/monaco-editor-core/esm/vs/platform/list/browser/listService';
import { DebugState, DebugSession } from '../debug-session';
import { EditorPreferences } from '@theia/editor/lib/browser';
import { DebugPreferences } from '../debug-preferences';
import { Event } from '@theia/monaco-editor-core/esm/vs/base/common/event';
import { DisassembledInstructionEntry } from './disassembly-view-utilities';
import { DisassemblyViewTableDelegate } from './disassembly-view-table-delegate';
import { InstructionRenderer } from './disassembly-view-instruction-renderer';
import { IInstantiationService } from '@theia/monaco-editor-core/esm/vs/platform/instantiation/common/instantiation';
import { Dimension } from '@theia/monaco-editor-core/esm/vs/base/browser/dom';
import { URI } from '@theia/core/lib/common/uri';
export declare class DisassemblyViewWidget extends BaseWidget {
    static readonly ID = "disassembly-view-widget";
    protected static readonly NUM_INSTRUCTIONS_TO_LOAD = 50;
    protected readonly iconReferenceUri: URI;
    protected readonly breakpointManager: BreakpointManager;
    protected readonly debugSessionManager: DebugSessionManager;
    protected readonly editorPreferences: EditorPreferences;
    protected readonly debugPreferences: DebugPreferences;
    protected readonly openerService: OpenerService;
    protected readonly labelProvider: LabelProvider;
    protected _fontInfo: BareFontInfo;
    protected _disassembledInstructions: WorkbenchTable<DisassembledInstructionEntry> | undefined;
    protected _onDidChangeStackFrame: Emitter<void>;
    protected _previousDebuggingState: DebugState;
    protected _instructionBpList: readonly InstructionBreakpoint[];
    protected _enableSourceCodeRender: boolean;
    protected _loadingLock: boolean;
    protected init(): void;
    get fontInfo(): BareFontInfo;
    get currentInstructionAddresses(): Array<string | undefined>;
    get focusedCurrentInstructionAddress(): string | undefined;
    get isSourceCodeRender(): boolean;
    get debugSession(): DebugSession | undefined;
    get focusedInstructionAddress(): string | undefined;
    get onDidChangeStackFrame(): Event<void>;
    protected createPane(): void;
    protected getTable(monacoInstantiationService: IInstantiationService, tableDelegate: DisassemblyViewTableDelegate, instructionRenderer: InstructionRenderer): WorkbenchTable<DisassembledInstructionEntry>;
    adjustLayout(dimension: Dimension): void;
    goToAddress(address?: string, focus?: boolean): void;
    protected scrollUp_LoadDisassembledInstructions(instructionCount: number): Promise<boolean>;
    protected scrollDown_LoadDisassembledInstructions(instructionCount: number): Promise<boolean>;
    protected loadDisassembledInstructions(memoryReference: string | undefined, instructionOffset: number, instructionCount: number): Promise<boolean>;
    protected getIndexFromAddress(instructionAddress: string): number;
    protected ensureAddressParsed(entry: DisassembledInstructionEntry): void;
    /**
     * Clears the table and reload instructions near the target address
     */
    protected reloadDisassembly(targetAddress?: string): void;
    protected onResize(msg: Widget.ResizeMessage): void;
    protected onActivateRequest(msg: Message): void;
    protected toFontInfo(): Parameters<typeof BareFontInfo.createFromRawSettings>[0];
    protected _register<T extends IDisposable>(disposable: T): T;
}
//# sourceMappingURL=disassembly-view-widget.d.ts.map