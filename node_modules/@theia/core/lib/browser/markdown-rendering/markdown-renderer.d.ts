import * as markdownit from 'markdown-it';
import { MarkdownString } from '../../common/markdown-rendering/markdown-string';
import { Disposable, DisposableGroup } from '../../common';
import { LabelParser } from '../label-parser';
export interface ContentActionHandler {
    callback: (content: string, event?: MouseEvent | KeyboardEvent) => void;
    readonly disposables: DisposableGroup;
}
export interface FormattedTextRenderOptions {
    readonly className?: string;
    readonly inline?: boolean;
    readonly actionHandler?: ContentActionHandler;
    readonly renderCodeSegments?: boolean;
}
export interface MarkdownRenderResult extends Disposable {
    element: HTMLElement;
}
export interface MarkdownRenderOptions extends FormattedTextRenderOptions {
    readonly codeBlockRenderer?: (languageId: string, value: string) => Promise<HTMLElement>;
    readonly asyncRenderCallback?: () => void;
}
/** Use this directly if you aren't worried about circular dependencies in the Shell */
export declare const MarkdownRenderer: unique symbol;
export interface MarkdownRenderer {
    render(markdown: MarkdownString | undefined, options?: MarkdownRenderOptions): MarkdownRenderResult;
}
/** Use this to avoid circular dependencies in the Shell */
export declare const MarkdownRendererFactory: unique symbol;
export interface MarkdownRendererFactory {
    (): MarkdownRenderer;
}
export declare class MarkdownRendererImpl implements MarkdownRenderer {
    protected readonly labelParser: LabelParser;
    protected readonly markdownIt: markdownit;
    protected resetRenderer: Disposable | undefined;
    protected init(): void;
    render(markdown: MarkdownString | undefined, options?: MarkdownRenderOptions): MarkdownRenderResult;
    protected markdownItPlugin(): void;
}
//# sourceMappingURL=markdown-renderer.d.ts.map