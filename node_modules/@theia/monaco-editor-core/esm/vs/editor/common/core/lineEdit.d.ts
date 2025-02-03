import { LineRange } from './lineRange.js';
import { OffsetEdit, SingleOffsetEdit } from './offsetEdit.js';
import { AbstractText, SingleTextEdit, TextEdit } from './textEdit.js';
export declare class LineEdit {
    /**
     * Have to be sorted by start line number and non-intersecting.
    */
    readonly edits: readonly SingleLineEdit[];
    static readonly empty: LineEdit;
    static deserialize(data: SerializedLineEdit): LineEdit;
    static fromEdit(edit: OffsetEdit, initialValue: AbstractText): LineEdit;
    static fromTextEdit(edit: TextEdit, initialValue: AbstractText): LineEdit;
    static createFromUnsorted(edits: readonly SingleLineEdit[]): LineEdit;
    constructor(
    /**
     * Have to be sorted by start line number and non-intersecting.
    */
    edits: readonly SingleLineEdit[]);
    toEdit(initialValue: AbstractText): OffsetEdit;
    toString(): string;
    serialize(): SerializedLineEdit;
    getNewLineRanges(): LineRange[];
    mapLineNumber(lineNumber: number): number;
    mapLineRange(lineRange: LineRange): LineRange;
    rebase(base: LineEdit): LineEdit;
    humanReadablePatch(originalLines: string[]): string;
    apply(lines: string[]): string[];
    toSingleEdit(): void;
}
export declare class SingleLineEdit {
    readonly lineRange: LineRange;
    readonly newLines: readonly string[];
    static deserialize(e: SerializedSingleLineEdit): SingleLineEdit;
    static fromSingleTextEdit(edit: SingleTextEdit, initialValue: AbstractText): SingleLineEdit;
    constructor(lineRange: LineRange, newLines: readonly string[]);
    toSingleTextEdit(initialValue: AbstractText): SingleTextEdit;
    toSingleEdit(initialValue: AbstractText): SingleOffsetEdit;
    toString(): string;
    serialize(): SerializedSingleLineEdit;
    removeCommonSuffixPrefixLines(initialValue: AbstractText): SingleLineEdit;
    toLineEdit(): LineEdit;
}
export type SerializedLineEdit = SerializedSingleLineEdit[];
export type SerializedSingleLineEdit = [startLineNumber: number, endLineNumber: number, newLines: readonly string[]];
