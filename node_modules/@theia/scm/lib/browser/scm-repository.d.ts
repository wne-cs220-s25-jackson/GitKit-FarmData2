import { Disposable, DisposableCollection, Emitter } from '@theia/core/lib/common';
import { ScmInput, ScmInputOptions } from './scm-input';
import { ScmProvider } from './scm-provider';
export interface ScmProviderOptions {
    input?: ScmInputOptions;
}
export declare class ScmRepository implements Disposable {
    readonly provider: ScmProvider;
    protected readonly options: ScmProviderOptions;
    protected readonly onDidChangeEmitter: Emitter<void>;
    readonly onDidChange: import("@theia/core/lib/common").Event<void>;
    protected fireDidChange(): void;
    protected readonly toDispose: DisposableCollection;
    readonly input: ScmInput;
    constructor(provider: ScmProvider, options?: ScmProviderOptions);
    dispose(): void;
}
//# sourceMappingURL=scm-repository.d.ts.map