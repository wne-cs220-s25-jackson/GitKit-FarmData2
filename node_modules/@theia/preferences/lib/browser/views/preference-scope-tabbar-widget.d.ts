import { TabBar, Widget, Title } from '@theia/core/shared/@phosphor/widgets';
import { PreferenceScope, Message, ContextMenuRenderer, LabelProvider, StatefulWidget } from '@theia/core/lib/browser';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import URI from '@theia/core/lib/common/uri';
import { FileStat } from '@theia/filesystem/lib/common/files';
import { PreferenceScopeCommandManager } from '../util/preference-scope-command-manager';
import { Preference } from '../util/preference-types';
import { CommandRegistry, DisposableCollection, Emitter, MenuModelRegistry } from '@theia/core/lib/common';
export interface PreferencesScopeTabBarState {
    scopeDetails: Preference.SelectedScopeDetails;
}
export declare class PreferencesScopeTabBar extends TabBar<Widget> implements StatefulWidget {
    static ID: string;
    protected readonly workspaceService: WorkspaceService;
    protected readonly preferencesMenuFactory: PreferenceScopeCommandManager;
    protected readonly contextMenuRenderer: ContextMenuRenderer;
    protected readonly labelProvider: LabelProvider;
    protected readonly commandRegistry: CommandRegistry;
    protected readonly menuModelRegistry: MenuModelRegistry;
    protected readonly onScopeChangedEmitter: Emitter<Preference.SelectedScopeDetails>;
    readonly onScopeChanged: import("@theia/core/lib/common").Event<Preference.SelectedScopeDetails>;
    protected toDispose: DisposableCollection;
    protected folderTitle: Title<Widget>;
    protected currentWorkspaceRoots: FileStat[];
    protected currentSelection: Preference.SelectedScopeDetails;
    protected editorScrollAtTop: boolean;
    get currentScope(): Preference.SelectedScopeDetails;
    protected setNewScopeSelection(newSelection: Preference.SelectedScopeDetails): void;
    protected init(): void;
    protected toScopeDetails(title?: Title<Widget> | Preference.SelectedScopeDetails): Preference.SelectedScopeDetails | undefined;
    protected toDataSet(scopeDetails: Preference.SelectedScopeDetails): Title.Dataset;
    protected setupInitialDisplay(): void;
    protected onUpdateRequest(msg: Message): void;
    protected addTabIndexToTabs(): void;
    protected addUserTab(): void;
    protected addWorkspaceTab(currentWorkspace: FileStat): Title<Widget>;
    protected getWorkspaceDataset(currentWorkspace: FileStat): Preference.SelectedScopeDetails;
    protected addOrUpdateFolderTab(): void;
    protected setFolderTitleProperties(multipleFolderRootsAreAvailable: boolean): void;
    protected folderSelectionCallback: (newScope: Preference.SelectedScopeDetails) => void;
    protected getFolderContextMenu(workspaceRoots?: FileStat[]): void;
    handleEvent(): void;
    protected openContextMenu(tabRect: DOMRect | ClientRect, folderTabNode: HTMLElement, source: 'click' | 'keypress'): void;
    protected doUpdateDisplay(newRoots: FileStat[]): void;
    protected updateWorkspaceTab(): void;
    protected emitNewScope(): void;
    setScope(scope: PreferenceScope.User | PreferenceScope.Workspace | URI): void;
    protected getDetailsForScope(scope: PreferenceScope.User | PreferenceScope.Workspace): Preference.SelectedScopeDetails | undefined;
    protected getDetailsForResource(resource: URI): Preference.SelectedScopeDetails | undefined;
    storeState(): PreferencesScopeTabBarState;
    restoreState(oldState: PreferencesScopeTabBarState): void;
    toggleShadow(showShadow: boolean): void;
    dispose(): void;
}
//# sourceMappingURL=preference-scope-tabbar-widget.d.ts.map