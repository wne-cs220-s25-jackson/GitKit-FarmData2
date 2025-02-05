import { MaybePromise } from '../../common/types';
import { interfaces } from 'inversify';
import { ContributionProvider } from '../../common/contribution-provider';
export declare const PreloadContribution: symbol & interfaces.Abstract<PreloadContribution>;
export interface PreloadContribution {
    initialize(): MaybePromise<void>;
}
export declare class Preloader {
    protected readonly contributions: ContributionProvider<PreloadContribution>;
    initialize(): Promise<void>;
}
//# sourceMappingURL=preloader.d.ts.map