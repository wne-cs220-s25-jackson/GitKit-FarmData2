import { SymbolInformation, WorkspaceSymbolParams } from '@theia/core/shared/vscode-languageserver-protocol';
import { ProblemManager } from '@theia/markers/lib/browser/problem/problem-manager';
import URI from '@theia/core/lib/common/uri';
import { MaybePromise, Mutable } from '@theia/core/lib/common/types';
import { Disposable } from '@theia/core/lib/common/disposable';
import { CancellationToken } from '@theia/core/lib/common/cancellation';
import { Language, LanguageService } from '@theia/core/lib/browser/language-service';
import { MonacoMarkerCollection } from './monaco-marker-collection';
import { ProtocolToMonacoConverter } from './protocol-to-monaco-converter';
import * as monaco from '@theia/monaco-editor-core';
export interface WorkspaceSymbolProvider {
    provideWorkspaceSymbols(params: WorkspaceSymbolParams, token: CancellationToken): MaybePromise<SymbolInformation[] | undefined>;
    resolveWorkspaceSymbol?(symbol: SymbolInformation, token: CancellationToken): Thenable<SymbolInformation | undefined>;
}
export declare class MonacoLanguages extends LanguageService {
    readonly workspaceSymbolProviders: WorkspaceSymbolProvider[];
    protected readonly markers: Map<string, MonacoMarkerCollection>;
    protected readonly icons: Map<string, string>;
    protected readonly problemManager: ProblemManager;
    protected readonly p2m: ProtocolToMonacoConverter;
    protected init(): void;
    updateMarkers(uri: URI): void;
    updateModelMarkers(model: monaco.editor.ITextModel): void;
    registerWorkspaceSymbolProvider(provider: WorkspaceSymbolProvider): Disposable;
    get languages(): Language[];
    getLanguage(languageId: string): Language | undefined;
    detectLanguage(obj: unknown): Language | undefined;
    protected detectLanguageByIdOrName(obj: string): Language | undefined;
    protected detectLanguageByURI(uri: URI): Language | undefined;
    getExtension(languageId: string): string | undefined;
    registerIcon(languageId: string, iconClass: string): Disposable;
    getIcon(obj: unknown): string | undefined;
    getLanguageIdByLanguageName(languageName: string): string | undefined;
    protected mergeLanguages(registered: monaco.languages.ILanguageExtensionPoint[]): Map<string, Mutable<Language>>;
}
//# sourceMappingURL=monaco-languages.d.ts.map