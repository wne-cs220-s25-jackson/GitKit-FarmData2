import { NotificationExt, NotificationMain } from '../../common';
import { ProgressService, Progress, ProgressMessage } from '@theia/core/lib/common';
import { interfaces } from '@theia/core/shared/inversify';
import { ProxyIdentifier, RPCProtocol } from '../../common/rpc-protocol';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
export declare class BasicNotificationMainImpl implements NotificationMain, Disposable {
    protected readonly progressService: ProgressService;
    protected readonly progressMap: Map<string, Progress>;
    protected readonly progress2Work: Map<string, number>;
    protected readonly proxy: NotificationExt;
    protected readonly toDispose: DisposableCollection;
    constructor(rpc: RPCProtocol, container: interfaces.Container, extIdentifier: ProxyIdentifier<NotificationExt>);
    dispose(): void;
    $startProgress(options: NotificationMain.StartProgressOptions): Promise<string>;
    protected mapOptions(options: NotificationMain.StartProgressOptions): ProgressMessage;
    $stopProgress(id: string): void;
    $updateProgress(id: string, item: NotificationMain.ProgressReport): void;
}
//# sourceMappingURL=basic-notification-main.d.ts.map