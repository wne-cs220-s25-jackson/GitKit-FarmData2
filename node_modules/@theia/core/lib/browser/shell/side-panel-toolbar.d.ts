import { Widget, Title } from '@phosphor/widgets';
import { TabBarToolbar, TabBarToolbarRegistry, TabBarToolbarFactory } from './tab-bar-toolbar';
import { Message } from '@phosphor/messaging';
import { BaseWidget } from '../widgets';
import { Emitter } from '../../common/event';
import { ContextMenuAccess, Anchor } from '../context-menu-renderer';
export declare class SidePanelToolbar extends BaseWidget {
    protected readonly tabBarToolbarRegistry: TabBarToolbarRegistry;
    protected readonly tabBarToolbarFactory: TabBarToolbarFactory;
    protected readonly side: 'left' | 'right';
    protected titleContainer: HTMLElement | undefined;
    private _toolbarTitle;
    protected toolbar: TabBarToolbar | undefined;
    protected readonly onContextMenuEmitter: Emitter<MouseEvent>;
    readonly onContextMenu: import("../../common/event").Event<MouseEvent>;
    constructor(tabBarToolbarRegistry: TabBarToolbarRegistry, tabBarToolbarFactory: TabBarToolbarFactory, side: 'left' | 'right');
    protected onBeforeAttach(msg: Message): void;
    protected onAfterAttach(msg: Message): void;
    protected onBeforeDetach(msg: Message): void;
    protected onUpdateRequest(msg: Message): void;
    protected updateToolbar(): void;
    protected init(): void;
    set toolbarTitle(title: Title<Widget> | undefined);
    showMoreContextMenu(anchor: Anchor): ContextMenuAccess;
}
//# sourceMappingURL=side-panel-toolbar.d.ts.map