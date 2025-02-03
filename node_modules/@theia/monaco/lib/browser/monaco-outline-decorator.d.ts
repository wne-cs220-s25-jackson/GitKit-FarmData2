import { Event, Emitter } from '@theia/core/lib/common/event';
import { Tree } from '@theia/core/lib/browser/tree/tree';
import { TreeDecorator, TreeDecoration } from '@theia/core/lib/browser/tree/tree-decorator';
import { MonacoOutlineSymbolInformationNode } from './monaco-outline-contribution';
export declare class MonacoOutlineDecorator implements TreeDecorator {
    readonly id = "theia-monaco-outline-decorator";
    protected readonly emitter: Emitter<(tree: Tree) => Map<string, TreeDecoration.Data>>;
    decorations(tree: Tree): Promise<Map<string, TreeDecoration.Data>>;
    get onDidChangeDecorations(): Event<(tree: Tree) => Map<string, TreeDecoration.Data>>;
    protected collectDecorations(tree: Tree): Map<string, TreeDecoration.Data>;
    protected toDecoration(node: MonacoOutlineSymbolInformationNode): TreeDecoration.Data;
}
//# sourceMappingURL=monaco-outline-decorator.d.ts.map