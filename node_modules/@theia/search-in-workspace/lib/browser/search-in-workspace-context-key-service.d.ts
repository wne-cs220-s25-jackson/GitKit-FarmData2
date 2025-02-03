import { ContextKeyService, ContextKey } from '@theia/core/lib/browser/context-key-service';
export declare class SearchInWorkspaceContextKeyService {
    protected readonly contextKeyService: ContextKeyService;
    protected _searchViewletVisible: ContextKey<boolean>;
    get searchViewletVisible(): ContextKey<boolean>;
    protected _searchViewletFocus: ContextKey<boolean>;
    get searchViewletFocus(): ContextKey<boolean>;
    protected searchInputBoxFocus: ContextKey<boolean>;
    setSearchInputBoxFocus(searchInputBoxFocus: boolean): void;
    protected replaceInputBoxFocus: ContextKey<boolean>;
    setReplaceInputBoxFocus(replaceInputBoxFocus: boolean): void;
    protected patternIncludesInputBoxFocus: ContextKey<boolean>;
    setPatternIncludesInputBoxFocus(patternIncludesInputBoxFocus: boolean): void;
    protected patternExcludesInputBoxFocus: ContextKey<boolean>;
    setPatternExcludesInputBoxFocus(patternExcludesInputBoxFocus: boolean): void;
    protected inputBoxFocus: ContextKey<boolean>;
    protected updateInputBoxFocus(): void;
    protected _replaceActive: ContextKey<boolean>;
    get replaceActive(): ContextKey<boolean>;
    protected _hasSearchResult: ContextKey<boolean>;
    get hasSearchResult(): ContextKey<boolean>;
    protected init(): void;
}
//# sourceMappingURL=search-in-workspace-context-key-service.d.ts.map