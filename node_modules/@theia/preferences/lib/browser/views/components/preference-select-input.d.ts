/// <reference types="react" />
import { PreferenceLeafNodeRenderer, PreferenceNodeRenderer } from './preference-node-renderer';
import { interfaces } from '@theia/core/shared/inversify';
import { JSONValue } from '@theia/core/shared/@phosphor/coreutils';
import { SelectComponent, SelectOption } from '@theia/core/lib/browser/widgets/select-component';
import { Preference } from '../../util/preference-types';
import { PreferenceLeafNodeRendererContribution } from './preference-node-renderer-creator';
import * as React from '@theia/core/shared/react';
export declare class PreferenceSelectInputRenderer extends PreferenceLeafNodeRenderer<JSONValue, HTMLDivElement> {
    protected readonly selectComponent: React.RefObject<SelectComponent>;
    protected selectOptions: SelectOption[];
    protected get enumValues(): JSONValue[];
    protected updateSelectOptions(): void;
    protected createInteractable(parent: HTMLElement): void;
    protected getFallbackValue(): JSONValue;
    protected doHandleValueChange(): void;
    /**
     * Returns the stringified index corresponding to the currently selected value.
     */
    protected getDataValue(): number;
    protected handleUserInteraction(selected: number): void;
}
export declare class PreferenceSelectInputRendererContribution extends PreferenceLeafNodeRendererContribution {
    static ID: string;
    id: string;
    canHandleLeafNode(node: Preference.LeafNode): number;
    createLeafNodeRenderer(container: interfaces.Container): PreferenceNodeRenderer;
}
//# sourceMappingURL=preference-select-input.d.ts.map