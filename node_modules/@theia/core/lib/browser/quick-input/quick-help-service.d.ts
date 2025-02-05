import { CancellationToken } from '../../common';
import { QuickAccessContribution, QuickAccessProvider, QuickAccessRegistry } from './quick-access';
import { QuickInputService, QuickPickItem, QuickPickSeparator } from './quick-input-service';
export declare class QuickHelpService implements QuickAccessProvider, QuickAccessContribution {
    static PREFIX: string;
    protected quickAccessRegistry: QuickAccessRegistry;
    protected quickInputService: QuickInputService;
    getPicks(filter: string, token: CancellationToken): (QuickPickItem | QuickPickSeparator)[];
    private getQuickAccessProviders;
    registerQuickAccessProvider(): void;
}
//# sourceMappingURL=quick-help-service.d.ts.map