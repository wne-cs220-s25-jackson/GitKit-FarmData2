import { EnvVariable, EnvVariablesServer } from '../../common/env-variables';
export declare class EnvVariablesServerImpl implements EnvVariablesServer {
    protected readonly envs: {
        [key: string]: EnvVariable;
    };
    protected readonly homeDirUri: string;
    protected readonly configDirUri: Promise<string>;
    protected readonly pathExistenceCache: {
        [key: string]: boolean;
    };
    constructor();
    protected createConfigDirUri(): Promise<string>;
    getExecPath(): Promise<string>;
    getVariables(): Promise<EnvVariable[]>;
    getValue(key: string): Promise<EnvVariable | undefined>;
    getConfigDirUri(): Promise<string>;
    getHomeDirUri(): Promise<string>;
    getDrives(): Promise<string[]>;
    /**
     * Filters hidden and system partitions.
     */
    protected filterHiddenPartitions(path: string): boolean;
}
//# sourceMappingURL=env-variables-server.d.ts.map