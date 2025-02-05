import { AbstractDialog, DialogProps, Message } from '@theia/core/lib/browser';
export declare class UntitledWorkspaceExitDialog extends AbstractDialog<UntitledWorkspaceExitDialog.Options> {
    protected readonly dontSaveButton: HTMLButtonElement;
    protected _value: UntitledWorkspaceExitDialog.Options;
    get value(): UntitledWorkspaceExitDialog.Options;
    constructor(props: DialogProps);
    protected onAfterAttach(msg: Message): void;
    protected addAcceptAction<K extends keyof HTMLElementEventMap>(element: HTMLElement, ...additionalEventTypes: K[]): void;
    protected dontSave(): void;
    protected doSave(): void;
}
export declare namespace UntitledWorkspaceExitDialog {
    const enum Values {
        "Don't Save" = "Don't Save",
        Cancel = "Cancel",
        Save = "Save"
    }
    type Options = keyof typeof Values;
}
//# sourceMappingURL=untitled-workspace-exit-dialog.d.ts.map