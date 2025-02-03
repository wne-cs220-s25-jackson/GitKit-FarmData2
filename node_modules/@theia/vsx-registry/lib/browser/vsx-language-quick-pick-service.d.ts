import { LanguageQuickPickItem, LanguageQuickPickService } from '@theia/core/lib/browser/i18n/language-quick-pick-service';
import { RequestService } from '@theia/core/shared/@theia/request';
import { LanguageInfo } from '@theia/core/lib/common/i18n/localization';
import { PluginServer } from '@theia/plugin-ext';
import { OVSXClientProvider } from '../common/ovsx-client-provider';
import { VSXSearchEntry } from '@theia/ovsx-client';
import { MessageService } from '@theia/core/lib/common/message-service';
export declare class VSXLanguageQuickPickService extends LanguageQuickPickService {
    protected readonly clientProvider: OVSXClientProvider;
    protected readonly requestService: RequestService;
    protected readonly pluginServer: PluginServer;
    protected readonly messageService: MessageService;
    protected getAvailableLanguages(): Promise<LanguageQuickPickItem[]>;
    protected loadExtensionLanguages(extension: VSXSearchEntry): Promise<LanguageInfo[]>;
}
//# sourceMappingURL=vsx-language-quick-pick-service.d.ts.map