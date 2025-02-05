import { OpenHandler } from '../../browser/opener-service';
import URI from '../../common/uri';
export interface ExternalAppOpenHandlerOptions {
    openExternalApp?: boolean;
}
export declare class ExternalAppOpenHandler implements OpenHandler {
    static readonly PRIORITY: number;
    readonly id = "external-app";
    canHandle(uri: URI, options?: ExternalAppOpenHandlerOptions): number;
    open(uri: URI): Promise<undefined>;
}
//# sourceMappingURL=external-app-open-handler.d.ts.map