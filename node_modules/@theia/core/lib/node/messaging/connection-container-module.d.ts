import { interfaces, ContainerModule } from 'inversify';
import { RpcProxy } from '../../common';
export type BindFrontendService = <T extends object>(path: string, serviceIdentifier: interfaces.ServiceIdentifier<T>) => interfaces.BindingWhenOnSyntax<T>;
export type BindBackendService = <T extends object, C extends object = object>(path: string, serviceIdentifier: interfaces.ServiceIdentifier<T>, onActivation?: (service: T, proxy: RpcProxy<C>) => T) => void;
export type ConnectionContainerModuleCallBack = (registry: {
    bind: interfaces.Bind;
    unbind: interfaces.Unbind;
    isBound: interfaces.IsBound;
    rebind: interfaces.Rebind;
    bindFrontendService: BindFrontendService;
    bindBackendService: BindBackendService;
}) => void;
/**
 * ### Connection Container Module
 *
 * It provides bindings which are scoped per a connection, e.g.
 * in order to allow backend services to access frontend service within the same connection.
 *
 * #### Binding a frontend service
 * ```ts
 * const myConnectionModule = ConnectionContainerModule.create(({ bindFrontendService }) => {
 *   bindFrontendService(myFrontendServicePath, MyFrontendService);
 * });
 *
 * export const myBackendApplicationModule = new ContainerModule(bind => {
 *   bind(ConnectionContainerModule).toConstantValue(myConnectionModule);
 * }
 * ```
 *
 * #### Exposing a backend service
 * ```ts
 * const myConnectionModule2 = ConnectionContainerModule.create(({ bind, bindBackendService }) => {
 *   bind(MyBackendService).toSelf().inSingletonScope();
 *   bindBackendService(myBackendServicePath, MyBackendService);
 * });
 *
 * export const myBackendApplicationModule2 = new ContainerModule(bind => {
 *   bind(ConnectionContainerModule).toConstantValue(myConnectionModule2);
 * }
 * ```
 *
 * #### Injecting a frontend service
 * ```ts
 * @injectable()
 * export class MyBackendService {
 *     @inject(MyFrontendService)
 *     protected readonly myFrontendService: MyFrontendService;
 * }
 * ```
 */
export declare const ConnectionContainerModule: symbol & {
    create(callback: ConnectionContainerModuleCallBack): ContainerModule;
};
//# sourceMappingURL=connection-container-module.d.ts.map