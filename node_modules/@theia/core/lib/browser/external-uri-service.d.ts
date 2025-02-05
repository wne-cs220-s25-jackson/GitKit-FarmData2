import { MaybePromise } from '../common/types';
import URI from '../common/uri';
export interface AddressPort {
    address: string;
    port: number;
}
export declare class ExternalUriService {
    /**
     * Maps local to remote URLs.
     * Should be no-op if the given URL is not a localhost URL.
     *
     * By default maps to an origin serving Theia.
     *
     * Use `parseLocalhost` to retrieve localhost address and port information.
     */
    resolve(uri: URI): MaybePromise<URI>;
    parseLocalhost(uri: URI): AddressPort | undefined;
    protected toRemoteUrl(uri: URI, address: AddressPort): URI;
    protected toRemoteHost(address: AddressPort): string;
    /**
     * @returns The remote host (where the backend is running).
     */
    protected getRemoteHost(): string;
}
//# sourceMappingURL=external-uri-service.d.ts.map