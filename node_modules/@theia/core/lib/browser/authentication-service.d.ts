import { Event } from '../common/event';
import { StorageService } from '../browser/storage-service';
import { Disposable, DisposableCollection } from '../common/disposable';
import { MenuModelRegistry } from '../common/menu';
import { CommandRegistry } from '../common/command';
export interface AuthenticationSessionAccountInformation {
    readonly id: string;
    readonly label: string;
}
export interface AuthenticationProviderSessionOptions {
    /**
     * The account that is being asked about. If this is passed in, the provider should
     * attempt to return the sessions that are only related to this account.
     */
    account?: AuthenticationSessionAccountInformation;
}
export interface AuthenticationSession {
    id: string;
    accessToken: string;
    account: AuthenticationSessionAccountInformation;
    scopes: ReadonlyArray<string>;
}
export interface AuthenticationProviderInformation {
    id: string;
    label: string;
}
/** Should match the definition from the theia/vscode types */
export interface AuthenticationProviderAuthenticationSessionsChangeEvent {
    readonly added: readonly AuthenticationSession[] | undefined;
    readonly removed: readonly AuthenticationSession[] | undefined;
    readonly changed: readonly AuthenticationSession[] | undefined;
}
export interface SessionRequest {
    disposables: Disposable[];
    requestingExtensionIds: string[];
}
export interface SessionRequestInfo {
    [scopes: string]: SessionRequest;
}
/**
 * Our authentication provider should at least contain the following information:
 * - The signature of authentication providers from vscode
 * - Registration information about the provider (id, label)
 * - Provider options (supportsMultipleAccounts)
 *
 * Additionally, we provide the possibility to sign out of a specific account name.
 */
export interface AuthenticationProvider {
    id: string;
    label: string;
    supportsMultipleAccounts: boolean;
    hasSessions(): boolean;
    signOut(accountName: string): Promise<void>;
    updateSessionItems(event: AuthenticationProviderAuthenticationSessionsChangeEvent): Promise<void>;
    /**
     * An [event](#Event) which fires when the array of sessions has changed, or data
     * within a session has changed.
     */
    readonly onDidChangeSessions: Event<AuthenticationProviderAuthenticationSessionsChangeEvent>;
    /**
     * Get a list of sessions.
     * @param scopes An optional list of scopes. If provided, the sessions returned should match
     * these permissions, otherwise all sessions should be returned.
     * @param account The optional account that you would like to get the session for
     * @returns A promise that resolves to an array of authentication sessions.
     */
    getSessions(scopes: string[] | undefined, account?: AuthenticationSessionAccountInformation): Thenable<ReadonlyArray<AuthenticationSession>>;
    /**
     * Prompts a user to login.
     * @param scopes A list of scopes, permissions, that the new session should be created with.
     * @param options The options for createing the session
     * @returns A promise that resolves to an authentication session.
     */
    createSession(scopes: string[], options: AuthenticationProviderSessionOptions): Thenable<AuthenticationSession>;
    /**
     * Removes the session corresponding to session id.
     * @param sessionId The id of the session to remove.
     */
    removeSession(sessionId: string): Thenable<void>;
}
export declare const AuthenticationService: unique symbol;
export interface AuthenticationService {
    isAuthenticationProviderRegistered(id: string): boolean;
    getProviderIds(): string[];
    registerAuthenticationProvider(id: string, provider: AuthenticationProvider): void;
    unregisterAuthenticationProvider(id: string): void;
    requestNewSession(id: string, scopes: string[], extensionId: string, extensionName: string): void;
    updateSessions(providerId: string, event: AuthenticationProviderAuthenticationSessionsChangeEvent): void;
    readonly onDidRegisterAuthenticationProvider: Event<AuthenticationProviderInformation>;
    readonly onDidUnregisterAuthenticationProvider: Event<AuthenticationProviderInformation>;
    readonly onDidChangeSessions: Event<{
        providerId: string;
        label: string;
        event: AuthenticationProviderAuthenticationSessionsChangeEvent;
    }>;
    readonly onDidUpdateSignInCount: Event<number>;
    getSessions(providerId: string, scopes?: string[], user?: AuthenticationSessionAccountInformation): Promise<ReadonlyArray<AuthenticationSession>>;
    getLabel(providerId: string): string;
    supportsMultipleAccounts(providerId: string): boolean;
    login(providerId: string, scopes: string[], options?: AuthenticationProviderSessionOptions): Promise<AuthenticationSession>;
    logout(providerId: string, sessionId: string): Promise<void>;
    signOutOfAccount(providerId: string, accountName: string): Promise<void>;
}
export interface SessionChangeEvent {
    providerId: string;
    label: string;
    event: AuthenticationProviderAuthenticationSessionsChangeEvent;
}
export declare class AuthenticationServiceImpl implements AuthenticationService {
    private noAccountsMenuItem;
    private noAccountsCommand;
    private signInRequestItems;
    private sessionMap;
    protected authenticationProviders: Map<string, AuthenticationProvider>;
    private readonly onDidRegisterAuthenticationProviderEmitter;
    readonly onDidRegisterAuthenticationProvider: Event<AuthenticationProviderInformation>;
    private readonly onDidUnregisterAuthenticationProviderEmitter;
    readonly onDidUnregisterAuthenticationProvider: Event<AuthenticationProviderInformation>;
    private readonly onDidChangeSessionsEmitter;
    readonly onDidChangeSessions: Event<SessionChangeEvent>;
    private readonly onDidChangeSignInCountEmitter;
    readonly onDidUpdateSignInCount: Event<number>;
    protected readonly menus: MenuModelRegistry;
    protected readonly commands: CommandRegistry;
    protected readonly storageService: StorageService;
    init(): void;
    protected handleSessionChange(changeEvent: SessionChangeEvent): Promise<void>;
    protected createAccountUi(providerId: string, providerLabel: string, session: AuthenticationSession): DisposableCollection;
    getProviderIds(): string[];
    isAuthenticationProviderRegistered(id: string): boolean;
    private updateAccountsMenuItem;
    registerAuthenticationProvider(id: string, authenticationProvider: AuthenticationProvider): void;
    unregisterAuthenticationProvider(id: string): void;
    updateSessions(id: string, event: AuthenticationProviderAuthenticationSessionsChangeEvent): Promise<void>;
    private updateNewSessionRequests;
    requestNewSession(providerId: string, scopes: string[], extensionId: string, extensionName: string): Promise<void>;
    getLabel(id: string): string;
    supportsMultipleAccounts(id: string): boolean;
    getSessions(id: string, scopes?: string[], user?: AuthenticationSessionAccountInformation): Promise<ReadonlyArray<AuthenticationSession>>;
    login(id: string, scopes: string[], options?: AuthenticationProviderSessionOptions): Promise<AuthenticationSession>;
    logout(id: string, sessionId: string): Promise<void>;
    signOutOfAccount(id: string, accountName: string): Promise<void>;
}
export interface AllowedExtension {
    id: string;
    name: string;
}
export declare function readAllowedExtensions(storageService: StorageService, providerId: string, accountName: string): Promise<AllowedExtension[]>;
//# sourceMappingURL=authentication-service.d.ts.map