export declare const envVariablesPath = "/services/envs";
export declare const EnvVariablesServer: unique symbol;
export interface EnvVariablesServer {
    getExecPath(): Promise<string>;
    getVariables(): Promise<EnvVariable[]>;
    getValue(key: string): Promise<EnvVariable | undefined>;
    getConfigDirUri(): Promise<string>;
    /**
     * Resolves to a URI representing the current user's home directory.
     */
    getHomeDirUri(): Promise<string>;
    /**
     * Resolves to an array of URIs pointing to the available drives on the filesystem.
     */
    getDrives(): Promise<string[]>;
}
export interface EnvVariable {
    readonly name: string;
    readonly value: string | undefined;
}
//# sourceMappingURL=env-variables-protocol.d.ts.map