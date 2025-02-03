import { FrontendApplicationConfig } from '@theia/application-package/lib/application-props';
export declare const DEFAULT_BACKGROUND_COLOR_STORAGE_KEY = "theme.background";
export declare class FrontendApplicationConfigProvider {
    private static KEY;
    static get(): FrontendApplicationConfig;
    static set(config: FrontendApplicationConfig.Partial): void;
    private static doGet;
}
//# sourceMappingURL=frontend-application-config-provider.d.ts.map