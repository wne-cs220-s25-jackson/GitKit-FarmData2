import { DecorationsMain } from '../../../common/plugin-api-rpc';
import { interfaces } from '@theia/core/shared/inversify';
import { Disposable } from '@theia/core/lib/common/disposable';
import { RPCProtocol } from '../../../common/rpc-protocol';
import { UriComponents } from '../../../common/uri-components';
export declare class DecorationsMainImpl implements DecorationsMain, Disposable {
    private readonly proxy;
    private readonly providers;
    private readonly decorationsService;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    dispose(): void;
    $registerDecorationProvider(handle: number): Promise<void>;
    $onDidChange(handle: number, resources: UriComponents[]): void;
    $unregisterDecorationProvider(handle: number): void;
}
//# sourceMappingURL=decorations-main.d.ts.map