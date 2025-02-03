import { CancellationToken, Disposable } from '../../common';
import { ContextKeyService } from '../context-key-service';
import { QuickAccessContribution, QuickAccessProvider, QuickAccessRegistry } from './quick-access';
import { QuickPickItem, QuickPicks } from './quick-input-service';
export interface QuickViewItem {
    readonly label: string;
    readonly when?: string;
    readonly open: () => void;
}
export declare class QuickViewService implements QuickAccessContribution, QuickAccessProvider {
    static PREFIX: string;
    protected readonly items: (QuickPickItem & {
        when?: string;
    })[];
    private hiddenItemLabels;
    protected readonly quickAccessRegistry: QuickAccessRegistry;
    protected readonly contextKexService: ContextKeyService;
    registerItem(item: QuickViewItem): Disposable;
    hideItem(label: string): void;
    showItem(label: string): void;
    registerQuickAccessProvider(): void;
    getPicks(filter: string, token: CancellationToken): QuickPicks;
}
//# sourceMappingURL=quick-view-service.d.ts.map