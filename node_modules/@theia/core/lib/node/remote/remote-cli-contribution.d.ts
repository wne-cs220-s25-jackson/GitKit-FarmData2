import type { OS } from '../../common/os';
import type { MaybePromise } from '../../common/types';
export interface RemotePlatform {
    os: OS.Type;
    arch: string;
}
export interface RemoteCliContext {
    platform: RemotePlatform;
    directory: string;
}
export declare const RemoteCliContribution: unique symbol;
export interface RemoteCliContribution {
    enhanceArgs(context: RemoteCliContext): MaybePromise<string[]>;
}
//# sourceMappingURL=remote-cli-contribution.d.ts.map