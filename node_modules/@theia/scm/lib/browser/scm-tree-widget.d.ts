/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import URI from '@theia/core/lib/common/uri';
import { DisposableCollection } from '@theia/core/lib/common/disposable';
import { TreeWidget, TreeNode, SelectableTreeNode, TreeProps, NodeProps } from '@theia/core/lib/browser/tree';
import { ScmTreeModel, ScmFileChangeGroupNode, ScmFileChangeFolderNode, ScmFileChangeNode } from './scm-tree-model';
import { MenuCommandExecutor, MenuModelRegistry, ActionMenuNode, CompoundMenuNode, MenuPath } from '@theia/core/lib/common/menu';
import { ScmResource } from './scm-provider';
import { ContextMenuRenderer, LabelProvider, CorePreferences } from '@theia/core/lib/browser';
import { ScmContextKeyService } from './scm-context-key-service';
import { EditorWidget, EditorManager, DiffNavigatorProvider } from '@theia/editor/lib/browser';
import { IconThemeService } from '@theia/core/lib/browser/icon-theme-service';
import { ColorRegistry } from '@theia/core/lib/browser/color-registry';
import { Decoration, DecorationsService } from '@theia/core/lib/browser/decorations-service';
import { ThemeService } from '@theia/core/lib/browser/theming';
export declare class ScmTreeWidget extends TreeWidget {
    static ID: string;
    static RESOURCE_GROUP_CONTEXT_MENU: string[];
    static RESOURCE_GROUP_INLINE_MENU: string[];
    static RESOURCE_FOLDER_CONTEXT_MENU: string[];
    static RESOURCE_FOLDER_INLINE_MENU: string[];
    static RESOURCE_CONTEXT_MENU: string[];
    static RESOURCE_INLINE_MENU: string[];
    protected readonly menuCommandExecutor: MenuCommandExecutor;
    protected readonly menus: MenuModelRegistry;
    protected readonly contextKeys: ScmContextKeyService;
    protected readonly editorManager: EditorManager;
    protected readonly diffNavigatorProvider: DiffNavigatorProvider;
    protected readonly iconThemeService: IconThemeService;
    protected readonly decorationsService: DecorationsService;
    protected readonly colors: ColorRegistry;
    protected readonly themeService: ThemeService;
    readonly model: ScmTreeModel;
    constructor(props: TreeProps, treeModel: ScmTreeModel, contextMenuRenderer: ContextMenuRenderer);
    protected init(): void;
    set viewMode(id: 'tree' | 'list');
    get viewMode(): 'tree' | 'list';
    /**
     * Render the node given the tree node and node properties.
     * @param node the tree node.
     * @param props the node properties.
     */
    protected renderNode(node: TreeNode, props: NodeProps): React.ReactNode;
    protected createContainerAttributes(): React.HTMLAttributes<HTMLElement>;
    /**
     * The ARROW_LEFT key controls both the movement around the file tree and also
     * the movement through the change chunks within a file.
     *
     * If the selected tree node is a folder then the ARROW_LEFT key behaves exactly
     * as it does in explorer.  It collapses the tree node if the folder is expanded and
     * it moves the selection up to the parent folder if the folder is collapsed (no-op if no parent folder, as
     * group headers are not selectable).  This behavior is the default behavior implemented
     * in the TreeWidget super class.
     *
     * If the selected tree node is a file then the ARROW_LEFT key moves up through the
     * change chunks within each file.  If the selected chunk is the first chunk in the file
     * then the file selection is moved to the previous file (no-op if no previous file).
     *
     * Note that when cursoring through change chunks, the ARROW_LEFT key cannot be used to
     * move up through the parent folders of the file tree.  If users want to do this, using
     * keys only, then they must press ARROW_UP repeatedly until the selected node is the folder
     * node and then press ARROW_LEFT.
     */
    protected handleLeft(event: KeyboardEvent): Promise<void>;
    /**
     * The ARROW_RIGHT key controls both the movement around the file tree and also
     * the movement through the change chunks within a file.
     *
     * If the selected tree node is a folder then the ARROW_RIGHT key behaves exactly
     * as it does in explorer.  It expands the tree node if the folder is collapsed and
     * it moves the selection to the first child node if the folder is expanded.
     * This behavior is the default behavior implemented
     * in the TreeWidget super class.
     *
     * If the selected tree node is a file then the ARROW_RIGHT key moves down through the
     * change chunks within each file.  If the selected chunk is the last chunk in the file
     * then the file selection is moved to the next file (no-op if no next file).
     */
    protected handleRight(event: KeyboardEvent): Promise<void>;
    protected handleEnter(event: KeyboardEvent): void;
    goToPreviousChange(): Promise<void>;
    goToNextChange(): Promise<void>;
    selectNodeByUri(uri: URI): void;
    protected getFirstSelectableNode(): SelectableTreeNode | undefined;
    protected moveToPreviousFileNode(): ScmFileChangeNode | undefined;
    protected moveToNextFileNode(): ScmFileChangeNode | undefined;
    protected openResource(resource: ScmResource): Promise<EditorWidget | undefined>;
    protected getPaddingLeft(node: TreeNode, props: NodeProps): number;
    protected getDepthPadding(depth: number): number;
    protected isCurrentThemeLight(): boolean;
    protected needsExpansionTogglePadding(node: TreeNode): boolean;
}
export declare namespace ScmTreeWidget {
    namespace Styles {
        const NO_SELECT = "no-select";
    }
    interface Props {
        treeNode: TreeNode;
        model: ScmTreeModel;
        menus: MenuModelRegistry;
        contextKeys: ScmContextKeyService;
        labelProvider: LabelProvider;
        contextMenuRenderer: ContextMenuRenderer;
        corePreferences?: CorePreferences;
        caption: React.ReactNode;
    }
}
export declare abstract class ScmElement<P extends ScmElement.Props = ScmElement.Props> extends React.Component<P, ScmElement.State> {
    constructor(props: P);
    protected readonly toDisposeOnUnmount: DisposableCollection;
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected detectHover: (element: HTMLElement | null) => void;
    protected showHover: () => void;
    protected hideHover: () => void;
    protected renderContextMenu: (event: React.MouseEvent<HTMLElement>) => void;
    protected abstract get contextMenuPath(): MenuPath;
    protected abstract get contextMenuArgs(): any[];
}
export declare namespace ScmElement {
    interface Props extends ScmTreeWidget.Props {
        renderExpansionToggle: () => React.ReactNode;
        commandExecutor: MenuCommandExecutor;
    }
    interface State {
        hover: boolean;
    }
}
export declare class ScmResourceComponent extends ScmElement<ScmResourceComponent.Props> {
    render(): JSX.Element | undefined;
    protected open: () => void;
    protected readonly contextMenuPath: string[];
    protected get contextMenuArgs(): any[];
    protected get singleNodeArgs(): any[];
    protected hasCtrlCmdOrShiftMask(event: TreeWidget.ModifierAwareEvent): boolean;
    /**
     * Handle the single clicking of nodes present in the widget.
     */
    protected handleClick: (event: React.MouseEvent) => void;
    /**
     * Handle the double clicking of nodes present in the widget.
     */
    protected handleDoubleClick: () => void;
}
export declare namespace ScmResourceComponent {
    interface Props extends ScmElement.Props {
        treeNode: ScmFileChangeNode;
        parentPath: URI;
        sourceUri: string;
        decoration: Decoration | undefined;
        colors: ColorRegistry;
        isLightTheme: boolean;
    }
}
export declare class ScmResourceGroupElement extends ScmElement<ScmResourceGroupComponent.Props> {
    render(): JSX.Element;
    protected renderChangeCount(): React.ReactNode;
    protected readonly contextMenuPath: string[];
    protected get contextMenuArgs(): any[];
}
export declare namespace ScmResourceGroupComponent {
    interface Props extends ScmElement.Props {
        treeNode: ScmFileChangeGroupNode;
    }
}
export declare class ScmResourceFolderElement extends ScmElement<ScmResourceFolderElement.Props> {
    render(): JSX.Element;
    protected readonly contextMenuPath: string[];
    protected get contextMenuArgs(): any[];
    protected get singleNodeArgs(): any[];
}
export declare namespace ScmResourceFolderElement {
    interface Props extends ScmElement.Props {
        treeNode: ScmFileChangeFolderNode;
        sourceUri: string;
    }
}
export declare class ScmInlineActions extends React.Component<ScmInlineActions.Props> {
    render(): React.ReactNode;
}
export declare namespace ScmInlineActions {
    interface Props {
        hover: boolean;
        menu: CompoundMenuNode;
        menuPath: MenuPath;
        commandExecutor: MenuCommandExecutor;
        model: ScmTreeModel;
        treeNode: TreeNode;
        contextKeys: ScmContextKeyService;
        args: any[];
        children?: React.ReactNode;
    }
}
export declare class ScmInlineAction extends React.Component<ScmInlineAction.Props> {
    render(): React.ReactNode;
    protected execute: (event: React.MouseEvent) => void;
}
export declare namespace ScmInlineAction {
    interface Props {
        node: ActionMenuNode;
        commandExecutor: MenuCommandExecutor;
        menuPath: MenuPath;
        model: ScmTreeModel;
        treeNode: TreeNode;
        contextKeys: ScmContextKeyService;
        args: any[];
    }
}
//# sourceMappingURL=scm-tree-widget.d.ts.map