import { CancellationToken, Disposable, Event } from '../common';
import URI from '../common/uri';
export interface DecorationsProvider {
    readonly onDidChange: Event<URI[]>;
    provideDecorations(uri: URI, token: CancellationToken): Decoration | Promise<Decoration | undefined> | undefined;
}
export interface Decoration {
    readonly weight?: number;
    readonly colorId?: string;
    readonly letter?: string;
    readonly tooltip?: string;
    readonly bubble?: boolean;
}
export interface ResourceDecorationChangeEvent {
    affectsResource(uri: URI): boolean;
}
export declare const DecorationsService: unique symbol;
export interface DecorationsService {
    readonly onDidChangeDecorations: Event<Map<string, Decoration>>;
    registerDecorationsProvider(provider: DecorationsProvider): Disposable;
    getDecoration(uri: URI, includeChildren: boolean): Decoration[];
}
export declare class DecorationsServiceImpl implements DecorationsService {
    private readonly data;
    private readonly onDidChangeDecorationsEmitter;
    readonly onDidChangeDecorations: Event<Map<string, Decoration>>;
    dispose(): void;
    registerDecorationsProvider(provider: DecorationsProvider): Disposable;
    getDecoration(uri: URI, includeChildren: boolean): Decoration[];
}
//# sourceMappingURL=decorations-service.d.ts.map