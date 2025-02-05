import { Endpoint } from '@theia/core/lib/browser';
import { ElectronSecurityToken } from '@theia/core/lib/electron-common/electron-token';
import { MiniBrowserEnvironment } from '../../browser/environment/mini-browser-environment';
import '@theia/core/lib/electron-common/electron-api';
export declare class ElectronMiniBrowserEnvironment extends MiniBrowserEnvironment {
    protected readonly electronSecurityToken: ElectronSecurityToken;
    getEndpoint(uuid: string, hostname?: string): Endpoint;
    protected getDefaultHostname(): string;
}
//# sourceMappingURL=electron-mini-browser-environment.d.ts.map