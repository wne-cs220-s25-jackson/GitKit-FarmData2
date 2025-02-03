import { Disposable, DisposableCollection, MenuCommandAdapterRegistry, Emitter } from '@theia/core';
import { DeployedPlugin, IconUrl } from '../../../common';
import { ContributionPoint } from './vscode-theia-menu-mappings';
import { PluginMenuCommandAdapter, ReferenceCountingSet } from './plugin-menu-command-adapter';
import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
import { PluginSharedStyle } from '../plugin-shared-style';
export declare class MenusContributionPointHandler {
    private readonly menuRegistry;
    private readonly commands;
    private readonly tabBarToolbar;
    private readonly codeEditorWidgetUtil;
    protected readonly commandAdapter: PluginMenuCommandAdapter;
    protected readonly commandAdapterRegistry: MenuCommandAdapterRegistry;
    protected readonly contextKeyService: ContextKeyService;
    protected readonly style: PluginSharedStyle;
    private readonly quickCommandService;
    protected readonly titleContributionContextKeys: ReferenceCountingSet<unknown>;
    protected readonly onDidChangeTitleContributionEmitter: Emitter<void>;
    private initialized;
    private initialize;
    private getMatchingMenu;
    handle(plugin: DeployedPlugin): Disposable;
    private parseGroup;
    private registerCommandPaletteAction;
    protected checkTitleContribution(contributionPoint: ContributionPoint | string, contribution: {
        when?: string;
    }, toDispose: DisposableCollection): void;
    protected toIconClass(url: IconUrl, toDispose: DisposableCollection): string | undefined;
}
//# sourceMappingURL=menus-contribution-handler.d.ts.map