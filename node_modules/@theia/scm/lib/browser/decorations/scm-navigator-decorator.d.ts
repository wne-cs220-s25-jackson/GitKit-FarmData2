import { ILogger } from '@theia/core/lib/common/logger';
import { Event, Emitter } from '@theia/core/lib/common/event';
import { Tree } from '@theia/core/lib/browser/tree/tree';
import { TreeDecorator, TreeDecoration } from '@theia/core/lib/browser/tree/tree-decorator';
import { ColorRegistry } from '@theia/core/lib/browser/color-registry';
import { Decoration, DecorationsService } from '@theia/core/lib/browser/decorations-service';
/**
 * @deprecated since 1.25.0
 * URI-based decorators should implement `DecorationsProvider` and contribute decorations via the `DecorationsService`.
 */
export declare class ScmNavigatorDecorator implements TreeDecorator {
    protected readonly decorationsService: DecorationsService;
    readonly id = "theia-scm-decorator";
    private decorationsMap;
    protected readonly logger: ILogger;
    protected readonly colors: ColorRegistry;
    constructor(decorationsService: DecorationsService);
    protected collectDecorators(tree: Tree): Map<string, TreeDecoration.Data>;
    protected toDecorator(change: Decoration): TreeDecoration.Data;
    protected readonly emitter: Emitter<(tree: Tree) => Map<string, TreeDecoration.Data>>;
    decorations(tree: Tree): Promise<Map<string, TreeDecoration.Data>>;
    protected appendContainerChanges(decorationsMap: Map<string, Decoration>): Map<string, Decoration>;
    get onDidChangeDecorations(): Event<(tree: Tree) => Map<string, TreeDecoration.Data>>;
    fireDidChangeDecorations(event: (tree: Tree) => Map<string, TreeDecoration.Data>): void;
}
//# sourceMappingURL=scm-navigator-decorator.d.ts.map