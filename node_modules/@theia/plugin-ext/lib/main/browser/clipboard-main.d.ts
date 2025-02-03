import { interfaces } from '@theia/core/shared/inversify';
import { ClipboardMain } from '../../common';
import { ClipboardService } from '@theia/core/lib/browser/clipboard-service';
export declare class ClipboardMainImpl implements ClipboardMain {
    protected readonly clipboardService: ClipboardService;
    constructor(container: interfaces.Container);
    $readText(): Promise<string>;
    $writeText(value: string): Promise<void>;
}
//# sourceMappingURL=clipboard-main.d.ts.map