import { LanguagePackBundle, LanguagePackService } from '../../common/language-pack-service';
export declare class PluginLanguagePackService implements LanguagePackService {
    protected readonly storage: Map<string, Map<string, LanguagePackBundle>>;
    storeBundle(pluginId: string, locale: string, bundle: LanguagePackBundle): void;
    deleteBundle(pluginId: string, locale?: string): void;
    getBundle(pluginId: string, locale: string): Promise<LanguagePackBundle | undefined>;
}
//# sourceMappingURL=plugin-language-pack-service.d.ts.map