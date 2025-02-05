import { MenuAction, MenuContribution, MenuModelRegistry, MenuPath } from '@theia/core/lib/common';
import { IMenuItem } from '@theia/monaco-editor-core/esm/vs/platform/actions/common/actions';
import { MonacoCommandRegistry } from './monaco-command-registry';
export interface MonacoActionGroup {
    id: string;
    actions: string[];
}
export declare namespace MonacoMenus {
    const SELECTION: string[];
    const PEEK_CONTEXT_SUBMENU: MenuPath;
    const MARKERS_GROUP: string[];
}
export declare class MonacoEditorMenuContribution implements MenuContribution {
    protected readonly commands: MonacoCommandRegistry;
    constructor(commands: MonacoCommandRegistry);
    registerMenus(registry: MenuModelRegistry): void;
    protected registerPeekSubmenu(registry: MenuModelRegistry): void;
    protected buildMenuAction(commandId: string, item: IMenuItem): MenuAction;
    protected removeMnemonic(label: string): string;
}
//# sourceMappingURL=monaco-menu.d.ts.map