import { ContributionFilterRegistry, ContributionType, FilterContribution } from './contribution-filter';
import { Filter } from './filter';
/**
 * Registry of contribution filters.
 *
 * Implement/bind to the `FilterContribution` interface/symbol to register your contribution filters.
 */
export declare class ContributionFilterRegistryImpl implements ContributionFilterRegistry {
    protected initialized: boolean;
    protected genericFilters: Filter<Object>[];
    protected typeToFilters: Map<ContributionType, Filter<Object>[]>;
    constructor(contributions?: FilterContribution[]);
    addFilters(types: '*' | ContributionType[], filters: Filter<Object>[]): void;
    applyFilters<T extends Object>(toFilter: T[], type: ContributionType): T[];
    protected getOrCreate(type: ContributionType): Filter<Object>[];
    protected getFilters(type: ContributionType): Filter<Object>[];
}
//# sourceMappingURL=contribution-filter-registry.d.ts.map