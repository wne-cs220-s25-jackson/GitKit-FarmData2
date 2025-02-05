export declare const FrontendIdProvider: unique symbol;
/**
 * A FrontendIdProvider computes an id for an instance of the front end that may be reconnected to a back end
 * connection context.
 */
export interface FrontendIdProvider {
    getId(): string;
}
export declare class BrowserFrontendIdProvider implements FrontendIdProvider {
    protected readonly id: string;
    getId(): string;
}
//# sourceMappingURL=frontend-id-provider.d.ts.map