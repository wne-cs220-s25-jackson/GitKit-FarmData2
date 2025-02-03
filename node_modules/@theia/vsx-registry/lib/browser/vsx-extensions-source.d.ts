/// <reference types="lodash" />
import { TreeSource, TreeElement } from '@theia/core/lib/browser/source-tree';
import { VSXExtensionsModel } from './vsx-extensions-model';
export declare class VSXExtensionsSourceOptions {
    static INSTALLED: string;
    static BUILT_IN: string;
    static SEARCH_RESULT: string;
    static RECOMMENDED: string;
    readonly id: string;
}
export declare class VSXExtensionsSource extends TreeSource {
    protected readonly options: VSXExtensionsSourceOptions;
    protected readonly model: VSXExtensionsModel;
    protected init(): void;
    protected scheduleFireDidChange: import("lodash").DebouncedFunc<() => void>;
    getModel(): VSXExtensionsModel;
    getElements(): IterableIterator<TreeElement>;
    protected doGetElements(): IterableIterator<string>;
}
//# sourceMappingURL=vsx-extensions-source.d.ts.map