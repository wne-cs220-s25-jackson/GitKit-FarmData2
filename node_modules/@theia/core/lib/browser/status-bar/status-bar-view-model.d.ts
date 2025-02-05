import { Emitter, Event } from '../../common';
import { StatusBarAlignment, StatusBarEntry, StatusBarViewEntry, StatusBarViewModelEntry } from './status-bar-types';
interface EntryLocation {
    container: StatusBarViewModelEntry[];
    index: number;
    entry: StatusBarViewModelEntry;
}
export declare class StatusBarViewModel {
    protected leftTree: StatusBarViewModelEntry[];
    protected rightTree: StatusBarViewModelEntry[];
    protected containerPointers: Map<string, StatusBarViewModelEntry[]>;
    protected onDidChangeEmitter: Emitter<void>;
    get onDidChange(): Event<void>;
    getLeft(): IterableIterator<StatusBarViewEntry>;
    getRight(): IterableIterator<StatusBarViewEntry>;
    getEntries(list: StatusBarViewModelEntry[]): IterableIterator<StatusBarViewEntry>;
    getChildren(list: StatusBarViewModelEntry[], alignment: StatusBarAlignment, compact?: boolean): IterableIterator<StatusBarViewEntry>;
    set(id: string, entry: StatusBarEntry): void;
    protected relocate(locationData: EntryLocation, dontSort?: boolean): void;
    protected getContainerFor(entry: StatusBarEntry): StatusBarViewModelEntry[];
    protected getDependentsOf(id: string): EntryLocation[];
    remove(id: string): boolean;
    protected shareSamePositionParameters(left: StatusBarEntry, right: StatusBarEntry): boolean;
    protected shareSameContainer(left: StatusBarEntry, right: StatusBarEntry): boolean;
    protected shareSamePriority(left: StatusBarEntry, right: StatusBarEntry): boolean;
    protected affinityMatters(left: StatusBarEntry, right: StatusBarEntry): boolean;
    protected findElement(id?: string): EntryLocation | undefined;
    protected sort(container: StatusBarViewModelEntry[]): void;
    protected sortTop(container: StatusBarViewModelEntry[]): void;
    protected comparePriority(left: StatusBarViewModelEntry, right: StatusBarViewModelEntry): number;
    protected sortDependents(container: StatusBarViewModelEntry[]): void;
    protected inline(left: StatusBarViewModelEntry[], right: StatusBarViewModelEntry[]): void;
    protected doAddTop(entry: StatusBarViewModelEntry): void;
}
export {};
//# sourceMappingURL=status-bar-view-model.d.ts.map