import { DisposableCollection, Emitter } from '@theia/core/lib/common';
import { ScmContextKeyService } from './scm-context-key-service';
import { ScmRepository, ScmProviderOptions } from './scm-repository';
import { ScmCommand, ScmProvider } from './scm-provider';
import URI from '@theia/core/lib/common/uri';
export declare class ScmService {
    protected readonly contextKeys: ScmContextKeyService;
    protected readonly _repositories: Map<string, ScmRepository>;
    protected _selectedRepository: ScmRepository | undefined;
    protected readonly onDidChangeSelectedRepositoryEmitter: Emitter<ScmRepository | undefined>;
    readonly onDidChangeSelectedRepository: import("@theia/core/lib/common").Event<ScmRepository | undefined>;
    protected readonly onDidAddRepositoryEmitter: Emitter<ScmRepository>;
    readonly onDidAddRepository: import("@theia/core/lib/common").Event<ScmRepository>;
    protected readonly onDidRemoveRepositoryEmitter: Emitter<ScmRepository>;
    readonly onDidRemoveRepository: import("@theia/core/lib/common").Event<ScmRepository>;
    protected readonly onDidChangeStatusBarCommandsEmitter: Emitter<ScmCommand[]>;
    readonly onDidChangeStatusBarCommands: import("@theia/core/lib/common").Event<ScmCommand[]>;
    protected fireDidChangeStatusBarCommands(): void;
    get statusBarCommands(): ScmCommand[];
    get repositories(): ScmRepository[];
    get selectedRepository(): ScmRepository | undefined;
    protected readonly toDisposeOnSelected: DisposableCollection;
    set selectedRepository(repository: ScmRepository | undefined);
    findRepository(uri: URI): ScmRepository | undefined;
    registerScmProvider(provider: ScmProvider, options?: ScmProviderOptions): ScmRepository;
}
//# sourceMappingURL=scm-service.d.ts.map