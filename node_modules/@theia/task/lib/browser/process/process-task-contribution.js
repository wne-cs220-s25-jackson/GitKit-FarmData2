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
exports.ProcessTaskContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const process_task_resolver_1 = require("./process-task-resolver");
let ProcessTaskContribution = class ProcessTaskContribution {
    registerResolvers(resolvers) {
        resolvers.registerExecutionResolver('process', this.processTaskResolver);
        resolvers.registerExecutionResolver('shell', this.processTaskResolver);
    }
};
exports.ProcessTaskContribution = ProcessTaskContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(process_task_resolver_1.ProcessTaskResolver),
    tslib_1.__metadata("design:type", process_task_resolver_1.ProcessTaskResolver)
], ProcessTaskContribution.prototype, "processTaskResolver", void 0);
exports.ProcessTaskContribution = ProcessTaskContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ProcessTaskContribution);
//# sourceMappingURL=process-task-contribution.js.map