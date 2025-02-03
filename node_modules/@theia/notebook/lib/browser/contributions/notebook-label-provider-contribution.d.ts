import { LabelProvider, LabelProviderContribution } from '@theia/core/lib/browser';
import { NotebookService } from '../service/notebook-service';
import { NotebookCellOutlineNode } from './notebook-outline-contribution';
import type Token = require('markdown-it/lib/token');
import markdownit = require('@theia/core/shared/markdown-it');
import { NotebookCellModel } from '../view-model/notebook-cell-model';
import { URI } from '@theia/core';
export declare class NotebookLabelProviderContribution implements LabelProviderContribution {
    protected readonly notebookService: NotebookService;
    protected readonly labelProvider: LabelProvider;
    protected markdownIt: markdownit;
    canHandle(element: object): number;
    getIcon(element: NotebookCellOutlineNode): string;
    getName(element: NotebookCellOutlineNode): string;
    getLongName(element: NotebookCellOutlineNode): string;
    extractPlaintext(parsedMarkdown: Token[]): string;
    findCellByUri(uri: URI): NotebookCellModel | undefined;
}
//# sourceMappingURL=notebook-label-provider-contribution.d.ts.map