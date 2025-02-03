import { IListAccessibilityProvider } from '@theia/monaco-editor-core/esm/vs/base/browser/ui/list/listWidget';
import { DisassembledInstructionEntry } from './disassembly-view-utilities';
export declare class AccessibilityProvider implements IListAccessibilityProvider<DisassembledInstructionEntry> {
    getWidgetAriaLabel(): string;
    getAriaLabel(element: DisassembledInstructionEntry): string | null;
}
//# sourceMappingURL=disassembly-view-accessibility-provider.d.ts.map