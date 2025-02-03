import { interfaces } from '@theia/core/shared/inversify';
import { TabBar, Title, Widget } from '@theia/core/lib/browser';
import { AnyInputDto, TabDto, TabGroupDto, TabsMain } from '../../../common/plugin-api-rpc';
import { RPCProtocol } from '../../../common/rpc-protocol';
import { Disposable } from '@theia/core/shared/vscode-languageserver-protocol';
import { DisposableCollection } from '@theia/core';
interface TabInfo {
    tab: TabDto;
    tabIndex: number;
    group: TabGroupDto;
}
export declare class TabsMainImpl implements TabsMain, Disposable {
    private readonly proxy;
    private tabGroupModel;
    private tabInfoLookup;
    private waitQueue;
    private applicationShell;
    private disposableTabBarListeners;
    private disposableTitleListeners;
    private toDisposeOnDestroy;
    private groupIdCounter;
    private currentActiveGroup;
    private tabGroupChanged;
    private readonly defaultTabGroup;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    waitForWidget(widget: Widget): Promise<void>;
    protected createTabsModel(): void;
    protected createTabDto(tabTitle: Title<Widget>, groupId: number, newTab?: boolean): TabDto;
    protected getTabBar(tabTitle: Title<Widget>): TabBar<Widget> | undefined;
    protected createTabId(tabTitle: Title<Widget>, groupId: number): string;
    protected createTabGroupDto(tabBar: TabBar<Widget>): TabGroupDto;
    protected getTitleDisposables(title: Title<Widget>): DisposableCollection;
    protected attachListenersToTabBar(tabBar: TabBar<Widget> | undefined): void;
    protected evaluateTabDtoInput(widget: Widget): AnyInputDto;
    protected connectToSignal<T>(disposableList: DisposableCollection, signal: {
        connect(listener: T, context: unknown): void;
        disconnect(listener: T, context: unknown): void;
    }, listener: T): void;
    protected tabDtosEqual(a: TabDto, b: TabDto): boolean;
    protected getOrRebuildModel<T, R>(map: Map<T, R>, key: T): R;
    private onTabCreated;
    private onTabTitleChanged;
    private onTabClosed;
    private onTabMoved;
    private onTabGroupCreated;
    private onTabGroupClosed;
    $moveTab(tabId: string, index: number, viewColumn: number, preserveFocus?: boolean): void;
    updateTabIndices(tabInfo: TabInfo, startIndex: number): void;
    $closeTab(tabIds: string[], preserveFocus?: boolean): Promise<boolean>;
    $closeGroup(groupIds: number[], preserveFocus?: boolean): Promise<boolean>;
    dispose(): void;
}
export {};
//# sourceMappingURL=tabs-main.d.ts.map