import { interfaces } from '@theia/core/shared/inversify';
import { Preference } from '../../util/preference-types';
import { PreferenceLeafNodeRenderer, PreferenceNodeRenderer } from './preference-node-renderer';
import { PreferenceLeafNodeRendererContribution } from './preference-node-renderer-creator';
interface PreferenceNumberInputValidation {
    /**
     * the numeric value of the input. `NaN` if there is an error.
     */
    value: number;
    /**
     * the error message to display.
     */
    message: string;
}
export declare class PreferenceNumberInputRenderer extends PreferenceLeafNodeRenderer<number, HTMLInputElement> {
    protected _errorMessage: HTMLElement | undefined;
    protected interactableWrapper: HTMLElement;
    get errorMessage(): HTMLElement;
    protected createInteractable(parent: HTMLElement): void;
    protected getFallbackValue(): number;
    protected handleUserInteraction(): void;
    protected handleBlur(): Promise<void>;
    protected doHandleValueChange(): void;
    protected getInputValidation(input: string): PreferenceNumberInputValidation;
    protected showErrorMessage(message: string): void;
    protected hideErrorMessage(): void;
}
export declare class PreferenceNumberInputRendererContribution extends PreferenceLeafNodeRendererContribution {
    static ID: string;
    id: string;
    canHandleLeafNode(node: Preference.LeafNode): number;
    createLeafNodeRenderer(container: interfaces.Container): PreferenceNodeRenderer;
}
export {};
//# sourceMappingURL=preference-number-input.d.ts.map