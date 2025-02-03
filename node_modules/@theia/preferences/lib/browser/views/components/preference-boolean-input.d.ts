import { interfaces } from '@theia/core/shared/inversify';
import { Preference } from '../../util/preference-types';
import { PreferenceLeafNodeRenderer, PreferenceNodeRenderer } from './preference-node-renderer';
import { PreferenceLeafNodeRendererContribution } from './preference-node-renderer-creator';
export declare class PreferenceBooleanInputRenderer extends PreferenceLeafNodeRenderer<boolean, HTMLInputElement> {
    protected createInteractable(parent: HTMLElement): void;
    protected getAdditionalNodeClassnames(): Iterable<string>;
    protected getFallbackValue(): false;
    protected handleUserInteraction(): Promise<void>;
    protected doHandleValueChange(): void;
}
export declare class PreferenceBooleanInputRendererContribution extends PreferenceLeafNodeRendererContribution {
    static ID: string;
    id: string;
    canHandleLeafNode(node: Preference.LeafNode): number;
    createLeafNodeRenderer(container: interfaces.Container): PreferenceNodeRenderer;
}
//# sourceMappingURL=preference-boolean-input.d.ts.map