/**
 * This token is unique to the current running instance. It is used by the backend
 * to make sure it is an electron browser window that is connecting to its services.
 *
 * The identifier is a string, which makes it usable as a key for cookies, environments, etc.
 */
export declare const ElectronSecurityToken: string;
export interface ElectronSecurityToken {
    value: string;
}
//# sourceMappingURL=electron-token.d.ts.map