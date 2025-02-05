import { Emitter } from '@theia/core/lib/common/event';
import { StorageService } from '@theia/core/lib/browser/storage-service';
export declare class DebugWatchManager {
    protected readonly storage: StorageService;
    protected readonly onDidChangeEmitter: Emitter<void>;
    readonly onDidChange: import("@theia/core/lib/common/event").Event<void>;
    protected idSequence: number;
    protected readonly _watchExpressions: Map<number, string>;
    get watchExpressions(): IterableIterator<[number, string]>;
    addWatchExpression(expression: string): number;
    removeWatchExpression(id: number): boolean;
    removeWatchExpressions(): void;
    load(): Promise<void>;
    save(): void;
    protected get storageKey(): string;
    protected storeState(): DebugWatchData;
    protected restoreState(state: DebugWatchData): void;
}
export interface DebugWatchData {
    readonly expressions: string[];
}
//# sourceMappingURL=debug-watch-manager.d.ts.map