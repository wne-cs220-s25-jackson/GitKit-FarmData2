import { ContextMenuRenderer, RenderContextMenuOptions, ContextMenuAccess, FrontendApplicationContribution, PreferenceService } from '../../browser';
import { ElectronMainMenuFactory } from './electron-main-menu-factory';
import { ContextMenuContext } from '../../browser/menu/context-menu-context';
import { MenuPath, MenuContribution, MenuModelRegistry } from '../../common';
import { BrowserContextMenuRenderer } from '../../browser/menu/browser-context-menu-renderer';
export declare class ElectronContextMenuAccess extends ContextMenuAccess {
    readonly menuHandle: Promise<number>;
    constructor(menuHandle: Promise<number>);
}
export declare namespace ElectronTextInputContextMenu {
    const MENU_PATH: MenuPath;
    const UNDO_REDO_EDIT_GROUP: string[];
    const EDIT_GROUP: string[];
    const SELECT_GROUP: string[];
}
export declare class ElectronTextInputContextMenuContribution implements FrontendApplicationContribution, MenuContribution {
    protected readonly contextMenuRenderer: ContextMenuRenderer;
    onStart(): void;
    registerMenus(registry: MenuModelRegistry): void;
}
export declare class ElectronContextMenuRenderer extends BrowserContextMenuRenderer {
    private electronMenuFactory;
    protected readonly context: ContextMenuContext;
    protected readonly preferenceService: PreferenceService;
    protected useNativeStyle: boolean;
    constructor(electronMenuFactory: ElectronMainMenuFactory);
    protected init(): void;
    protected doInit(): Promise<void>;
    protected doRender(options: RenderContextMenuOptions): ContextMenuAccess;
}
//# sourceMappingURL=electron-context-menu-renderer.d.ts.map