import { MenuContribution, MenuModelRegistry, MenuPath } from '@theia/core';
export declare const EDITOR_CONTEXT_MENU: MenuPath;
/**
 * Editor context menu default groups should be aligned
 * with VS Code default groups: https://code.visualstudio.com/api/references/contribution-points#contributes.menus
 */
export declare namespace EditorContextMenu {
    const NAVIGATION: string[];
    const MODIFICATION: string[];
    const CUT_COPY_PASTE: string[];
    const COMMANDS: string[];
    const UNDO_REDO: string[];
}
export declare namespace EditorMainMenu {
    /**
     * The main `Go` menu item.
     */
    const GO: string[];
    /**
     * Navigation menu group in the `Go` main-menu.
     */
    const NAVIGATION_GROUP: string[];
    /**
     * Context management group in the `Go` main menu: Pane and editor switching commands.
     */
    const CONTEXT_GROUP: string[];
    /**
     * Submenu for switching panes in the main area.
     */
    const PANE_GROUP: string[];
    const BY_NUMBER: string[];
    const NEXT_PREVIOUS: string[];
    /**
     * Workspace menu group in the `Go` main-menu.
     */
    const WORKSPACE_GROUP: string[];
    /**
     * Language features menu group in the `Go` main-menu.
     */
    const LANGUAGE_FEATURES_GROUP: string[];
    /**
     * Location menu group in the `Go` main-menu.
     */
    const LOCATION_GROUP: string[];
}
export declare class EditorMenuContribution implements MenuContribution {
    registerMenus(registry: MenuModelRegistry): void;
}
//# sourceMappingURL=editor-menu.d.ts.map