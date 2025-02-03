/// <reference types="node" />
import * as cp from 'child_process';
/**
 * `@theia/core` service with some process-related utilities.
 */
export declare class ProcessUtils {
    terminateProcessTree(ppid: number): void;
    protected winTerminateProcessTree(ppid: number): void;
    protected unixTerminateProcessTree(ppid: number): void;
    protected unixGetPGID(pid: number): number;
    protected unixGetChildrenRecursive(ppid: number): Set<number>;
    protected spawnSync(file: string, argv: string[], options?: cp.SpawnSyncOptions): cp.SpawnSyncReturns<string>;
}
//# sourceMappingURL=process-utils.d.ts.map