import { MessageService } from '@theia/core';
import { WindowService } from '@theia/core/lib/browser/window/window-service';
export declare class FileSystemWatcherErrorHandler {
    protected readonly messageService: MessageService;
    protected readonly windowService: WindowService;
    protected watchHandlesExhausted: boolean;
    protected get instructionsLink(): string;
    handleError(): Promise<void>;
    protected isElectron(): boolean;
}
//# sourceMappingURL=filesystem-watcher-error-handler.d.ts.map