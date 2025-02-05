import { Command, CommandContribution, CommandRegistry } from '@theia/core';
import { NotebookEditorWidgetService } from '../service/notebook-editor-widget-service';
import { CellOutput } from '../../common';
import { NotebookCellModel } from '../view-model/notebook-cell-model';
import { EditorManager } from '@theia/editor/lib/browser';
export declare namespace NotebookOutputCommands {
    const ENABLE_SCROLLING: Command;
    const OPEN_LARGE_OUTPUT: Command;
}
export declare class NotebookOutputActionContribution implements CommandContribution {
    protected readonly notebookEditorService: NotebookEditorWidgetService;
    protected readonly editorManager: EditorManager;
    registerCommands(commands: CommandRegistry): void;
    protected findOutputAndCell(output: string): [NotebookCellModel, CellOutput] | undefined;
}
//# sourceMappingURL=notebook-output-action-contribution.d.ts.map