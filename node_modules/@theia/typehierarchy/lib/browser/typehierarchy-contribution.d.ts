import { MenuModelRegistry } from '@theia/core/lib/common/menu';
import { ApplicationShell } from '@theia/core/lib/browser/shell';
import { KeybindingRegistry } from '@theia/core/lib/browser/keybinding';
import { Command, CommandRegistry } from '@theia/core/lib/common/command';
import { EditorAccess, EditorManager } from '@theia/editor/lib/browser/editor-manager';
import { AbstractViewContribution, OpenViewArguments } from '@theia/core/lib/browser/shell/view-contribution';
import { TypeHierarchyTreeWidget } from './tree/typehierarchy-tree-widget';
import { TypeHierarchyDirection } from './typehierarchy-provider';
import { TypeHierarchyServiceProvider } from './typehierarchy-service';
import { ContextKey, ContextKeyService } from '@theia/core/lib/browser/context-key-service';
export declare class TypeHierarchyContribution extends AbstractViewContribution<TypeHierarchyTreeWidget> {
    protected readonly shell: ApplicationShell;
    protected readonly editorAccess: EditorAccess;
    protected readonly editorManager: EditorManager;
    protected readonly contextKeyService: ContextKeyService;
    protected editorHasTypeHierarchyProvider: ContextKey<boolean>;
    protected readonly typeHierarchyServiceProvider: TypeHierarchyServiceProvider;
    constructor();
    protected init(): void;
    protected isTypeHierarchyAvailable(): boolean;
    openView(args?: Partial<TypeHierarchyOpenViewArguments>): Promise<TypeHierarchyTreeWidget>;
    registerCommands(commands: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
    /**
     * Flips the hierarchy direction in the `Type Hierarchy` view, if it is active and has a valid root.
     * Otherwise, calculates the type hierarchy based on the selection of the current editor.
     */
    protected openViewOrFlipHierarchyDirection(direction: TypeHierarchyDirection): Promise<void>;
    /**
     * Enabled if the `current` editor has the `languageId` or the `Type Hierarchy` widget is the active one.
     */
    protected isEnabled(languageId?: string | undefined): boolean;
    /**
     * Extracts the type hierarchy direction from the argument. If the direction cannot be extracted, returns with the `Children` as the default type.
     */
    protected getDirection(args?: Partial<TypeHierarchyOpenViewArguments>): TypeHierarchyDirection;
}
export interface TypeHierarchyOpenViewArguments extends OpenViewArguments {
    /**
     * The type hierarchy direction for the view argument.
     */
    readonly direction: TypeHierarchyDirection;
}
export declare namespace TypeHierarchyCommands {
    const TOGGLE_VIEW: Command;
    const OPEN_SUBTYPE: Command;
    const OPEN_SUPERTYPE: Command;
}
//# sourceMappingURL=typehierarchy-contribution.d.ts.map