import { TreeDecorator, AbstractTreeDecoratorService } from '@theia/core/lib/browser/tree/tree-decorator';
import { ContributionProvider } from '@theia/core/lib/common';
export declare const OpenEditorsTreeDecorator: unique symbol;
export declare class OpenEditorsTreeDecoratorService extends AbstractTreeDecoratorService {
    protected readonly contributions: ContributionProvider<TreeDecorator>;
    constructor(contributions: ContributionProvider<TreeDecorator>);
}
//# sourceMappingURL=navigator-open-editors-decorator-service.d.ts.map