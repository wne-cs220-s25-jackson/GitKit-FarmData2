import { EditorManager } from './editor-manager';
import { TextEditor } from './editor';
import { StatusBar } from '@theia/core/lib/browser/status-bar/status-bar';
import { FrontendApplicationContribution, QuickInputService, KeybindingRegistry, KeybindingContribution, ApplicationShell, WidgetStatusBarContribution, Widget, OpenWithService } from '@theia/core/lib/browser';
import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
import { DisposableCollection, MenuContribution, MenuModelRegistry } from '@theia/core';
import { CommandRegistry, CommandContribution } from '@theia/core/lib/common';
import { EditorWidget } from './editor-widget';
import { EditorLanguageStatusService } from './language-status/editor-language-status-service';
export declare class EditorContribution implements FrontendApplicationContribution, CommandContribution, KeybindingContribution, MenuContribution, WidgetStatusBarContribution<EditorWidget> {
    protected readonly editorManager: EditorManager;
    protected readonly openWithService: OpenWithService;
    protected readonly languageStatusService: EditorLanguageStatusService;
    protected readonly shell: ApplicationShell;
    protected readonly contextKeyService: ContextKeyService;
    protected readonly quickInputService: QuickInputService;
    onStart(): void;
    protected initEditorContextKeys(): void;
    protected readonly toDisposeOnCurrentEditorChanged: DisposableCollection;
    canHandle(widget: Widget): widget is EditorWidget;
    activate(statusBar: StatusBar, widget: EditorWidget): void;
    deactivate(statusBar: StatusBar): void;
    protected updateLanguageStatus(statusBar: StatusBar, editor: TextEditor | undefined): void;
    protected updateEncodingStatus(statusBar: StatusBar, editor: TextEditor | undefined): void;
    protected setCursorPositionStatus(statusBar: StatusBar, editor: TextEditor | undefined): void;
    registerCommands(commands: CommandRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
    registerMenus(registry: MenuModelRegistry): void;
}
//# sourceMappingURL=editor-contribution.d.ts.map