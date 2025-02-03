/**
 * Handles the global registration of custom MsgPackR extensions
 * required for the default RPC communication. MsgPackR extensions
 * are installed globally on both ends of the communication channel.
 * (frontend-backend, pluginExt-pluginMain).
 * Is implemented as singleton as it is also used in plugin child processes which have no access to inversify.
 */
export declare class MsgPackExtensionManager {
    private static readonly INSTANCE;
    static getInstance(): MsgPackExtensionManager;
    private extensions;
    private constructor();
    registerExtensions(...extensions: MsgPackExtension[]): void;
    getExtension(tag: number): MsgPackExtension | undefined;
}
export interface MsgPackExtension {
    class: Function;
    tag: number;
    serialize(instance: unknown): unknown;
    deserialize(serialized: any): unknown;
}
export type Constructor<T> = new (...params: unknown[]) => T;
//# sourceMappingURL=msg-pack-extension-manager.d.ts.map