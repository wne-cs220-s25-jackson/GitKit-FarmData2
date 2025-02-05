import { Localization } from './localization';
export declare const LocalizationServerPath = "/localization-server";
export declare const LocalizationServer: unique symbol;
export interface LocalizationServer {
    loadLocalization(languageId: string): Promise<Localization>;
}
//# sourceMappingURL=localization-server.d.ts.map