import { URI } from '@theia/core';
import { Severity } from '@theia/core/lib/common/severity';
import { Diagnostic } from '@theia/core/shared/vscode-languageserver-protocol';
export declare enum ApplyToKind {
    allDocuments = 0,
    openDocuments = 1,
    closedDocuments = 2
}
export declare namespace ApplyToKind {
    function fromString(value: string | undefined): ApplyToKind | undefined;
}
export declare enum FileLocationKind {
    Auto = 0,
    Relative = 1,
    Absolute = 2
}
export declare namespace FileLocationKind {
    function fromString(value: string): FileLocationKind | undefined;
}
export interface WatchingPattern {
    regexp: string;
    file?: number;
}
export interface WatchingMatcher {
    activeOnStart: boolean;
    beginsPattern: WatchingPattern;
    endsPattern: WatchingPattern;
}
export declare namespace WatchingMatcher {
    function fromWatchingMatcherContribution(value: WatchingMatcherContribution | undefined): WatchingMatcher | undefined;
}
export declare enum ProblemLocationKind {
    File = 0,
    Location = 1
}
export declare namespace ProblemLocationKind {
    function fromString(value: string): ProblemLocationKind | undefined;
}
export interface ProblemMatcher {
    deprecated?: boolean;
    owner: string;
    source?: string;
    applyTo: ApplyToKind;
    fileLocation: FileLocationKind;
    filePrefix?: string;
    pattern: ProblemPattern | ProblemPattern[];
    severity?: Severity;
    watching?: WatchingMatcher;
    uriProvider?: (path: string) => URI;
}
export interface NamedProblemMatcher extends ProblemMatcher {
    name: string;
    label: string;
}
export declare namespace ProblemMatcher {
    function isWatchModeWatcher(matcher: ProblemMatcher): boolean;
}
export interface ProblemPattern {
    name?: string;
    regexp: string;
    kind?: ProblemLocationKind;
    file?: number;
    message?: number;
    location?: number;
    line?: number;
    character?: number;
    endLine?: number;
    endCharacter?: number;
    code?: number;
    severity?: number;
    loop?: boolean;
}
export interface NamedProblemPattern extends ProblemPattern {
    name: string;
}
export declare namespace ProblemPattern {
    function fromProblemPatternContribution(value: ProblemPatternContribution): ProblemPattern;
}
export interface ProblemMatch {
    resource?: URI;
    description: ProblemMatcher;
}
export interface ProblemMatchData extends ProblemMatch {
    marker: Diagnostic;
}
export declare namespace ProblemMatchData {
    function is(data: ProblemMatch): data is ProblemMatchData;
}
export interface WatchingMatcherContribution {
    activeOnStart?: boolean;
    beginsPattern: string | WatchingPattern;
    endsPattern: string | WatchingPattern;
}
export interface ProblemMatcherContribution {
    base?: string;
    name?: string;
    label: string;
    deprecated?: boolean;
    owner: string;
    source?: string;
    applyTo?: string;
    fileLocation?: 'absolute' | 'relative' | string[];
    pattern: string | ProblemPatternContribution | ProblemPatternContribution[];
    severity?: string;
    watching?: WatchingMatcherContribution;
    background?: WatchingMatcherContribution;
}
export interface ProblemPatternContribution {
    name?: string;
    regexp: string;
    kind?: string;
    file?: number;
    message?: number;
    location?: number;
    line?: number;
    character?: number;
    column?: number;
    endLine?: number;
    endCharacter?: number;
    endColumn?: number;
    code?: number;
    severity?: number;
    loop?: boolean;
}
//# sourceMappingURL=problem-matcher-protocol.d.ts.map