import { CommandRegistry } from '../command';
import { AlternativeHandlerMenuNode, CommandMenuNode, MenuAction, MenuNode } from './menu-types';
/**
 * Node representing an action in the menu tree structure.
 * It's based on {@link MenuAction} for which it tries to determine the
 * best label, icon and sortString with the given data.
 */
export declare class ActionMenuNode implements MenuNode, CommandMenuNode, Partial<AlternativeHandlerMenuNode> {
    protected readonly action: MenuAction;
    protected readonly commands: CommandRegistry;
    readonly altNode: ActionMenuNode | undefined;
    constructor(action: MenuAction, commands: CommandRegistry);
    get command(): string;
    get when(): string | undefined;
    get id(): string;
    get label(): string;
    get icon(): string | undefined;
    get sortString(): string;
}
//# sourceMappingURL=action-menu-node.d.ts.map