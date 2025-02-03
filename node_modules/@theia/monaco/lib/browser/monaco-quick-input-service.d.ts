import { ApplicationShell, InputBox, InputOptions, KeybindingRegistry, PickOptions, QuickInputButton, QuickInputService, QuickPick, QuickPickItem, QuickPickItemHighlights, QuickPickOptions, QuickPickSeparator } from '@theia/core/lib/browser';
import { IInputBox, IInputOptions, IKeyMods, IPickOptions, IQuickInput, IQuickInputButton, IQuickInputService, IQuickNavigateConfiguration, IQuickPick, IQuickPickItem, IQuickPickItemButtonEvent, IQuickPickSeparator, IQuickWidget, QuickPickInput } from '@theia/monaco-editor-core/esm/vs/platform/quickinput/common/quickInput';
import { IQuickInputStyles } from '@theia/monaco-editor-core/esm/vs/platform/quickinput/browser/quickInput';
import { QuickInputController } from '@theia/monaco-editor-core/esm/vs/platform/quickinput/browser/quickInputController';
import { IQuickAccessController } from '@theia/monaco-editor-core/esm/vs/platform/quickinput/common/quickAccess';
import { IContextKey } from '@theia/monaco-editor-core/esm/vs/platform/contextkey/common/contextkey';
import * as monaco from '@theia/monaco-editor-core';
import { ResolvedKeybinding } from '@theia/monaco-editor-core/esm/vs/base/common/keybindings';
import { IMatch } from '@theia/monaco-editor-core/esm/vs/base/common/filters';
import { CancellationToken, Event } from '@theia/core';
import { MonacoColorRegistry } from './monaco-color-registry';
import { ThemeService } from '@theia/core/lib/browser/theming';
export interface IListElement {
    readonly index: number;
    readonly item: IQuickPickItem;
    readonly saneLabel: string;
    readonly saneAriaLabel: string;
    readonly saneDescription?: string;
    readonly saneDetail?: string;
    readonly labelHighlights?: IMatch[];
    readonly descriptionHighlights?: IMatch[];
    readonly detailHighlights?: IMatch[];
    readonly checked: boolean;
    readonly separator?: IQuickPickSeparator;
    readonly fireButtonTriggered: (event: IQuickPickItemButtonEvent<IQuickPickItem>) => void;
}
export declare class MonacoQuickInputImplementation implements IQuickInputService {
    get currentQuickInput(): IQuickInput | undefined;
    readonly _serviceBrand: undefined;
    controller: QuickInputController;
    quickAccess: IQuickAccessController;
    protected readonly shell: ApplicationShell;
    protected readonly colorRegistry: MonacoColorRegistry;
    protected readonly themeService: ThemeService;
    protected container: HTMLElement;
    protected inQuickOpen: IContextKey<boolean>;
    get backButton(): IQuickInputButton;
    get onShow(): monaco.IEvent<void>;
    get onHide(): monaco.IEvent<void>;
    protected init(): void;
    setContextKey(key: string | undefined): void;
    createQuickWidget(): IQuickWidget;
    createQuickPick<T extends IQuickPickItem>(options: {
        useSeparators: true;
    }): IQuickPick<T, {
        useSeparators: true;
    }>;
    createQuickPick<T extends IQuickPickItem>(options: {
        useSeparators: false;
    }): IQuickPick<T, {
        useSeparators: false;
    }>;
    createInputBox(): IInputBox;
    open(filter: string): void;
    input(options?: IInputOptions, token?: monaco.CancellationToken): Promise<string | undefined>;
    pick<T extends IQuickPickItem, O extends IPickOptions<T>>(picks: Promise<QuickPickInput<T>[]> | QuickPickInput<T>[], options?: O, token?: monaco.CancellationToken): Promise<(O extends {
        canPickMany: true;
    } ? T[] : T) | undefined>;
    hide(): void;
    focus(): void;
    toggle(): void;
    applyStyles(styles: IQuickInputStyles): void;
    layout(dimension: monaco.editor.IDimension, titleBarOffset: number): void;
    navigate(next: boolean, quickNavigate?: IQuickNavigateConfiguration): void;
    dispose(): void;
    cancel(): Promise<void>;
    back(): Promise<void>;
    accept(keyMods?: IKeyMods): Promise<void>;
    private initContainer;
    private initController;
    private updateLayout;
    private getClientDimension;
    private computeStyles;
}
export declare class MonacoQuickInputService implements QuickInputService {
    private monacoService;
    protected readonly keybindingRegistry: KeybindingRegistry;
    get backButton(): QuickInputButton;
    get onShow(): Event<void>;
    get onHide(): Event<void>;
    open(filter: string): void;
    createInputBox(): InputBox;
    input(options?: InputOptions, token?: monaco.CancellationToken): Promise<string | undefined>;
    pick<T extends QuickPickItem, O extends PickOptions<T> = PickOptions<T>>(picks: Promise<QuickPickInput<T>[]> | QuickPickInput<T>[], options?: O, token?: CancellationToken): Promise<T[] | T | undefined>;
    showQuickPick<T extends QuickPickItem>(items: Array<T | QuickPickSeparator>, options?: QuickPickOptions<T>): Promise<T | undefined>;
    createQuickPick<T extends QuickPickItem>(): QuickPick<T>;
    wrapQuickPick<T extends QuickPickItem>(wrapped: IQuickPick<MonacoQuickPickItem<T>, {
        useSeparators: true;
    }>): QuickPick<T>;
    protected convertItems<T extends QuickPickItem>(item: T): MonacoQuickPickItem<T>;
    hide(): void;
}
export declare class MonacoQuickPickItem<T extends QuickPickItem> implements IQuickPickItem {
    readonly item: T;
    readonly type?: 'item';
    readonly id?: string;
    readonly label: string;
    readonly meta?: string;
    readonly ariaLabel?: string;
    readonly description?: string;
    readonly detail?: string;
    readonly keybinding?: ResolvedKeybinding;
    readonly iconClasses?: string[];
    buttons?: IQuickInputButton[];
    readonly alwaysShow?: boolean;
    readonly highlights?: QuickPickItemHighlights;
    constructor(item: T, kbRegistry: KeybindingRegistry);
    accept(): void;
}
//# sourceMappingURL=monaco-quick-input-service.d.ts.map