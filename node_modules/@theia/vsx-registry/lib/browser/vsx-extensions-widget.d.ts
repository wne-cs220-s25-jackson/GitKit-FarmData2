/// <reference types="react" />
import { interfaces } from '@theia/core/shared/inversify';
import { Message, TreeModel, TreeNode } from '@theia/core/lib/browser';
import { SourceTreeWidget } from '@theia/core/lib/browser/source-tree';
import { VSXExtensionsSource, VSXExtensionsSourceOptions } from './vsx-extensions-source';
import { BadgeWidget } from '@theia/core/lib/browser/view-container';
import { Emitter, Event } from '@theia/core/lib/common';
import * as React from '@theia/core/shared/react';
export declare class VSXExtensionsWidgetOptions extends VSXExtensionsSourceOptions {
    title?: string;
}
export declare const generateExtensionWidgetId: (widgetId: string) => string;
export declare class VSXExtensionsWidget extends SourceTreeWidget implements BadgeWidget {
    static ID: string;
    static createWidget(parent: interfaces.Container, options: VSXExtensionsWidgetOptions): VSXExtensionsWidget;
    protected _badge?: number;
    protected onDidChangeBadgeEmitter: Emitter<void>;
    protected _badgeTooltip?: string;
    protected onDidChangeBadgeTooltipEmitter: Emitter<void>;
    protected readonly options: VSXExtensionsWidgetOptions;
    protected readonly extensionsSource: VSXExtensionsSource;
    protected init(): void;
    get onDidChangeBadge(): Event<void>;
    get badge(): number | undefined;
    set badge(count: number | undefined);
    get onDidChangeBadgeTooltip(): Event<void>;
    get badgeTooltip(): string | undefined;
    set badgeTooltip(tooltip: string | undefined);
    protected computeTitle(): string;
    protected resolveCount(): Promise<number | undefined>;
    protected tapNode(node?: TreeNode): void;
    protected handleDblClickEvent(): void;
    protected renderTree(model: TreeModel): React.ReactNode;
    protected onAfterShow(msg: Message): void;
}
//# sourceMappingURL=vsx-extensions-widget.d.ts.map