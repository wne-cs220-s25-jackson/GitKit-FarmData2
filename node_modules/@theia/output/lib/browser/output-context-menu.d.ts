import { MenuPath } from '@theia/core/lib/common';
import { MonacoContextMenuService } from '@theia/monaco/lib/browser/monaco-context-menu';
export declare namespace OutputContextMenu {
    const MENU_PATH: MenuPath;
    const TEXT_EDIT_GROUP: string[];
    const COMMAND_GROUP: string[];
    const WIDGET_GROUP: string[];
}
export declare class OutputContextMenuService extends MonacoContextMenuService {
    protected menuPath(): MenuPath;
}
//# sourceMappingURL=output-context-menu.d.ts.map