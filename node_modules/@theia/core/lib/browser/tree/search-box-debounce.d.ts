import { Event, Emitter } from '../../common/event';
import { Disposable, DisposableCollection } from '../../common/disposable';
/**
 * Options for the search term debounce.
 */
export interface SearchBoxDebounceOptions {
    /**
     * The delay (in milliseconds) before the debounce notifies clients about its content change.
     */
    readonly delay: number;
}
export declare namespace SearchBoxDebounceOptions {
    /**
     * The default debounce option.
     */
    const DEFAULT: SearchBoxDebounceOptions;
}
/**
 * It notifies the clients, once if the underlying search term has changed after a given amount of delay.
 */
export declare class SearchBoxDebounce implements Disposable {
    protected readonly options: SearchBoxDebounceOptions;
    protected readonly disposables: DisposableCollection;
    protected readonly emitter: Emitter<string | undefined>;
    protected readonly handler: () => void;
    protected state: string | undefined;
    constructor(options: SearchBoxDebounceOptions);
    append(input: string | undefined): string | undefined;
    get onChanged(): Event<string | undefined>;
    dispose(): void;
    protected fireChanged(value: string | undefined): void;
    protected reset(): void;
}
//# sourceMappingURL=search-box-debounce.d.ts.map