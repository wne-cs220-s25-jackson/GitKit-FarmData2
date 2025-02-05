import { LocalizationProvider } from '@theia/core/lib/node/i18n/localization-provider';
import { DeployedPlugin, PluginIdentifiers } from '../../common';
import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
import { BackendApplicationContribution } from '@theia/core/lib/node';
import { Disposable, MaybePromise } from '@theia/core';
import { Deferred } from '@theia/core/lib/common/promise-util';
import { LanguagePackService } from '../../common/language-pack-service';
export interface VSCodeNlsConfig {
    locale: string;
    availableLanguages: Record<string, string>;
    _languagePackSupport?: boolean;
    _languagePackId?: string;
    _translationsConfigFile?: string;
    _cacheRoot?: string;
    _corruptedFile?: string;
}
export declare class HostedPluginLocalizationService implements BackendApplicationContribution {
    protected readonly localizationProvider: LocalizationProvider;
    protected readonly languagePackService: LanguagePackService;
    protected readonly envVariables: EnvVariablesServer;
    protected localizationDisposeMap: Map<string, Disposable>;
    protected translationConfigFiles: Map<string, string>;
    protected readonly _ready: Deferred<void>;
    /**
     * This promise resolves when the cache has been cleaned up after starting the backend server.
     * Once resolved, the service allows to cache localization files for plugins.
     */
    ready: Promise<void>;
    initialize(): MaybePromise<void>;
    deployLocalizations(plugin: DeployedPlugin): Promise<void>;
    undeployLocalizations(plugin: PluginIdentifiers.VersionedId): void;
    protected updateLanguagePackBundles(plugin: DeployedPlugin): Promise<Disposable>;
    /**
     * Performs localization of the plugin model. Translates entries such as command names, view names and other items.
     *
     * Translatable items are indicated with a `%id%` value.
     * The `id` is the translation key that gets replaced with the localized value for the currently selected language.
     *
     * Returns a copy of the plugin argument and does not modify the argument.
     * This is done to preserve the original `%id%` values for subsequent invocations of this method.
     */
    localizePlugin(plugin: DeployedPlugin): Promise<DeployedPlugin>;
    getNlsConfig(): VSCodeNlsConfig;
    buildTranslationConfig(plugins: DeployedPlugin[]): Promise<void>;
    protected getLocalizationCacheDir(): Promise<string>;
}
//# sourceMappingURL=hosted-plugin-localization-service.d.ts.map