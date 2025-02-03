import { Diagnostic } from '@theia/core/shared/vscode-languageserver-protocol';
import URI from '@theia/core/lib/common/uri';
import { Event, Emitter } from '@theia/core/lib/common/event';
import { Tree, TreeNode } from '@theia/core/lib/browser/tree/tree';
import { TreeDecorator, TreeDecoration } from '@theia/core/lib/browser/tree/tree-decorator';
import { Marker } from '../../common/marker';
import { ProblemManager } from './problem-manager';
import { ProblemPreferences } from './problem-preferences';
import { LabelProvider } from '@theia/core/lib/browser';
import { WorkspaceService } from '@theia/workspace/lib/browser';
/**
 * @deprecated since 1.25.0
 * URI-based decorators should implement `DecorationsProvider` and contribute decorations via the `DecorationsService`.
 */
export declare class ProblemDecorator implements TreeDecorator {
    protected readonly problemManager: ProblemManager;
    protected problemPreferences: ProblemPreferences;
    protected readonly workspaceService: WorkspaceService;
    protected readonly labelProvider: LabelProvider;
    readonly id = "theia-problem-decorator";
    protected readonly emitter: Emitter<(tree: Tree) => Map<string, TreeDecoration.Data>>;
    constructor(problemManager: ProblemManager);
    protected init(): void;
    decorations(tree: Tree): Promise<Map<string, TreeDecoration.Data>>;
    get onDidChangeDecorations(): Event<(tree: Tree) => Map<string, TreeDecoration.Data>>;
    protected fireDidChangeDecorations(event: (tree: Tree) => Map<string, TreeDecoration.Data>): void;
    protected collectDecorators(tree: Tree): Map<string, TreeDecoration.Data>;
    protected generateCaptionSuffix(nodeURI: URI): string;
    /**
     * Traverses up the tree from the given node and attaches decorations to any parents.
     */
    protected appendContainerMarkers(node: TreeNode, decoration: TreeDecoration.Data, decorations: Map<string, TreeDecoration.Data>): void;
    /**
     * @returns a map matching stringified URI's to a decoration whose features reflect the highest-severity problem found
     * and the number of problems found (based on {@link ProblemDecorator.toDecorator })
     */
    protected collectMarkers(tree: Tree): Map<string, TreeDecoration.Data>;
    protected toDecorator(markers: Marker<Diagnostic>[]): TreeDecoration.Data;
    protected getColor(marker: Marker<Diagnostic>): TreeDecoration.Color;
    /**
     * Get the decoration for a given marker diagnostic.
     * Markers with higher severity have a higher priority and should be displayed.
     * @param marker the diagnostic marker.
     */
    protected getPriority(marker: Marker<Diagnostic>): number;
    /**
     * Returns `true` if the diagnostic (`data`) of the marker argument has `Error`, `Warning`, or `Information` severity.
     * Otherwise, returns `false`.
     */
    protected filterMarker(marker: Marker<Diagnostic>): boolean;
    protected getUriFromNode(node: TreeNode): string | undefined;
    protected compare(left: Marker<Diagnostic>, right: Marker<Diagnostic>): number;
    protected compareDecorators(left: TreeDecoration.Data, right: TreeDecoration.Data): number;
}
export declare namespace ProblemDecorator {
    const severityCompare: (a: Marker<Diagnostic>, b: Marker<Diagnostic>) => number;
}
//# sourceMappingURL=problem-decorator.d.ts.map