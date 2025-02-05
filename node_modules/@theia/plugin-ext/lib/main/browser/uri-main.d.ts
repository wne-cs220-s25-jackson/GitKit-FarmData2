import { Disposable } from '@theia/core';
import { UriMain } from '../../common';
import { RPCProtocol } from '../../common/rpc-protocol';
import { interfaces } from '@theia/core/shared/inversify';
export declare class UriMainImpl implements UriMain, Disposable {
    private readonly proxy;
    private handlers;
    private readonly openerService;
    private readonly pluginSupport;
    private readonly openHandler;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    dispose(): void;
    $registerUriHandler(pluginId: string, extensionDisplayName: string): Promise<void>;
    $unregisterUriHandler(pluginId: string): Promise<void>;
}
//# sourceMappingURL=uri-main.d.ts.map