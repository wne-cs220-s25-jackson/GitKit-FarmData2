import { KeybindingRegistry } from '@theia/core/lib/browser';
import { QuickAccessProviderDescriptor, QuickAccessRegistry } from '@theia/core/lib/browser/quick-input/quick-access';
import { Disposable } from '@theia/core/lib/common';
export declare class MonacoQuickAccessRegistry implements QuickAccessRegistry {
    protected readonly keybindingRegistry: KeybindingRegistry;
    private get monacoRegistry();
    registerQuickAccessProvider(descriptor: QuickAccessProviderDescriptor): Disposable;
    getQuickAccessProviders(): QuickAccessProviderDescriptor[];
    getQuickAccessProvider(prefix: string): QuickAccessProviderDescriptor | undefined;
    clear(): void;
}
//# sourceMappingURL=monaco-quick-access-registry.d.ts.map