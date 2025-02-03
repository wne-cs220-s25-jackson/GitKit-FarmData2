import { ClipboardService } from './clipboard-service';
import { ILogger } from '../common/logger';
import { MessageService } from '../common/message-service';
export interface NavigatorClipboard {
    readText(): Promise<string>;
    writeText(value: string): Promise<void>;
}
export interface PermissionStatus {
    state: 'granted' | 'prompt' | 'denied';
}
export interface NavigatorPermissions {
    query(options: {
        name: string;
    }): Promise<PermissionStatus>;
}
export declare class BrowserClipboardService implements ClipboardService {
    protected readonly messageService: MessageService;
    protected readonly logger: ILogger;
    readText(): Promise<string>;
    writeText(value: string): Promise<void>;
    protected queryPermission(name: string): Promise<PermissionStatus>;
    protected getClipboardAPI(): NavigatorClipboard;
}
//# sourceMappingURL=browser-clipboard-service.d.ts.map