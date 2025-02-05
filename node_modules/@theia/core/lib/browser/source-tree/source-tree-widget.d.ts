import * as React from 'react';
import { interfaces, Container } from 'inversify';
import { DisposableCollection } from '../../common/disposable';
import { TreeWidget, TreeNode, TreeProps, TreeModel } from '../tree';
import { TreeSource, TreeElement } from './tree-source';
import { TreeElementNode } from './source-tree';
export declare class SourceTreeWidget extends TreeWidget {
    static createContainer(parent: interfaces.Container, props?: Partial<TreeProps>): Container;
    protected init(): void;
    protected readonly toDisposeOnSource: DisposableCollection;
    get source(): TreeSource | undefined;
    set source(source: TreeSource | undefined);
    get selectedElement(): TreeElement | undefined;
    protected renderTree(model: TreeModel): React.ReactNode;
    protected renderCaption(node: TreeNode): React.ReactNode;
    protected createTreeElementNodeClassNames(node: TreeElementNode): string[];
    storeState(): object;
    protected superStoreState(): object;
    restoreState(state: object): void;
    protected superRestoreState(state: object): void;
}
//# sourceMappingURL=source-tree-widget.d.ts.map