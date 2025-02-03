import { FileChange, FileChangeType } from '../common/filesystem-watcher-protocol';
/**
 * A file change collection guarantees that only one change is reported for each URI.
 *
 * Changes are normalized according following rules:
 * - ADDED + ADDED => ADDED
 * - ADDED + UPDATED => ADDED
 * - ADDED + DELETED => [ADDED, DELETED]
 * - UPDATED + ADDED => UPDATED
 * - UPDATED + UPDATED => UPDATED
 * - UPDATED + DELETED => DELETED
 * - DELETED + ADDED => UPDATED
 * - DELETED + UPDATED => UPDATED
 * - DELETED + DELETED => DELETED
 */
export declare class FileChangeCollection {
    protected readonly changes: Map<string, FileChange[]>;
    push(change: FileChange): void;
    protected normalize(changes: FileChange[], change: FileChange): void;
    protected reduce(current: FileChangeType | undefined, change: FileChangeType): FileChangeType | [FileChangeType, FileChangeType];
    values(): FileChange[];
}
//# sourceMappingURL=file-change-collection.d.ts.map