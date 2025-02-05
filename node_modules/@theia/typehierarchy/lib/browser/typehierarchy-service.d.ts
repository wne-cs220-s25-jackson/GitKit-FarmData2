import { CancellationToken } from '@theia/core';
import { ContributionProvider, Disposable, Emitter, Event } from '@theia/core/lib/common';
import URI from '@theia/core/lib/common/uri';
import { DocumentUri, Position } from '@theia/core/shared/vscode-languageserver-protocol';
import { LanguageSelector } from '@theia/editor/lib/common/language-selector';
import { TypeHierarchyItem } from './typehierarchy';
export declare const TypeHierarchyService: unique symbol;
export interface TypeHierarchySession {
    items: TypeHierarchyItem[];
    dispose(): void;
}
export interface TypeHierarchyService {
    readonly selector: LanguageSelector;
    prepareSession(uri: DocumentUri, position: Position, cancellationToken: CancellationToken): Promise<TypeHierarchySession | undefined>;
    provideSuperTypes(sessionId: string, itemId: string, cancellationToken: CancellationToken): Promise<TypeHierarchyItem[] | undefined>;
    provideSubTypes(sessionId: string, itemId: string, cancellationToken: CancellationToken): Promise<TypeHierarchyItem[] | undefined>;
}
export declare class TypeHierarchyServiceProvider {
    protected readonly contributions: ContributionProvider<TypeHierarchyService>;
    protected readonly onDidChangeEmitter: Emitter<void>;
    get onDidChange(): Event<void>;
    private services;
    init(): void;
    get(languageId: string, uri: URI): TypeHierarchyService | undefined;
    protected score(service: TypeHierarchyService, languageId: string, uri: URI): number;
    add(service: TypeHierarchyService): Disposable;
    private remove;
}
//# sourceMappingURL=typehierarchy-service.d.ts.map