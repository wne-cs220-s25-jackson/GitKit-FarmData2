import { interfaces } from 'inversify';
export declare const ContributionProvider: unique symbol;
export interface ContributionProvider<T extends object> {
    /**
     * @param recursive `true` if the contributions should be collected from the parent containers as well. Otherwise, `false`. It is `false` by default.
     */
    getContributions(recursive?: boolean): T[];
}
export type Bindable = interfaces.Bind | interfaces.Container;
export declare namespace Bindable {
    function isContainer(arg: Bindable): arg is interfaces.Container;
}
export declare function bindContributionProvider(bindable: Bindable, id: symbol): void;
/**
 * Helper function to bind a service to a list of contributions easily.
 * @param bindable a Container or the bind function directly.
 * @param service an already bound service to refer the contributions to.
 * @param contributions array of contribution identifiers to bind the service to.
 */
export declare function bindContribution(bindable: Bindable, service: interfaces.ServiceIdentifier<any>, contributions: interfaces.ServiceIdentifier<any>[]): void;
//# sourceMappingURL=contribution-provider.d.ts.map