import { ContainerModule, interfaces } from '@theia/core/shared/inversify';
import { IBaseTerminalServer } from '../common/base-terminal-protocol';
export declare function bindTerminalServer(bind: interfaces.Bind, { path, identifier, constructor }: {
    path: string;
    identifier: interfaces.ServiceIdentifier<IBaseTerminalServer>;
    constructor: {
        new (...args: any[]): IBaseTerminalServer;
    };
}): void;
declare const _default: ContainerModule;
export default _default;
//# sourceMappingURL=terminal-backend-module.d.ts.map