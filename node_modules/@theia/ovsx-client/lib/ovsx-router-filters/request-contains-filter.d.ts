import { OVSXRouterFilter } from '../ovsx-router-client';
import { VSXQueryOptions, VSXSearchOptions } from '../ovsx-types';
import { AbstractRegExpFilter } from './abstract-reg-exp-filter';
export declare const RequestContainsFilterFactory: import("../ovsx-router-client").OVSXRouterFilterFactory;
export declare class RequestContainsFilter extends AbstractRegExpFilter implements OVSXRouterFilter {
    filterSearchOptions(searchOptions?: VSXSearchOptions): boolean;
    filterQueryOptions(queryOptions?: VSXQueryOptions): boolean;
}
//# sourceMappingURL=request-contains-filter.d.ts.map