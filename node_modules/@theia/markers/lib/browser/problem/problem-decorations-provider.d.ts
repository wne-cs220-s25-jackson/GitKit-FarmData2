/// <reference types="lodash" />
import URI from '@theia/core/lib/common/uri';
import { Decoration, DecorationsProvider, DecorationsService } from '@theia/core/lib/browser/decorations-service';
import { ProblemManager } from './problem-manager';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { CancellationToken, Emitter, Event } from '@theia/core';
export declare class ProblemDecorationsProvider implements DecorationsProvider {
    protected readonly problemManager: ProblemManager;
    protected currentUris: URI[];
    protected readonly onDidChangeEmitter: Emitter<URI[]>;
    get onDidChange(): Event<URI[]>;
    protected init(): void;
    protected fireDidDecorationsChanged: import("lodash").DebouncedFunc<() => void>;
    protected doFireDidDecorationsChanged(): void;
    provideDecorations(uri: URI, token: CancellationToken): Decoration | Promise<Decoration | undefined> | undefined;
}
export declare class ProblemDecorationContribution implements FrontendApplicationContribution {
    protected readonly decorationsService: DecorationsService;
    protected readonly problemDecorationProvider: ProblemDecorationsProvider;
    initialize(): void;
}
//# sourceMappingURL=problem-decorations-provider.d.ts.map