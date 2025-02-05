export declare const keyStoreServicePath = "/services/keyStore";
export declare const KeyStoreService: unique symbol;
export interface KeyStoreService {
    setPassword(service: string, account: string, password: string): Promise<void>;
    getPassword(service: string, account: string): Promise<string | undefined>;
    deletePassword(service: string, account: string): Promise<boolean>;
    findPassword(service: string): Promise<string | undefined>;
    findCredentials(service: string): Promise<Array<{
        account: string;
        password: string;
    }>>;
}
//# sourceMappingURL=key-store.d.ts.map