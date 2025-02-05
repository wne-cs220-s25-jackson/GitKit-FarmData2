import URI from '@theia/core/lib/common/uri';
import { OpenerService, OpenerOptions } from '@theia/core/lib/browser';
import { MessageService } from '@theia/core/lib/common/message-service';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
export declare class DiffService {
    protected readonly fileService: FileService;
    protected readonly openerService: OpenerService;
    protected readonly messageService: MessageService;
    openDiffEditor(left: URI, right: URI, label?: string, options?: OpenerOptions): Promise<void>;
}
//# sourceMappingURL=diff-service.d.ts.map