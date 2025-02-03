import { Position, DocumentUri } from '@theia/core/shared/vscode-languageserver-protocol';
import { CancellationToken } from '@theia/core';
import URI from '@theia/core/lib/common/uri';
import { ContributionProvider, Disposable, Emitter, Event } from '@theia/core/lib/common';
import { CallHierarchyItem, CallHierarchyIncomingCall, CallHierarchyOutgoingCall } from './callhierarchy';
import { LanguageSelector } from '@theia/editor/lib/common/language-selector';
export declare const CallHierarchyService: unique symbol;
export interface CallHierarchySession {
    items: CallHierarchyItem[];
    dispose(): void;
}
export interface CallHierarchyService {
    readonly selector: LanguageSelector;
    getRootDefinition(uri: DocumentUri, position: Position, cancellationToken: CancellationToken): Promise<CallHierarchySession | undefined>;
    getCallers(definition: CallHierarchyItem, cancellationToken: CancellationToken): Promise<CallHierarchyIncomingCall[] | undefined>;
    getCallees?(definition: CallHierarchyItem, cancellationToken: CancellationToken): Promise<CallHierarchyOutgoingCall[] | undefined>;
}
export declare class CallHierarchyServiceProvider {
    protected readonly contributions: ContributionProvider<CallHierarchyService>;
    protected readonly onDidChangeEmitter: Emitter<void>;
    get onDidChange(): Event<void>;
    private services;
    init(): void;
    get(languageId: string, uri: URI): CallHierarchyService | undefined;
    protected score(service: CallHierarchyService, languageId: string, uri: URI): number;
    add(service: CallHierarchyService): Disposable;
    private remove;
}
//# sourceMappingURL=callhierarchy-service.d.ts.map