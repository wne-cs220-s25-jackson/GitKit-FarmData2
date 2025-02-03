import URI from '@theia/core/lib/common/uri';
import { Mutable } from '@theia/core/lib/common';
import { TreeNode, CompositeTreeNode, SelectableTreeNode, ExpandableTreeNode, TreeImpl } from '@theia/core/lib/browser';
import { FileStat, Stat, FileType } from '../../common/files';
import { UriSelection } from '@theia/core/lib/common/selection';
import { MessageService } from '@theia/core/lib/common/message-service';
import { FileSelection } from '../file-selection';
import { FileService } from '../file-service';
export declare class FileTree extends TreeImpl {
    protected readonly fileService: FileService;
    protected readonly messagingService: MessageService;
    resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]>;
    protected resolveFileStat(node: FileStatNode): Promise<FileStat | undefined>;
    protected toNodes(fileStat: FileStat, parent: CompositeTreeNode): Promise<TreeNode[]>;
    protected toNode(fileStat: FileStat, parent: CompositeTreeNode): FileNode | DirNode;
    protected toNodeId(uri: URI, parent: CompositeTreeNode): string;
}
export interface FileStatNode extends SelectableTreeNode, Mutable<UriSelection>, FileSelection {
}
export declare namespace FileStatNode {
    function is(node: unknown): node is FileStatNode;
    function getUri(node: TreeNode | undefined): string | undefined;
}
export type FileStatNodeData = Omit<FileStatNode, 'uri' | 'fileStat'> & {
    uri: string;
    stat?: Stat | {
        type: FileType;
    } & Partial<Stat>;
    fileStat?: FileStat;
};
export declare namespace FileStatNodeData {
    function is(node: unknown): node is FileStatNodeData;
}
export type FileNode = FileStatNode;
export declare namespace FileNode {
    function is(node: unknown): node is FileNode;
}
export type DirNode = FileStatNode & ExpandableTreeNode;
export declare namespace DirNode {
    function is(node: unknown): node is DirNode;
    function compare(node: TreeNode, node2: TreeNode): number;
    function uriCompare(node: TreeNode, node2: TreeNode): number;
    function dirCompare(node: TreeNode, node2: TreeNode): number;
    function createRoot(fileStat: FileStat): DirNode;
    function getContainingDir(node: TreeNode | undefined): DirNode | undefined;
}
//# sourceMappingURL=file-tree.d.ts.map