/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { ReactWidget, Message, Widget } from '@theia/core/lib/browser';
import { VSXExtension, VSXExtensionEditorComponent } from './vsx-extension';
import { VSXExtensionsModel } from './vsx-extensions-model';
import { Deferred } from '@theia/core/lib/common/promise-util';
export declare class VSXExtensionEditor extends ReactWidget {
    static ID: string;
    protected readonly extension: VSXExtension;
    protected readonly model: VSXExtensionsModel;
    protected readonly deferredScrollContainer: Deferred<HTMLElement>;
    protected init(): void;
    getScrollContainer(): Promise<HTMLElement>;
    protected onActivateRequest(msg: Message): void;
    protected onUpdateRequest(msg: Message): void;
    protected onAfterShow(msg: Message): void;
    protected updateTitle(): void;
    protected onResize(msg: Widget.ResizeMessage): void;
    protected resolveScrollContainer: (element: VSXExtensionEditorComponent | null) => void;
    protected render(): React.ReactNode;
}
//# sourceMappingURL=vsx-extension-editor.d.ts.map