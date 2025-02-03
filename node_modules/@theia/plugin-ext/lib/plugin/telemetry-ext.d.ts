import { Event } from '@theia/core/lib/common/event';
import { TelemetryTrustedValue, TelemetryLoggerOptions } from './types-impl';
export declare class TelemetryExtImpl {
    _isTelemetryEnabled: boolean;
    private readonly onDidChangeTelemetryEnabledEmitter;
    readonly onDidChangeTelemetryEnabled: Event<boolean>;
    get isTelemetryEnabled(): boolean;
    set isTelemetryEnabled(isTelemetryEnabled: boolean);
    createTelemetryLogger(sender: TelemetrySender, options?: TelemetryLoggerOptions | undefined): TelemetryLogger;
}
export declare class TelemetryLogger {
    private sender;
    readonly options: TelemetryLoggerOptions | undefined;
    readonly commonProperties: Record<string, any>;
    telemetryEnabled: boolean;
    private readonly onDidChangeEnableStatesEmitter;
    readonly onDidChangeEnableStates: Event<TelemetryLogger>;
    private _isUsageEnabled;
    private _isErrorsEnabled;
    constructor(sender: TelemetrySender, telemetryEnabled: boolean, options?: TelemetryLoggerOptions);
    get isUsageEnabled(): boolean;
    set isUsageEnabled(isUsageEnabled: boolean);
    get isErrorsEnabled(): boolean;
    set isErrorsEnabled(isErrorsEnabled: boolean);
    logUsage(eventName: string, data?: Record<string, any | TelemetryTrustedValue<any>>): void;
    logError(eventNameOrException: string | Error, data?: Record<string, any | TelemetryTrustedValue<any>>): void;
    dispose(): void;
    private logEvent;
    private getCommonProperties;
}
interface TelemetrySender {
    sendEventData(eventName: string, data?: Record<string, any>): void;
    sendErrorData(error: Error, data?: Record<string, any>): void;
    flush?(): void | Thenable<void>;
}
/**
 * Does a best possible effort to clean a data object from any possible PII.
 * @param data The data object to clean
 * @param paths Any additional patterns that should be removed from the data set
 * @returns A new object with the PII removed
 */
export declare function cleanData(data: Record<string, any>, cleanUpPatterns: RegExp[]): Record<string, any>;
export {};
//# sourceMappingURL=telemetry-ext.d.ts.map