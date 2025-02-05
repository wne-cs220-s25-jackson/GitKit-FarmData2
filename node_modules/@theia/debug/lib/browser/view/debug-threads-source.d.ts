import { TreeSource, TreeElement } from '@theia/core/lib/browser/source-tree';
import { DebugViewModel } from './debug-view-model';
export declare class DebugThreadsSource extends TreeSource {
    protected readonly model: DebugViewModel;
    protected init(): void;
    get multiSession(): boolean;
    getElements(): IterableIterator<TreeElement>;
}
//# sourceMappingURL=debug-threads-source.d.ts.map