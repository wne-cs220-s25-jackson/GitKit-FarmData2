import { MaybePromise } from '@theia/core/lib/common';
import { FrontendApplication, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { SecondaryWindowHandler } from '@theia/core/lib/browser/secondary-window-handler';
export declare class WebviewSecondaryWindowSupport implements FrontendApplicationContribution {
    protected readonly secondaryWindowHandler: SecondaryWindowHandler;
    onStart(app: FrontendApplication): MaybePromise<void>;
}
//# sourceMappingURL=webview-secondary-window-support.d.ts.map