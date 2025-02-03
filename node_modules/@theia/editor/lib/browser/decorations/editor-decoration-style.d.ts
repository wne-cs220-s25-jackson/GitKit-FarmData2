import { Disposable } from '@theia/core';
export declare class EditorDecorationStyle implements Disposable {
    readonly selector: string;
    protected decorationsStyleSheet: CSSStyleSheet;
    constructor(selector: string, styleProvider: (style: CSSStyleDeclaration) => void, decorationsStyleSheet: CSSStyleSheet);
    get className(): string;
    dispose(): void;
}
//# sourceMappingURL=editor-decoration-style.d.ts.map