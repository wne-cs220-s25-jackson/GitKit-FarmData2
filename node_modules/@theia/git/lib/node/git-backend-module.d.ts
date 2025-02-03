import { ContainerModule, interfaces } from '@theia/core/shared/inversify';
export interface GitBindingOptions {
    readonly bindManager: (binding: interfaces.BindingToSyntax<{}>) => interfaces.BindingWhenOnSyntax<{}>;
}
export declare namespace GitBindingOptions {
    const Default: GitBindingOptions;
}
export declare function bindGit(bind: interfaces.Bind, bindingOptions?: GitBindingOptions): void;
export declare function bindRepositoryWatcher(bind: interfaces.Bind): void;
export declare function bindPrompt(bind: interfaces.Bind): void;
declare const _default: ContainerModule;
export default _default;
//# sourceMappingURL=git-backend-module.d.ts.map