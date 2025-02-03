import type { Compiler } from 'webpack';
export interface NativeWebpackPluginOptions {
    out: string;
    trash: boolean;
    ripgrep: boolean;
    pty: boolean;
    replacements?: Record<string, string>;
    nativeBindings?: Record<string, string>;
}
export declare class NativeWebpackPlugin {
    private bindings;
    private options;
    constructor(options: NativeWebpackPluginOptions);
    nativeBinding(dependency: string, nodePath: string): void;
    apply(compiler: Compiler): void;
    protected copyRipgrep(issuer: string, compiler: Compiler): Promise<void>;
    protected copyNodePtySpawnHelper(issuer: string, compiler: Compiler): Promise<void>;
    protected copyTrashHelper(issuer: string, compiler: Compiler): Promise<void>;
    protected copyExecutable(source: string, target: string): Promise<void>;
}
//# sourceMappingURL=native-webpack-plugin.d.ts.map