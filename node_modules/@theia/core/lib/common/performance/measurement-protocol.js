"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullBackendStopwatch = exports.DefaultBackendStopwatch = exports.BackendStopwatchOptions = exports.stopwatchPath = exports.BackendStopwatch = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const inversify_1 = require("inversify");
const stopwatch_1 = require("./stopwatch");
exports.BackendStopwatch = Symbol('BackendStopwatch');
/** API path of the stopwatch service that exposes the back-end stopwatch to clients. */
exports.stopwatchPath = '/services/stopwatch';
exports.BackendStopwatchOptions = Symbol('BackendStopwatchOptions');
/**
 * Default implementation of the (remote) back-end stopwatch service.
 */
let DefaultBackendStopwatch = class DefaultBackendStopwatch {
    constructor() {
        this.measurements = new Map();
        this.idSequence = 0;
    }
    start(name, options) {
        const result = ++this.idSequence;
        this.measurements.set(result, this.stopwatch.start(name, options));
        return result;
    }
    stop(measurementToken, message, messageArgs) {
        const measurement = this.measurements.get(measurementToken);
        if (measurement) {
            this.measurements.delete(measurementToken);
            measurement.log(message, ...messageArgs);
        }
    }
};
exports.DefaultBackendStopwatch = DefaultBackendStopwatch;
tslib_1.__decorate([
    (0, inversify_1.inject)(stopwatch_1.Stopwatch),
    tslib_1.__metadata("design:type", stopwatch_1.Stopwatch)
], DefaultBackendStopwatch.prototype, "stopwatch", void 0);
exports.DefaultBackendStopwatch = DefaultBackendStopwatch = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DefaultBackendStopwatch);
/**
 * No-op implementation of the (remote) back-end stopwatch service.
 */
let NullBackendStopwatch = class NullBackendStopwatch {
    start() {
        return Promise.resolve(0);
    }
    stop() {
        return Promise.resolve();
    }
};
exports.NullBackendStopwatch = NullBackendStopwatch;
exports.NullBackendStopwatch = NullBackendStopwatch = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NullBackendStopwatch);
//# sourceMappingURL=measurement-protocol.js.map