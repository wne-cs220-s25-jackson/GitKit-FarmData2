import { Container, interfaces } from '@theia/core/shared/inversify';
import { Git } from '../../common/git';
import { GitBindingOptions } from '../git-backend-module';
export declare function initializeBindings(): {
    container: Container;
    bind: interfaces.Bind;
};
/**
 * For testing only.
 */
export declare function createGit(bindingOptions?: GitBindingOptions): Promise<Git>;
//# sourceMappingURL=binding-helper.d.ts.map