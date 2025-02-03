import { UriComponents } from '../uri';
export interface MarkdownStringTrustedOptions {
    readonly enabledCommands: readonly string[];
}
export interface MarkdownString {
    readonly value: string;
    readonly isTrusted?: boolean | MarkdownStringTrustedOptions;
    readonly supportThemeIcons?: boolean;
    readonly supportHtml?: boolean;
    readonly baseUri?: UriComponents;
    uris?: {
        [href: string]: UriComponents;
    };
}
export declare enum MarkdownStringTextNewlineStyle {
    Paragraph = 0,
    Break = 1
}
export declare namespace MarkdownString {
    /**
     * @returns whether the candidate satisfies the interface of a markdown string
     */
    function is(candidate: unknown): candidate is MarkdownString;
}
export declare class MarkdownStringImpl implements MarkdownString {
    value: string;
    isTrusted?: boolean | MarkdownStringTrustedOptions;
    supportThemeIcons?: boolean;
    supportHtml?: boolean;
    baseUri?: UriComponents;
    constructor(value?: string, isTrustedOrOptions?: boolean | {
        isTrusted?: boolean;
        supportThemeIcons?: boolean;
        supportHtml?: boolean;
    });
    appendText(value: string, newlineStyle?: MarkdownStringTextNewlineStyle): MarkdownStringImpl;
    appendMarkdown(value: string): MarkdownStringImpl;
    appendCodeblock(langId: string, code: string): MarkdownStringImpl;
    appendLink(target: UriComponents | string, label: string, title?: string): MarkdownStringImpl;
    private _escape;
}
export declare function escapeMarkdownSyntaxTokens(text: string): string;
export declare function parseHrefAndDimensions(href: string): {
    href: string;
    dimensions: string[];
};
//# sourceMappingURL=markdown-string.d.ts.map