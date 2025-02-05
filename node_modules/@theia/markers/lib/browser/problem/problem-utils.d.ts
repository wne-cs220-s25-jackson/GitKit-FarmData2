import { Marker } from '../../common/marker';
import { Diagnostic, DiagnosticSeverity } from '@theia/core/shared/vscode-languageserver-protocol';
export declare namespace ProblemUtils {
    /**
     * Comparator for severity.
     * - The highest severity (`error`) come first followed by others.
     * - `undefined` severities are treated as the last ones.
     * @param a the first marker for comparison.
     * @param b the second marker for comparison.
     */
    const severityCompareMarker: (a: Marker<Diagnostic>, b: Marker<Diagnostic>) => number;
    /**
     * Comparator for severity.
     * - The highest severity (`error`) come first followed by others.
     * - `undefined` severities are treated as the last ones.
     * @param a the first severity for comparison.
     * @param b the second severity for comparison.
     */
    const severityCompare: (a: DiagnosticSeverity | undefined, b: DiagnosticSeverity | undefined) => number;
    /**
     * Comparator for line numbers.
     * - The lowest line number comes first.
     * @param a the first marker for comparison.
     * @param b the second marker for comparison.
     */
    const lineNumberCompare: (a: Marker<Diagnostic>, b: Marker<Diagnostic>) => number;
    /**
     * Comparator for column numbers.
     * - The lowest column number comes first.
     * @param a the first marker for comparison.
     * @param b the second marker for comparison.
     */
    const columnNumberCompare: (a: Marker<Diagnostic>, b: Marker<Diagnostic>) => number;
    /**
     * Comparator for marker owner (source).
     * - The order is alphabetical.
     * @param a the first marker for comparison.
     * @param b the second marker for comparison.
     */
    const ownerCompare: (a: Marker<Diagnostic>, b: Marker<Diagnostic>) => number;
    function getPriority(marker: Marker<Diagnostic>): number;
    function getColor(marker: Marker<Diagnostic>): string;
    function filterMarker(marker: Marker<Diagnostic>): boolean;
}
//# sourceMappingURL=problem-utils.d.ts.map