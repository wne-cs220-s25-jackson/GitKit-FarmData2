import { CancellationToken } from '@theia/core/lib/common';
import { LabelProvider } from '@theia/core/lib/browser/label-provider';
import { QuickAccessProvider, QuickAccessRegistry, QuickAccessContribution } from '@theia/core/lib/browser/quick-input/quick-access';
import { QuickPickItem, QuickPickSeparator } from '@theia/core/lib/browser/quick-input/quick-input-service';
import { ApplicationShell, NavigatableWidget } from '@theia/core/lib/browser';
export declare class QuickEditorService implements QuickAccessContribution, QuickAccessProvider {
    static PREFIX: string;
    protected readonly labelProvider: LabelProvider;
    protected readonly quickAccessRegistry: QuickAccessRegistry;
    protected readonly shell: ApplicationShell;
    protected groupLocalizations: string[];
    registerQuickAccessProvider(): void;
    getPicks(filter: string, token: CancellationToken): (QuickPickItem | QuickPickSeparator)[];
    protected getGroupLocalization(index: number): string;
    protected toItem(widget: NavigatableWidget): QuickPickItem;
}
//# sourceMappingURL=quick-editor-service.d.ts.map