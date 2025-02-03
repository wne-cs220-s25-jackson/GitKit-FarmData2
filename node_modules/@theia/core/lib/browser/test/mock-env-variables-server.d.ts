import URI from '../../common/uri';
import { EnvVariablesServer, EnvVariable } from '../../common/env-variables';
export declare class MockEnvVariablesServerImpl implements EnvVariablesServer {
    protected readonly configDirUri: URI;
    constructor(configDirUri: URI);
    getHomeDirUri(): Promise<string>;
    getDrives(): Promise<string[]>;
    getConfigDirUri(): Promise<string>;
    getExecPath(): Promise<string>;
    getVariables(): Promise<EnvVariable[]>;
    getValue(key: string): Promise<EnvVariable | undefined>;
}
//# sourceMappingURL=mock-env-variables-server.d.ts.map