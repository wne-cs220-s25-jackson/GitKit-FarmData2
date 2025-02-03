import { PluginContribution, Keybinding as PluginKeybinding } from '../../../common';
import { Keybinding } from '@theia/core/lib/common/keybinding';
import { Disposable } from '@theia/core/lib/common/disposable';
export declare class KeybindingsContributionPointHandler {
    private readonly keybindingRegistry;
    handle(contributions: PluginContribution): Disposable;
    protected toKeybinding(pluginKeybinding: PluginKeybinding): Keybinding | undefined;
    protected toOSKeybinding(pluginKeybinding: PluginKeybinding): string | undefined;
}
//# sourceMappingURL=keybindings-contribution-handler.d.ts.map