import { interfaces } from '@theia/core/shared/inversify';
import { Preference } from '../../util/preference-types';
import { PreferenceLeafNodeRenderer, PreferenceNodeRenderer } from './preference-node-renderer';
import { PreferenceLeafNodeRendererContribution } from './preference-node-renderer-creator';
export declare class PreferenceArrayInputRenderer extends PreferenceLeafNodeRenderer<string[], HTMLInputElement> {
    existingValues: Map<string, {
        node: HTMLElement;
        index: number;
    }>;
    wrapper: HTMLElement;
    inputWrapper: HTMLElement;
    protected createInteractable(parent: HTMLElement): void;
    protected getFallbackValue(): string[];
    protected createExistingValue(value: string): HTMLElement;
    protected createInput(): HTMLElement;
    protected doHandleValueChange(): void;
    protected removeItem(value: string): void;
    protected handleEnter(e: KeyboardEvent): void;
    protected addItem(): void;
    protected getOrderedValues(): string[];
    dispose(): void;
}
export declare class PreferenceArrayInputRendererContribution extends PreferenceLeafNodeRendererContribution {
    static ID: string;
    id: string;
    canHandleLeafNode(node: Preference.LeafNode): number;
    createLeafNodeRenderer(container: interfaces.Container): PreferenceNodeRenderer;
}
//# sourceMappingURL=preference-array-input.d.ts.map