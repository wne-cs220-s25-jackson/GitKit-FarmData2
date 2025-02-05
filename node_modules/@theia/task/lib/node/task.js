"use strict";
// *****************************************************************************
// Copyright (C) 2017 Ericsson and others.
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
exports.Task = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common/");
/**
 * A {@link Task} represents the execution state of a `TaskConfiguration`.
 * Implementing classes have to call the {@link Task#fireOutputLine} function
 * whenever a new output occurs during the execution.
 */
let Task = class Task {
    constructor(taskManager, logger, options) {
        this.taskManager = taskManager;
        this.logger = logger;
        this.options = options;
        this.toDispose = new common_1.DisposableCollection();
        this.taskId = this.taskManager.register(this, this.options.context);
        this.exitEmitter = new common_1.Emitter();
        this.outputEmitter = new common_1.Emitter();
        this.toDispose.push(this.exitEmitter);
        this.toDispose.push(this.outputEmitter);
    }
    get onExit() {
        return this.exitEmitter.event;
    }
    get onOutput() {
        return this.outputEmitter.event;
    }
    /** Has to be called when a task has concluded its execution. */
    fireTaskExited(event) {
        this.exitEmitter.fire(event);
    }
    fireOutputLine(event) {
        this.outputEmitter.fire(event);
    }
    get id() {
        return this.taskId;
    }
    get context() {
        return this.options.context;
    }
    get label() {
        return this.options.label;
    }
    dispose() {
        this.toDispose.dispose();
    }
};
exports.Task = Task;
exports.Task = Task = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.unmanaged)()),
    tslib_1.__param(1, (0, inversify_1.unmanaged)()),
    tslib_1.__param(2, (0, inversify_1.unmanaged)()),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], Task);
//# sourceMappingURL=task.js.map