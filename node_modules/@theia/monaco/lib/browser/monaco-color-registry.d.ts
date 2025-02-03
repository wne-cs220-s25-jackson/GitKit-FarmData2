import { ColorRegistry } from '@theia/core/lib/browser/color-registry';
import { Color, ColorDefinition } from '@theia/core/lib/common/color';
import { Disposable } from '@theia/core/lib/common/disposable';
import { ColorValue } from '@theia/monaco-editor-core/esm/vs/platform/theme/common/colorRegistry';
import { IStandaloneThemeService } from '@theia/monaco-editor-core/esm/vs/editor/standalone/common/standaloneTheme';
import { Color as MonacoColor } from '@theia/monaco-editor-core/esm/vs/base/common/color';
import * as Colors from '@theia/monaco-editor-core/esm/vs/platform/theme/common/colorRegistry';
export declare class MonacoColorRegistry extends ColorRegistry {
    protected readonly monacoThemeService: IStandaloneThemeService;
    protected readonly monacoColorRegistry: Colors.IColorRegistry;
    getColors(): IterableIterator<string>;
    getCurrentColor(id: string): string | undefined;
    getColor(id: string): MonacoColor | undefined;
    protected doRegister(definition: ColorDefinition): Disposable;
    protected toColor(value: Color | undefined): ColorValue | null;
}
//# sourceMappingURL=monaco-color-registry.d.ts.map