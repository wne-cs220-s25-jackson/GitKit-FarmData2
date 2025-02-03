import { Registry } from 'vscode-textmate';
import { ILogger, ContributionProvider, DisposableCollection, Disposable } from '@theia/core';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { ThemeService } from '@theia/core/lib/browser/theming';
import { LanguageGrammarDefinitionContribution } from './textmate-contribution';
import { TokenizerOption } from './textmate-tokenizer';
import { TextmateRegistry } from './textmate-registry';
import { MonacoThemeRegistry } from './monaco-theme-registry';
import { EditorPreferences } from '@theia/editor/lib/browser/editor-preferences';
import { OnigasmProvider, TextmateRegistryFactory } from './monaco-theme-types';
export declare class MonacoTextmateService implements FrontendApplicationContribution {
    protected readonly tokenizerOption: TokenizerOption;
    protected readonly _activatedLanguages: Set<string>;
    protected grammarRegistry: Registry;
    protected readonly grammarProviders: ContributionProvider<LanguageGrammarDefinitionContribution>;
    protected readonly textmateRegistry: TextmateRegistry;
    protected readonly logger: ILogger;
    protected readonly onigasmProvider: OnigasmProvider;
    protected readonly themeService: ThemeService;
    protected readonly monacoThemeRegistry: MonacoThemeRegistry;
    protected readonly preferences: EditorPreferences;
    protected readonly registryFactory: TextmateRegistryFactory;
    initialize(): void;
    protected readonly toDisposeOnUpdateTheme: DisposableCollection;
    protected updateTheme(): void;
    protected get currentEditorTheme(): string;
    activateLanguage(language: string): Disposable;
    protected doActivateLanguage(languageId: string, toDispose: DisposableCollection): Promise<void>;
    protected waitForLanguage(language: string, cb: () => {}): Disposable;
}
//# sourceMappingURL=monaco-textmate-service.d.ts.map