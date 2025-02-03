import { interfaces } from 'inversify';
import { RpcProxy } from '../../common/messaging';
import { AbstractChannel, Channel, Emitter, Event, MaybePromise, WriteBuffer } from '../../common';
import { ConnectionSource } from '../../browser/messaging/connection-source';
import { FrontendApplicationContribution } from '../../browser';
export interface ElectronIpcOptions {
}
export declare const ElectronMainConnectionProvider: unique symbol;
/**
 * Connection provider between the Theia frontend and the electron-main process via IPC.
 */
export declare namespace ElectronIpcConnectionProvider {
    function createProxy<T extends object>(container: interfaces.Container, path: string, arg?: object): RpcProxy<T>;
}
export declare class ElectronIpcConnectionSource implements ConnectionSource, FrontendApplicationContribution {
    protected readonly onConnectionDidOpenEmitter: Emitter<Channel>;
    onConnectionDidOpen: Event<Channel>;
    onStart(): MaybePromise<void>;
}
export declare class ElectronIpcRendererChannel extends AbstractChannel {
    constructor();
    getWriteBuffer(): WriteBuffer;
}
//# sourceMappingURL=electron-ipc-connection-source.d.ts.map