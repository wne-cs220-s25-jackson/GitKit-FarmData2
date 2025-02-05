import { QuickPickSeparator, QuickPickService } from '../../common/quick-pick-service';
import { QuickInputService, QuickPickItem, QuickInputButtonHandle, QuickPick, QuickPickOptions } from './quick-input-service';
export declare class QuickPickServiceImpl implements QuickPickService {
    protected readonly quickInputService: QuickInputService;
    private readonly onDidHideEmitter;
    readonly onDidHide: import("../../common/event").Event<void>;
    private readonly onDidChangeValueEmitter;
    readonly onDidChangeValue: import("../../common/event").Event<{
        quickPick: QuickPick<QuickPickItem>;
        filter: string;
    }>;
    private readonly onDidAcceptEmitter;
    readonly onDidAccept: import("../../common/event").Event<void>;
    private readonly onDidChangeActiveEmitter;
    readonly onDidChangeActive: import("../../common/event").Event<{
        quickPick: QuickPick<QuickPickItem>;
        activeItems: Array<QuickPickItem>;
    }>;
    private readonly onDidChangeSelectionEmitter;
    readonly onDidChangeSelection: import("../../common/event").Event<{
        quickPick: QuickPick<QuickPickItem>;
        selectedItems: Array<QuickPickItem>;
    }>;
    private readonly onDidTriggerButtonEmitter;
    readonly onDidTriggerButton: import("../../common/event").Event<QuickInputButtonHandle>;
    private items;
    show<T extends QuickPickItem>(items: Array<T | QuickPickSeparator>, options?: QuickPickOptions<T>): Promise<T | undefined>;
    hide(): void;
    setItems<T>(items: Array<QuickPickItem>): void;
}
//# sourceMappingURL=quick-pick-service-impl.d.ts.map