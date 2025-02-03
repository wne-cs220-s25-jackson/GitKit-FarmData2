import { NavigationLocation, Position, Range } from './navigation-location';
/**
 * A navigation location updater that is responsible for adapting editor navigation locations.
 *
 * 1. Inserting or deleting text before the position shifts the position accordingly.
 * 2. Inserting text at the position offset shifts the position accordingly.
 * 3. Inserting or deleting text strictly contained by the position shrinks or stretches the position.
 * 4. Inserting or deleting text after a position does not affect the position.
 * 5. Deleting text which strictly contains the position deletes the position.
 * Note that the position is not deleted if its only shrunken to length zero. To delete a position, the modification must delete from
 * strictly before to strictly after the position.
 * 6. Replacing text contained by the position shrinks or expands the position (but does not shift it), such that the final position
 * contains the original position and the replacing text.
 * 7. Replacing text overlapping the position in other ways is considered as a sequence of first deleting the replaced text and
 * afterwards inserting the new text. Thus, a position is shrunken and can then be shifted (if the replaced text overlaps the offset of the position).
 */
export declare class NavigationLocationUpdater {
    /**
     * Checks whether `candidateLocation` has to be updated when applying `other`.
     *  - `false` if the `other` does not affect the `candidateLocation`.
     *  - A `NavigationLocation` object if the `candidateLocation` has to be replaced with the return value.
     *  - `undefined` if the candidate has to be deleted.
     *
     * If the `otherLocation` is not a `ContentChangeLocation` or it does not contain any actual content changes, this method returns with `false`
     */
    affects(candidateLocation: NavigationLocation, otherLocation: NavigationLocation): false | NavigationLocation | undefined;
    protected handleInside(candidate: NavigationLocation, endLine: number, endCharacter: number): NavigationLocation.Context;
    protected handleBefore(candidate: NavigationLocation, modification: Range, lineDiff: number, startCharacter: number, endCharacter: number): NavigationLocation.Context;
    protected shiftLine(position: Position, diff: number): Position;
    protected shiftLine(range: Range, diff: number): Range;
    /**
     * `true` if `subRange` is strictly contained in the `range`. Otherwise, `false`.
     */
    protected contained(subRange: Range, range: Range): boolean;
}
//# sourceMappingURL=navigation-location-updater.d.ts.map