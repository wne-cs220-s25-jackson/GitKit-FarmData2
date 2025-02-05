import { interfaces, Container } from '@theia/core/shared/inversify';
import { ContextKeyService, ContextKey } from '@theia/core/lib/browser/context-key-service';
import { BaseWidget, Widget, Message, StatefulWidget } from '@theia/core/lib/browser';
import { MonacoEditor } from '@theia/monaco/lib/browser/monaco-editor';
import URI from '@theia/core/lib/common/uri';
import { MonacoEditorProvider } from '@theia/monaco/lib/browser/monaco-editor-provider';
import { ConsoleHistory } from './console-history';
import { ConsoleContentWidget } from './console-content-widget';
import { ConsoleSession } from './console-session';
import { ConsoleSessionManager } from './console-session-manager';
export declare const ConsoleOptions: unique symbol;
export interface ConsoleOptions {
    id: string;
    title?: {
        label?: string;
        iconClass?: string;
        caption?: string;
    };
    input: {
        uri: URI;
        options?: MonacoEditor.IOptions;
    };
    inputFocusContextKey?: ContextKey<boolean>;
}
export declare class ConsoleWidget extends BaseWidget implements StatefulWidget {
    static styles: {
        node: string;
        content: string;
        input: string;
    };
    static createContainer(parent: interfaces.Container, options: ConsoleOptions): Container;
    protected readonly options: ConsoleOptions;
    readonly content: ConsoleContentWidget;
    protected readonly history: ConsoleHistory;
    protected readonly sessionManager: ConsoleSessionManager;
    protected readonly editorProvider: MonacoEditorProvider;
    protected readonly contextKeyService: ContextKeyService;
    protected _input: MonacoEditor;
    protected _inputFocusContextKey: ContextKey<boolean>;
    constructor();
    protected init(): void;
    protected doInit(): Promise<void>;
    protected createInput(node: HTMLElement): Promise<MonacoEditor>;
    protected updateFont(): void;
    protected _session: ConsoleSession | undefined;
    set session(session: ConsoleSession | undefined);
    get session(): ConsoleSession | undefined;
    get input(): MonacoEditor;
    get consoleNavigationBackEnabled(): boolean;
    get consoleNavigationForwardEnabled(): boolean;
    selectAll(): void;
    collapseAll(): void;
    clear(): void;
    execute(): Promise<void>;
    navigateBack(): void;
    navigateForward(): void;
    protected revealLastOutput(): void;
    protected onActivateRequest(msg: Message): void;
    protected totalHeight: number;
    protected totalWidth: number;
    protected onResize(msg: Widget.ResizeMessage): void;
    protected resizeContent(): void;
    protected computeHeight(): number;
    storeState(): object;
    restoreState(oldState: object): void;
    hasInputFocus(): boolean;
}
//# sourceMappingURL=console-widget.d.ts.map