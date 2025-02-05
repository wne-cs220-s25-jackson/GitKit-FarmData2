import URI from '../common/uri';
/**
 * An endpoint provides URLs for http and ws, based on configuration and defaults.
 */
export declare class Endpoint {
    protected readonly options: Endpoint.Options;
    protected readonly location: Endpoint.Location;
    static readonly PROTO_HTTPS: string;
    static readonly PROTO_HTTP: string;
    static readonly PROTO_WS: string;
    static readonly PROTO_WSS: string;
    static readonly PROTO_FILE: string;
    constructor(options?: Endpoint.Options, location?: Endpoint.Location);
    getWebSocketUrl(): URI;
    getRestUrl(): URI;
    protected get pathname(): string;
    get host(): string;
    get origin(): string;
    protected get port(): string;
    protected getSearchParam(name: string, defaultValue: string): string;
    protected get wsScheme(): string;
    /**
     * The HTTP/HTTPS scheme of the endpoint, or the user defined one.
     * See: `Endpoint.Options.httpScheme`.
     */
    get httpScheme(): string;
    protected get path(): string;
}
export declare namespace Endpoint {
    class Options {
        host?: string;
        wsScheme?: string;
        httpScheme?: string;
        path?: string;
    }
    class Location {
        host: string;
        pathname: string;
        search: string;
        protocol: string;
    }
}
//# sourceMappingURL=endpoint.d.ts.map