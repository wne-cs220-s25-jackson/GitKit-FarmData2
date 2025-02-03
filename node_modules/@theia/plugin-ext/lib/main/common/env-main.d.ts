import { interfaces } from '@theia/core/shared/inversify';
import { RPCProtocol } from '../../common/rpc-protocol';
import { EnvMain } from '../../common/plugin-api-rpc';
import { OperatingSystem } from '../../plugin/types-impl';
export declare class EnvMainImpl implements EnvMain {
    private envVariableServer;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    $getEnvVariable(envVarName: string): Promise<string | undefined>;
    $getClientOperatingSystem(): Promise<OperatingSystem>;
}
//# sourceMappingURL=env-main.d.ts.map