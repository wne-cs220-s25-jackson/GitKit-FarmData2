import { ContributionProvider } from '@theia/core/lib/common/contribution-provider';
import { TreeDecorator, AbstractTreeDecoratorService } from '@theia/core/lib/browser/tree/tree-decorator';
/**
 * Symbol for all decorators that would like to contribute into the navigator.
 */
export declare const NavigatorTreeDecorator: unique symbol;
/**
 * Decorator service for the navigator.
 */
export declare class NavigatorDecoratorService extends AbstractTreeDecoratorService {
    protected readonly contributions: ContributionProvider<TreeDecorator>;
    constructor(contributions: ContributionProvider<TreeDecorator>);
}
//# sourceMappingURL=navigator-decorator-service.d.ts.map