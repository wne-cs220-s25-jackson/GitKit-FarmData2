import { MaybePromise } from '../../common/types';
export declare const RemoteCopyContribution: unique symbol;
export interface RemoteCopyContribution {
    copy(registry: RemoteCopyRegistry): MaybePromise<void>;
}
export interface RemoteCopyOptions {
    /**
     * The mode that the file should be set to once copied to the remote.
     *
     * Only relevant for POSIX-like systems
     */
    mode?: number;
}
export interface RemoteFile {
    path: string;
    target: string;
    options?: RemoteCopyOptions;
}
export interface RemoteCopyRegistry {
    getFiles(): RemoteFile[];
    glob(pattern: string, target?: string): Promise<void>;
    file(file: string, target?: string, options?: RemoteCopyOptions): void;
    directory(dir: string, target?: string): Promise<void>;
}
//# sourceMappingURL=remote-copy-contribution.d.ts.map