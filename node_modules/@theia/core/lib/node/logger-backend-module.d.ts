import { ContainerModule, interfaces } from 'inversify';
import { ILoggerServer } from '../common/logger-protocol';
export declare function bindLogger(bind: interfaces.Bind, props?: {
    onLoggerServerActivation?: (context: interfaces.Context, server: ILoggerServer) => void;
}): void;
/**
 * IMPORTANT: don't use in tests, since it overrides console
 */
export declare const loggerBackendModule: ContainerModule;
//# sourceMappingURL=logger-backend-module.d.ts.map