/// <reference types="react" />
import { Widget } from '@theia/core/lib/browser';
import { ScmService } from '@theia/scm/lib/browser/scm-service';
import { LabelProvider } from '@theia/core/lib/browser/label-provider';
import { Message } from '@theia/core/shared/@phosphor/messaging';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import * as React from '@theia/core/shared/react';
import { ScmFileChangeLabelProvider } from './scm-file-change-label-provider';
import { ScmFileChangeNode } from './scm-file-change-node';
export declare abstract class ScmNavigableListWidget<T extends {
    selected?: boolean;
}> extends ReactWidget {
    protected scmNodes: T[];
    private _scrollContainer;
    protected readonly scmService: ScmService;
    protected readonly labelProvider: LabelProvider;
    protected readonly scmLabelProvider: ScmFileChangeLabelProvider;
    constructor();
    protected onActivateRequest(msg: Message): void;
    protected set scrollContainer(id: string);
    protected get scrollContainer(): string;
    protected onUpdateRequest(msg: Message): void;
    protected onResize(msg: Widget.ResizeMessage): void;
    protected getRepositoryLabel(uri: string): string | undefined;
    protected renderHeaderRow({ name, value, classNames, title }: {
        name: string;
        value: React.ReactNode;
        classNames?: string[];
        title?: string;
    }): React.ReactNode;
    protected addListNavigationKeyListeners(container: HTMLElement): void;
    protected navigateLeft(): void;
    protected navigateRight(): void;
    protected navigateUp(): void;
    protected navigateDown(): void;
    protected handleListEnter(): void;
    protected getSelected(): T | undefined;
    protected selectNode(node: T): void;
    protected selectNextNode(): void;
    protected selectPreviousNode(): void;
    protected get indexOfSelected(): number;
}
export declare namespace ScmItemComponent {
    interface Props {
        labelProvider: LabelProvider;
        scmLabelProvider: ScmFileChangeLabelProvider;
        change: ScmFileChangeNode;
        revealChange: (change: ScmFileChangeNode) => void;
        selectNode: (change: ScmFileChangeNode) => void;
    }
}
export declare class ScmItemComponent extends React.Component<ScmItemComponent.Props> {
    render(): JSX.Element;
    protected readonly revealChange: () => void;
    protected readonly selectNode: () => void;
}
//# sourceMappingURL=scm-navigable-list-widget.d.ts.map