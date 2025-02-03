import { Event } from '../common/event';
import { KeyStoreService } from '../common/key-store';
export interface CredentialsProvider {
    getPassword(service: string, account: string): Promise<string | undefined>;
    setPassword(service: string, account: string, password: string): Promise<void>;
    deletePassword(service: string, account: string): Promise<boolean>;
    findPassword(service: string): Promise<string | undefined>;
    findCredentials(service: string): Promise<Array<{
        account: string;
        password: string;
    }>>;
}
export declare const CredentialsService: unique symbol;
export interface CredentialsService extends CredentialsProvider {
    readonly onDidChangePassword: Event<CredentialsChangeEvent>;
}
export interface CredentialsChangeEvent {
    service: string;
    account: string;
}
export declare class CredentialsServiceImpl implements CredentialsService {
    private readonly keytarService;
    private onDidChangePasswordEmitter;
    readonly onDidChangePassword: Event<CredentialsChangeEvent>;
    private credentialsProvider;
    constructor(keytarService: KeyStoreService);
    getPassword(service: string, account: string): Promise<string | undefined>;
    setPassword(service: string, account: string, password: string): Promise<void>;
    deletePassword(service: string, account: string): Promise<boolean>;
    findPassword(service: string): Promise<string | undefined>;
    findCredentials(service: string): Promise<Array<{
        account: string;
        password: string;
    }>>;
}
//# sourceMappingURL=credentials-service.d.ts.map