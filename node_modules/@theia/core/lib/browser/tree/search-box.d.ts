import { SearchBoxDebounce, SearchBoxDebounceOptions } from '../tree/search-box-debounce';
import { BaseWidget, Message } from '../widgets/widget';
import { Emitter, Event } from '../../common/event';
import { KeyCode, Key } from '../keyboard/keys';
/**
 * Initializer properties for the search box widget.
 */
export interface SearchBoxProps extends SearchBoxDebounceOptions {
    /**
     * If `true`, the `Previous`, `Next`, and `Close` buttons will be visible. Otherwise, `false`. Defaults to `false`.
     */
    readonly showButtons?: boolean;
    /**
     * If `true`, `Filter` and `Close` buttons will be visible, and clicking the `Filter` button will triggers filter on the search term. Defaults to `false`.
     */
    readonly showFilter?: boolean;
}
export declare namespace SearchBoxProps {
    /**
     * The default search box widget option.
     */
    const DEFAULT: SearchBoxProps;
}
/**
 * The search box widget.
 */
export declare class SearchBox extends BaseWidget {
    protected readonly props: SearchBoxProps;
    protected readonly debounce: SearchBoxDebounce;
    protected static SPECIAL_KEYS: Key[];
    protected static MAX_CONTENT_LENGTH: number;
    protected readonly nextEmitter: Emitter<void>;
    protected readonly previousEmitter: Emitter<void>;
    protected readonly closeEmitter: Emitter<void>;
    protected readonly textChangeEmitter: Emitter<string | undefined>;
    protected readonly filterToggleEmitter: Emitter<boolean>;
    protected readonly input: HTMLSpanElement;
    protected readonly filter: HTMLElement | undefined;
    protected _isFiltering: boolean;
    constructor(props: SearchBoxProps, debounce: SearchBoxDebounce);
    get onPrevious(): Event<void>;
    get onNext(): Event<void>;
    get onClose(): Event<void>;
    get onTextChange(): Event<string | undefined>;
    get onFilterToggled(): Event<boolean>;
    get isFiltering(): boolean;
    get keyCodePredicate(): KeyCode.Predicate;
    protected firePrevious(): void;
    protected fireNext(): void;
    protected fireClose(): void;
    protected fireTextChange(input: string | undefined): void;
    protected fireFilterToggle(): void;
    protected doFireFilterToggle(toggleTo?: boolean): void;
    handle(event: KeyboardEvent): void;
    protected handleArrowUp(): void;
    protected handleArrowDown(): void;
    onBeforeHide(): void;
    protected handleKey(keyCode: KeyCode): void;
    protected getTrimmedContent(data: string): string;
    protected canHandle(keyCode: KeyCode | undefined): boolean;
    protected isCtrlBackspace(keyCode: KeyCode): boolean;
    updateHighlightInfo(info: SearchBox.HighlightInfo): void;
    protected createContent(): {
        container: HTMLElement;
        input: HTMLSpanElement;
        filter: HTMLElement | undefined;
        previous: HTMLElement | undefined;
        next: HTMLElement | undefined;
        close: HTMLElement | undefined;
    };
    protected onAfterAttach(msg: Message): void;
}
export declare namespace SearchBox {
    /**
     * CSS classes for the search box widget.
     */
    namespace Styles {
        const SEARCH_BOX = "theia-search-box";
        const SEARCH_INPUT = "theia-search-input";
        const SEARCH_BUTTONS_WRAPPER = "theia-search-buttons-wrapper";
        const BUTTON = "theia-search-button";
        const FILTER: string[];
        const FILTER_ON = "filter-active";
        const BUTTON_PREVIOUS = "theia-search-button-previous";
        const BUTTON_NEXT = "theia-search-button-next";
        const BUTTON_CLOSE = "theia-search-button-close";
        const NON_SELECTABLE = "theia-non-selectable";
        const NO_MATCH = "no-match";
    }
    interface HighlightInfo {
        filterText: string | undefined;
        matched: number;
        total: number;
    }
}
/**
 * Search box factory.
 */
export declare const SearchBoxFactory: unique symbol;
export interface SearchBoxFactory {
    /**
     * Creates a new search box with the given initializer properties.
     */
    (props: SearchBoxProps): SearchBox;
}
//# sourceMappingURL=search-box.d.ts.map