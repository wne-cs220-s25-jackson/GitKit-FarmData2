/// <reference types="react" />
import { ScmAvatarService } from '@theia/scm/lib/browser/scm-avatar-service';
import { GitCommitDetailWidgetOptions } from './git-commit-detail-widget-options';
import { ReactWidget, KeybindingRegistry } from '@theia/core/lib/browser';
import { Git } from '../../common';
import * as React from '@theia/core/shared/react';
export declare class GitCommitDetailHeaderWidget extends ReactWidget {
    protected readonly commitDetailOptions: GitCommitDetailWidgetOptions;
    protected readonly keybindings: KeybindingRegistry;
    protected readonly avatarService: ScmAvatarService;
    protected options: Git.Options.Diff;
    protected authorAvatar: string;
    constructor(commitDetailOptions: GitCommitDetailWidgetOptions);
    protected init(): void;
    protected doInit(): Promise<void>;
    protected render(): React.ReactNode;
    protected createContainerAttributes(): React.HTMLAttributes<HTMLElement>;
    protected renderDiffListHeader(): React.ReactNode;
}
//# sourceMappingURL=git-commit-detail-header-widget.d.ts.map