import { IMarkdownString } from '../common/htmlContent.js';
import * as marked from '../common/marked/marked.js';
import { URI } from '../common/uri.js';
import { FormattedTextRenderOptions } from './formattedTextRenderer.js';
export interface MarkedOptions extends marked.MarkedOptions {
    baseUrl?: never;
}
export interface MarkdownRenderOptions extends FormattedTextRenderOptions {
    readonly codeBlockRenderer?: (languageId: string, value: string) => Promise<HTMLElement>;
    readonly codeBlockRendererSync?: (languageId: string, value: string, raw?: string) => HTMLElement;
    readonly asyncRenderCallback?: () => void;
    readonly fillInIncompleteTokens?: boolean;
    readonly remoteImageIsAllowed?: (uri: URI) => boolean;
    readonly sanitizerOptions?: ISanitizerOptions;
}
export interface ISanitizerOptions {
    replaceWithPlaintext?: boolean;
    allowedTags?: string[];
}
/**
 * Low-level way create a html element from a markdown string.
 *
 * **Note** that for most cases you should be using {@link import('../../editor/browser/widget/markdownRenderer/browser/markdownRenderer.js').MarkdownRenderer MarkdownRenderer}
 * which comes with support for pretty code block rendering and which uses the default way of handling links.
 */
export declare function renderMarkdown(markdown: IMarkdownString, options?: MarkdownRenderOptions, markedOptions?: Readonly<MarkedOptions>): {
    element: HTMLElement;
    dispose: () => void;
};
export declare const allowedMarkdownAttr: string[];
/**
 * Strips all markdown from `string`, if it's an IMarkdownString. For example
 * `# Header` would be output as `Header`. If it's not, the string is returned.
 */
export declare function renderStringAsPlaintext(string: IMarkdownString | string): string;
/**
 * Strips all markdown from `markdown`
 *
 * For example `# Header` would be output as `Header`.
 *
 * @param withCodeBlocks Include the ``` of code blocks as well
 */
export declare function renderMarkdownAsPlaintext(markdown: IMarkdownString, withCodeBlocks?: boolean): string;
export declare function fillInIncompleteTokens(tokens: marked.TokensList): marked.TokensList;
