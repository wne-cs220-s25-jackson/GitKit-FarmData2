import { OpenerService } from '@theia/core/lib/browser';
import { Uri as URI } from '@theia/monaco-editor-core';
import { ITableRenderer } from '@theia/monaco-editor-core/esm/vs/base/browser/ui/table/table';
import { Color } from '@theia/monaco-editor-core/esm/vs/base/common/color';
import { Disposable } from '@theia/monaco-editor-core/esm/vs/base/common/lifecycle';
import { ITextModelService } from '@theia/monaco-editor-core/esm/vs/editor/common/services/resolverService';
import { IThemeService } from '@theia/monaco-editor-core/esm/vs/platform/theme/common/themeService';
import { DebugProtocol } from '@vscode/debugprotocol';
import { DisassembledInstructionEntry, DisassemblyViewRendererReference, InstructionColumnTemplateData } from './disassembly-view-utilities';
export declare class InstructionRenderer extends Disposable implements ITableRenderer<DisassembledInstructionEntry, InstructionColumnTemplateData> {
    protected readonly _disassemblyView: DisassemblyViewRendererReference;
    protected readonly openerService: OpenerService;
    protected readonly uriService: {
        asCanonicalUri(uri: URI): URI;
    };
    protected readonly textModelService: ITextModelService;
    static readonly TEMPLATE_ID = "instruction";
    protected static readonly INSTRUCTION_ADDR_MIN_LENGTH = 25;
    protected static readonly INSTRUCTION_BYTES_MIN_LENGTH = 30;
    templateId: string;
    protected _topStackFrameColor: Color | undefined;
    protected _focusedStackFrameColor: Color | undefined;
    constructor(_disassemblyView: DisassemblyViewRendererReference, openerService: OpenerService, uriService: {
        asCanonicalUri(uri: URI): URI;
    }, themeService: IThemeService, textModelService: ITextModelService);
    renderTemplate(container: HTMLElement): InstructionColumnTemplateData;
    renderElement(element: DisassembledInstructionEntry, index: number, templateData: InstructionColumnTemplateData, height: number | undefined): void;
    protected renderElementInner(element: DisassembledInstructionEntry, index: number, column: InstructionColumnTemplateData, height: number | undefined): Promise<void>;
    disposeElement(element: DisassembledInstructionEntry, index: number, templateData: InstructionColumnTemplateData, height: number | undefined): void;
    disposeTemplate(templateData: InstructionColumnTemplateData): void;
    protected rerenderBackground(instruction: HTMLElement, sourceCode: HTMLElement, element?: DisassembledInstructionEntry): void;
    protected openSourceCode(instruction: DebugProtocol.DisassembledInstruction | undefined): void;
    protected getUriFromSource(instruction: DebugProtocol.DisassembledInstruction): URI;
    protected applyFontInfo(element: HTMLElement): void;
}
export declare function getUriFromSource(raw: DebugProtocol.Source, path: string | undefined, sessionId: string, uriIdentityService: {
    asCanonicalUri(uri: URI): URI;
}): URI;
//# sourceMappingURL=disassembly-view-instruction-renderer.d.ts.map