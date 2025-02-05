import { TreeImpl, CompositeTreeNode, TreeNode, SelectableTreeNode, ExpandableTreeNode } from '@theia/core/lib/browser';
import { MarkerManager } from './marker-manager';
import { Marker } from '../common/marker';
import { UriSelection } from '@theia/core/lib/common/selection';
import URI from '@theia/core/lib/common/uri';
import { ProblemSelection } from './problem/problem-selection';
import { DiagnosticSeverity } from '@theia/core/shared/vscode-languageserver-protocol';
export declare const MarkerOptions: unique symbol;
export interface MarkerOptions {
    readonly kind: string;
}
export declare abstract class MarkerTree<T extends object> extends TreeImpl {
    protected readonly markerManager: MarkerManager<T>;
    protected readonly markerOptions: MarkerOptions;
    constructor(markerManager: MarkerManager<T>, markerOptions: MarkerOptions);
    protected refreshMarkerInfo(uri: URI): Promise<void>;
    protected insertNodeWithMarkers(node: MarkerInfoNode, markers: Marker<T>[]): void;
    protected resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]>;
    protected createMarkerInfo(id: string, uri: URI): MarkerInfoNode;
    protected getMarkerNodes(parent: MarkerInfoNode, markers: Marker<T>[]): MarkerNode[];
    protected createMarkerNode(marker: Marker<T>, index: number, parent: MarkerInfoNode): MarkerNode;
}
export interface MarkerNode extends UriSelection, SelectableTreeNode, ProblemSelection {
    marker: Marker<object>;
}
export declare namespace MarkerNode {
    function is(node: TreeNode | undefined): node is MarkerNode;
}
export interface MarkerInfoNode extends UriSelection, SelectableTreeNode, ExpandableTreeNode {
    parent: MarkerRootNode;
    numberOfMarkers: number;
    severity?: DiagnosticSeverity;
}
export declare namespace MarkerInfoNode {
    function is(node: unknown): node is MarkerInfoNode;
}
export interface MarkerRootNode extends CompositeTreeNode {
    kind: string;
}
export declare namespace MarkerRootNode {
    function is(node: TreeNode | undefined): node is MarkerRootNode;
}
//# sourceMappingURL=marker-tree.d.ts.map