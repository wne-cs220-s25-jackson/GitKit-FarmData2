import { Disposable, DisposableCollection } from '../../common/disposable';
import { Event, Emitter } from '../../common/event';
import { Tree, TreeNode } from './tree';
import { TreeDecoration } from './tree-decorator';
import { FuzzySearch } from './fuzzy-search';
import { LabelProvider } from '../label-provider';
export declare class TreeSearch implements Disposable {
    protected readonly tree: Tree;
    protected readonly fuzzySearch: FuzzySearch;
    protected readonly labelProvider: LabelProvider;
    protected readonly disposables: DisposableCollection;
    protected readonly filteredNodesEmitter: Emitter<readonly Readonly<TreeNode>[]>;
    protected _filterResult: FuzzySearch.Match<TreeNode>[];
    protected _filteredNodes: ReadonlyArray<Readonly<TreeNode>>;
    protected _filteredNodesAndParents: Set<string>;
    protected init(): void;
    getHighlights(): Map<string, TreeDecoration.CaptionHighlight>;
    /**
     * Resolves to all the visible tree nodes that match the search pattern.
     */
    filter(pattern: string | undefined): Promise<ReadonlyArray<Readonly<TreeNode>>>;
    protected addAllParentsToFilteredSet(node: TreeNode): void;
    /**
     * Returns with the filtered nodes after invoking the `filter` method.
     */
    get filteredNodes(): ReadonlyArray<Readonly<TreeNode>>;
    /**
     * Event that is fired when the filtered nodes have been changed.
     */
    get onFilteredNodesChanged(): Event<ReadonlyArray<Readonly<TreeNode>>>;
    passesFilters(node: TreeNode): boolean;
    dispose(): void;
    protected fireFilteredNodesChanged(nodes: ReadonlyArray<Readonly<TreeNode>>): void;
    protected toCaptionHighlight(match: FuzzySearch.Match<TreeNode>): TreeDecoration.CaptionHighlight;
    protected mapRange(range: FuzzySearch.Range): TreeDecoration.CaptionHighlight.Range;
}
//# sourceMappingURL=tree-search.d.ts.map