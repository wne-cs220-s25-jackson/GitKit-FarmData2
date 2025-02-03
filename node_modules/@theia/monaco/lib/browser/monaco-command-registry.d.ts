import { Command, CommandHandler, CommandRegistry, SelectionService } from '@theia/core';
import { MonacoEditor } from './monaco-editor';
import { MonacoEditorProvider } from './monaco-editor-provider';
export interface MonacoEditorCommandHandler {
    execute(editor: MonacoEditor, ...args: any[]): any;
    isEnabled?(editor: MonacoEditor, ...args: any[]): boolean;
}
export declare class MonacoCommandRegistry {
    protected readonly monacoEditors: MonacoEditorProvider;
    protected readonly commands: CommandRegistry;
    protected readonly selectionService: SelectionService;
    validate(command: string | undefined): string | undefined;
    registerCommand(command: Command, handler: MonacoEditorCommandHandler): void;
    registerHandler(command: string, handler: MonacoEditorCommandHandler): void;
    protected newHandler(monacoHandler: MonacoEditorCommandHandler): CommandHandler;
    protected execute(monacoHandler: MonacoEditorCommandHandler, ...args: any[]): any;
    protected isEnabled(monacoHandler: MonacoEditorCommandHandler, ...args: any[]): boolean;
    protected isVisible(monacoHandler: MonacoEditorCommandHandler, ...args: any[]): boolean;
}
//# sourceMappingURL=monaco-command-registry.d.ts.map