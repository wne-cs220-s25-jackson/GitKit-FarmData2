import { LabelProviderContribution, LabelProvider, DidChangeLabelEvent } from '@theia/core/lib/browser/label-provider';
import URI from '@theia/core/lib/common/uri';
export declare class GitUriLabelProviderContribution implements LabelProviderContribution {
    protected labelProvider: LabelProvider;
    constructor(labelProvider: LabelProvider);
    canHandle(element: object): number;
    getLongName(uri: URI): string;
    getName(uri: URI): string;
    getIcon(uri: URI): string;
    affects(uri: URI, event: DidChangeLabelEvent): boolean;
    protected toFileUri(uri: URI): URI;
    protected getTagSuffix(uri: URI): string;
}
//# sourceMappingURL=git-uri-label-contribution.d.ts.map