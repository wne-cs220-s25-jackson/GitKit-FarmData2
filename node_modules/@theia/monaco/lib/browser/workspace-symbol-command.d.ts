import { KeybindingContribution, KeybindingRegistry, OpenerService, LabelProvider } from '@theia/core/lib/browser';
import { QuickAccessContribution, QuickAccessProvider, QuickInputService, QuickAccessRegistry, QuickPicks, QuickPickItem } from '@theia/core/lib/browser/quick-input';
import { CommandRegistry, CommandHandler, SelectionService, CancellationToken, CommandContribution, MenuContribution, MenuModelRegistry } from '@theia/core/lib/common';
import { SymbolInformation } from '@theia/core/shared/vscode-languageserver-protocol';
import { MonacoLanguages, WorkspaceSymbolProvider } from './monaco-languages';
export declare class WorkspaceSymbolCommand implements QuickAccessProvider, CommandContribution, KeybindingContribution, MenuContribution, CommandHandler, QuickAccessContribution {
    static readonly PREFIX = "#";
    private command;
    protected readonly languages: MonacoLanguages;
    protected readonly openerService: OpenerService;
    protected quickInputService: QuickInputService;
    protected quickAccessRegistry: QuickAccessRegistry;
    protected selectionService: SelectionService;
    protected readonly labelProvider: LabelProvider;
    isEnabled(): boolean;
    execute(): void;
    registerCommands(commands: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    private isElectron;
    registerKeybindings(keybindings: KeybindingRegistry): void;
    registerQuickAccessProvider(): void;
    getPicks(filter: string, token: CancellationToken): Promise<QuickPicks>;
    protected createItem(sym: SymbolInformation, provider: WorkspaceSymbolProvider, filter: string, token: CancellationToken): QuickPickItem;
    protected toCssClassName(symbolKind: SymbolKind, inline?: boolean): string[] | undefined;
    private openURL;
}
declare enum SymbolKind {
    File = 1,
    Module = 2,
    Namespace = 3,
    Package = 4,
    Class = 5,
    Method = 6,
    Property = 7,
    Field = 8,
    Constructor = 9,
    Enum = 10,
    Interface = 11,
    Function = 12,
    Variable = 13,
    Constant = 14,
    String = 15,
    Number = 16,
    Boolean = 17,
    Array = 18,
    Object = 19,
    Key = 20,
    Null = 21,
    EnumMember = 22,
    Struct = 23,
    Event = 24,
    Operator = 25,
    TypeParameter = 26
}
export {};
//# sourceMappingURL=workspace-symbol-command.d.ts.map