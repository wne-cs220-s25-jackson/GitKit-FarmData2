import { PreferenceSchema } from '../../common/preferences/preference-schema';
import { Disposable, DisposableCollection, Emitter, Event, MaybePromise } from '../../common';
import { PreferenceChangeEvent, PreferenceEventEmitter, PreferenceProxy, PreferenceProxyOptions, PreferenceRetrieval } from './preference-proxy';
import { PreferenceChange, PreferenceChangeImpl, PreferenceChanges, PreferenceService } from './preference-service';
import { JSONValue } from '@phosphor/coreutils';
import { PreferenceProviderDataChange } from './preference-provider';
import { OverridePreferenceName } from './preference-language-override-service';
export declare const PreferenceProxySchema: unique symbol;
export interface PreferenceProxyFactory {
    <T>(schema: MaybePromise<PreferenceSchema>, options?: PreferenceProxyOptions): PreferenceProxy<T>;
}
export declare const PreferenceProxyFactory: unique symbol;
export declare class PreferenceProxyChange extends PreferenceChangeImpl {
    protected readonly overrideIdentifier?: string | undefined;
    constructor(change: PreferenceProviderDataChange, overrideIdentifier?: string | undefined);
    affects(resourceUri?: string, overrideIdentifier?: string): boolean;
}
export declare class InjectablePreferenceProxy<T extends Record<string, JSONValue>> implements ProxyHandler<T>, ProxyHandler<Disposable>, ProxyHandler<PreferenceEventEmitter<T>>, ProxyHandler<PreferenceRetrieval<T>> {
    protected readonly options: PreferenceProxyOptions;
    protected readonly preferences: PreferenceService;
    protected readonly promisedSchema: () => PreferenceSchema | Promise<PreferenceSchema>;
    protected readonly factory: PreferenceProxyFactory;
    protected toDispose: DisposableCollection;
    protected _onPreferenceChangedEmitter: Emitter<PreferenceChangeEvent<T>> | undefined;
    protected schema: PreferenceSchema | undefined;
    protected get prefix(): string;
    protected get style(): Required<PreferenceProxyOptions>['style'];
    protected get resourceUri(): PreferenceProxyOptions['resourceUri'];
    protected get overrideIdentifier(): PreferenceProxyOptions['overrideIdentifier'];
    protected get isDeep(): boolean;
    protected get isFlat(): boolean;
    protected get onPreferenceChangedEmitter(): Emitter<PreferenceChangeEvent<T>>;
    get onPreferenceChanged(): Event<PreferenceChangeEvent<T>>;
    protected init(): void;
    get(target: unknown, property: string, receiver: unknown): unknown;
    set(target: unknown, property: string, value: unknown, receiver: unknown): boolean;
    ownKeys(): string[];
    getOwnPropertyDescriptor(target: unknown, property: string): PropertyDescriptor;
    deleteProperty(): never;
    defineProperty(): never;
    toJSON(): JSONValue;
    protected subscribeToChangeEvents(): void;
    protected handlePreferenceChanges(changes: PreferenceChanges): void;
    protected isRelevantChange(change: PreferenceChange, overrideInfo?: OverridePreferenceName): boolean;
    protected fireChangeEvent(change: PreferenceChangeEvent<T>): void;
    protected buildNewChangeEvent(change: PreferenceProviderDataChange, overrideInfo?: OverridePreferenceName): PreferenceChangeEvent<T>;
    protected getValue<K extends keyof T & string>(preferenceIdentifier: K | OverridePreferenceName & {
        preferenceName: K;
    }, defaultValue: T[K], resourceUri?: string | undefined): T[K];
    dispose(): void;
}
//# sourceMappingURL=injectable-preference-proxy.d.ts.map