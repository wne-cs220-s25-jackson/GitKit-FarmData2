/**
 * Word inside a model.
 */
export interface WordAtPosition {
    /**
     * The word.
     */
    readonly word: string;
    /**
     * The column where the word starts.
     */
    readonly startColumn: number;
    /**
     * The column where the word ends.
     */
    readonly endColumn: number;
}
export declare const USUAL_WORD_SEPARATORS = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?";
export declare const DEFAULT_WORD_REGEXP: RegExp;
export declare function ensureValidWordDefinition(wordDefinition?: RegExp): RegExp;
export declare function getWordAtText(column: number, wordDefinition: RegExp, text: string, textOffset: number): WordAtPosition | undefined;
//# sourceMappingURL=word-helper.d.ts.map