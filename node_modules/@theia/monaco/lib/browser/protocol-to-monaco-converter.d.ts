import { Position, Range, Location, TextEdit, Diagnostic, DiagnosticRelatedInformation } from '@theia/core/shared/vscode-languageserver-protocol';
import { RecursivePartial } from '@theia/core/lib/common/types';
import * as monaco from '@theia/monaco-editor-core';
export declare class ProtocolToMonacoConverter {
    asRange(range: undefined): undefined;
    asRange(range: Range): monaco.Range;
    asRange(range: Range | undefined): monaco.Range | undefined;
    asRange(range: RecursivePartial<Range>): Partial<monaco.IRange>;
    asRange(range: RecursivePartial<Range> | undefined): monaco.Range | Partial<monaco.IRange> | undefined;
    asPosition(position: undefined): undefined;
    asPosition(position: Position): monaco.Position;
    asPosition(position: Position | undefined): monaco.Position | undefined;
    asPosition(position: Partial<Position>): Partial<monaco.IPosition>;
    asPosition(position: Partial<Position> | undefined): monaco.Position | Partial<monaco.IPosition> | undefined;
    asLocation(item: Location): monaco.languages.Location;
    asLocation(item: undefined): undefined;
    asLocation(item: Location | undefined): monaco.languages.Location | undefined;
    asTextEdit(edit: TextEdit): monaco.languages.TextEdit;
    asTextEdit(edit: undefined): undefined;
    asTextEdit(edit: TextEdit | undefined): undefined;
    asTextEdits(items: TextEdit[]): monaco.languages.TextEdit[];
    asTextEdits(items: undefined): undefined;
    asTextEdits(items: TextEdit[] | undefined): monaco.languages.TextEdit[] | undefined;
    asSeverity(severity?: number): monaco.MarkerSeverity;
    asDiagnostics(diagnostics: undefined): undefined;
    asDiagnostics(diagnostics: Diagnostic[]): monaco.editor.IMarkerData[];
    asDiagnostics(diagnostics: Diagnostic[] | undefined): monaco.editor.IMarkerData[] | undefined;
    asDiagnostic(diagnostic: Diagnostic): monaco.editor.IMarkerData;
    asRelatedInformations(relatedInformation?: DiagnosticRelatedInformation[]): monaco.editor.IRelatedInformation[] | undefined;
    asRelatedInformation(relatedInformation: DiagnosticRelatedInformation): monaco.editor.IRelatedInformation;
}
//# sourceMappingURL=protocol-to-monaco-converter.d.ts.map