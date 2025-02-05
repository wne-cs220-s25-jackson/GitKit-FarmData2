/// <reference types="react" />
import * as React from '@theia/core/shared/react';
export interface NotebookEditorFindMatch {
    selected: boolean;
    show(): void;
    replace?(value: string): void;
}
export interface NotebookEditorFindMatchOptions {
    search: string;
    matchCase: boolean;
    wholeWord: boolean;
    regex: boolean;
    activeFilters: string[];
}
export interface NotebookEditorFindFilter {
    id: string;
    label: string;
    active: boolean;
}
export interface NotebookEditorFindOptions {
    search?: string;
    jumpToMatch?: boolean;
    matchCase?: boolean;
    wholeWord?: boolean;
    regex?: boolean;
    modifyIndex?: (matches: NotebookEditorFindMatch[], index: number) => number;
}
export interface NotebookFindWidgetProps {
    hidden?: boolean;
    filters?: NotebookEditorFindFilter[];
    onClose(): void;
    onSearch(options: NotebookEditorFindMatchOptions): NotebookEditorFindMatch[];
    onReplace(matches: NotebookEditorFindMatch[], value: string): void;
}
export interface NotebookFindWidgetState {
    search: string;
    replace: string;
    expanded: boolean;
    matchCase: boolean;
    wholeWord: boolean;
    regex: boolean;
    activeFilters: string[];
    currentMatch: number;
    matches: NotebookEditorFindMatch[];
}
export declare class NotebookFindWidget extends React.Component<NotebookFindWidgetProps, NotebookFindWidgetState> {
    private searchRef;
    private debounceSearch;
    constructor(props: NotebookFindWidgetProps);
    render(): React.ReactNode;
    private hasMatches;
    private canReplace;
    private canReplaceAll;
    private getMatchesCount;
    private gotoNextMatch;
    private gotoPreviousMatch;
    private replaceOne;
    private replaceAll;
    componentDidUpdate(prevProps: Readonly<NotebookFindWidgetProps>, prevState: Readonly<NotebookFindWidgetState>): void;
    focusSearch(content?: string): void;
    search(options: NotebookEditorFindOptions): void;
}
//# sourceMappingURL=notebook-find-widget.d.ts.map