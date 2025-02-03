import { OVSXRouterFilter } from '../ovsx-router-client';
import { ExtensionLike } from '../ovsx-types';
import { AbstractRegExpFilter } from './abstract-reg-exp-filter';
export declare const ExtensionIdMatchesFilterFactory: import("../ovsx-router-client").OVSXRouterFilterFactory;
export declare class ExtensionIdMatchesFilter extends AbstractRegExpFilter implements OVSXRouterFilter {
    filterExtension(extension: ExtensionLike): boolean;
}
//# sourceMappingURL=extension-id-matches-filter.d.ts.map