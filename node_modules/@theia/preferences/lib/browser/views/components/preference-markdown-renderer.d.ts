import { PreferenceTreeModel } from '../../preference-tree-model';
import { PreferenceTreeLabelProvider } from '../../util/preference-tree-label-provider';
import * as markdownit from '@theia/core/shared/markdown-it';
import { CommandRegistry } from '@theia/core';
export declare class PreferenceMarkdownRenderer {
    protected readonly model: PreferenceTreeModel;
    protected readonly labelProvider: PreferenceTreeLabelProvider;
    protected readonly commandRegistry: CommandRegistry;
    protected _renderer?: markdownit;
    render(text: string): string;
    renderInline(text: string): string;
    protected getRenderer(): markdownit;
    protected buildMarkdownRenderer(): markdownit;
}
//# sourceMappingURL=preference-markdown-renderer.d.ts.map