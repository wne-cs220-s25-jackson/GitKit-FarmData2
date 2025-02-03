import { ApplicationShell, KeybindingContribution, KeybindingRegistry, Widget } from '@theia/core/lib/browser';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from '@theia/core/lib/common';
export declare namespace EditorPreviewCommands {
    const PIN_PREVIEW_COMMAND: Command;
}
export declare class EditorPreviewContribution implements CommandContribution, MenuContribution, KeybindingContribution {
    protected readonly shell: ApplicationShell;
    registerCommands(registry: CommandRegistry): void;
    registerKeybindings(registry: KeybindingRegistry): void;
    registerMenus(registry: MenuModelRegistry): void;
    protected getTargetWidget(event?: Event): Widget | undefined;
}
//# sourceMappingURL=editor-preview-contribution.d.ts.map