"use strict";
// *****************************************************************************
// Copyright (C) 2019 Red Hat, Inc. and others.
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
const chai_1 = require("chai");
const inversify_1 = require("@theia/core/shared/inversify");
const provided_task_configurations_1 = require("./provided-task-configurations");
const task_definition_registry_1 = require("./task-definition-registry");
const task_contribution_1 = require("./task-contribution");
describe('provided-task-configurations', () => {
    let container;
    beforeEach(() => {
        container = new inversify_1.Container();
        container.bind(provided_task_configurations_1.ProvidedTaskConfigurations).toSelf().inSingletonScope();
        container.bind(task_contribution_1.TaskProviderRegistry).toSelf().inSingletonScope();
        container.bind(task_definition_registry_1.TaskDefinitionRegistry).toSelf().inSingletonScope();
    });
    it('provided-task-search', async () => {
        const providerRegistry = container.get(task_contribution_1.TaskProviderRegistry);
        providerRegistry.register('test', {
            provideTasks() {
                return Promise.resolve([{ type: 'test', label: 'task from test', _source: 'test', _scope: 'test' }]);
            }
        });
        const task = await container.get(provided_task_configurations_1.ProvidedTaskConfigurations).getTask(1, 'test', 'task from test', 'test');
        chai_1.assert.isOk(task);
        chai_1.assert.equal(task.type, 'test');
        chai_1.assert.equal(task.label, 'task from test');
    });
});
//# sourceMappingURL=provided-task-configurations.spec.js.map