import { TreeSource, TreeElement } from '@theia/core/lib/browser/source-tree';
import { DebugViewModel } from './debug-view-model';
import { BreakpointManager } from '../breakpoint/breakpoint-manager';
export declare class DebugBreakpointsSource extends TreeSource {
    protected readonly model: DebugViewModel;
    protected readonly breakpoints: BreakpointManager;
    protected init(): void;
    getElements(): IterableIterator<TreeElement>;
}
//# sourceMappingURL=debug-breakpoints-source.d.ts.map