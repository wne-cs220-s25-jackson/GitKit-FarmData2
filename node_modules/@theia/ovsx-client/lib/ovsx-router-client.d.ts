import { ExtensionLike, OVSXClient, OVSXClientProvider, VSXQueryOptions, VSXQueryResult, VSXSearchOptions, VSXSearchResult } from './ovsx-types';
import type { MaybePromise } from './types';
export interface OVSXRouterFilter {
    filterSearchOptions?(searchOptions?: VSXSearchOptions): MaybePromise<unknown>;
    filterQueryOptions?(queryOptions?: VSXQueryOptions): MaybePromise<unknown>;
    filterExtension?(extension: ExtensionLike): MaybePromise<unknown>;
}
/**
 * @param conditions key/value mapping of condition statements that rules may process
 * @param remainingKeys keys left to be processed, remove items from it when you handled them
 */
export type OVSXRouterFilterFactory = (conditions: Readonly<Record<string, unknown>>, remainingKeys: Set<string>) => MaybePromise<OVSXRouterFilter | undefined>;
/**
 * Helper function to create factories that handle a single condition key.
 */
export declare function createFilterFactory(conditionKey: string, factory: (conditionValue: unknown) => OVSXRouterFilter | undefined): OVSXRouterFilterFactory;
export interface OVSXRouterConfig {
    /**
     * Registry aliases that will be used for routing.
     */
    registries?: {
        [alias: string]: string;
    };
    /**
     * The registry/ies to use by default.
     */
    use: string | string[];
    /**
     * Filters for the different phases of interfacing with a registry.
     */
    rules?: OVSXRouterRule[];
}
export interface OVSXRouterRule {
    [condition: string]: unknown;
    use?: string | string[] | null;
}
/**
 * @internal
 */
export interface OVSXRouterParsedRule {
    filters: OVSXRouterFilter[];
    use: string[];
}
/**
 * Route and agglomerate queries according to {@link routerConfig}.
 * {@link ruleFactories} is the actual logic used to evaluate the config.
 * Each rule implementation will be ran sequentially over each configured rule.
 */
export declare class OVSXRouterClient implements OVSXClient {
    protected readonly useDefault: string[];
    protected readonly clientProvider: OVSXClientProvider;
    protected readonly rules: OVSXRouterParsedRule[];
    static FromConfig(routerConfig: OVSXRouterConfig, clientProvider: OVSXClientProvider, filterFactories: OVSXRouterFilterFactory[]): Promise<OVSXRouterClient>;
    protected static ParseRules(rules: OVSXRouterRule[], filterFactories: OVSXRouterFilterFactory[], aliases?: Record<string, string>): Promise<OVSXRouterParsedRule[]>;
    protected static ParseUse(use: string | string[] | null | undefined, aliases?: Record<string, string>): string[];
    constructor(useDefault: string[], clientProvider: OVSXClientProvider, rules: OVSXRouterParsedRule[]);
    search(searchOptions?: VSXSearchOptions): Promise<VSXSearchResult>;
    query(queryOptions?: VSXQueryOptions): Promise<VSXQueryResult>;
    protected emptySearchResult(searchOptions?: VSXSearchOptions): VSXSearchResult;
    protected emptyQueryResult(queryOptions?: VSXQueryOptions): VSXQueryResult;
    protected mergedQuery(registries: string[], queryOptions?: VSXQueryOptions): Promise<VSXQueryResult>;
    protected mergedSearch(registries: string[], searchOptions?: VSXSearchOptions): Promise<VSXSearchResult>;
    protected mergeSearchResults(results: Map<string, VSXSearchResult>): Promise<VSXSearchResult>;
    protected mergeQueryResults(results: Map<string, VSXQueryResult>): Promise<VSXQueryResult>;
    protected filterExtension<T extends ExtensionLike>(sourceUri: string, extension: T): Promise<T | undefined>;
    protected runRules<T>(runFilter: (filter: OVSXRouterFilter) => unknown, onRuleMatched: (rule: OVSXRouterParsedRule) => T): Promise<T | undefined>;
    protected runRules<T, U>(runFilter: (filter: OVSXRouterFilter) => unknown, onRuleMatched: (rule: OVSXRouterParsedRule) => T, onNoRuleMatched: () => U): Promise<T | U>;
}
//# sourceMappingURL=ovsx-router-client.d.ts.map