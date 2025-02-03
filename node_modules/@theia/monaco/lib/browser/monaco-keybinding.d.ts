import { KeybindingContribution, KeybindingRegistry, KeyCode } from '@theia/core/lib/browser';
import { MonacoCommandRegistry } from './monaco-command-registry';
import { CommandRegistry, DisposableCollection } from '@theia/core';
import { MonacoContextKeyService } from './monaco-context-key-service';
export declare class MonacoKeybindingContribution implements KeybindingContribution {
    protected toDisposeOnKeybindingChange: DisposableCollection;
    protected readonly commands: MonacoCommandRegistry;
    protected readonly keybindings: KeybindingRegistry;
    protected readonly theiaCommandRegistry: CommandRegistry;
    protected readonly contextKeyService: MonacoContextKeyService;
    protected init(): void;
    registerKeybindings(registry: KeybindingRegistry): void;
    protected updateMonacoKeybindings(): void;
    protected toMonacoKeybindingNumber(codes: KeyCode[]): number;
    protected toSingleMonacoKeybindingNumber(code: KeyCode): number;
}
//# sourceMappingURL=monaco-keybinding.d.ts.map