import { MarkerManager } from '../marker-manager';
import { Diagnostic } from '@theia/core/shared/vscode-languageserver-protocol';
export interface ProblemStat {
    errors: number;
    warnings: number;
    infos: number;
}
export declare class ProblemManager extends MarkerManager<Diagnostic> {
    getKind(): string;
    getProblemStat(): ProblemStat;
}
//# sourceMappingURL=problem-manager.d.ts.map