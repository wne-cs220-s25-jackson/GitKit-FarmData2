import { Emitter, Event } from '@theia/core';
import { TreeDecorator, Tree, TreeDecoration } from '@theia/core/lib/browser';
import { DecorationsService } from '@theia/core/lib/browser/decorations-service';
export declare class NavigatorSymlinkDecorator implements TreeDecorator {
    readonly id = "theia-navigator-symlink-decorator";
    protected readonly decorationsService: DecorationsService;
    protected init(): void;
    decorations(tree: Tree): Promise<Map<string, TreeDecoration.Data>>;
    protected collectDecorator(tree: Tree): Map<string, TreeDecoration.Data>;
    protected readonly onDidChangeDecorationsEmitter: Emitter<(tree: Tree) => Map<string, TreeDecoration.Data>>;
    get onDidChangeDecorations(): Event<(tree: Tree) => Map<string, TreeDecoration.Data>>;
    fireDidChangeDecorations(event: (tree: Tree) => Map<string, TreeDecoration.Data>): void;
}
//# sourceMappingURL=navigator-symlink-decorator.d.ts.map