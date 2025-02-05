import { interfaces } from 'inversify';
import { Widget } from '@phosphor/widgets';
import { MenuModelRegistry, Command, CommandContribution, MenuContribution, CommandRegistry } from '../../common';
import { KeybindingContribution, KeybindingRegistry } from '../keybinding';
import { WidgetManager } from '../widget-manager';
import { ApplicationShell } from './application-shell';
import { QuickViewService } from '../quick-input';
export interface OpenViewArguments extends ApplicationShell.WidgetOptions {
    toggle?: boolean;
    activate?: boolean;
    reveal?: boolean;
}
export interface ViewContributionOptions {
    widgetId: string;
    viewContainerId?: string;
    widgetName: string;
    defaultWidgetOptions: ApplicationShell.WidgetOptions;
    toggleCommandId?: string;
    toggleKeybinding?: string;
}
export declare function bindViewContribution<T extends AbstractViewContribution<Widget>>(bind: interfaces.Bind, identifier: interfaces.Newable<T>): interfaces.BindingWhenOnSyntax<T>;
/**
 * An abstract superclass for frontend contributions that add a view to the application shell.
 */
export declare abstract class AbstractViewContribution<T extends Widget> implements CommandContribution, MenuContribution, KeybindingContribution {
    protected readonly options: ViewContributionOptions;
    protected readonly widgetManager: WidgetManager;
    protected readonly shell: ApplicationShell;
    protected readonly quickView: QuickViewService;
    readonly toggleCommand?: Command;
    constructor(options: ViewContributionOptions);
    get viewId(): string;
    get viewLabel(): string;
    get defaultViewOptions(): ApplicationShell.WidgetOptions;
    get widget(): Promise<T>;
    tryGetWidget(): T | undefined;
    openView(args?: Partial<OpenViewArguments>): Promise<T>;
    registerCommands(commands: CommandRegistry): void;
    closeView(): Promise<T | undefined>;
    toggleView(): Promise<T>;
    registerMenus(menus: MenuModelRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
}
//# sourceMappingURL=view-contribution.d.ts.map