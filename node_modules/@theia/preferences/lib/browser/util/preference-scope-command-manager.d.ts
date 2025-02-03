import { LabelProvider } from '@theia/core/lib/browser';
import { FileStat } from '@theia/filesystem/lib/common/files';
import { CommandRegistry, MenuModelRegistry, Command } from '@theia/core/lib/common';
/**
 * @deprecated since 1.17.0 moved to PreferenceMenus namespace.
 */
export declare const FOLDER_SCOPE_MENU_PATH: string[];
/**
 * @deprecated since 1.17.0. This work is now done in the PreferenceScopeTabbarWidget.
 */
export declare class PreferenceScopeCommandManager {
    protected readonly commandRegistry: CommandRegistry;
    protected readonly menuModelRegistry: MenuModelRegistry;
    protected readonly labelProvider: LabelProvider;
    protected foldersAsCommands: Command[];
    createFolderWorkspacesMenu(folderWorkspaces: FileStat[], currentFolderURI?: string): void;
}
//# sourceMappingURL=preference-scope-command-manager.d.ts.map