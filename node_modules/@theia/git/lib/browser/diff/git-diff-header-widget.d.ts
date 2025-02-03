/// <reference types="react" />
import { ScmService } from '@theia/scm/lib/browser/scm-service';
import { LabelProvider } from '@theia/core/lib/browser/label-provider';
import { ScmFileChangeLabelProvider } from '@theia/scm-extra/lib/browser/scm-file-change-label-provider';
import { ReactWidget, StatefulWidget, KeybindingRegistry } from '@theia/core/lib/browser';
import { Git } from '../../common';
import * as React from '@theia/core/shared/react';
export declare class GitDiffHeaderWidget extends ReactWidget implements StatefulWidget {
    protected readonly keybindings: KeybindingRegistry;
    protected readonly scmService: ScmService;
    protected readonly labelProvider: LabelProvider;
    protected readonly scmLabelProvider: ScmFileChangeLabelProvider;
    protected options: Git.Options.Diff;
    protected authorAvatar: string;
    constructor();
    setContent(options: Git.Options.Diff): Promise<void>;
    protected render(): React.ReactNode;
    /**
     * Create the container attributes for the widget.
     */
    protected createContainerAttributes(): React.HTMLAttributes<HTMLElement>;
    protected renderDiffListHeader(): React.ReactNode;
    protected doRenderDiffListHeader(...children: React.ReactNode[]): React.ReactNode;
    protected renderRepositoryHeader(): React.ReactNode;
    protected getRepositoryLabel(uri: string): string | undefined;
    protected renderPathHeader(): React.ReactNode;
    protected renderPath(): React.ReactNode;
    protected renderRevisionHeader(): React.ReactNode;
    protected renderRevision(): React.ReactNode;
    protected renderHeaderRow({ name, value, classNames, title }: {
        name: string;
        value: React.ReactNode;
        classNames?: string[];
        title?: string;
    }): React.ReactNode;
    protected get toRevision(): string | undefined;
    protected get fromRevision(): string | number | undefined;
    storeState(): object;
    restoreState(oldState: any): void;
}
//# sourceMappingURL=git-diff-header-widget.d.ts.map