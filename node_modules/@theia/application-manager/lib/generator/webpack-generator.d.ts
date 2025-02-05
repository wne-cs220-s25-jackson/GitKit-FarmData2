import { AbstractGenerator } from './abstract-generator';
export declare class WebpackGenerator extends AbstractGenerator {
    generate(): Promise<void>;
    protected shouldGenerateUserWebpackConfig(): Promise<boolean>;
    get configPath(): string;
    get genConfigPath(): string;
    get genNodeConfigPath(): string;
    protected compileWebpackConfig(): string;
    protected compileUserWebpackConfig(): string;
    protected compileNodeWebpackConfig(): string;
}
//# sourceMappingURL=webpack-generator.d.ts.map