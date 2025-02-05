/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { NotebookModel } from '../view-model/notebook-model';
import { CellRenderer } from './notebook-cell-list-view';
import { NotebookCellModel } from '../view-model/notebook-cell-model';
import { MonacoEditorServices } from '@theia/monaco/lib/browser/monaco-editor';
import { CommandRegistry } from '@theia/core';
import { NotebookContextManager } from '../service/notebook-context-manager';
import { NotebookOptionsService } from '../service/notebook-options';
import { NotebookCellEditorService } from '../service/notebook-cell-editor-service';
import { NotebookCellStatusBarService } from '../service/notebook-cell-status-bar-service';
import { LabelParser } from '@theia/core/lib/browser/label-parser';
export declare class NotebookMarkdownCellRenderer implements CellRenderer {
    private readonly markdownRenderer;
    protected readonly monacoServices: MonacoEditorServices;
    protected readonly notebookContextManager: NotebookContextManager;
    protected readonly commandRegistry: CommandRegistry;
    protected readonly notebookOptionsService: NotebookOptionsService;
    protected readonly notebookCellEditorService: NotebookCellEditorService;
    protected readonly notebookCellStatusBarService: NotebookCellStatusBarService;
    protected readonly labelParser: LabelParser;
    render(notebookModel: NotebookModel, cell: NotebookCellModel): React.ReactNode;
    renderSidebar(notebookModel: NotebookModel, cell: NotebookCellModel): React.ReactNode;
    renderDragImage(cell: NotebookCellModel): HTMLElement;
}
//# sourceMappingURL=notebook-markdown-cell-view.d.ts.map