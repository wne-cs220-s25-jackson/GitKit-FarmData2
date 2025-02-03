import { Deferred } from '@theia/core/lib/common/promise-util';
import { MaybePromise } from '@theia/core/lib/common/types';
export interface WebviewResourceResponse {
    eTag: string | undefined;
    body(): MaybePromise<Uint8Array>;
}
/**
 * Browser based cache of webview resources across all instances.
 */
export declare class WebviewResourceCache {
    protected readonly cache: Deferred<Cache | undefined>;
    constructor();
    protected resolveCache(): Promise<void>;
    match(url: string): Promise<WebviewResourceResponse | undefined>;
    delete(url: string): Promise<boolean>;
    put(url: string, response: WebviewResourceResponse): Promise<void>;
}
//# sourceMappingURL=webview-resource-cache.d.ts.map