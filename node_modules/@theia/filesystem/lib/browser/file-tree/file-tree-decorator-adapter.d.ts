import URI from '@theia/core/lib/common/uri';
import { Event, Emitter } from '@theia/core/lib/common';
import { Decoration, DecorationsService } from '@theia/core/lib/browser/decorations-service';
import { TreeNode, TreeDecoration, TreeDecorator, Tree } from '@theia/core/lib/browser';
import { MaybePromise } from '@theia/core/lib/common/types';
import { ColorRegistry } from '@theia/core/lib/browser/color-registry';
export declare class FileTreeDecoratorAdapter implements TreeDecorator {
    readonly id = "decorations-service-tree-decorator-adapter";
    protected readonly bubbleTooltip: string;
    protected readonly decorationsService: DecorationsService;
    protected readonly colorRegistry: ColorRegistry;
    protected readonly onDidChangeDecorationsEmitter: Emitter<(tree: Tree) => Map<string, TreeDecoration.Data>>;
    protected decorationsByUri: Map<string, TreeDecoration.Data>;
    protected parentDecorations: Map<string, TreeDecoration.Data>;
    get onDidChangeDecorations(): Event<(tree: Tree) => Map<string, TreeDecoration.Data>>;
    protected init(): void;
    decorations(tree: Tree): MaybePromise<Map<string, TreeDecoration.Data>>;
    protected collectDecorations(tree: Tree): Map<string, TreeDecoration.Data>;
    protected mergeDecorations(ownDecoration?: TreeDecoration.Data, bubbledDecoration?: TreeDecoration.Data): TreeDecoration.Data | undefined;
    protected updateDecorations(oldKeys: IterableIterator<string>, newKeys: IterableIterator<string>): void;
    protected toTheiaDecoration(decorations: Decoration[], bubble?: boolean): TreeDecoration.Data;
    protected toTailDecoration(decoration: Decoration, fontData?: TreeDecoration.FontData, bubble?: boolean): TreeDecoration.TailDecoration.AnyConcrete;
    protected propagateDecorationsByUri(child: URI, decorations: Decoration[]): void;
    /**
     *  Sort higher priorities earlier. I.e. positive number means right higher than left.
     */
    protected compareWeight(left: Decoration, right: Decoration): number;
    protected getUriForNode(node: TreeNode): string | undefined;
    fireDidChangeDecorations(): void;
}
//# sourceMappingURL=file-tree-decorator-adapter.d.ts.map