import { ElectronMainApplication, ElectronMainApplicationContribution } from '@theia/core/lib/electron-main/electron-main-application';
import { ElectronSecurityTokenService } from '@theia/core/lib/electron-main/electron-security-token-service';
/**
 * Since the mini-browser might serve content from a new origin,
 * we need to attach the ElectronSecurityToken for the Electron
 * backend to accept HTTP requests.
 */
export declare class MiniBrowserElectronMainContribution implements ElectronMainApplicationContribution {
    protected readonly electronSecurityTokenService: ElectronSecurityTokenService;
    onStart(app: ElectronMainApplication): Promise<void>;
    protected getMiniBrowserEndpoint(port: number): string;
}
//# sourceMappingURL=mini-browser-electron-main-contribution.d.ts.map