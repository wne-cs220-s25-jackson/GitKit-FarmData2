import { Root } from '@theia/core/shared/react-dom/client';
import { ApplicationShell, CorePreferences } from '@theia/core/lib/browser';
import { NotificationManager } from './notifications-manager';
export declare class NotificationsRenderer {
    protected readonly shell: ApplicationShell;
    protected readonly manager: NotificationManager;
    protected readonly corePreferences: CorePreferences;
    protected containerRoot: Root;
    protected init(): void;
    protected container: HTMLDivElement;
    protected createOverlayContainer(): void;
    protected render(): void;
}
//# sourceMappingURL=notifications-renderer.d.ts.map