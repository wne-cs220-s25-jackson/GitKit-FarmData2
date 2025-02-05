import { interfaces } from '@theia/core/shared/inversify';
import { NotebookRenderersMain } from '../../../common';
import { RPCProtocol } from '../../../common/rpc-protocol';
export declare class NotebookRenderersMainImpl implements NotebookRenderersMain {
    private readonly proxy;
    private readonly rendererMessagingService;
    private readonly disposables;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    $postMessage(editorId: string | undefined, rendererId: string, message: unknown): Promise<boolean>;
    dispose(): void;
}
//# sourceMappingURL=notebook-renderers-main.d.ts.map