import URI from '../common/uri';
import { LabelProviderContribution, LabelProvider, DidChangeLabelEvent } from './label-provider';
export declare namespace DiffUris {
    const DIFF_SCHEME = "diff";
    function encode(left: URI, right: URI, label?: string): URI;
    function decode(uri: URI): URI[];
    function isDiffUri(uri: URI): boolean;
}
export declare class DiffUriLabelProviderContribution implements LabelProviderContribution {
    protected labelProvider: LabelProvider;
    constructor(labelProvider: LabelProvider);
    canHandle(element: object): number;
    getLongName(uri: URI): string;
    getName(uri: URI): string;
    getIcon(uri: URI): string;
    affects(diffUri: URI, event: DidChangeLabelEvent): boolean;
}
//# sourceMappingURL=diff-uris.d.ts.map