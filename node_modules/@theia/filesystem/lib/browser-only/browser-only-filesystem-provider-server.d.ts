import { FileSystemProviderServer } from '../common/remote-file-system-provider';
import { Event } from '@theia/core';
/**
 * Backend component.
 *
 * JSON-RPC server exposing a wrapped file system provider remotely.
 */
export declare class BrowserOnlyFileSystemProviderServer extends FileSystemProviderServer {
    onDidOpenConnection: Event<any>;
    onDidCloseConnection: Event<any>;
}
//# sourceMappingURL=browser-only-filesystem-provider-server.d.ts.map