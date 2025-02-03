import { TreeModelImpl, TreeNode } from '@theia/core/lib/browser';
import { CallHierarchyTree } from './callhierarchy-tree';
import { CallHierarchyServiceProvider, CallHierarchySession } from '../callhierarchy-service';
import { Position } from '@theia/core/shared/vscode-languageserver-protocol';
export declare class CallHierarchyTreeModel extends TreeModelImpl {
    protected _languageId: string | undefined;
    protected currentSession?: CallHierarchySession;
    protected readonly tree: CallHierarchyTree;
    protected readonly callHierarchyServiceProvider: CallHierarchyServiceProvider;
    getTree(): CallHierarchyTree;
    get languageId(): string | undefined;
    initializeCallHierarchy(languageId: string | undefined, uri: string | undefined, position: Position | undefined): Promise<void>;
    protected doOpenNode(node: TreeNode): void;
}
//# sourceMappingURL=callhierarchy-tree-model.d.ts.map