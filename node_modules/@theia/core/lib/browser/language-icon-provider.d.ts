import { Emitter, Event } from '../common';
import { IconThemeService } from './icon-theme-service';
import { DidChangeLabelEvent, LabelProviderContribution } from './label-provider';
import { LanguageService } from './language-service';
export declare class LanguageIconLabelProvider implements LabelProviderContribution {
    protected readonly iconThemeService: IconThemeService;
    protected readonly languageService: LanguageService;
    protected readonly onDidChangeEmitter: Emitter<DidChangeLabelEvent>;
    protected init(): void;
    canHandle(element: object): number;
    getIcon(element: object): string | undefined;
    get onDidChange(): Event<DidChangeLabelEvent>;
    protected fireDidChange(): void;
}
//# sourceMappingURL=language-icon-provider.d.ts.map