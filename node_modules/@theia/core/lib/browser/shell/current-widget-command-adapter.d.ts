import { CommandHandler } from '../../common';
import { TabBar, Title, Widget } from '../widgets';
import { ApplicationShell } from './application-shell';
type CurrentWidgetCommandAdapterBooleanCheck = (event: Event) => boolean;
type CurrentWidgetCommandHandlerBooleanCheck = (title: Title<Widget> | undefined, tabbar: TabBar<Widget> | undefined, event: Event) => boolean;
export interface TabBarContextMenuCommandHandler extends CommandHandler {
    execute(title: Title<Widget> | undefined, tabbar: TabBar<Widget> | undefined, event: Event): unknown;
    isEnabled?: CurrentWidgetCommandHandlerBooleanCheck;
    isVisible?: CurrentWidgetCommandHandlerBooleanCheck;
    isToggled?: CurrentWidgetCommandHandlerBooleanCheck;
}
/**
 * Creates a command handler that acts on either the widget targeted by a DOM event or the current widget.
 */
export declare class CurrentWidgetCommandAdapter implements CommandHandler {
    execute: (event: Event) => unknown;
    isEnabled?: CurrentWidgetCommandAdapterBooleanCheck;
    isVisible?: CurrentWidgetCommandAdapterBooleanCheck;
    isToggled?: CurrentWidgetCommandAdapterBooleanCheck;
    constructor(shell: ApplicationShell, handler: TabBarContextMenuCommandHandler);
    protected transformArguments(shell: ApplicationShell, event: Event): [Title<Widget> | undefined, TabBar<Widget> | undefined, Event];
}
export {};
//# sourceMappingURL=current-widget-command-adapter.d.ts.map