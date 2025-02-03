import { KeyStoreService } from '../common/key-store';
export declare class KeyStoreServiceImpl implements KeyStoreService {
    private static readonly MAX_PASSWORD_LENGTH;
    private static readonly PASSWORD_CHUNK_SIZE;
    protected keytarImplementation?: typeof import('keytar');
    setPassword(service: string, account: string, password: string): Promise<void>;
    deletePassword(service: string, account: string): Promise<boolean>;
    getPassword(service: string, account: string): Promise<string | undefined>;
    findPassword(service: string): Promise<string | undefined>;
    findCredentials(service: string): Promise<Array<{
        account: string;
        password: string;
    }>>;
    protected getKeytar(): Promise<typeof import('keytar')>;
}
export declare class InMemoryCredentialsProvider {
    private secretVault;
    getPassword(service: string, account: string): Promise<string | null>;
    setPassword(service: string, account: string, password: string): Promise<void>;
    deletePassword(service: string, account: string): Promise<boolean>;
    findPassword(service: string): Promise<string | null>;
    findCredentials(service: string): Promise<Array<{
        account: string;
        password: string;
    }>>;
    clear(): Promise<void>;
}
//# sourceMappingURL=key-store-server.d.ts.map