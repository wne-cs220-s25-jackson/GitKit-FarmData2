import { MenuModelRegistry, CommandRegistry } from '@theia/core';
import { AbstractViewContribution, KeybindingRegistry, Widget, PreferenceScope, PreferenceService, QuickInputService, PreferenceSchemaProvider } from '@theia/core/lib/browser';
import { TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { EditorManager } from '@theia/editor/lib/browser';
import { PreferencesWidget } from './views/preference-widget';
import { WorkspacePreferenceProvider } from './workspace-preference-provider';
import { ClipboardService } from '@theia/core/lib/browser/clipboard-service';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { FileStat } from '@theia/filesystem/lib/common/files';
export declare class PreferencesContribution extends AbstractViewContribution<PreferencesWidget> {
    protected readonly fileService: FileService;
    protected readonly workspacePreferenceProvider: WorkspacePreferenceProvider;
    protected readonly editorManager: EditorManager;
    protected readonly preferenceService: PreferenceService;
    protected readonly clipboardService: ClipboardService;
    protected readonly scopeTracker: PreferencesWidget;
    protected readonly workspaceService: WorkspaceService;
    protected readonly quickInputService: QuickInputService;
    protected readonly schema: PreferenceSchemaProvider;
    constructor();
    registerCommands(commands: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
    registerToolbarItems(toolbar: TabBarToolbarRegistry): void;
    protected openPreferencesJSON(opener: string | PreferencesWidget): Promise<void>;
    protected openJson(scope: PreferenceScope, resource?: string): Promise<void>;
    /**
     * Prompts which workspace root folder to open the JSON settings.
     */
    protected openFolderPreferences(callback: (root: FileStat) => unknown): Promise<void>;
    private obtainConfigUri;
    /**
     * Determine if the current widget is the PreferencesWidget.
     */
    protected withWidget<T>(widget: Widget | undefined, fn: (widget: PreferencesWidget) => T): T | false;
}
//# sourceMappingURL=preferences-contribution.d.ts.map