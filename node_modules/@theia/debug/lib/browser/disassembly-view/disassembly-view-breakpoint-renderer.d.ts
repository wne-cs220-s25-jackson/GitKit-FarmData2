import { ITableRenderer } from '@theia/monaco-editor-core/esm/vs/base/browser/ui/table/table';
import { BreakpointManager } from '../breakpoint/breakpoint-manager';
import { BreakpointColumnTemplateData, DisassembledInstructionEntry, DisassemblyViewRendererReference } from './disassembly-view-utilities';
export declare class BreakpointRenderer implements ITableRenderer<DisassembledInstructionEntry, BreakpointColumnTemplateData> {
    protected readonly _disassemblyView: DisassemblyViewRendererReference;
    protected readonly _debugService: BreakpointManager;
    static readonly TEMPLATE_ID = "breakpoint";
    templateId: string;
    protected readonly _breakpointIcon = "codicon-debug-breakpoint";
    protected readonly _breakpointDisabledIcon = "codicon-debug-breakpoint-disabled";
    protected readonly _breakpointHintIcon = "codicon-debug-hint";
    protected readonly _debugStackframe = "codicon-debug-stackframe";
    protected readonly _debugStackframeFocused = "codicon-debug-stackframe-focused";
    constructor(_disassemblyView: DisassemblyViewRendererReference, _debugService: BreakpointManager);
    renderTemplate(container: HTMLElement): BreakpointColumnTemplateData;
    renderElement(element: DisassembledInstructionEntry, index: number, templateData: BreakpointColumnTemplateData, height: number | undefined): void;
    disposeTemplate(templateData: BreakpointColumnTemplateData): void;
    protected rerenderDebugStackframe(icon: HTMLElement, element?: DisassembledInstructionEntry): void;
}
//# sourceMappingURL=disassembly-view-breakpoint-renderer.d.ts.map