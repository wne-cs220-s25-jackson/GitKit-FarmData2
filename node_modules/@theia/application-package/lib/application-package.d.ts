import { NpmRegistry, NodePackage, PublishedNodePackage } from './npm-registry';
import { Extension, ExtensionPackage, ExtensionPackageOptions } from './extension-package';
import { ApplicationProps } from './application-props';
export type ApplicationLog = (message?: any, ...optionalParams: any[]) => void;
export declare class ApplicationPackageOptions {
    readonly projectPath: string;
    readonly log?: ApplicationLog;
    readonly error?: ApplicationLog;
    readonly registry?: NpmRegistry;
    readonly appTarget?: ApplicationProps.Target;
}
export type ApplicationModuleResolver = (parentPackagePath: string, modulePath: string) => string;
export declare class ApplicationPackage {
    protected readonly options: ApplicationPackageOptions;
    readonly projectPath: string;
    readonly log: ApplicationLog;
    readonly error: ApplicationLog;
    constructor(options: ApplicationPackageOptions);
    protected _registry: NpmRegistry | undefined;
    get registry(): NpmRegistry;
    get target(): ApplicationProps.Target;
    protected _props: ApplicationProps | undefined;
    get props(): ApplicationProps;
    protected _pck: NodePackage | undefined;
    get pck(): NodePackage;
    protected _frontendModules: Map<string, string> | undefined;
    protected _frontendPreloadModules: Map<string, string> | undefined;
    protected _frontendElectronModules: Map<string, string> | undefined;
    protected _secondaryWindowModules: Map<string, string> | undefined;
    protected _backendModules: Map<string, string> | undefined;
    protected _backendElectronModules: Map<string, string> | undefined;
    protected _electronMainModules: Map<string, string> | undefined;
    protected _preloadModules: Map<string, string> | undefined;
    protected _extensionPackages: ReadonlyArray<ExtensionPackage> | undefined;
    /**
     * Extension packages in the topological order.
     */
    get extensionPackages(): ReadonlyArray<ExtensionPackage>;
    getExtensionPackage(extension: string): ExtensionPackage | undefined;
    findExtensionPackage(extension: string): Promise<ExtensionPackage | undefined>;
    /**
     * Resolve an extension name to its associated package
     * @param extension the name of the extension's package as defined in "dependencies" (might be aliased)
     * @returns the extension package
     */
    resolveExtensionPackage(extension: string): Promise<ExtensionPackage | undefined>;
    protected newExtensionPackage(raw: PublishedNodePackage, options?: ExtensionPackageOptions): ExtensionPackage;
    get frontendPreloadModules(): Map<string, string>;
    get frontendOnlyPreloadModules(): Map<string, string>;
    get frontendModules(): Map<string, string>;
    get frontendOnlyModules(): Map<string, string>;
    get frontendElectronModules(): Map<string, string>;
    get secondaryWindowModules(): Map<string, string>;
    get backendModules(): Map<string, string>;
    get backendElectronModules(): Map<string, string>;
    get electronMainModules(): Map<string, string>;
    get preloadModules(): Map<string, string>;
    protected computeModules<P extends keyof Extension, S extends keyof Extension = P>(primary: P, secondary?: S): Map<string, string>;
    relative(path: string): string;
    path(...segments: string[]): string;
    get packagePath(): string;
    lib(...segments: string[]): string;
    srcGen(...segments: string[]): string;
    backend(...segments: string[]): string;
    bundledBackend(...segments: string[]): string;
    frontend(...segments: string[]): string;
    isBrowser(): boolean;
    isElectron(): boolean;
    isBrowserOnly(): boolean;
    ifBrowser<T>(value: T): T | undefined;
    ifBrowser<T>(value: T, defaultValue: T): T;
    ifElectron<T>(value: T): T | undefined;
    ifElectron<T>(value: T, defaultValue: T): T;
    ifBrowserOnly<T>(value: T): T | undefined;
    ifBrowserOnly<T>(value: T, defaultValue: T): T;
    get targetBackendModules(): Map<string, string>;
    get targetFrontendModules(): Map<string, string>;
    get targetFrontendPreloadModules(): Map<string, string>;
    get targetElectronMainModules(): Map<string, string>;
    setDependency(name: string, version: string | undefined): boolean;
    save(): Promise<void>;
    protected _moduleResolver: undefined | ApplicationModuleResolver;
    /**
     * A node module resolver in the context of the application package.
     */
    get resolveModule(): ApplicationModuleResolver;
}
//# sourceMappingURL=application-package.d.ts.map