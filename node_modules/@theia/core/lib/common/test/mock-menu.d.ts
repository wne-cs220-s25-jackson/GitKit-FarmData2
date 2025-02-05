import { Disposable } from '../disposable';
import { MenuModelRegistry, MenuPath, MenuAction } from '../menu';
export declare class MockMenuModelRegistry extends MenuModelRegistry {
    constructor();
    registerMenuAction(menuPath: MenuPath, item: MenuAction): Disposable;
    registerSubmenu(menuPath: MenuPath, label: string): Disposable;
}
//# sourceMappingURL=mock-menu.d.ts.map