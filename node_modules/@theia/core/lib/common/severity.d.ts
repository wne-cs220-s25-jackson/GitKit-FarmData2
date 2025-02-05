import { DiagnosticSeverity } from 'vscode-languageserver-protocol';
export declare enum Severity {
    Ignore = 0,
    Error = 1,
    Warning = 2,
    Info = 3,
    Log = 4
}
export declare namespace Severity {
    function fromValue(value: string | undefined): Severity;
    function toDiagnosticSeverity(value: Severity): DiagnosticSeverity;
    function toString(severity: Severity | undefined): string;
    function toLocaleString(severity: string | Severity): string;
    function toArray(): string[];
}
//# sourceMappingURL=severity.d.ts.map