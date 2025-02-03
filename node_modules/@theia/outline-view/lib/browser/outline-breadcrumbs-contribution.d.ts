import { LabelProvider, BreadcrumbsService, TreeNode, OpenerService, BreadcrumbsContribution, Breadcrumb } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { OutlineViewService } from './outline-view-service';
import { OutlineSymbolInformationNode, OutlineViewWidget } from './outline-view-widget';
import { Disposable, Emitter, Event } from '@theia/core/lib/common';
export declare const OutlineBreadcrumbType: unique symbol;
export declare const BreadcrumbPopupOutlineViewFactory: unique symbol;
export declare const OUTLINE_BREADCRUMB_CONTAINER_CLASS = "outline-element";
export interface BreadcrumbPopupOutlineViewFactory {
    (): BreadcrumbPopupOutlineView;
}
export declare class BreadcrumbPopupOutlineView extends OutlineViewWidget {
    protected readonly openerService: OpenerService;
    protected readonly outlineViewService: OutlineViewService;
    protected tapNode(node?: TreeNode): void;
    cloneState(roots: OutlineSymbolInformationNode[]): void;
}
export declare class OutlineBreadcrumbsContribution implements BreadcrumbsContribution {
    protected readonly labelProvider: LabelProvider;
    protected readonly outlineViewService: OutlineViewService;
    protected readonly breadcrumbsService: BreadcrumbsService;
    protected readonly outlineFactory: BreadcrumbPopupOutlineViewFactory;
    protected outlineView: BreadcrumbPopupOutlineView;
    readonly type: symbol;
    readonly priority: number;
    protected currentUri: URI | undefined;
    protected currentBreadcrumbs: OutlineBreadcrumb[];
    protected roots: OutlineSymbolInformationNode[];
    protected readonly onDidChangeBreadcrumbsEmitter: Emitter<URI>;
    get onDidChangeBreadcrumbs(): Event<URI>;
    init(): void;
    protected updateOutlineItems(uri: URI, selectedNode: OutlineSymbolInformationNode | undefined): Promise<void>;
    computeBreadcrumbs(uri: URI): Promise<Breadcrumb[]>;
    attachPopupContent(breadcrumb: Breadcrumb, parent: HTMLElement): Promise<Disposable | undefined>;
    /**
     * Returns the path of the given outline node.
     */
    protected toOutlinePath(node: OutlineSymbolInformationNode | undefined, path?: OutlineSymbolInformationNode[]): OutlineSymbolInformationNode[] | undefined;
    /**
     * Find the node that is selected. Returns after the first match.
     */
    protected findSelectedNode(roots: OutlineSymbolInformationNode[]): OutlineSymbolInformationNode | undefined;
}
export declare class OutlineBreadcrumb implements Breadcrumb {
    readonly node: OutlineSymbolInformationNode | OutlineSymbolInformationNode[];
    readonly uri: URI;
    readonly index: string;
    readonly label: string;
    readonly iconClass: string;
    readonly containerClass: string;
    constructor(node: OutlineSymbolInformationNode | OutlineSymbolInformationNode[], uri: URI, index: string, label: string, iconClass: string, containerClass: string);
    get id(): string;
    get type(): symbol;
    get longLabel(): string;
}
export declare namespace OutlineBreadcrumb {
    function is(breadcrumb: Breadcrumb): breadcrumb is OutlineBreadcrumb;
}
//# sourceMappingURL=outline-breadcrumbs-contribution.d.ts.map