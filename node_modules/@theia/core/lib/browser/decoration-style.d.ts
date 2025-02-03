export declare namespace DecorationStyle {
    function createStyleElement(styleId: string, container?: HTMLElement): HTMLStyleElement;
    function createStyleSheet(styleId: string, container?: HTMLElement): CSSStyleSheet;
    function getOrCreateStyleRule(selector: string, styleSheet: CSSStyleSheet): CSSStyleRule;
    function deleteStyleRule(selector: string, styleSheet: CSSStyleSheet): void;
}
//# sourceMappingURL=decoration-style.d.ts.map