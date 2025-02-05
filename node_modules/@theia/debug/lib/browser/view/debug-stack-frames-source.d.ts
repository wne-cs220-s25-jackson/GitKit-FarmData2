/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { TreeSource, TreeElement } from '@theia/core/lib/browser/source-tree';
import { DebugThread } from '../model/debug-thread';
import { DebugViewModel } from './debug-view-model';
export declare class DebugStackFramesSource extends TreeSource {
    protected readonly model: DebugViewModel;
    protected init(): void;
    protected readonly refresh: () => Promise<void>;
    getElements(): IterableIterator<TreeElement>;
}
export declare class LoadMoreStackFrames implements TreeElement {
    readonly thread: DebugThread;
    constructor(thread: DebugThread);
    render(): React.ReactNode;
    open(): Promise<void>;
}
//# sourceMappingURL=debug-stack-frames-source.d.ts.map