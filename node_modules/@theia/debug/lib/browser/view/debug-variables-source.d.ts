import { TreeSource } from '@theia/core/lib/browser/source-tree';
import { DebugScope } from '../console/debug-console-items';
import { DebugViewModel } from './debug-view-model';
export declare class DebugVariablesSource extends TreeSource {
    protected readonly model: DebugViewModel;
    protected init(): void;
    protected readonly refresh: () => Promise<void>;
    getElements(): Promise<IterableIterator<DebugScope>>;
}
//# sourceMappingURL=debug-variables-source.d.ts.map