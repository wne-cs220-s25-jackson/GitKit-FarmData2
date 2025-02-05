import { Progress, ProgressMessage } from './message-service-protocol';
import { ProgressClient } from './progress-service-protocol';
import { MessageService } from './message-service';
export declare class ProgressService {
    protected readonly client: ProgressClient;
    protected readonly messageService: MessageService;
    showProgress(message: ProgressMessage, onDidCancel?: () => void): Promise<Progress>;
    protected shouldDelegate(message: ProgressMessage): boolean;
    private progressIdPrefix;
    private counter;
    protected newProgressId(): string;
    withProgress<T>(text: string, locationId: string, task: () => Promise<T>, onDidCancel?: () => void): Promise<T>;
}
//# sourceMappingURL=progress-service.d.ts.map