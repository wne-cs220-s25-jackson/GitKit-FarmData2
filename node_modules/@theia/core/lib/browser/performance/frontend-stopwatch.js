"use strict";
/********************************************************************************
* Copyright (c) 2019, 2021 TypeFox, STMicroelectronics and others.
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
exports.FrontendStopwatch = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
let FrontendStopwatch = class FrontendStopwatch extends common_1.Stopwatch {
    constructor() {
        super({
            owner: 'frontend',
            now: () => performance.now(),
        });
    }
    start(name, options) {
        const startMarker = `${name}-start`;
        const endMarker = `${name}-end`;
        performance.clearMeasures(name);
        performance.clearMarks(startMarker);
        performance.clearMarks(endMarker);
        performance.mark(startMarker);
        return this.createMeasurement(name, () => {
            var _a, _b;
            performance.mark(endMarker);
            let duration;
            let startTime;
            try {
                performance.measure(name, startMarker, endMarker);
                const entries = performance.getEntriesByName(name);
                // If no entries, then performance measurement was disabled or failed, so
                // signal that with a `NaN` result
                duration = (_a = entries[0].duration) !== null && _a !== void 0 ? _a : Number.NaN;
                startTime = (_b = entries[0].startTime) !== null && _b !== void 0 ? _b : Number.NaN;
            }
            catch (e) {
                console.warn(e);
                duration = Number.NaN;
                startTime = Number.NaN;
            }
            performance.clearMeasures(name);
            performance.clearMarks(startMarker);
            performance.clearMarks(endMarker);
            return { startTime, duration };
        }, options);
    }
};
exports.FrontendStopwatch = FrontendStopwatch;
exports.FrontendStopwatch = FrontendStopwatch = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], FrontendStopwatch);
;
//# sourceMappingURL=frontend-stopwatch.js.map