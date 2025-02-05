import { Widget } from '@theia/core/shared/@phosphor/widgets';
import { FrontendApplicationContribution, WidgetOpenerOptions, NavigatableWidgetOpenHandler } from '@theia/core/lib/browser';
import { EditorManager, TextEditor, EditorWidget } from '@theia/editor/lib/browser';
import { CommandContribution, CommandRegistry, Command, MenuContribution, MenuModelRegistry, Disposable } from '@theia/core/lib/common';
import { TabBarToolbarContribution, TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import URI from '@theia/core/lib/common/uri';
import { Position } from '@theia/core/shared/vscode-languageserver-protocol';
import { PreviewWidget } from './preview-widget';
import { PreviewHandlerProvider } from './preview-handler';
import { PreviewPreferences } from './preview-preferences';
export declare namespace PreviewCommands {
    /**
     * No `label`. Otherwise, it would show up in the `Command Palette` and we already have the `Preview` open handler.
     * See in (`WorkspaceCommandContribution`)[https://bit.ly/2DncrSD].
     */
    const OPEN: Command;
    const OPEN_SOURCE: Command;
}
export interface PreviewOpenerOptions extends WidgetOpenerOptions {
    originUri?: URI;
}
export declare class PreviewContribution extends NavigatableWidgetOpenHandler<PreviewWidget> implements CommandContribution, MenuContribution, FrontendApplicationContribution, TabBarToolbarContribution {
    readonly id = "code-editor-preview";
    readonly label: string;
    protected readonly editorManager: EditorManager;
    protected readonly previewHandlerProvider: PreviewHandlerProvider;
    protected readonly preferences: PreviewPreferences;
    protected readonly synchronizedUris: Set<string>;
    protected scrollSyncLockOn: 'preview' | 'editor' | undefined;
    protected scrollSyncLockTimeout: number | undefined;
    onStart(): void;
    protected lockScrollSync(on: 'preview' | 'editor', delay?: number): Promise<void>;
    protected registerEditorAndPreviewSync(source: PreviewWidget | EditorWidget): Promise<void>;
    protected revealSourceLineInPreview(previewWidget: PreviewWidget, position: Position): void;
    protected synchronizeScrollToEditor(previewWidget: PreviewWidget, editor: TextEditor): Disposable;
    protected registerOpenOnDoubleClick(ref: PreviewWidget): void;
    canHandle(uri: URI): number;
    protected get openByDefault(): boolean;
    open(uri: URI, options?: PreviewOpenerOptions): Promise<PreviewWidget>;
    protected serializeUri(uri: URI): string;
    protected resolveOpenerOptions(options?: PreviewOpenerOptions): Promise<PreviewOpenerOptions>;
    registerCommands(registry: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerToolbarItems(registry: TabBarToolbarRegistry): void;
    protected canHandleEditorUri(widget?: Widget): boolean;
    protected getCurrentEditorUri(widget?: Widget): URI | undefined;
    protected getCurrentEditor(widget?: Widget): EditorWidget | undefined;
    protected openForEditor(widget?: Widget): Promise<void>;
    protected openSource(ref: PreviewWidget): Promise<EditorWidget>;
}
//# sourceMappingURL=preview-contribution.d.ts.map