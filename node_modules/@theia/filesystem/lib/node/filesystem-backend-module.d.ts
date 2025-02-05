import { ContainerModule, interfaces } from '@theia/core/shared/inversify';
import { FileSystemWatcherService } from '../common/filesystem-watcher-protocol';
export declare const WATCHER_SINGLE_THREADED: boolean;
export declare const WATCHER_VERBOSE: boolean;
export declare const FileSystemWatcherServiceProcessOptions: unique symbol;
/**
 * Options to control the way the `ParcelFileSystemWatcherService` process is spawned.
 */
export interface FileSystemWatcherServiceProcessOptions {
    /**
     * Path to the script that will run the `ParcelFileSystemWatcherService` in a new process.
     */
    entryPoint: string;
}
declare const _default: ContainerModule;
export default _default;
export declare function bindFileSystemWatcherServer(bind: interfaces.Bind): void;
/**
 * Run the watch server in the current process.
 */
export declare function createParcelFileSystemWatcherService(ctx: interfaces.Context): FileSystemWatcherService;
/**
 * Run the watch server in a child process.
 * Return a proxy forwarding calls to the child process.
 */
export declare function spawnParcelFileSystemWatcherServiceProcess(ctx: interfaces.Context): FileSystemWatcherService;
//# sourceMappingURL=filesystem-backend-module.d.ts.map