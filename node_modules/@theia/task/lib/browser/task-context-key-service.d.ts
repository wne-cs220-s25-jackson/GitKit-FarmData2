import { ContextKeyService, ContextKey } from '@theia/core/lib/browser/context-key-service';
import { ApplicationServer } from '@theia/core/lib/common/application-protocol';
export declare class TaskContextKeyService {
    protected readonly contextKeyService: ContextKeyService;
    protected readonly applicationServer: ApplicationServer;
    protected customExecutionSupported: ContextKey<boolean>;
    protected shellExecutionSupported: ContextKey<boolean>;
    protected processExecutionSupported: ContextKey<boolean>;
    protected serverlessWebContext: ContextKey<boolean>;
    protected taskCommandsRegistered: ContextKey<boolean>;
    protected init(): void;
    setCustomExecutionSupported(customExecutionSupported: boolean): void;
    setShellExecutionSupported(shellExecutionSupported: boolean): void;
    setProcessExecutionSupported(processExecutionSupported: boolean): void;
    setServerlessWebContext(serverlessWebContext: boolean): void;
    setTaskCommandsRegistered(taskCommandsRegistered: boolean): void;
}
//# sourceMappingURL=task-context-key-service.d.ts.map