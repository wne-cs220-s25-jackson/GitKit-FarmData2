import { Menu } from '../widgets';
import { ContextMenuAccess, ContextMenuRenderer, RenderContextMenuOptions } from '../context-menu-renderer';
import { BrowserMainMenuFactory } from './browser-menu-plugin';
export declare class BrowserContextMenuAccess extends ContextMenuAccess {
    readonly menu: Menu;
    constructor(menu: Menu);
}
export declare class BrowserContextMenuRenderer extends ContextMenuRenderer {
    private menuFactory;
    constructor(menuFactory: BrowserMainMenuFactory);
    protected doRender({ menuPath, anchor, args, onHide, context, contextKeyService, skipSingleRootNode }: RenderContextMenuOptions): ContextMenuAccess;
}
//# sourceMappingURL=browser-context-menu-renderer.d.ts.map