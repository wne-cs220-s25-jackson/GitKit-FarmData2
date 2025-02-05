/**
 * Either be a reference to an existing color or a color value as a hex string, rgba, or hsla.
 */
export type Color = string | RGBA | HSLA | ColorTransformation;
export declare namespace Color {
    function rgba(r: number, g: number, b: number, a?: number): Color;
    function hsla(h: number, s: number, l: number, a?: number): Color;
    const white: Color;
    const black: Color;
    function transparent(v: string, f: number): ColorTransformation;
    function lighten(v: string, f: number): ColorTransformation;
    function darken(v: string, f: number): ColorTransformation;
}
export interface ColorTransformation {
    kind: 'transparent' | 'lighten' | 'darken';
    v: string;
    f: number;
}
export interface RGBA {
    /**
     * Red: integer in [0-255]
     */
    readonly r: number;
    /**
     * Green: integer in [0-255]
     */
    readonly g: number;
    /**
     * Blue: integer in [0-255]
     */
    readonly b: number;
    /**
     * Alpha: float in [0-1]
     */
    readonly a: number;
}
export interface HSLA {
    /**
     * Hue: integer in [0, 360]
     */
    readonly h: number;
    /**
     * Saturation: float in [0, 1]
     */
    readonly s: number;
    /**
     * Luminosity: float in [0, 1]
     */
    readonly l: number;
    /**
     * Alpha: float in [0, 1]
     */
    readonly a: number;
}
export interface ColorDefaults {
    light?: Color;
    dark?: Color;
    /** @deprecated @since 1.28.0 Please use hcDark and hcLight. This field will be ignored unless `hcDark` is absent. */
    hc?: Color;
    hcDark?: Color;
    hcLight?: Color;
}
export interface ColorDefinition {
    id: string;
    defaults?: ColorDefaults;
    description: string;
}
export interface ColorCssVariable {
    name: string;
    value: string;
}
//# sourceMappingURL=color.d.ts.map