import { IDisposable } from '@theia/monaco-editor-core/esm/vs/base/common/lifecycle';
import { StandaloneThemeService } from '@theia/monaco-editor-core/esm/vs/editor/standalone/browser/standaloneThemeService';
export declare class MonacoStandaloneThemeService extends StandaloneThemeService {
    protected get styleElements(): HTMLStyleElement[];
    protected get allCSS(): string;
    registerEditorContainer(domNode: HTMLElement): IDisposable;
}
//# sourceMappingURL=monaco-standalone-theme-service.d.ts.map