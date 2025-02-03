import { UriComponents } from '@theia/core/lib/common/uri';
import { Range, SymbolKind, SymbolTag } from '@theia/core/shared/vscode-languageserver-protocol';
export declare const CALLHIERARCHY_ID = "callhierarchy";
export declare const CALL_HIERARCHY_TOGGLE_COMMAND_ID = "callhierarchy:toggle";
export declare const CALL_HIERARCHY_LABEL: string;
export interface CallHierarchyItem {
    _sessionId?: string;
    _itemId?: string;
    kind: SymbolKind;
    name: string;
    detail?: string;
    uri: UriComponents;
    range: Range;
    selectionRange: Range;
    tags?: readonly SymbolTag[];
    data?: unknown;
}
export interface CallHierarchyIncomingCall {
    from: CallHierarchyItem;
    fromRanges: Range[];
}
export interface CallHierarchyOutgoingCall {
    to: CallHierarchyItem;
    fromRanges: Range[];
}
//# sourceMappingURL=callhierarchy.d.ts.map