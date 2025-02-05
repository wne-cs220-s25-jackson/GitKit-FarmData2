import { SelectableTreeNode, TreeModelImpl } from '@theia/core/lib/browser/tree';
import { TimelineItem } from '../common/timeline-model';
import { Command } from '@theia/core';
export declare const LOAD_MORE_COMMAND: Command;
export interface TimelineNode extends SelectableTreeNode {
    timelineItem: TimelineItem;
}
export declare class TimelineTreeModel extends TreeModelImpl {
    updateTree(items: TimelineItem[], hasMoreItems: boolean): void;
}
//# sourceMappingURL=timeline-tree-model.d.ts.map