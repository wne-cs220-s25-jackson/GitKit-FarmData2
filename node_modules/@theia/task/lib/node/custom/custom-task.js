"use strict";
// *****************************************************************************
// Copyright (C) 2021 ByteDance and others.
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
exports.CustomTask = exports.TaskFactory = exports.TaskCustomOptions = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common/");
const task_1 = require("../task");
const task_manager_1 = require("../task-manager");
exports.TaskCustomOptions = Symbol('TaskCustomOptions');
exports.TaskFactory = Symbol('TaskFactory');
/** Represents a Task launched as a fake process by `CustomTaskRunner`. */
let CustomTask = class CustomTask extends task_1.Task {
    constructor(taskManager, logger, options) {
        super(taskManager, logger, options);
        this.options = options;
        this.logger.info(`Created new custom task, id: ${this.id}, context: ${this.context}`);
    }
    kill() {
        return Promise.resolve();
    }
    getRuntimeInfo() {
        return {
            taskId: this.id,
            ctx: this.context,
            config: this.options.config,
            terminalId: this.process.id,
            processId: this.process.id
        };
    }
    callbackTaskComplete(exitCode) {
        this.fireTaskExited({
            taskId: this.taskId,
            ctx: this.context,
            config: this.options.config,
            terminalId: this.process.id,
            processId: this.process.id,
            code: exitCode || 0
        });
    }
    get process() {
        return this.options.process;
    }
};
exports.CustomTask = CustomTask;
exports.CustomTask = CustomTask = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(task_manager_1.TaskManager)),
    tslib_1.__param(1, (0, inversify_1.inject)(common_1.ILogger)),
    tslib_1.__param(1, (0, inversify_1.named)('task')),
    tslib_1.__param(2, (0, inversify_1.inject)(exports.TaskCustomOptions)),
    tslib_1.__metadata("design:paramtypes", [task_manager_1.TaskManager, Object, Object])
], CustomTask);
//# sourceMappingURL=custom-task.js.map