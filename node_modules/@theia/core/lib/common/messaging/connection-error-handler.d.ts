import { ILogger } from '../../common';
export interface ResolvedConnectionErrorHandlerOptions {
    readonly serverName: string;
    readonly logger: ILogger;
    /**
     * The maximum amount of errors allowed before stopping the server.
     */
    readonly maxErrors: number;
    /**
     * The minimum amount of restarts allowed in the restart interval.
     */
    readonly maxRestarts: number;
    /**
     * In minutes.
     */
    readonly restartInterval: number;
}
export type ConnectionErrorHandlerOptions = Partial<ResolvedConnectionErrorHandlerOptions> & {
    readonly serverName: string;
    readonly logger: ILogger;
};
export declare class ConnectionErrorHandler {
    protected readonly options: ResolvedConnectionErrorHandlerOptions;
    constructor(options: ConnectionErrorHandlerOptions);
    shouldStop(error: Error, count?: number): boolean;
    protected readonly restarts: number[];
    shouldRestart(): boolean;
}
//# sourceMappingURL=connection-error-handler.d.ts.map