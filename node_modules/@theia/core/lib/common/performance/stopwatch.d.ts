/********************************************************************************
* Copyright (c) 2021 STMicroelectronics and others.
*
* This program and the accompanying materials are made available under the
* terms of the Eclipse Public License 2.0 which is available at
* http://www.eclipse.org/legal/epl-2.0.
*
* This Source Code may also be made available under the following Secondary
* Licenses when the conditions for such availability set forth in the Eclipse
* Public License v. 2.0 are satisfied: GNU General Public License, version 2
* with the GNU Classpath Exception which is available at
* https://www.gnu.org/software/classpath/license.html.
*
* SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
*******************************************************************************/
import { ILogger, LogLevel } from '../logger';
import { MaybePromise } from '../types';
import { Measurement, MeasurementOptions, MeasurementResult } from './measurement';
import { Emitter, Event } from '../event';
/**
 * Configuration of the log messages written by a {@link Measurement}.
 */
interface LogOptions extends MeasurementOptions {
    /** A function that computes the current time, in millis, since the start of the application. */
    now: () => number;
    /** An optional label for the application the start of which (in real time) is the basis of all measurements. */
    owner?: string;
    /** An optional log level to override any default or dynamic log level for a specific log message. */
    levelOverride?: LogLevel;
    /** Optional arguments to the log message. The 'optionalArgs' coming in from the {@link Measurement} API are slotted in here. */
    arguments?: any[];
}
/**
 * A factory of {@link Measurement}s for performance logging.
 */
export declare abstract class Stopwatch {
    protected readonly defaultLogOptions: LogOptions;
    protected readonly logger: ILogger;
    protected _storedMeasurements: MeasurementResult[];
    protected onDidAddMeasurementResultEmitter: Emitter<MeasurementResult>;
    get onDidAddMeasurementResult(): Event<MeasurementResult>;
    constructor(defaultLogOptions: LogOptions);
    /**
     * Create a {@link Measurement} that will compute its elapsed time when logged.
     *
     * @param name the {@link Measurement.name measurement name}
     * @param options optional configuration of the new measurement
     * @returns a self-timing measurement
     */
    abstract start(name: string, options?: MeasurementOptions): Measurement;
    /**
     * Wrap an asynchronous function in a {@link Measurement} that logs itself on completion.
     * If obtaining and awaiting the `computation` runs too long according to the threshold
     * set in the `options`, then the log message is a warning, otherwise a debug log.
     *
     * @param name the {@link Measurement.name name of the measurement} to wrap around the function
     * @param description a description of what the function does, to be included in the log
     * @param computation a supplier of the asynchronous function to wrap
     * @param options optional addition configuration as for {@link measure}
     * @returns the wrapped `computation`
     *
     * @see {@link MeasurementOptions.thresholdMillis}
     */
    startAsync<T>(name: string, description: string, computation: () => MaybePromise<T>, options?: MeasurementOptions): Promise<T>;
    protected createMeasurement(name: string, measure: () => {
        startTime: number;
        duration: number;
    }, options?: MeasurementOptions): Measurement;
    protected mergeLogOptions(logOptions?: Partial<LogOptions>): LogOptions;
    protected atLevel(logOptions: LogOptions, levelOverride?: LogLevel, optionalArgs?: any[]): LogOptions;
    protected logLevel(elapsed: number, options?: Partial<LogOptions>): LogLevel;
    protected log(measurement: Measurement, activity: string, options: LogOptions): void;
    get storedMeasurements(): ReadonlyArray<MeasurementResult>;
}
export {};
//# sourceMappingURL=stopwatch.d.ts.map