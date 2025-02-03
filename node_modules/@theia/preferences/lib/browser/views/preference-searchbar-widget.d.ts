/// <reference types="react" />
import { ReactWidget, StatefulWidget, Widget } from '@theia/core/lib/browser';
import * as React from '@theia/core/shared/react';
import { Emitter } from '@theia/core';
export interface PreferencesSearchbarState {
    searchTerm: string;
}
export declare class PreferencesSearchbarWidget extends ReactWidget implements StatefulWidget {
    static readonly ID = "settings.header";
    static readonly LABEL = "Settings Header";
    static readonly SEARCHBAR_ID = "preference-searchbar";
    protected readonly onFilterStringChangedEmitter: Emitter<string>;
    readonly onFilterChanged: import("@theia/core").Event<string>;
    protected searchbarRef: React.RefObject<HTMLInputElement>;
    protected resultsCount: number;
    constructor(options?: Widget.IOptions);
    protected init(): void;
    protected handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    protected search: (value: string) => Promise<void>;
    focus(): void;
    /**
     * Clears the search input and all search results.
     * @param e on-click mouse event.
     */
    protected clearSearchResults: (e: React.MouseEvent) => Promise<void>;
    /**
     * Renders all search bar options.
     */
    protected renderOptionContainer(): React.ReactNode;
    /**
     * Renders a badge displaying search results count.
     */
    protected renderResultsCountOption(): React.ReactNode;
    /**
     * Renders a clear all button.
     */
    protected renderClearAllOption(): React.ReactNode;
    /**
     * Determines whether the search input currently has a value.
     * @returns true, if the search input currently has a value; false, otherwise.
     */
    protected searchTermExists(): boolean;
    protected getSearchTerm(): string;
    updateSearchTerm(searchTerm: string): Promise<void>;
    render(): React.ReactNode;
    /**
     * Updates the search result count.
     * @param count the result count.
     */
    updateResultsCount(count: number): void;
    storeState(): PreferencesSearchbarState;
    restoreState(oldState: PreferencesSearchbarState): void;
}
//# sourceMappingURL=preference-searchbar-widget.d.ts.map