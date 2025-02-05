import { JSONValue } from '@phosphor/coreutils';
import URI from '../../common/uri';
import { Disposable, DisposableCollection, Emitter, Event } from '../../common';
import { Deferred } from '../../common/promise-util';
import { PreferenceScope } from './preference-scope';
import { PreferenceLanguageOverrideService } from './preference-language-override-service';
export interface PreferenceProviderDataChange {
    /**
     * The name of the changed preference.
     */
    readonly preferenceName: string;
    /**
     * The new value of the changed preference.
     */
    readonly newValue?: any;
    /**
     * The old value of the changed preference.
     */
    readonly oldValue?: any;
    /**
     * The {@link PreferenceScope} of the changed preference.
     */
    readonly scope: PreferenceScope;
    /**
     * URIs of the scopes in which this change applies.
     */
    readonly domain?: string[];
}
export declare namespace PreferenceProviderDataChange {
    function affects(change: PreferenceProviderDataChange, resourceUri?: string): boolean;
}
export interface PreferenceProviderDataChanges {
    [preferenceName: string]: PreferenceProviderDataChange;
}
export interface PreferenceResolveResult<T> {
    configUri?: URI;
    value?: T;
}
/**
 * The {@link PreferenceProvider} is used to store and retrieve preference values. A {@link PreferenceProvider} does not operate in a global scope but is
 * configured for one or more {@link PreferenceScope}s. The (default implementation for the) {@link PreferenceService} aggregates all {@link PreferenceProvider}s and
 * serves as a common facade for manipulating preference values.
 */
export declare abstract class PreferenceProvider implements Disposable {
    protected readonly preferenceOverrideService: PreferenceLanguageOverrideService;
    protected readonly onDidPreferencesChangedEmitter: Emitter<PreferenceProviderDataChanges>;
    readonly onDidPreferencesChanged: Event<PreferenceProviderDataChanges>;
    protected readonly toDispose: DisposableCollection;
    protected readonly _ready: Deferred<void>;
    constructor();
    dispose(): void;
    protected deferredChanges: PreferenceProviderDataChanges | undefined;
    /**
     * Informs the listeners that one or more preferences of this provider are changed.
     * The listeners are able to find what was changed from the emitted event.
     */
    protected emitPreferencesChangedEvent(changes: PreferenceProviderDataChanges | PreferenceProviderDataChange[]): Promise<boolean>;
    protected mergePreferenceProviderDataChange(change: PreferenceProviderDataChange): void;
    protected fireDidPreferencesChanged: () => Promise<boolean>;
    /**
     * Retrieve the stored value for the given preference and resource URI.
     *
     * @param preferenceName the preference identifier.
     * @param resourceUri the uri of the resource for which the preference is stored. This is used to retrieve
     * a potentially different value for the same preference for different resources, for example `files.encoding`.
     *
     * @returns the value stored for the given preference and resourceUri if it exists, otherwise `undefined`.
     */
    get<T>(preferenceName: string, resourceUri?: string): T | undefined;
    /**
     * Resolve the value for the given preference and resource URI.
     *
     * @param preferenceName the preference identifier.
     * @param resourceUri the URI of the resource for which this provider should resolve the preference. This is used to retrieve
     * a potentially different value for the same preference for different resources, for example `files.encoding`.
     *
     * @returns an object containing the value stored for the given preference and resourceUri if it exists,
     * otherwise `undefined`.
     */
    resolve<T>(preferenceName: string, resourceUri?: string): PreferenceResolveResult<T>;
    abstract getPreferences(resourceUri?: string): {
        [p: string]: any;
    };
    /**
     * Stores a new value for the given preference key in the provider.
     * @param key the preference key (typically the name).
     * @param value the new preference value.
     * @param resourceUri the URI of the resource for which the preference is stored.
     *
     * @returns a promise that only resolves if all changes were delivered.
     * If changes were made then implementation must either
     * await on `this.emitPreferencesChangedEvent(...)` or
     * `this.pendingChanges` if changes are fired indirectly.
     */
    abstract setPreference(key: string, value: any, resourceUri?: string): Promise<boolean>;
    /**
     * Resolved when the preference provider is ready to provide preferences
     * It should be resolved by subclasses.
     */
    get ready(): Promise<void>;
    /**
     * Retrieve the domain for this provider.
     *
     * @returns the domain or `undefined` if this provider is suitable for all domains.
     */
    getDomain(): string[] | undefined;
    /**
     * Retrieve the configuration URI for the given resource URI.
     * @param resourceUri the uri of the resource or `undefined`.
     * @param sectionName the section to return the URI for, e.g. `tasks` or `launch`. Defaults to settings.
     *
     * @returns the corresponding resource URI or `undefined` if there is no valid URI.
     */
    getConfigUri(resourceUri?: string, sectionName?: string): URI | undefined;
    /**
     * Retrieves the first valid configuration URI contained by the given resource.
     * @param resourceUri the uri of the container resource or `undefined`.
     *
     * @returns the first valid configuration URI contained by the given resource `undefined`
     * if there is no valid configuration URI at all.
     */
    getContainingConfigUri?(resourceUri?: string, sectionName?: string): URI | undefined;
    static merge(source: JSONValue | undefined, target: JSONValue): JSONValue;
    /**
     * Handles deep equality with the possibility of `undefined`
     */
    static deepEqual(a: JSONValue | undefined, b: JSONValue | undefined): boolean;
    protected getParsedContent(jsonData: any): {
        [key: string]: any;
    };
    canHandleScope(scope: PreferenceScope): boolean;
}
//# sourceMappingURL=preference-provider.d.ts.map