import { ContributionProvider } from '@theia/core/lib/common/contribution-provider';
import { TreeDecorator, AbstractTreeDecoratorService } from '@theia/core/lib/browser/tree/tree-decorator';
/**
 * Symbol for all decorators that would like to contribute into the outline.
 */
export declare const OutlineTreeDecorator: unique symbol;
/**
 * Decorator service for the outline.
 */
export declare class OutlineDecoratorService extends AbstractTreeDecoratorService {
    protected readonly contributions: ContributionProvider<TreeDecorator>;
    constructor(contributions: ContributionProvider<TreeDecorator>);
}
//# sourceMappingURL=outline-decorator-service.d.ts.map