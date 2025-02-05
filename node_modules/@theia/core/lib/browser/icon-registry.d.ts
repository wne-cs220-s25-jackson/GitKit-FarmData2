import { ThemeIcon } from '../common/theme';
import { URI } from 'vscode-uri';
export interface IconDefinition {
    font?: IconFontContribution;
    fontCharacter: string;
}
export interface IconContribution {
    readonly id: string;
    description: string | undefined;
    deprecationMessage?: string;
    readonly defaults: ThemeIcon | IconDefinition;
}
export interface IconFontContribution {
    readonly id: string;
    readonly definition: IconFontDefinition;
}
export interface IconFontDefinition {
    readonly weight?: string;
    readonly style?: string;
    readonly src: IconFontSource[];
}
export interface IconFontSource {
    readonly location: URI;
    readonly format: string;
}
export declare const IconRegistry: unique symbol;
export interface IconRegistry {
    /**
     * Register a icon to the registry.
     * @param id The icon id
     * @param defaults The default values
     * @param description The description
     */
    registerIcon(id: string, defaults: ThemeIcon | IconDefinition, description?: string): ThemeIcon;
    /**
     * Deregister a icon from the registry.
     * @param id The icon id
     */
    deregisterIcon(id: string): void;
    /**
     * Register a icon font to the registry.
     * @param id The icon font id
     * @param definition The icon font definition
     */
    registerIconFont(id: string, definition: IconFontDefinition): IconFontDefinition;
    /**
     * Deregister an icon font from the registry.
     * @param id The icon font id
     */
    deregisterIconFont(id: string): void;
    /**
     * Get the icon font for the given id
     * @param id The icon font id
     */
    getIconFont(id: string): IconFontDefinition | undefined;
}
//# sourceMappingURL=icon-registry.d.ts.map