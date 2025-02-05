import { Localization } from '../../common/i18n/localization';
import { LocalizationServer } from '../../common/i18n/localization-server';
import { Deferred } from '../../common/promise-util';
import { BackendApplicationContribution } from '../backend-application';
import { LocalizationRegistry } from './localization-contribution';
import { LocalizationProvider } from './localization-provider';
export declare class LocalizationServerImpl implements LocalizationServer, BackendApplicationContribution {
    protected readonly initialized: Deferred<void>;
    protected readonly localizationRegistry: LocalizationRegistry;
    protected readonly localizationProvider: LocalizationProvider;
    initialize(): Promise<void>;
    waitForInitialization(): Promise<void>;
    loadLocalization(languageId: string): Promise<Localization>;
}
//# sourceMappingURL=localization-server.d.ts.map