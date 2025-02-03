/// <reference types="lodash" />
/// <reference types="react" />
import React = require('@theia/core/shared/react');
import { Emitter, Event } from '@theia/core/lib/common/event';
import { CommandRegistry, Command } from '@theia/core/lib/common/command';
import { Keybinding } from '@theia/core/lib/common/keybinding';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { KeybindingRegistry, Message, ScopedKeybinding, StatefulWidget, Widget, ContextMenuRenderer } from '@theia/core/lib/browser';
import { KeymapsService } from './keymaps-service';
import { DisposableCollection } from '@theia/core';
/**
 * Representation of a keybinding item for the view.
 */
export interface KeybindingItem {
    command: Command;
    keybinding?: ScopedKeybinding;
    /** human-readable labels can contain highlighting */
    labels: {
        id: RenderableLabel;
        command: RenderableLabel;
        keybinding: RenderableLabel;
        context: RenderableLabel;
        source: RenderableLabel;
    };
    visible?: boolean;
}
export declare namespace KeybindingItem {
    function is(arg: unknown): arg is KeybindingItem;
    function keybinding(item: KeybindingItem): Keybinding;
}
export interface RenderableLabel {
    readonly value: string;
    segments?: RenderableStringSegment[];
}
export interface RenderableStringSegment {
    value: string;
    match: boolean;
    key?: boolean;
}
/**
 * Representation of an individual table cell.
 */
export interface CellData {
    /**
     * The cell value.
     */
    value: string;
    /**
     * Indicates if a cell's value is currently highlighted.
     */
    highlighted: boolean;
}
export declare class KeybindingWidget extends ReactWidget implements StatefulWidget {
    protected readonly commandRegistry: CommandRegistry;
    protected readonly keybindingRegistry: KeybindingRegistry;
    protected readonly keymapsService: KeymapsService;
    protected readonly contextMenuRenderer: ContextMenuRenderer;
    static readonly ID = "keybindings.view.widget";
    static readonly LABEL: string;
    static readonly CONTEXT_MENU: string[];
    static readonly COPY_MENU: string[];
    static readonly EDIT_MENU: string[];
    static readonly ADD_MENU: string[];
    static readonly REMOVE_MENU: string[];
    static readonly SHOW_MENU: string[];
    /**
     * The list of all available keybindings.
     */
    protected items: KeybindingItem[];
    /**
     * The current user search query.
     */
    protected query: string;
    /**
     * The regular expression used to extract values between fuzzy results.
     */
    protected readonly regexp: RegExp;
    /**
     * The regular expression used to extract values between the keybinding separator.
     */
    protected readonly keybindingSeparator: RegExp;
    /**
     * The fuzzy search options.
     * The `pre` and `post` options are used to wrap fuzzy matches.
     */
    protected readonly fuzzyOptions: {
        pre: string;
        post: string;
    };
    protected readonly onDidUpdateEmitter: Emitter<void>;
    readonly onDidUpdate: Event<void>;
    protected readonly onRenderCallbacks: DisposableCollection;
    protected onRender: () => void;
    /**
     * Search keybindings.
     */
    protected readonly searchKeybindings: () => void;
    constructor(options?: Widget.IOptions);
    /**
     * Initialize the widget.
     */
    protected init(): void;
    protected updateItemsAndRerender: import("lodash").DebouncedFunc<() => void>;
    /**
     * Determine if there currently is a search term.
     * @returns `true` if a search term is present.
     */
    hasSearch(): boolean;
    /**
     * Clear the search and reset the view.
     */
    clearSearch(): void;
    /**
     * Show keybinding items with the same key sequence as the given item.
     * @param item the keybinding item
     */
    showSameKeybindings(item: KeybindingItem): void;
    protected onActivateRequest(msg: Message): void;
    /**
     * Perform a search based on the user's search query.
     */
    protected doSearchKeybindings(): void;
    protected formatAndMatchCommand(item: KeybindingItem): boolean;
    protected formatAndMatchKeybinding(item: KeybindingItem, queryItems: string[], exactMatch?: boolean): boolean;
    protected formatAndMatchContext(item: KeybindingItem): boolean;
    protected formatAndMatchSource(item: KeybindingItem): boolean;
    protected toRenderableLabel(label: string, query?: string): RenderableLabel;
    /**
     * Get the search input if available.
     * @returns the search input if available.
     */
    protected findSearchField(): HTMLInputElement | null;
    /**
     * Set the focus the search input field if available.
     */
    protected focusInputField(): void;
    /**
     * Render the view.
     */
    protected render(): React.ReactNode;
    /**
     * Render the search container with the search input.
     */
    protected renderSearch(): React.ReactNode;
    /**
     * Render the warning message when no search results are found.
     */
    protected renderMessage(): React.ReactNode;
    /**
     * Render the keybindings table.
     */
    protected renderTable(): React.ReactNode;
    /**
     * Render the table rows.
     */
    protected renderRows(): React.ReactNode;
    protected renderRow(item: KeybindingItem, index: number): React.ReactNode;
    protected handleItemClick(item: KeybindingItem, index: number, event: React.MouseEvent<HTMLElement>): void;
    protected handleItemDoubleClick(item: KeybindingItem, index: number, event: React.MouseEvent<HTMLElement>): void;
    protected handleItemContextMenu(item: KeybindingItem, index: number, event: React.MouseEvent<HTMLElement>): void;
    protected selectItem(item: KeybindingItem, index: number, element: HTMLElement): void;
    /**
     * Render the actions container with action icons.
     * @param item the keybinding item for the row.
     */
    protected renderActions(item: KeybindingItem): React.ReactNode;
    /**
     * Render the edit action used to update a keybinding.
     * @param item the keybinding item for the row.
     */
    protected renderEdit(item: KeybindingItem): React.ReactNode;
    /**
     * Render the reset action to reset the custom keybinding.
     * Only visible if a keybinding has a `user` scope.
     * @param item the keybinding item for the row.
     */
    protected renderReset(item: KeybindingItem): React.ReactNode;
    /**
     * Render the keybinding.
     * @param keybinding the keybinding value.
     */
    protected renderKeybinding(keybinding: KeybindingItem): React.ReactNode;
    /**
     * Get the list of keybinding items.
     *
     * @returns the list of keybinding items.
     */
    protected getItems(): KeybindingItem[];
    protected createKeybindingItem(command: Command, keybinding?: ScopedKeybinding): KeybindingItem;
    /**
     * @returns the input array, sorted.
     * The sort priority is as follows: items with keybindings before those without, then alphabetical by command.
     */
    protected sortKeybindings(bindings: KeybindingItem[]): KeybindingItem[];
    /**
     * Get the human-readable label for a given command.
     * @param command the command.
     *
     * @returns a human-readable label for the given command.
     */
    protected getCommandLabel(command: Command): string;
    protected getKeybindingLabel(keybinding: ScopedKeybinding | undefined): string | undefined;
    protected getContextLabel(keybinding: ScopedKeybinding | undefined): string | undefined;
    protected getScopeLabel(keybinding: ScopedKeybinding | undefined): string | undefined;
    /**
     * Compare two commands.
     * - Commands with a label should be prioritized and alphabetically sorted.
     * - Commands without a label (id) should be placed at the bottom.
     * @param a the first command.
     * @param b the second command.
     *
     * @returns an integer indicating whether `a` comes before, after or is equivalent to `b`.
     * - returns `-1` if `a` occurs before `b`.
     * - returns `1` if `a` occurs after `b`.
     * - returns `0` if they are equivalent.
     */
    protected compareItem(a: Command, b: Command): number;
    /**
     * Prompt users to update the keybinding for the given command.
     * @param item the keybinding item.
     */
    editKeybinding(item: KeybindingItem): void;
    /**
     * Prompt users to update when expression for the given keybinding.
     * @param item the keybinding item
     */
    editWhenExpression(item: KeybindingItem): void;
    /**
     * Prompt users to add a keybinding for the given command.
     * @param item the keybinding item
     */
    addKeybinding(item: KeybindingItem): void;
    /**
     * Prompt users for confirmation before resetting.
     * @param command the command label.
     *
     * @returns a Promise which resolves to `true` if a user accepts resetting.
     */
    protected confirmResetKeybinding(item: KeybindingItem): Promise<boolean>;
    /**
     * Reset the keybinding to its default value.
     * @param item the keybinding item.
     */
    resetKeybinding(item: KeybindingItem): Promise<void>;
    /**
     * Whether the keybinding can be reset to its default value.
     * @param item the keybinding item
     */
    canResetKeybinding(item: KeybindingItem): boolean;
    /**
     * Validate the provided keybinding value against its previous value.
     * @param command the command label.
     * @param oldKeybinding the old keybinding value.
     * @param keybinding the new keybinding value.
     *
     * @returns the end user message to display.
     */
    protected validateKeybinding(command: string, oldKeybinding: string | undefined, keybinding: string): string;
    /**
     * Build the cell data with highlights if applicable.
     * @param raw the raw cell value.
     *
     * @returns the list of cell data.
     */
    protected buildCellData(raw: string): CellData[];
    /**
     * Render the fuzzy representation of a matched result.
     * @param property one of the `KeybindingItem` properties.
     */
    protected renderMatchedData(property: RenderableLabel): React.ReactNode;
    storeState(): object | undefined;
    restoreState(oldState: {
        query: string;
    }): void;
}
//# sourceMappingURL=keybindings-widget.d.ts.map