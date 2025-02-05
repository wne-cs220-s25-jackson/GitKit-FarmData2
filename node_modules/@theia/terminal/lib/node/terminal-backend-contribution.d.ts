import { ILogger } from '@theia/core/lib/common';
import { ProcessManager } from '@theia/process/lib/node';
import { MessagingService } from '@theia/core/lib/node/messaging/messaging-service';
export declare class TerminalBackendContribution implements MessagingService.Contribution {
    protected readonly decoder: TextDecoder;
    protected readonly processManager: ProcessManager;
    protected readonly logger: ILogger;
    configure(service: MessagingService): void;
}
//# sourceMappingURL=terminal-backend-contribution.d.ts.map