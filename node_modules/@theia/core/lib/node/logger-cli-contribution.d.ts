import * as yargs from 'yargs';
import { LogLevel } from '../common/logger';
import { CliContribution } from './cli';
import { Event, Emitter } from '../common/event';
/** Maps logger names to log levels.  */
export interface LogLevels {
    [key: string]: LogLevel;
}
/**
 * Parses command line switches related to log levels, then watches the log
 * levels file (if specified) for changes.  This is the source of truth for
 * what the log level per logger should be.
 */
export declare class LogLevelCliContribution implements CliContribution {
    protected _logLevels: LogLevels;
    /**
     * Log level to use for loggers not specified in `logLevels`.
     */
    protected _defaultLogLevel: LogLevel;
    protected logConfigChangedEvent: Emitter<void>;
    get defaultLogLevel(): LogLevel;
    get logLevels(): LogLevels;
    configure(conf: yargs.Argv): void;
    setArguments(args: yargs.Arguments): Promise<void>;
    protected watchLogConfigFile(filename: string): Promise<void>;
    protected slurpLogConfigFile(filename: string): Promise<void>;
    get onLogConfigChanged(): Event<void>;
    logLevelFor(loggerName: string): LogLevel;
    /**
     * Converts the string to a `LogLevel`. Throws an error if invalid.
     */
    protected readLogLevelString(levelStr: string, errMessagePrefix: string): LogLevel;
}
//# sourceMappingURL=logger-cli-contribution.d.ts.map