import { Mutex } from 'async-mutex';
import { interfaces } from 'inversify';
export declare const FileSystemLocking: symbol & interfaces.Abstract<FileSystemLocking>;
/**
 * Use this backend service to help prevent race access to files on disk.
 */
export interface FileSystemLocking {
    /**
     * Get exclusive access to a file for reading and/or writing.
     * @param lockPath The path to request exclusive access to.
     * @param transaction The job to do while having exclusive access.
     * @param thisArg `this` argument used when calling `transaction`.
     */
    lockPath<T>(lockPath: string, transaction: (lockPath: string) => T | Promise<T>, thisArg?: unknown): Promise<T>;
}
export declare class FileSystemLockingImpl implements FileSystemLocking {
    lockPath<T>(lockPath: string, transaction: (lockPath: string) => T | Promise<T>, thisArg?: unknown): Promise<T>;
    protected resolveLockPath(lockPath: string): string;
    protected getLocks(): Map<string, Mutex>;
    protected initializeLocks(): Map<string, Mutex>;
    protected cleanupLocks(locks: Map<string, Mutex>): void;
    protected getLock(lockPath: string): Mutex;
}
//# sourceMappingURL=filesystem-locking.d.ts.map