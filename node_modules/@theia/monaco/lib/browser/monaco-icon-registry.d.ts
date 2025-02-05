import { IconRegistry } from '@theia/core/lib/browser/icon-registry';
import { IconDefinition, IconFontDefinition, ThemeIcon } from '@theia/core/lib/common/theme';
export declare class MonacoIconRegistry implements IconRegistry {
    protected readonly iconRegistry: import("@theia/monaco-editor-core/esm/vs/platform/theme/common/iconRegistry").IIconRegistry;
    registerIcon(id: string, defaults: ThemeIcon | IconDefinition, description?: string): ThemeIcon;
    deregisterIcon(id: string): void;
    registerIconFont(id: string, definition: IconFontDefinition): IconFontDefinition;
    deregisterIconFont(id: string): void;
    getIconFont(id: string): IconFontDefinition | undefined;
}
//# sourceMappingURL=monaco-icon-registry.d.ts.map