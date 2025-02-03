import { Location, Range, Position } from '@theia/core/shared/vscode-languageserver-protocol';
/**
 * Test if `otherRange` is in `range`. If the ranges are equal, will return true.
 */
export declare function containsRange(range: Range, otherRange: Range): boolean;
export declare function containsPosition(range: Range, position: Position): boolean;
export declare function filterSame(locations: Location[], definition: Location): Location[];
export declare function comparePosition(left: Position, right: Position): number;
export declare function filterUnique(locations: Location[] | null): Location[];
export declare function startsAfter(a: Range, b: Range): boolean;
export declare function isSame(a: Location, b: Location): boolean;
//# sourceMappingURL=utils.d.ts.map