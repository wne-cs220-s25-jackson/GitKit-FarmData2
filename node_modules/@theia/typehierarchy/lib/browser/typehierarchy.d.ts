import { UriComponents } from '@theia/core/lib/common/uri';
import { Range, SymbolKind, SymbolTag } from '@theia/core/shared/vscode-languageserver-protocol';
export interface TypeHierarchyItem {
    _sessionId?: string;
    _itemId?: string;
    kind: SymbolKind;
    tags?: readonly SymbolTag[];
    name: string;
    detail?: string;
    uri: UriComponents;
    range: Range;
    selectionRange: Range;
}
//# sourceMappingURL=typehierarchy.d.ts.map