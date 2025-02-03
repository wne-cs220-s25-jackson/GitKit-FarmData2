import { TreeSource } from '@theia/core/lib/browser/source-tree';
import { DebugViewModel } from './debug-view-model';
import { DebugWatchExpression } from './debug-watch-expression';
export declare class DebugWatchSource extends TreeSource {
    protected readonly model: DebugViewModel;
    protected init(): void;
    protected readonly refresh: () => Promise<void>;
    getElements(): Promise<IterableIterator<DebugWatchExpression>>;
}
//# sourceMappingURL=debug-watch-source.d.ts.map