import { AbstractGenerator, GeneratorOptions } from './abstract-generator';
export declare class FrontendGenerator extends AbstractGenerator {
    generate(options?: GeneratorOptions): Promise<void>;
    protected compileIndexPreload(frontendModules: Map<string, string>): string;
    protected compileIndexHtml(frontendModules: Map<string, string>): string;
    protected compileIndexHead(frontendModules: Map<string, string>): string;
    protected compileIndexJs(frontendModules: Map<string, string>, frontendPreloadModules: Map<string, string>): string;
    protected importOrRequire(): string;
    /** HTML for secondary windows that contain an extracted widget. */
    protected compileSecondaryWindowHtml(): string;
    protected compileSecondaryIndexJs(secondaryWindowModules: Map<string, string>): string;
    compilePreloadJs(): string;
}
//# sourceMappingURL=frontend-generator.d.ts.map