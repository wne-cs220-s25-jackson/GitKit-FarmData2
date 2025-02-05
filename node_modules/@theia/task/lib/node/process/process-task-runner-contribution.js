"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
// *****************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessTaskRunnerContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const process_task_runner_1 = require("./process-task-runner");
let ProcessTaskRunnerContribution = class ProcessTaskRunnerContribution {
    registerRunner(runners) {
        runners.registerRunner('process', this.processTaskRunner);
        runners.registerRunner('shell', this.processTaskRunner);
    }
};
exports.ProcessTaskRunnerContribution = ProcessTaskRunnerContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(process_task_runner_1.ProcessTaskRunner),
    tslib_1.__metadata("design:type", process_task_runner_1.ProcessTaskRunner)
], ProcessTaskRunnerContribution.prototype, "processTaskRunner", void 0);
exports.ProcessTaskRunnerContribution = ProcessTaskRunnerContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ProcessTaskRunnerContribution);
//# sourceMappingURL=process-task-runner-contribution.js.map