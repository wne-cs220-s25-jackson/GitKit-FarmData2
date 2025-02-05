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
exports.NodeStopwatch = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const perf_hooks_1 = require("perf_hooks");
const common_1 = require("../../common");
let NodeStopwatch = class NodeStopwatch extends common_1.Stopwatch {
    constructor() {
        super({
            owner: 'backend',
            now: () => perf_hooks_1.performance.now(),
        });
    }
    start(name, options) {
        const startTime = perf_hooks_1.performance.now();
        return this.createMeasurement(name, () => {
            const duration = perf_hooks_1.performance.now() - startTime;
            return { duration, startTime };
        }, options);
    }
};
exports.NodeStopwatch = NodeStopwatch;
exports.NodeStopwatch = NodeStopwatch = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], NodeStopwatch);
;
//# sourceMappingURL=node-stopwatch.js.map