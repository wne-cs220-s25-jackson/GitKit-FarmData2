import { ITheme } from 'xterm';
import { ColorRegistry } from '@theia/core/lib/browser/color-registry';
import { ColorDefaults } from '@theia/core/lib/common/color';
import { ThemeService } from '@theia/core/lib/browser/theming';
import { ThemeChangeEvent } from '@theia/core/lib/common/theme';
import { Event } from '@theia/core';
/**
 * It should be aligned with https://github.com/microsoft/vscode/blob/0dfa355b3ad185a6289ba28a99c141ab9e72d2be/src/vs/workbench/contrib/terminal/common/terminalColorRegistry.ts#L40
 */
export declare const terminalAnsiColorMap: {
    [key: string]: {
        index: number;
        defaults: ColorDefaults;
    };
};
export declare class TerminalThemeService {
    protected readonly colorRegistry: ColorRegistry;
    protected readonly themeService: ThemeService;
    get onDidChange(): Event<ThemeChangeEvent>;
    get theme(): ITheme;
}
//# sourceMappingURL=terminal-theme-service.d.ts.map