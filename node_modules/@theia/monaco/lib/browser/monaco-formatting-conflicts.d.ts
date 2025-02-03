import { PreferenceService, FrontendApplicationContribution, PreferenceLanguageOverrideService } from '@theia/core/lib/browser';
import { EditorManager } from '@theia/editor/lib/browser';
import { MonacoQuickInputService } from './monaco-quick-input-service';
export declare class MonacoFormattingConflictsContribution implements FrontendApplicationContribution {
    protected readonly monacoQuickInputService: MonacoQuickInputService;
    protected readonly preferenceService: PreferenceService;
    protected readonly preferenceSchema: PreferenceLanguageOverrideService;
    protected readonly editorManager: EditorManager;
    initialize(): Promise<void>;
    protected setDefaultFormatter(language: string, formatter: string): Promise<void>;
    private getDefaultFormatter;
    private selectFormatter;
}
//# sourceMappingURL=monaco-formatting-conflicts.d.ts.map