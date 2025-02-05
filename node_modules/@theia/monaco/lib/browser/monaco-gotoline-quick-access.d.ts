import { QuickAccessContribution } from '@theia/core/lib/browser/quick-input';
import { ICodeEditor } from '@theia/monaco-editor-core/esm/vs/editor/browser/editorBrowser';
import { StandaloneGotoLineQuickAccessProvider } from '@theia/monaco-editor-core/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoLineQuickAccess';
export declare class GotoLineQuickAccess extends StandaloneGotoLineQuickAccessProvider {
    private readonly service;
    constructor(...services: any[]);
    get activeTextEditorControl(): ICodeEditor | undefined;
}
export declare class GotoLineQuickAccessContribution implements QuickAccessContribution {
    registerQuickAccessProvider(): void;
}
//# sourceMappingURL=monaco-gotoline-quick-access.d.ts.map