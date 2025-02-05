import { QuickAccessContribution } from '@theia/core/lib/browser/quick-input';
import { ICodeEditor } from '@theia/monaco-editor-core/esm/vs/editor/browser/editorBrowser';
import { ICodeEditorService } from '@theia/monaco-editor-core/esm/vs/editor/browser/services/codeEditorService';
import { ILanguageFeaturesService } from '@theia/monaco-editor-core/esm/vs/editor/common/services/languageFeatures';
import { IOutlineModelService } from '@theia/monaco-editor-core/esm/vs/editor/contrib/documentSymbols/browser/outlineModel';
import { StandaloneGotoSymbolQuickAccessProvider } from '@theia/monaco-editor-core/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoSymbolQuickAccess';
export declare class GotoSymbolQuickAccess extends StandaloneGotoSymbolQuickAccessProvider {
    protected readonly codeEditorService: ICodeEditorService;
    protected readonly languageFeatures: ILanguageFeaturesService;
    protected readonly outlineService: IOutlineModelService;
    constructor(...services: any[]);
    get activeTextEditorControl(): ICodeEditor | undefined;
}
export declare class GotoSymbolQuickAccessContribution implements QuickAccessContribution {
    registerQuickAccessProvider(): void;
}
//# sourceMappingURL=monaco-gotosymbol-quick-access.d.ts.map