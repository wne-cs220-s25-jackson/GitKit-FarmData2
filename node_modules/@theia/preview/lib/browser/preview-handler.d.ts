import URI from '@theia/core/lib/common/uri';
import { ContributionProvider, MaybePromise } from '@theia/core';
export declare const PreviewHandler: unique symbol;
/**
 * The parameters given to the preview handler to render the preview content.
 */
export interface RenderContentParams {
    /**
     * Textual content of the resource.
     */
    content: string;
    /**
     * URI identifying the source resource.
     */
    originUri: URI;
}
export declare namespace RenderContentParams {
    function is(params: unknown): params is RenderContentParams;
}
/**
 * A PreviewHandler manages the integration of one or more previews.
 *
 * It indicates whether a preview shall be rendered for a given resource URI and, if yes, renders the content.
 * Additionally it optionally provides methods with which the scroll state of the preview and corresponding
 * editor can be managed.
 *
 * See {@link MarkdownPreviewHandler} for an example implementation.
 */
export interface PreviewHandler {
    /**
     * One or more classes which specify the preview widget icon.
     */
    readonly iconClass?: string;
    /**
     * Indicates whether and with which priority (larger is better) this preview handler is responsible for the resource identified by the given URI.
     * If multiple handlers return the same priority it's undefined which one will be used.
     *
     * @param uri the URI identifying a resource.
     *
     * @returns a number larger than 0 if the handler is applicable, 0 or a negative number otherwise.
     */
    canHandle(uri: URI): number;
    /**
     * Render the preview content by returning appropriate HTML.
     *
     * @param params information for the handler to render its content.
     *
     * @returns the HTMLElement which will be attached to the preview widget.
     */
    renderContent(params: RenderContentParams): MaybePromise<HTMLElement | undefined>;
    /**
     * Search and return the HTMLElement which corresponds to the given fragment.
     * This is used to initially reveal elements identified via the URI fragment.
     *
     * @param content the preview widget element containing the content previously rendered by {@link PreviewHandler.renderContent}.
     * @param fragment the URI fragment for which the corresponding element shall be returned
     *
     * @returns the HTMLElement which is part of content and corresponds to the given fragment, undefined otherwise.
     */
    findElementForFragment?(content: HTMLElement, fragment: string): HTMLElement | undefined;
    /**
     * Search and return the HTMLElement which corresponds to the given line number.
     * This is used to scroll the preview when the source editor scrolls.
     *
     * @param content the preview widget element containing the previously rendered by {@link PreviewHandler.renderContent}.
     * @param sourceLine the line number for which the corresponding element shall be returned.
     *
     * @returns the HTMLElement which is part of content and corresponds to the given line number, undefined otherwise.
     */
    findElementForSourceLine?(content: HTMLElement, sourceLine: number): HTMLElement | undefined;
    /**
     * Returns the line number which corresponds to the preview element at the given offset.
     * This is used to scroll the source editor when the preview scrolls.
     *
     * @param content the preview widget element containing the previously rendered by {@link PreviewHandler.renderContent}.
     * @param offset the total amount by which the preview widget is scrolled.
     *
     * @returns the source line number which corresponds to the preview element at the given offset, undefined otherwise.
     */
    getSourceLineForOffset?(content: HTMLElement, offset: number): number | undefined;
}
/**
 * Provider managing the available PreviewHandlers.
 */
export declare class PreviewHandlerProvider {
    protected readonly previewHandlerContributions: ContributionProvider<PreviewHandler>;
    constructor(previewHandlerContributions: ContributionProvider<PreviewHandler>);
    /**
     * Find PreviewHandlers for the given resource identifier.
     *
     * @param uri the URI identifying a resource.
     *
     * @returns the list of all supported `PreviewHandlers` sorted by their priority.
     */
    findContribution(uri: URI): PreviewHandler[];
    /**
     * Indicates whether any PreviewHandler can process the resource identified by the given URI.
     *
     * @param uri the URI identifying a resource.
     *
     * @returns `true` when a PreviewHandler can process the resource, `false` otherwise.
     */
    canHandle(uri: URI): boolean;
}
//# sourceMappingURL=preview-handler.d.ts.map