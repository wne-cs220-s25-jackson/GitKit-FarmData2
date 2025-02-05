import { ApplicationPackage } from '@theia/application-package';
export interface GeneratorOptions {
    mode?: 'development' | 'production';
    splitFrontend?: boolean;
}
export declare abstract class AbstractGenerator {
    protected readonly pck: ApplicationPackage;
    protected options: GeneratorOptions;
    constructor(pck: ApplicationPackage, options?: GeneratorOptions);
    protected ifBrowser(value: string, defaultValue?: string): string;
    protected ifElectron(value: string, defaultValue?: string): string;
    protected ifBrowserOnly(value: string, defaultValue?: string): string;
    protected write(path: string, content: string): Promise<void>;
    protected ifMonaco(value: () => string, defaultValue?: () => string): string;
    protected ifPackage(packageName: string | string[], value: string | (() => string), defaultValue?: string | (() => string)): string;
    protected prettyStringify(object: object): string;
}
//# sourceMappingURL=abstract-generator.d.ts.map