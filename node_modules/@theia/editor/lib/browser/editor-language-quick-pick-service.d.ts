import { Language, LanguageService } from '@theia/core/lib/browser/language-service';
import { QuickInputService, QuickPickValue, URI } from '@theia/core';
import { LabelProvider } from '@theia/core/lib/browser';
export declare class EditorLanguageQuickPickService {
    protected readonly languages: LanguageService;
    protected readonly quickInputService: QuickInputService;
    protected readonly labelProvider: LabelProvider;
    pickEditorLanguage(current: string): Promise<QuickPickValue<'autoDetect' | Language> | undefined>;
    protected toQuickPickLanguage(value: Language, current: string): QuickPickValue<Language>;
    protected toLanguageUri(language: Language): URI;
}
//# sourceMappingURL=editor-language-quick-pick-service.d.ts.map