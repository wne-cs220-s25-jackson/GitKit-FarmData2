import URI from '@theia/core/lib/common/uri';
import { OpenerService } from '@theia/core/lib/browser';
import * as markdownit from '@theia/core/shared/markdown-it';
import { PreviewHandler, RenderContentParams } from '../preview-handler';
import { PreviewLinkNormalizer } from '../preview-link-normalizer';
export declare class MarkdownPreviewHandler implements PreviewHandler {
    readonly iconClass: string;
    readonly contentClass: string;
    protected readonly openerService: OpenerService;
    protected readonly linkNormalizer: PreviewLinkNormalizer;
    canHandle(uri: URI): number;
    renderContent(params: RenderContentParams): HTMLElement;
    protected addLinkClickedListener(contentElement: HTMLElement, params: RenderContentParams): void;
    protected findLink(element: HTMLElement, container: HTMLElement): string | undefined;
    protected openLink(uri: URI, originUri: URI): Promise<void>;
    protected resolveUri(link: string, uri: URI, preview: boolean): URI;
    protected revealFragment(contentElement: HTMLElement, fragment: string): void;
    findElementForFragment(content: HTMLElement, link: string): HTMLElement | undefined;
    findElementForSourceLine(content: HTMLElement, sourceLine: number): HTMLElement | undefined;
    getSourceLineForOffset(content: HTMLElement, offset: number): number | undefined;
    /**
     * returns two significant line elements for the given offset.
     */
    protected getLineElementsAtOffset(content: HTMLElement, offset: number): HTMLElement[];
    protected getLineNumberFromAttribute(element: HTMLElement): number | undefined;
    protected engine: markdownit | undefined;
    protected getEngine(): markdownit;
}
//# sourceMappingURL=markdown-preview-handler.d.ts.map