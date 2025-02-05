import { ContributionProvider, Disposable, Emitter, Event } from '@theia/core';
import { interfaces } from '@theia/core/shared/inversify';
import { Preference } from '../../util/preference-types';
import { PreferenceNodeRenderer } from './preference-node-renderer';
export declare const PreferenceNodeRendererCreatorRegistry: unique symbol;
export interface PreferenceNodeRendererCreatorRegistry {
    registerPreferenceNodeRendererCreator(creator: PreferenceNodeRendererCreator): Disposable;
    unregisterPreferenceNodeRendererCreator(creator: PreferenceNodeRendererCreator): void;
    getPreferenceNodeRendererCreator(node: Preference.TreeNode): PreferenceNodeRendererCreator;
    onDidChange: Event<void>;
}
export declare const PreferenceNodeRendererContribution: unique symbol;
export interface PreferenceNodeRendererContribution {
    registerPreferenceNodeRendererCreator(registry: PreferenceNodeRendererCreatorRegistry): void;
}
export declare const PreferenceNodeRendererCreator: unique symbol;
export interface PreferenceNodeRendererCreator {
    id: string;
    canHandle(node: Preference.TreeNode): number;
    createRenderer(node: Preference.TreeNode, container: interfaces.Container): PreferenceNodeRenderer;
}
export declare class DefaultPreferenceNodeRendererCreatorRegistry implements PreferenceNodeRendererCreatorRegistry {
    protected readonly contributionProvider: ContributionProvider<PreferenceNodeRendererContribution>;
    protected readonly _creators: Map<string, PreferenceNodeRendererCreator>;
    protected readonly onDidChangeEmitter: Emitter<void>;
    readonly onDidChange: Event<void>;
    constructor(contributionProvider: ContributionProvider<PreferenceNodeRendererContribution>);
    registerPreferenceNodeRendererCreator(creator: PreferenceNodeRendererCreator): Disposable;
    unregisterPreferenceNodeRendererCreator(creator: PreferenceNodeRendererCreator | string): void;
    getPreferenceNodeRendererCreator(node: Preference.TreeNode): PreferenceNodeRendererCreator;
    protected fireDidChange(): void;
    protected prioritize(node: Preference.TreeNode): PreferenceNodeRendererCreator[];
}
export declare abstract class PreferenceLeafNodeRendererContribution implements PreferenceNodeRendererCreator, PreferenceNodeRendererContribution {
    abstract id: string;
    canHandle(node: Preference.TreeNode): number;
    registerPreferenceNodeRendererCreator(registry: PreferenceNodeRendererCreatorRegistry): void;
    abstract canHandleLeafNode(node: Preference.LeafNode): number;
    createRenderer(node: Preference.TreeNode, container: interfaces.Container): PreferenceNodeRenderer;
    abstract createLeafNodeRenderer(container: interfaces.Container): PreferenceNodeRenderer;
}
export declare class PreferenceHeaderRendererContribution implements PreferenceNodeRendererCreator, PreferenceNodeRendererContribution {
    static ID: string;
    id: string;
    registerPreferenceNodeRendererCreator(registry: PreferenceNodeRendererCreatorRegistry): void;
    canHandle(node: Preference.TreeNode): number;
    createRenderer(node: Preference.TreeNode, container: interfaces.Container): PreferenceNodeRenderer;
}
//# sourceMappingURL=preference-node-renderer-creator.d.ts.map