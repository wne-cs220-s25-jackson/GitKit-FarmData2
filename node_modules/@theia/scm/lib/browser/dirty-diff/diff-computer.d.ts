import { ContentLinesArrayLike } from './content-lines';
import { Position, Range } from '@theia/core/shared/vscode-languageserver-protocol';
export declare class DiffComputer {
    computeDiff(previous: ContentLinesArrayLike, current: ContentLinesArrayLike): DiffResult[];
    computeDirtyDiff(previous: ContentLinesArrayLike, current: ContentLinesArrayLike): DirtyDiff;
}
export interface DiffResult {
    value: [number, number];
    count?: number;
    added?: boolean;
    removed?: boolean;
}
export interface DirtyDiff {
    readonly changes: readonly Change[];
}
export interface Change {
    readonly previousRange: LineRange;
    readonly currentRange: LineRange;
}
export declare namespace Change {
    function isAddition(change: Change): boolean;
    function isRemoval(change: Change): boolean;
    function isModification(change: Change): boolean;
}
export interface LineRange {
    readonly start: number;
    readonly end: number;
}
export declare namespace LineRange {
    function create(start: number, end: number): LineRange;
    function createSingleLineRange(line: number): LineRange;
    function createEmptyLineRange(line: number): LineRange;
    function isEmpty(range: LineRange): boolean;
    function getStartPosition(range: LineRange): Position;
    function getEndPosition(range: LineRange): Position;
    function toRange(range: LineRange): Range;
    function getLineCount(range: LineRange): number;
}
//# sourceMappingURL=diff-computer.d.ts.map