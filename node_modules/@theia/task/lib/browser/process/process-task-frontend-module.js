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
exports.bindProcessTaskModule = void 0;
const process_task_contribution_1 = require("./process-task-contribution");
const process_task_resolver_1 = require("./process-task-resolver");
const task_contribution_1 = require("../task-contribution");
function bindProcessTaskModule(bind) {
    bind(process_task_resolver_1.ProcessTaskResolver).toSelf().inSingletonScope();
    bind(process_task_contribution_1.ProcessTaskContribution).toSelf().inSingletonScope();
    bind(task_contribution_1.TaskContribution).toService(process_task_contribution_1.ProcessTaskContribution);
}
exports.bindProcessTaskModule = bindProcessTaskModule;
//# sourceMappingURL=process-task-frontend-module.js.map