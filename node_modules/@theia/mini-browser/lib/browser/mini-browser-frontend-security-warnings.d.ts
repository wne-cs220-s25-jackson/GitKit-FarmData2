import { MessageService } from '@theia/core';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { WindowService } from '@theia/core/lib/browser/window/window-service';
import { MiniBrowserEnvironment } from './environment/mini-browser-environment';
export declare class MiniBrowserFrontendSecurityWarnings implements FrontendApplicationContribution {
    protected windowService: WindowService;
    protected messageService: MessageService;
    protected miniBrowserEnvironment: MiniBrowserEnvironment;
    initialize(): void;
    protected checkHostPattern(): Promise<void>;
}
//# sourceMappingURL=mini-browser-frontend-security-warnings.d.ts.map