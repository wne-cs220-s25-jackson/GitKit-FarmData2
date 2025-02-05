import { PreferenceLeafNodeRenderer, PreferenceNodeRenderer } from './preference-node-renderer';
import { interfaces } from '@theia/core/shared/inversify';
import { CommandService } from '@theia/core/lib/common';
import { Preference } from '../../util/preference-types';
import { JSONValue } from '@theia/core/shared/@phosphor/coreutils';
import { PreferenceLeafNodeRendererContribution } from './preference-node-renderer-creator';
export declare class PreferenceJSONLinkRenderer extends PreferenceLeafNodeRenderer<JSONValue, HTMLAnchorElement> {
    protected readonly commandService: CommandService;
    protected createInteractable(parent: HTMLElement): void;
    protected getFallbackValue(): JSONValue;
    protected doHandleValueChange(): void;
    protected handleUserInteraction(): void;
}
export declare class PreferenceJSONLinkRendererContribution extends PreferenceLeafNodeRendererContribution {
    static ID: string;
    id: string;
    canHandleLeafNode(_node: Preference.LeafNode): number;
    createLeafNodeRenderer(container: interfaces.Container): PreferenceNodeRenderer;
}
//# sourceMappingURL=preference-json-input.d.ts.map