import { Disposable } from '../disposable';
import { CompoundMenuNode, CompoundMenuNodeRole, MenuNode, MutableCompoundMenuNode, SubMenuOptions } from './menu-types';
/**
 * Node representing a (sub)menu in the menu tree structure.
 */
export declare class CompositeMenuNode implements MutableCompoundMenuNode {
    readonly id: string;
    label?: string | undefined;
    readonly parent?: (import("./menu-types").MenuNodeMetadata & import("./menu-types").MenuNodeRenderingData & Partial<CompoundMenuNode> & Partial<import("./menu-types").CommandMenuNode> & Partial<import("./menu-types").AlternativeHandlerMenuNode> & CompoundMenuNode) | undefined;
    protected readonly _children: MenuNode[];
    iconClass?: string;
    order?: string;
    protected _when?: string;
    protected _role?: CompoundMenuNodeRole;
    constructor(id: string, label?: string | undefined, options?: SubMenuOptions, parent?: (import("./menu-types").MenuNodeMetadata & import("./menu-types").MenuNodeRenderingData & Partial<CompoundMenuNode> & Partial<import("./menu-types").CommandMenuNode> & Partial<import("./menu-types").AlternativeHandlerMenuNode> & CompoundMenuNode) | undefined);
    get when(): string | undefined;
    get icon(): string | undefined;
    get children(): ReadonlyArray<MenuNode>;
    get role(): CompoundMenuNodeRole;
    addNode(node: MenuNode): Disposable;
    removeNode(id: string): void;
    updateOptions(options?: SubMenuOptions): void;
    get sortString(): string;
    get isSubmenu(): boolean;
    /** @deprecated @since 1.28 use CompoundMenuNode.isNavigationGroup instead */
    static isNavigationGroup: typeof CompoundMenuNode.isNavigationGroup;
}
export declare class CompositeMenuNodeWrapper implements MutableCompoundMenuNode {
    protected readonly wrapped: Readonly<MutableCompoundMenuNode>;
    readonly parent: CompoundMenuNode;
    protected readonly options?: SubMenuOptions | undefined;
    constructor(wrapped: Readonly<MutableCompoundMenuNode>, parent: CompoundMenuNode, options?: SubMenuOptions | undefined);
    get id(): string;
    get label(): string | undefined;
    get sortString(): string;
    get isSubmenu(): boolean;
    get role(): CompoundMenuNodeRole;
    get icon(): string | undefined;
    get iconClass(): string | undefined;
    get order(): string | undefined;
    get when(): string | undefined;
    get children(): ReadonlyArray<MenuNode>;
    addNode(node: MenuNode): Disposable;
    removeNode(id: string): void;
    updateOptions(options: SubMenuOptions): void;
}
//# sourceMappingURL=composite-menu-node.d.ts.map