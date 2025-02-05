import { FrontendApplicationContribution, FrontendApplication, TreeNode } from '@theia/core/lib/browser';
import { Range, EditorManager, EditorOpenerOptions } from '@theia/editor/lib/browser';
import { DisposableCollection } from '@theia/core';
import { OutlineViewService } from '@theia/outline-view/lib/browser/outline-view-service';
import { OutlineSymbolInformationNode } from '@theia/outline-view/lib/browser/outline-view-widget';
import URI from '@theia/core/lib/common/uri';
import * as monaco from '@theia/monaco-editor-core';
import { ITextModel } from '@theia/monaco-editor-core/esm/vs/editor/common/model';
import { DocumentSymbol } from '@theia/monaco-editor-core/esm/vs/editor/common/languages';
export declare class MonacoOutlineContribution implements FrontendApplicationContribution {
    protected readonly toDisposeOnEditor: DisposableCollection;
    protected roots: MonacoOutlineSymbolInformationNode[] | undefined;
    protected canUpdateOutline: boolean;
    protected readonly outlineViewService: OutlineViewService;
    protected readonly editorManager: EditorManager;
    onStart(app: FrontendApplication): void;
    protected selectInEditor(node: MonacoOutlineSymbolInformationNode, options?: EditorOpenerOptions): Promise<void>;
    protected handleCurrentEditorChanged(): void;
    protected tokenSource: monaco.CancellationTokenSource;
    protected updateOutline(editorSelection?: Range): Promise<void>;
    protected createRoots(model: monaco.editor.ITextModel | ITextModel, token: monaco.CancellationToken, editorSelection?: Range): Promise<MonacoOutlineSymbolInformationNode[]>;
    protected createProviderRootNode(uri: URI, displayName: string, children: MonacoOutlineSymbolInformationNode[]): MonacoOutlineSymbolInformationNode;
    protected createNodes(uri: URI, symbols: monaco.languages.DocumentSymbol[] | DocumentSymbol[]): MonacoOutlineSymbolInformationNode[];
    /**
     * Sets the selection on the sub-trees based on the optional editor selection.
     * Select the narrowest node that is strictly contains the editor selection.
     */
    protected applySelection(roots: MonacoOutlineSymbolInformationNode[], editorSelection?: Range): boolean;
    /**
     * Returns `true` if `candidate` is strictly contained inside `parent`
     *
     * If the argument is a `DocumentSymbol`, then `getFullRange` will be used to retrieve the range of the underlying symbol.
     */
    protected parentContains(candidate: monaco.languages.DocumentSymbol | Range, parent: monaco.languages.DocumentSymbol | Range, rangeBased: boolean): boolean;
    /**
     * `monaco` to LSP `Range` converter. Converts the `1-based` location indices into `0-based` ones.
     */
    protected asRange(range: monaco.IRange): Range;
    /**
     * Returns with a range enclosing this symbol not including leading/trailing whitespace but everything else like comments.
     * This information is typically used to determine if the clients cursor is inside the symbol to reveal in the symbol in the UI.
     * This allows to obtain the range including the associated comments.
     *
     * See: [`DocumentSymbol#range`](https://microsoft.github.io/language-server-protocol/specification#textDocument_documentSymbol) for more details.
     */
    protected getFullRange(documentSymbol: monaco.languages.DocumentSymbol): Range;
    /**
     * The range that should be selected and revealed when this symbol is being picked, e.g the name of a function. Must be contained by the `getSelectionRange`.
     *
     * See: [`DocumentSymbol#selectionRange`](https://microsoft.github.io/language-server-protocol/specification#textDocument_documentSymbol) for more details.
     */
    protected getNameRange(documentSymbol: monaco.languages.DocumentSymbol): Range;
    protected createNode(uri: URI, symbol: monaco.languages.DocumentSymbol, ids: Map<string, number>, parent?: MonacoOutlineSymbolInformationNode): MonacoOutlineSymbolInformationNode;
    protected getName(symbol: monaco.languages.DocumentSymbol): string;
    protected getDetail(symbol: monaco.languages.DocumentSymbol): string;
    protected createId(name: string, ids: Map<string, number>): string;
    protected shouldExpand(symbol: monaco.languages.DocumentSymbol): boolean;
    protected orderByPosition(symbol: monaco.languages.DocumentSymbol, symbol2: monaco.languages.DocumentSymbol): number;
}
export declare namespace MonacoOutlineContribution {
    interface NodeAndSymbol {
        node: MonacoOutlineSymbolInformationNode;
        symbol: monaco.languages.DocumentSymbol;
    }
}
export interface MonacoOutlineSymbolInformationNode extends OutlineSymbolInformationNode {
    uri: URI;
    range: Range;
    fullRange: Range;
    detail?: string;
    parent: MonacoOutlineSymbolInformationNode | undefined;
    children: MonacoOutlineSymbolInformationNode[];
}
export declare namespace MonacoOutlineSymbolInformationNode {
    function is(node: TreeNode): node is MonacoOutlineSymbolInformationNode;
    function insert(nodes: MonacoOutlineSymbolInformationNode[], node: MonacoOutlineSymbolInformationNode): void;
    function compare(node: MonacoOutlineSymbolInformationNode, node2: MonacoOutlineSymbolInformationNode): number;
}
//# sourceMappingURL=monaco-outline-contribution.d.ts.map