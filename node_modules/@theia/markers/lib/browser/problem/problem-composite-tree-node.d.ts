import { CompositeTreeNode } from '@theia/core/lib/browser/tree/tree';
import { MarkerInfoNode } from '../marker-tree';
import { Marker } from '../../common/marker';
import { Diagnostic } from '@theia/core/shared/vscode-languageserver-protocol';
export declare namespace ProblemCompositeTreeNode {
    interface Child {
        node: MarkerInfoNode;
        markers: Marker<Diagnostic>[];
    }
    function setSeverity(parent: MarkerInfoNode, markers: Marker<Diagnostic>[]): void;
    function addChildren(parent: CompositeTreeNode, insertChildren: ProblemCompositeTreeNode.Child[]): void;
}
//# sourceMappingURL=problem-composite-tree-node.d.ts.map