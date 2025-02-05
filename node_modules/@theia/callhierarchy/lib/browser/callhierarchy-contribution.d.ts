import { MenuModelRegistry, Command, CommandRegistry } from '@theia/core/lib/common';
import { AbstractViewContribution, OpenViewArguments, KeybindingRegistry } from '@theia/core/lib/browser';
import { CurrentEditorAccess, EditorManager } from '@theia/editor/lib/browser';
import { CallHierarchyTreeWidget } from './callhierarchy-tree/callhierarchy-tree-widget';
import { CALL_HIERARCHY_LABEL, CALL_HIERARCHY_TOGGLE_COMMAND_ID } from './callhierarchy';
import { CallHierarchyServiceProvider } from './callhierarchy-service';
import { ContextKey, ContextKeyService } from '@theia/core/lib/browser/context-key-service';
export { CALL_HIERARCHY_LABEL, CALL_HIERARCHY_TOGGLE_COMMAND_ID };
export declare namespace CallHierarchyCommands {
    const OPEN: Command;
}
export declare class CallHierarchyContribution extends AbstractViewContribution<CallHierarchyTreeWidget> {
    protected readonly editorAccess: CurrentEditorAccess;
    protected readonly editorManager: EditorManager;
    protected readonly callHierarchyServiceProvider: CallHierarchyServiceProvider;
    protected readonly contextKeyService: ContextKeyService;
    protected editorHasCallHierarchyProvider: ContextKey<boolean>;
    constructor();
    protected init(): void;
    protected isCallHierarchyAvailable(): boolean;
    openView(args?: Partial<OpenViewArguments>): Promise<CallHierarchyTreeWidget>;
    registerCommands(commands: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
}
//# sourceMappingURL=callhierarchy-contribution.d.ts.map