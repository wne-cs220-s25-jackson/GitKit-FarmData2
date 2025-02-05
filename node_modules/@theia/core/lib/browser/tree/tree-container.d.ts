import { interfaces, Container } from 'inversify';
import { TreeWidget, TreeProps } from './tree-widget';
import { TreeModel } from './tree-model';
import { Tree } from './tree';
import { TreeSelectionService } from './tree-selection';
import { TreeExpansionService } from './tree-expansion';
import { TreeNavigationService } from './tree-navigation';
import { TreeDecoratorService } from './tree-decorator';
import { TreeSearch } from './tree-search';
import { FuzzySearch } from './fuzzy-search';
import { SearchBoxFactory } from './search-box';
import { TreeFocusService } from './tree-focus-service';
export declare function isTreeServices(candidate?: Partial<TreeProps> | Partial<TreeContainerProps>): candidate is TreeContainerProps;
export declare function createTreeContainer(parent: interfaces.Container, props?: Partial<TreeContainerProps>): Container;
/**
 * @deprecated Please use TreeContainerProps instead of TreeProps
 * @since 1.23.0
 */
export declare function createTreeContainer(parent: interfaces.Container, props?: Partial<TreeProps>): Container;
export interface SearchBoxFactoryFactory {
    (context: interfaces.Context): SearchBoxFactory;
}
interface TreeConstants {
    searchBoxFactory: SearchBoxFactory;
    props: TreeProps;
}
interface TreeServices {
    tree: Tree;
    selectionService: TreeSelectionService;
    expansionService: TreeExpansionService;
    navigationService: TreeNavigationService;
    model: TreeModel;
    widget: TreeWidget;
    search: TreeSearch;
    fuzzy: FuzzySearch;
    decoratorService: TreeDecoratorService;
    focusService: TreeFocusService;
}
interface TreeTypes extends TreeServices, TreeConstants {
}
export type TreeIdentifiers = {
    [K in keyof TreeTypes]: interfaces.ServiceIdentifier<TreeTypes[K]>;
};
type TreeServiceProviders = {
    [K in keyof TreeServices]: interfaces.Newable<TreeServices[K]>;
};
export interface TreeContainerProps extends TreeServiceProviders {
    props: Partial<TreeProps>;
    searchBoxFactory: SearchBoxFactoryFactory;
}
export {};
//# sourceMappingURL=tree-container.d.ts.map