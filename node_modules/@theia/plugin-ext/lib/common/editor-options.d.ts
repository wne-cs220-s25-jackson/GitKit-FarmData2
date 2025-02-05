/**
 * The style in which the editor's cursor should be rendered.
 */
export declare enum TextEditorCursorStyle {
    /**
     * As a vertical line
     */
    Line = 1,
    /**
     * As a block
     */
    Block = 2,
    /**
     * As a horizontal line, under character
     */
    Underline = 3,
    /**
     * As a thin vertical line
     */
    LineThin = 4,
    /**
     * As an outlined block, on top of a character
     */
    BlockOutline = 5,
    /**
     * As a thin horizontal line, under a character
     */
    UnderlineThin = 6
}
export declare function cursorStyleToString(cursorStyle: TextEditorCursorStyle): 'line' | 'block' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin';
//# sourceMappingURL=editor-options.d.ts.map