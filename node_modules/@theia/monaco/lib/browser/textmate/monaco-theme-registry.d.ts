import * as monaco from '@theia/monaco-editor-core';
import { Color } from '@theia/monaco-editor-core/esm/vs/base/common/color';
import { MixStandaloneTheme, TextmateRegistryFactory, ThemeMix } from './monaco-theme-types';
export declare class MonacoThemeRegistry {
    protected readonly registryFactory: TextmateRegistryFactory;
    initializeDefaultThemes(): void;
    getThemeData(): ThemeMix;
    getThemeData(name: string): ThemeMix | undefined;
    getTheme(): MixStandaloneTheme;
    getTheme(name: string): MixStandaloneTheme | undefined;
    protected doGetTheme(name: string | undefined): MixStandaloneTheme | undefined;
    setTheme(name: string, data: ThemeMix): void;
    /**
     * Register VS Code compatible themes
     */
    register(json: any, includes?: {
        [includePath: string]: any;
    }, givenName?: string, monacoBase?: monaco.editor.BuiltinTheme): ThemeMix;
    protected transform(tokenColor: any, acceptor: (rule: monaco.editor.ITokenThemeRule) => void): void;
    protected normalizeColor(color: string | Color | undefined): string | undefined;
}
export declare namespace MonacoThemeRegistry {
    const DARK_DEFAULT_THEME = "dark-theia";
    const LIGHT_DEFAULT_THEME = "light-theia";
    const HC_DEFAULT_THEME = "hc-theia";
    const HC_LIGHT_THEME = "hc-theia-light";
}
//# sourceMappingURL=monaco-theme-registry.d.ts.map