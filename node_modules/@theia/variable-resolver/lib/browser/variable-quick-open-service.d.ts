import { MessageService } from '@theia/core/lib/common/message-service';
import { VariableRegistry, Variable } from './variable';
import { VariableResolverService } from './variable-resolver-service';
import { QuickPickItem, QuickInputService } from '@theia/core/lib/browser';
export declare class VariableQuickOpenService {
    protected readonly variableRegistry: VariableRegistry;
    protected items: Array<QuickPickItem>;
    protected readonly messages: MessageService;
    protected readonly quickInputService: QuickInputService;
    protected readonly variableResolver: VariableResolverService;
    constructor(variableRegistry: VariableRegistry);
    open(): void;
    protected showValue(variable: Variable): Promise<void>;
}
//# sourceMappingURL=variable-quick-open-service.d.ts.map