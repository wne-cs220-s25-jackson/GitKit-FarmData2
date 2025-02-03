import { Panel, Widget } from '@theia/core/shared/@phosphor/widgets';
import { MenuModelRegistry } from '@theia/core/lib/common/menu';
import { CommandRegistry } from '@theia/core/lib/common/command';
import { StatefulWidget } from '@theia/core/lib/browser/shell/shell-layout-restorer';
import { Message } from '@theia/core/shared/@phosphor/messaging';
import { BadgeWidget, DescriptionWidget, DynamicToolbarWidget } from '@theia/core/lib/browser/view-container';
import { DisposableCollection, Emitter, Event } from '@theia/core/lib/common';
import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
export declare class PluginViewWidgetIdentifier {
    id: string;
    viewId: string;
}
export declare class PluginViewWidget extends Panel implements StatefulWidget, DescriptionWidget, BadgeWidget, DynamicToolbarWidget {
    currentViewContainerId?: string;
    protected _message?: string;
    protected _description: string;
    protected _badge?: number | undefined;
    protected _badgeTooltip?: string | undefined;
    protected _suppressUpdateViewVisibility: boolean;
    protected updatingViewVisibility: boolean;
    protected onDidChangeDescriptionEmitter: Emitter<void>;
    protected onDidChangeBadgeEmitter: Emitter<void>;
    protected onDidChangeBadgeTooltipEmitter: Emitter<void>;
    protected toDispose: DisposableCollection;
    protected readonly onDidChangeToolbarItemsEmitter: Emitter<void>;
    get onDidChangeToolbarItems(): Event<void>;
    protected readonly menus: MenuModelRegistry;
    protected readonly commands: CommandRegistry;
    protected readonly contextKeyService: ContextKeyService;
    readonly options: PluginViewWidgetIdentifier;
    constructor();
    protected init(): void;
    get onDidChangeDescription(): Event<void>;
    get onDidChangeBadge(): Event<void>;
    get onDidChangeBadgeTooltip(): Event<void>;
    protected onActivateRequest(msg: Message): void;
    storeState(): PluginViewWidget.State;
    restoreState(state: PluginViewWidget.State): void;
    set suppressUpdateViewVisibility(suppressUpdateViewVisibility: boolean);
    updateViewVisibility(cb: () => void): void;
    get message(): string | undefined;
    set message(message: string | undefined);
    get description(): string;
    set description(description: string);
    get badge(): number | undefined;
    set badge(badge: number | undefined);
    get badgeTooltip(): string | undefined;
    set badgeTooltip(badgeTooltip: string | undefined);
    private updateWidgetMessage;
    addWidget(widget: Widget): void;
    insertWidget(index: number, widget: Widget): void;
    dispose(): void;
}
export declare namespace PluginViewWidget {
    interface State {
        label: string;
        message?: string;
        widgets: ReadonlyArray<Widget>;
        suppressUpdateViewVisibility: boolean;
        currentViewContainerId: string | undefined;
    }
}
//# sourceMappingURL=plugin-view-widget.d.ts.map