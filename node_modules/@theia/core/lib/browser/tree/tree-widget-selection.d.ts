import { TreeWidget } from './tree-widget';
import { SelectableTreeNode } from './tree-selection';
export type TreeWidgetSelection = ReadonlyArray<Readonly<SelectableTreeNode>> & {
    source: TreeWidget;
};
export declare namespace TreeWidgetSelection {
    function isSource(selection: unknown, source: TreeWidget): selection is TreeWidgetSelection;
    function getSource(selection: unknown): TreeWidget | undefined;
    function is(selection: unknown): selection is TreeWidgetSelection;
    function create(source: TreeWidget): TreeWidgetSelection;
}
//# sourceMappingURL=tree-widget-selection.d.ts.map