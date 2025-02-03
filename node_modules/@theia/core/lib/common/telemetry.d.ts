export declare class TelemetryTrustedValue<T> {
    readonly value: T;
    constructor(value: T);
}
export interface TelemetryLogger {
    readonly sender: TelemetrySender;
    readonly options: TelemetryLoggerOptions | undefined;
    logUsage(eventName: string, data?: Record<string, any | TelemetryTrustedValue<any>>): void;
    logError(eventNameOrException: string | Error, data?: Record<string, any | TelemetryTrustedValue<any>>): void;
    dispose(): void;
}
interface TelemetrySender {
    sendEventData(eventName: string, data?: Record<string, any>): void;
    sendErrorData(error: Error, data?: Record<string, any>): void;
    flush?(): void | Thenable<void>;
}
interface TelemetryLoggerOptions {
}
export {};
//# sourceMappingURL=telemetry.d.ts.map