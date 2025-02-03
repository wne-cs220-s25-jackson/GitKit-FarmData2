/// <reference types="react" />
import { SelectionService } from '@theia/core/lib/common';
import * as React from '@theia/core/shared/react';
import { ContextMenuRenderer, ReactWidget, LabelProvider, KeybindingRegistry, StorageService } from '@theia/core/lib/browser';
import { ScmService } from './scm-service';
import { ScmAvatarService } from './scm-avatar-service';
export declare class ScmAmendWidget extends ReactWidget {
    protected readonly contextMenuRenderer: ContextMenuRenderer;
    static ID: string;
    protected readonly scmService: ScmService;
    protected readonly avatarService: ScmAvatarService;
    protected readonly storageService: StorageService;
    protected readonly selectionService: SelectionService;
    protected readonly labelProvider: LabelProvider;
    protected readonly keybindings: KeybindingRegistry;
    protected shouldScrollToRow: boolean;
    constructor(contextMenuRenderer: ContextMenuRenderer);
    protected render(): React.ReactNode;
    protected setInputValue: (event: React.FormEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLTextAreaElement> | string) => void;
}
//# sourceMappingURL=scm-amend-widget.d.ts.map