import URI from '../common/uri';
import { OpenHandler } from './opener-service';
import { WindowService } from './window/window-service';
import { ExternalUriService } from './external-uri-service';
export interface HttpOpenHandlerOptions {
    openExternal?: boolean;
}
export declare class HttpOpenHandler implements OpenHandler {
    static readonly PRIORITY: number;
    readonly id = "http";
    protected readonly windowService: WindowService;
    protected readonly externalUriService: ExternalUriService;
    canHandle(uri: URI, options?: HttpOpenHandlerOptions): number;
    open(uri: URI): Promise<undefined>;
}
//# sourceMappingURL=http-open-handler.d.ts.map