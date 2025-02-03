import { AuthenticationProvider, AuthenticationService, AuthenticationServiceImpl, AuthenticationSession } from '@theia/core/lib/browser/authentication-service';
import { HostedPluginSupport } from '../../hosted/browser/hosted-plugin';
export declare function getAuthenticationProviderActivationEvent(id: string): string;
/**
 * Plugin authentication service that aims to activate additional plugins if sessions are created or queried.
 */
export declare class PluginAuthenticationServiceImpl extends AuthenticationServiceImpl implements AuthenticationService {
    protected readonly pluginService: HostedPluginSupport;
    getSessions(id: string, scopes?: string[]): Promise<ReadonlyArray<AuthenticationSession>>;
    login(id: string, scopes: string[]): Promise<AuthenticationSession>;
    protected tryActivateProvider(providerId: string): Promise<AuthenticationProvider>;
    protected waitForProviderRegistration(providerId: string): Promise<AuthenticationProvider>;
}
//# sourceMappingURL=plugin-authentication-service.d.ts.map