import { interfaces } from '@theia/core/shared/inversify';
import { AbstractViewContribution } from '@theia/core/lib/browser';
import { DisassemblyViewWidget } from './disassembly-view-widget';
import { Command, CommandRegistry, MenuModelRegistry } from '@theia/core';
import { DebugService } from '../../common/debug-service';
import { EditorManager } from '@theia/editor/lib/browser';
import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
import { DebugSessionManager } from '../debug-session-manager';
export declare const OPEN_DISASSEMBLY_VIEW_COMMAND: Command;
export declare const LANGUAGE_SUPPORTS_DISASSEMBLE_REQUEST = "languageSupportsDisassembleRequest";
export declare const FOCUSED_STACK_FRAME_HAS_INSTRUCTION_REFERENCE = "focusedStackFrameHasInstructionReference";
export declare const DISASSEMBLE_REQUEST_SUPPORTED = "disassembleRequestSupported";
export declare const DISASSEMBLY_VIEW_FOCUS = "disassemblyViewFocus";
export declare class DisassemblyViewContribution extends AbstractViewContribution<DisassemblyViewWidget> {
    protected readonly debugService: DebugService;
    protected readonly editorManager: EditorManager;
    protected readonly contextKeyService: ContextKeyService;
    protected readonly debugSessionManager: DebugSessionManager;
    constructor();
    protected init(): void;
    registerCommands(commands: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
}
export declare function bindDisassemblyView(bind: interfaces.Bind): void;
//# sourceMappingURL=disassembly-view-contribution.d.ts.map