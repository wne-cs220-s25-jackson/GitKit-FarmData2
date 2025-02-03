import { Emitter } from '@theia/core/lib/common/event';
export declare enum VSXSearchMode {
    Initial = 0,
    None = 1,
    Search = 2,
    Installed = 3,
    Builtin = 4,
    Recommended = 5
}
export declare const BUILTIN_QUERY = "@builtin";
export declare const INSTALLED_QUERY = "@installed";
export declare const RECOMMENDED_QUERY = "@recommended";
export declare class VSXExtensionsSearchModel {
    protected readonly onDidChangeQueryEmitter: Emitter<string>;
    readonly onDidChangeQuery: import("@theia/core/lib/common/event").Event<string>;
    protected readonly specialQueries: Map<string, VSXSearchMode>;
    protected _query: string;
    set query(query: string);
    get query(): string;
    getModeForQuery(): VSXSearchMode;
}
//# sourceMappingURL=vsx-extensions-search-model.d.ts.map