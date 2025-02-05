import { Resource } from '@theia/core';
import { Navigatable } from '@theia/core/lib/browser/navigatable';
import { BaseWidget, Message } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { Event, Emitter } from '@theia/core/lib/common';
import { PreviewHandler, PreviewHandlerProvider } from './preview-handler';
import { ThemeService } from '@theia/core/lib/browser/theming';
import { EditorPreferences } from '@theia/editor/lib/browser';
import { Disposable } from '@theia/core/lib/common/disposable';
import { MonacoWorkspace } from '@theia/monaco/lib/browser/monaco-workspace';
import { Location } from '@theia/core/shared/vscode-languageserver-protocol';
export declare const PREVIEW_WIDGET_CLASS = "theia-preview-widget";
export declare const PreviewWidgetOptions: unique symbol;
export interface PreviewWidgetOptions {
    resource: Resource;
}
export declare class PreviewWidget extends BaseWidget implements Navigatable {
    protected readonly options: PreviewWidgetOptions;
    protected readonly previewHandlerProvider: PreviewHandlerProvider;
    protected readonly themeService: ThemeService;
    protected readonly workspace: MonacoWorkspace;
    protected readonly editorPreferences: EditorPreferences;
    readonly uri: URI;
    protected readonly resource: Resource;
    protected previewHandler: PreviewHandler | undefined;
    protected firstUpdate: (() => void) | undefined;
    protected readonly onDidScrollEmitter: Emitter<number>;
    protected readonly onDidDoubleClickEmitter: Emitter<Location>;
    protected scrollBeyondLastLine: boolean;
    constructor(options: PreviewWidgetOptions, previewHandlerProvider: PreviewHandlerProvider, themeService: ThemeService, workspace: MonacoWorkspace, editorPreferences: EditorPreferences);
    initialize(): Promise<void>;
    protected onBeforeAttach(msg: Message): void;
    protected preventScrollNotification: boolean;
    protected startScrollSync(): Disposable;
    protected startDoubleClickListener(): Disposable;
    getUri(): URI;
    getResourceUri(): URI | undefined;
    createMoveToUri(resourceUri: URI): URI | undefined;
    onActivateRequest(msg: Message): void;
    onUpdateRequest(msg: Message): void;
    protected forceUpdate(): void;
    protected previousContent: string | undefined;
    protected performUpdate(): Promise<void>;
    protected render(content: string, originUri: URI): Promise<HTMLElement | undefined>;
    protected revealFragment(uri: URI): void;
    revealForSourceLine(sourceLine: number): void;
    protected readonly internalRevealForSourceLine: (sourceLine: number) => void;
    get onDidScroll(): Event<number>;
    protected fireDidScrollToSourceLine(line: number): void;
    protected didScroll(scrollTop: number): void;
    get onDidDoubleClick(): Event<Location>;
    protected fireDidDoubleClickToSourceLine(line: number): void;
    protected didDoubleClick(offsetTop: number): void;
}
//# sourceMappingURL=preview-widget.d.ts.map