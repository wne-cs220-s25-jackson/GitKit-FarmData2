import URI from '@theia/core/lib/common/uri';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { MonacoThemeRegistry } from './textmate/monaco-theme-registry';
import { MonacoThemeState, ThemeServiceWithDB } from './monaco-indexed-db';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import * as monaco from '@theia/monaco-editor-core';
export interface MonacoTheme {
    id?: string;
    label?: string;
    uiTheme?: monaco.editor.BuiltinTheme;
    description?: string;
    uri: string;
}
export interface MonacoThemeJson {
    /**
     * theme id (optional), label is used if not provided
     */
    id?: string;
    label: string;
    /**
     * theme type, `vs-dark` if not provided
     */
    uiTheme?: monaco.editor.BuiltinTheme;
    description?: string;
    /**
     * Follow https://code.visualstudio.com/api/extension-guides/color-theme#create-a-new-color-theme to create a custom theme.
     */
    json: any;
    /**
     * Themes can include each other. It specifies how inclusions should be resolved.
     */
    includes?: {
        [includePath: string]: any;
    };
}
export declare class MonacoThemingService {
    protected readonly fileService: FileService;
    protected readonly monacoThemeRegistry: MonacoThemeRegistry;
    protected readonly themeService: ThemeServiceWithDB;
    /** Register themes whose configuration needs to be loaded */
    register(theme: MonacoTheme, pending?: {
        [uri: string]: Promise<any>;
    }): Disposable;
    protected doRegister(theme: MonacoTheme, pending: {
        [uri: string]: Promise<any>;
    }, toDispose: DisposableCollection): Promise<void>;
    protected loadTheme(uri: string, includes: {
        [include: string]: any;
    }, pending: {
        [uri: string]: Promise<any>;
    }, toDispose: DisposableCollection): Promise<any>;
    protected doLoadTheme(themeUri: URI, referencedPath: string, includes: {
        [include: string]: any;
    }, pending: {
        [uri: string]: Promise<any>;
    }, toDispose: DisposableCollection): Promise<any>;
    initialize(): void;
    /** register a theme whose configuration has already been loaded */
    registerParsedTheme(theme: MonacoThemeJson): Disposable;
    protected toUpdateUiTheme: DisposableCollection;
    protected updateBodyUiTheme(): void;
    protected doRegisterParsedTheme(state: MonacoThemeState): Disposable;
    protected restore(): Promise<void>;
    protected static toCssSelector(str: string): string;
    /** removes all invalid theming values */
    private clean;
}
//# sourceMappingURL=monaco-theming-service.d.ts.map