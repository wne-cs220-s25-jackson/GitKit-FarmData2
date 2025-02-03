import { interfaces } from '@theia/core/shared/inversify';
import { Preference } from '../../util/preference-types';
import { PreferenceLeafNodeRenderer, PreferenceNodeRenderer } from './preference-node-renderer';
import { PreferenceLeafNodeRendererContribution } from './preference-node-renderer-creator';
export declare class PreferenceStringInputRenderer extends PreferenceLeafNodeRenderer<string, HTMLInputElement> {
    protected createInteractable(parent: HTMLElement): void;
    protected getFallbackValue(): string;
    protected doHandleValueChange(): void;
    protected handleUserInteraction(): void;
    protected handleBlur(): Promise<void>;
}
export declare class PreferenceStringInputRendererContribution extends PreferenceLeafNodeRendererContribution {
    static ID: string;
    id: string;
    canHandleLeafNode(node: Preference.LeafNode): number;
    createLeafNodeRenderer(container: interfaces.Container): PreferenceNodeRenderer;
}
//# sourceMappingURL=preference-string-input.d.ts.map