/// <reference types="react" />
import { CommandRegistry, MenuModelRegistry, MenuPath } from '@theia/core/lib/common';
import { TreeWidget, TreeProps, NodeProps } from '@theia/core/lib/browser/tree';
import { ContextMenuRenderer } from '@theia/core/lib/browser';
import { TimelineNode, TimelineTreeModel } from './timeline-tree-model';
import { TimelineService } from './timeline-service';
import { TimelineContextKeyService } from './timeline-context-key-service';
import * as React from '@theia/core/shared/react';
import { TimelineItem } from '../common/timeline-model';
export declare const TIMELINE_ITEM_CONTEXT_MENU: MenuPath;
export declare class TimelineTreeWidget extends TreeWidget {
    readonly model: TimelineTreeModel;
    static ID: string;
    static PAGE_SIZE: number;
    protected readonly menus: MenuModelRegistry;
    protected readonly contextKeys: TimelineContextKeyService;
    protected readonly timelineService: TimelineService;
    protected readonly commandRegistry: CommandRegistry;
    constructor(props: TreeProps, model: TimelineTreeModel, contextMenuRenderer: ContextMenuRenderer);
    protected renderNode(node: TimelineNode, props: NodeProps): React.ReactNode;
    protected handleEnter(event: KeyboardEvent): void;
    protected handleLeft(event: KeyboardEvent): Promise<void>;
}
export declare namespace TimelineItemNode {
    interface Props {
        timelineItem: TimelineItem;
        commandRegistry: CommandRegistry;
        contextKeys: TimelineContextKeyService;
        contextMenuRenderer: ContextMenuRenderer;
    }
}
export declare class TimelineItemNode extends React.Component<TimelineItemNode.Props> {
    render(): JSX.Element | undefined;
    protected open: () => void;
    protected renderContextMenu: (event: React.MouseEvent<HTMLElement>) => void;
}
//# sourceMappingURL=timeline-tree-widget.d.ts.map