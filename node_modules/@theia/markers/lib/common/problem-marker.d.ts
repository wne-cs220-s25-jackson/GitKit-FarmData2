import { Marker } from './marker';
import { Diagnostic } from '@theia/core/shared/vscode-languageserver-protocol';
export declare const PROBLEM_KIND = "problem";
export interface ProblemMarker extends Marker<Diagnostic> {
    kind: 'problem';
}
export declare namespace ProblemMarker {
    function is(node: unknown): node is ProblemMarker;
}
//# sourceMappingURL=problem-marker.d.ts.map