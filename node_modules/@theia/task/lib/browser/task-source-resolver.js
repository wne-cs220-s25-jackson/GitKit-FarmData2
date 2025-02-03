"use strict";
// *****************************************************************************
// Copyright (C) 2019 Ericsson and others.
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
exports.TaskSourceResolver = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("../common");
const task_definition_registry_1 = require("./task-definition-registry");
let TaskSourceResolver = class TaskSourceResolver {
    /**
     * Returns task source to display.
     */
    resolve(task) {
        if (typeof task._scope === 'string') {
            return task._scope;
        }
        else {
            return common_1.TaskScope[task._scope];
        }
    }
};
exports.TaskSourceResolver = TaskSourceResolver;
tslib_1.__decorate([
    (0, inversify_1.inject)(task_definition_registry_1.TaskDefinitionRegistry),
    tslib_1.__metadata("design:type", task_definition_registry_1.TaskDefinitionRegistry)
], TaskSourceResolver.prototype, "taskDefinitionRegistry", void 0);
exports.TaskSourceResolver = TaskSourceResolver = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TaskSourceResolver);
//# sourceMappingURL=task-source-resolver.js.map