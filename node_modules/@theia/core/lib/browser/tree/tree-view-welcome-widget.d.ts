import React = require('react');
import { CommandRegistry, DisposableCollection } from '../../common';
import { ContextKeyService } from '../context-key-service';
import { LabelParser } from '../label-parser';
import { OpenerService } from '../opener-service';
import { WindowService } from '../window/window-service';
import { TreeModel } from './tree-model';
import { TreeWidget } from './tree-widget';
export interface ViewWelcome {
    readonly view: string;
    readonly content: string;
    readonly when?: string;
    readonly enablement?: string;
    readonly order: number;
}
export interface IItem {
    readonly welcomeInfo: ViewWelcome;
    visible: boolean;
}
export interface ILink {
    readonly label: string;
    readonly href: string;
    readonly title?: string;
}
type LinkedTextItem = string | ILink;
export declare class TreeViewWelcomeWidget extends TreeWidget {
    protected readonly commands: CommandRegistry;
    protected readonly contextService: ContextKeyService;
    protected readonly windowService: WindowService;
    protected readonly labelParser: LabelParser;
    protected readonly openerService: OpenerService;
    protected readonly toDisposeBeforeUpdateViewWelcomeNodes: DisposableCollection;
    protected viewWelcomeNodes: React.ReactNode[];
    protected defaultItem: IItem | undefined;
    protected items: IItem[];
    get visibleItems(): ViewWelcome[];
    protected renderTree(model: TreeModel): React.ReactNode;
    protected shouldShowWelcomeView(): boolean;
    protected renderViewWelcome(): React.ReactNode;
    handleViewWelcomeContentChange(viewWelcomes: ViewWelcome[]): void;
    handleWelcomeContextChange(): void;
    protected updateViewWelcomeNodes(): void;
    protected renderButtonNode(node: ILink, lineKey: string | number, enablement: string | undefined): React.ReactNode;
    protected renderTextNode(node: string, textKey: string | number): React.ReactNode;
    protected renderLinkNode(node: ILink, linkKey: string | number, enablement: string | undefined): React.ReactNode;
    protected getLinkClassName(href: string, enablement: string | undefined): string;
    protected isEnabledClick(enablement: string | undefined): boolean;
    protected openLinkOrCommand: (event: React.MouseEvent, value: string) => void;
    protected parseLinkedText(text: string): LinkedTextItem[];
}
export {};
//# sourceMappingURL=tree-view-welcome-widget.d.ts.map