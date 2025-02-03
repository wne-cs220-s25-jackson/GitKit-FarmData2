import { ReactNode } from 'react';
import { Disposable, DisposableCollection, Emitter, Event, MaybePromise } from '../../common';
import { TreeWidget } from '../tree';
export interface TreeElement {
    /** default: parent id + position among siblings */
    readonly id?: number | string | undefined;
    /** default: true */
    readonly visible?: boolean;
    render(host: TreeWidget): ReactNode;
    open?(): MaybePromise<any>;
}
export interface CompositeTreeElement extends TreeElement {
    /** default: true */
    readonly hasElements?: boolean;
    getElements(): MaybePromise<IterableIterator<TreeElement>>;
}
export declare namespace CompositeTreeElement {
    function is(element: unknown): element is CompositeTreeElement;
    function hasElements(element: unknown): element is CompositeTreeElement;
}
export declare abstract class TreeSource implements Disposable {
    protected readonly onDidChangeEmitter: Emitter<void>;
    readonly onDidChange: Event<void>;
    protected fireDidChange(): void;
    readonly id: string | undefined;
    readonly placeholder: string | undefined;
    constructor(options?: TreeSourceOptions);
    protected readonly toDispose: DisposableCollection;
    dispose(): void;
    abstract getElements(): MaybePromise<IterableIterator<TreeElement>>;
}
export interface TreeSourceOptions {
    id?: string;
    placeholder?: string;
}
//# sourceMappingURL=tree-source.d.ts.map