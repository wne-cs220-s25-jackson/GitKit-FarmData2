import URI from '@theia/core/lib/common/uri';
import { MiniBrowserEnvironment } from '@theia/mini-browser/lib/browser/environment/mini-browser-environment';
export declare class PreviewLinkNormalizer {
    protected urlScheme: RegExp;
    protected readonly miniBrowserEnvironment: MiniBrowserEnvironment;
    normalizeLink(documentUri: URI, link: string): string;
}
//# sourceMappingURL=preview-link-normalizer.d.ts.map