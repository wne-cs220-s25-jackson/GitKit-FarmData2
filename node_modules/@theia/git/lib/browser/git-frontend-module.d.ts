import '../../src/browser/style/index.css';
import { ContainerModule, interfaces } from '@theia/core/shared/inversify';
import { GitScmProvider } from './git-scm-provider';
declare const _default: ContainerModule;
export default _default;
export declare function createGitScmProviderFactory(ctx: interfaces.Context): GitScmProvider.Factory;
//# sourceMappingURL=git-frontend-module.d.ts.map