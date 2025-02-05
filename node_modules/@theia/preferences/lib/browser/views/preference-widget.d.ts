import { Panel, Widget, Message, StatefulWidget, PreferenceScope } from '@theia/core/lib/browser';
import { PreferencesEditorState, PreferencesEditorWidget } from './preference-editor-widget';
import { PreferencesTreeWidget } from './preference-tree-widget';
import { PreferencesSearchbarState, PreferencesSearchbarWidget } from './preference-searchbar-widget';
import { PreferencesScopeTabBar, PreferencesScopeTabBarState } from './preference-scope-tabbar-widget';
import { Preference } from '../util/preference-types';
import URI from '@theia/core/lib/common/uri';
interface PreferencesWidgetState {
    scopeTabBarState: PreferencesScopeTabBarState;
    editorState: PreferencesEditorState;
    searchbarWidgetState: PreferencesSearchbarState;
}
export declare class PreferencesWidget extends Panel implements StatefulWidget {
    /**
     * The widget `id`.
     */
    static readonly ID = "settings_widget";
    /**
     * The widget `label` which is used for display purposes.
     */
    static readonly LABEL: string;
    protected readonly editorWidget: PreferencesEditorWidget;
    protected readonly treeWidget: PreferencesTreeWidget;
    protected readonly searchbarWidget: PreferencesSearchbarWidget;
    protected readonly tabBarWidget: PreferencesScopeTabBar;
    get currentScope(): Preference.SelectedScopeDetails;
    setSearchTerm(query: string): Promise<void>;
    setScope(scope: PreferenceScope.User | PreferenceScope.Workspace | URI): void;
    protected onResize(msg: Widget.ResizeMessage): void;
    protected onActivateRequest(msg: Message): void;
    protected init(): void;
    getPreviewNode(): Node | undefined;
    storeState(): PreferencesWidgetState;
    restoreState(state: PreferencesWidgetState): void;
}
export {};
//# sourceMappingURL=preference-widget.d.ts.map