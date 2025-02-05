import { interfaces } from '@theia/core/shared/inversify';
import { WindowMain } from '../../common/plugin-api-rpc';
import { RPCProtocol } from '../../common/rpc-protocol';
import { UriComponents } from '../../common/uri-components';
import { Disposable } from '@theia/core/lib/common/disposable';
export declare class WindowStateMain implements WindowMain, Disposable {
    private readonly proxy;
    private readonly openerService;
    private readonly externalUriService;
    private readonly toDispose;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    dispose(): void;
    private onFocusChanged;
    private onActiveStateChanged;
    $openUri(uriComponent: UriComponents): Promise<boolean>;
    $asExternalUri(uriComponents: UriComponents): Promise<UriComponents>;
}
//# sourceMappingURL=window-state-main.d.ts.map