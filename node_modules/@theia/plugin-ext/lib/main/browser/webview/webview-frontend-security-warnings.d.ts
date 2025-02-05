import { MessageService } from '@theia/core';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { WindowService } from '@theia/core/lib/browser/window/window-service';
import { WebviewEnvironment } from './webview-environment';
export declare class WebviewFrontendSecurityWarnings implements FrontendApplicationContribution {
    protected windowService: WindowService;
    protected messageService: MessageService;
    protected webviewEnvironment: WebviewEnvironment;
    initialize(): void;
    protected checkHostPattern(): Promise<void>;
}
//# sourceMappingURL=webview-frontend-security-warnings.d.ts.map