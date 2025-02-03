import { NavigationLocation } from './navigation-location';
/**
 * Service for checking whether two navigation locations are similar or not.
 */
export declare class NavigationLocationSimilarity {
    /**
     * The number of lines to move in the editor to justify for new state.
     */
    private static EDITOR_SELECTION_THRESHOLD;
    /**
     * `true` if the `left` and `right` locations are withing +- 10 lines in the same editor. Otherwise, `false`.
     */
    similar(left: NavigationLocation | undefined, right: NavigationLocation | undefined): boolean;
    protected getThreshold(): number;
}
//# sourceMappingURL=navigation-location-similarity.d.ts.map