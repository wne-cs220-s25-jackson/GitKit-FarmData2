import '../../src/browser/style/output.css';
import { SelectionService } from '@theia/core/lib/common/selection-service';
import { MonacoEditorProvider } from '@theia/monaco/lib/browser/monaco-editor-provider';
import { DisposableCollection } from '@theia/core/lib/common/disposable';
import { Message, BaseWidget, DockPanel, Widget, StatefulWidget } from '@theia/core/lib/browser';
import { OutputChannelManager } from './output-channel';
import { Emitter, Event } from '@theia/core';
export declare class OutputWidget extends BaseWidget implements StatefulWidget {
    static readonly ID = "outputView";
    static readonly LABEL: string;
    protected readonly selectionService: SelectionService;
    protected readonly editorProvider: MonacoEditorProvider;
    protected readonly outputChannelManager: OutputChannelManager;
    protected _state: OutputWidget.State;
    protected readonly editorContainer: DockPanel;
    protected readonly toDisposeOnSelectedChannelChanged: DisposableCollection;
    protected readonly onStateChangedEmitter: Emitter<OutputWidget.State>;
    constructor();
    protected init(): void;
    storeState(): object;
    restoreState(oldState: object & Partial<OutputWidget.State>): void;
    protected get state(): OutputWidget.State;
    protected set state(state: OutputWidget.State);
    protected refreshEditorWidget({ preserveFocus }?: {
        preserveFocus: boolean;
    }): Promise<void>;
    protected onAfterAttach(message: Message): void;
    protected onActivateRequest(message: Message): void;
    protected onResize(message: Widget.ResizeMessage): void;
    protected onAfterShow(msg: Message): void;
    get onStateChanged(): Event<OutputWidget.State>;
    clear(): void;
    selectAll(): void;
    lock(): void;
    unlock(): void;
    get isLocked(): boolean;
    protected revealLastLine(): void;
    private get selectedChannel();
    private createEditorWidget;
    private get editorWidget();
    private get editor();
    getText(): string | undefined;
}
export declare namespace OutputWidget {
    interface State {
        locked?: boolean;
    }
}
//# sourceMappingURL=output-widget.d.ts.map