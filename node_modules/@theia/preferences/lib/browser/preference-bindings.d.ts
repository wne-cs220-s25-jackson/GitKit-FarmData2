import { interfaces } from '@theia/core/shared/inversify';
export declare function bindWorkspaceFilePreferenceProvider(bind: interfaces.Bind): void;
export declare function bindFactory<F, C>(bind: interfaces.Bind, factoryId: interfaces.ServiceIdentifier<F>, constructor: interfaces.Newable<C>, ...parameterBindings: interfaces.ServiceIdentifier<any>[]): void;
export declare function bindPreferenceProviders(bind: interfaces.Bind, unbind: interfaces.Unbind): void;
//# sourceMappingURL=preference-bindings.d.ts.map