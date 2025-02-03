import { SecretsMain } from '../../common/plugin-api-rpc';
import { RPCProtocol } from '../../common/rpc-protocol';
import { interfaces } from '@theia/core/shared/inversify';
export declare class SecretsMainImpl implements SecretsMain {
    private readonly proxy;
    private readonly credentialsService;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    private static getFullKey;
    $getPassword(extensionId: string, key: string): Promise<string | undefined>;
    $setPassword(extensionId: string, key: string, value: string): Promise<void>;
    $deletePassword(extensionId: string, key: string): Promise<void>;
}
//# sourceMappingURL=secrets-main.d.ts.map