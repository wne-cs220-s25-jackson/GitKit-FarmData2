/// <reference types="react" />
import { DisposableCollection } from '@theia/core';
import { Message } from '@theia/core/shared/@phosphor/messaging';
import * as React from '@theia/core/shared/react';
import { ScmInput } from './scm-input';
import { ContextMenuRenderer, ReactWidget, KeybindingRegistry, StatefulWidget } from '@theia/core/lib/browser';
import { ScmService } from './scm-service';
export declare class ScmCommitWidget extends ReactWidget implements StatefulWidget {
    protected readonly contextMenuRenderer: ContextMenuRenderer;
    static ID: string;
    protected readonly scmService: ScmService;
    protected readonly keybindings: KeybindingRegistry;
    protected readonly toDisposeOnRepositoryChange: DisposableCollection;
    protected shouldScrollToRow: boolean;
    /**
     * Don't modify DOM use React! only exposed for `focusInput`
     * Use `this.scmService.selectedRepository?.input.value` as a single source of truth!
     */
    protected readonly inputRef: React.RefObject<HTMLTextAreaElement>;
    constructor(contextMenuRenderer: ContextMenuRenderer);
    protected onAfterAttach(msg: Message): void;
    protected refreshOnRepositoryChange(): void;
    protected onActivateRequest(msg: Message): void;
    focus(): void;
    protected render(): React.ReactNode;
    /**
     * Create the container attributes for the widget.
     */
    protected createContainerAttributes(): React.HTMLAttributes<HTMLElement>;
    protected renderInput(input: ScmInput): React.ReactNode;
    protected setInputValue: (event: React.FormEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLTextAreaElement> | string) => void;
    /**
     * Store the tree state.
     */
    storeState(): ScmCommitWidget.State;
    /**
     * Restore the state.
     * @param oldState the old state object.
     */
    restoreState(oldState: ScmCommitWidget.State): void;
}
export declare namespace ScmCommitWidget {
    namespace Styles {
        const INPUT_MESSAGE_CONTAINER = "theia-scm-input-message-container";
        const INPUT_MESSAGE = "theia-scm-input-message";
        const VALIDATION_MESSAGE = "theia-scm-input-validation-message";
        const NO_SELECT = "no-select";
    }
    interface State {
        message?: string;
    }
}
//# sourceMappingURL=scm-commit-widget.d.ts.map