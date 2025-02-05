import { MessageService } from '@theia/core/lib/common/message-service';
import { ScmService } from './scm-service';
import { LabelProvider } from '@theia/core/lib/browser/label-provider';
import { QuickInputService } from '@theia/core/lib/browser';
export declare class ScmQuickOpenService {
    protected readonly quickInputService: QuickInputService;
    protected readonly messageService: MessageService;
    protected readonly labelProvider: LabelProvider;
    protected readonly scmService: ScmService;
    changeRepository(): Promise<void>;
}
//# sourceMappingURL=scm-quick-open-service.d.ts.map