import { KeybindingContribution, KeybindingRegistry } from '@theia/core/lib/browser';
import { CommandContribution, CommandRegistry, Command, MenuContribution, MenuModelRegistry, DisposableCollection } from '@theia/core/lib/common';
import { BlameDecorator } from './blame-decorator';
import { EditorManager, EditorWidget } from '@theia/editor/lib/browser';
import { BlameManager } from './blame-manager';
import URI from '@theia/core/lib/common/uri';
import { ContextKey, ContextKeyService } from '@theia/core/lib/browser/context-key-service';
export declare namespace BlameCommands {
    const TOGGLE_GIT_ANNOTATIONS: Command;
    const CLEAR_GIT_ANNOTATIONS: Command;
}
export declare class BlameContribution implements CommandContribution, KeybindingContribution, MenuContribution {
    protected readonly editorManager: EditorManager;
    protected readonly decorator: BlameDecorator;
    protected readonly blameManager: BlameManager;
    protected readonly contextKeyService: ContextKeyService;
    protected _visibleBlameAnnotations: ContextKey<boolean>;
    protected init(): void;
    protected updateContext(): void;
    registerCommands(commands: CommandRegistry): void;
    showsBlameAnnotations(uri: string | URI): boolean;
    protected get currentFileEditorWidget(): EditorWidget | undefined;
    protected isBlameable(uri: string | URI): boolean;
    protected visibleBlameAnnotations(): boolean;
    protected appliedDecorations: Map<string, DisposableCollection>;
    protected showBlame(editorWidget: EditorWidget): Promise<void>;
    protected clearBlame(uri: string | URI): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
}
//# sourceMappingURL=blame-contribution.d.ts.map