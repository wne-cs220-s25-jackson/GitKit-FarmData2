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
const chai_1 = require("chai");
const common_1 = require("../common");
const task_definition_registry_1 = require("./task-definition-registry");
describe('TaskDefinitionRegistry', () => {
    let registry;
    const definitionContributionA = {
        taskType: 'extA',
        source: 'extA',
        properties: {
            required: ['extensionType'],
            all: ['extensionType', 'taskLabel'],
            schema: {
                type: 'object',
                required: ['extensionType'],
                properties: {
                    type: { const: 'extA' },
                    extensionType: {},
                    taskLabel: {}
                }
            }
        }
    };
    const definitionContributionB = {
        taskType: 'extA',
        source: 'extA',
        properties: {
            required: ['extensionType', 'taskLabel', 'taskDetailedLabel'],
            all: ['extensionType', 'taskLabel', 'taskDetailedLabel'],
            schema: {
                type: 'object',
                required: ['extensionType', 'taskLabel', 'taskDetailedLabel'],
                properties: {
                    type: { const: 'extA' },
                    extensionType: {},
                    taskLabel: {},
                    taskDetailedLabel: {}
                }
            }
        }
    };
    const FAKE_TASK_META = {
        TYPE: 'foobar_type',
        SRC: 'foobar_src'
    };
    const defaultPresentation = {
        clear: false,
        echo: true,
        focus: false,
        panel: common_1.PanelKind.Shared,
        reveal: common_1.RevealKind.Always,
        showReuseMessage: true,
    };
    const fakeTaskDefinition = {
        taskType: FAKE_TASK_META.TYPE,
        source: FAKE_TASK_META.SRC,
        properties: {
            required: ['strArg'],
            all: ['strArg', 'arrArgs'],
            schema: {
                type: 'object',
                required: ['strArg'],
                properties: {
                    type: { const: FAKE_TASK_META.TYPE },
                    strArg: {},
                    arrArgs: {}
                }
            }
        }
    };
    const configureFakeTask = (executionId = 'foobar', type = FAKE_TASK_META.TYPE, _source = FAKE_TASK_META.SRC, arrArgs = [], strArg = '', label = 'foobar', presentation = defaultPresentation, problemMatcher = undefined, taskType = 'customExecution', _scope = common_1.TaskScope.Workspace) => ({
        executionId, arrArgs, strArg, label, presentation,
        problemMatcher, taskType, type, _scope, _source,
    });
    beforeEach(() => {
        registry = new task_definition_registry_1.TaskDefinitionRegistry();
    });
    describe('register function', () => {
        it('should transform the task definition contribution and store it in memory', () => {
            registry.register(definitionContributionA);
            (0, chai_1.expect)(registry['definitions'].get(definitionContributionA.taskType)).to.be.ok;
            (0, chai_1.expect)(registry['definitions'].get(definitionContributionA.taskType)[0]).to.deep.equal(definitionContributionA);
        });
    });
    describe('getDefinitions function', () => {
        it('should return all definitions associated with the given type', () => {
            registry.register(definitionContributionA);
            const defs1 = registry.getDefinitions(definitionContributionA.taskType);
            (0, chai_1.expect)(defs1.length).to.eq(1);
            registry.register(definitionContributionB);
            const defs2 = registry.getDefinitions(definitionContributionA.taskType);
            (0, chai_1.expect)(defs2.length).to.eq(2);
        });
    });
    describe('getDefinition function', () => {
        it('should return undefined if the given task configuration does not match any registered definitions', () => {
            registry.register(definitionContributionA);
            registry.register(definitionContributionB);
            const defs = registry.getDefinition({
                type: definitionContributionA.taskType, label: 'grunt task', task: 'build'
            });
            (0, chai_1.expect)(defs).to.be.not.ok;
        });
        it('should return the best match if there is one or more registered definitions match the given task configuration', () => {
            registry.register(definitionContributionA);
            registry.register(definitionContributionB);
            const defs = registry.getDefinition({
                type: definitionContributionA.taskType, label: 'extension task', extensionType: 'extensionType', taskLabel: 'taskLabel'
            });
            (0, chai_1.expect)(defs).to.be.ok;
            (0, chai_1.expect)(defs.taskType).to.be.eq(definitionContributionA.taskType);
            const defs2 = registry.getDefinition({
                type: definitionContributionA.taskType, label: 'extension task', extensionType: 'extensionType', taskLabel: 'taskLabel', taskDetailedLabel: 'taskDetailedLabel'
            });
            (0, chai_1.expect)(defs2).to.be.ok;
            (0, chai_1.expect)(defs2.taskType).to.be.eq(definitionContributionB.taskType);
        });
    });
    describe('compareTasks function', () => {
        beforeEach(() => registry.register(fakeTaskDefinition));
        it('should return false if given 2 task configurations with different type', () => {
            const areSameTasks = registry.compareTasks(configureFakeTask('id_1', 'type_1'), configureFakeTask('id_2', 'type_2'));
            (0, chai_1.expect)(areSameTasks).to.be.false;
        });
        it('should return true if given 2 same task configurations with empty arrays (different by reference) as custom property', () => {
            const areSameTasks = registry.compareTasks(configureFakeTask('id_1'), configureFakeTask('id_2'));
            (0, chai_1.expect)(areSameTasks).to.be.true;
        });
        it('should return true if given 2 same task configurations with deep properties (different by reference)', () => {
            const areSameTasks = registry.compareTasks(configureFakeTask('id_1', undefined, undefined, [1, '2', { '3': { a: true, b: 'string' } }]), configureFakeTask('id_2', undefined, undefined, [1, '2', { '3': { a: true, b: 'string' } }]));
            (0, chai_1.expect)(areSameTasks).to.be.true;
        });
        it('should return false if given 2 task configurations with different deep properties', () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const inputs = [
                [
                    configureFakeTask('id_1', undefined, undefined, [1, '2', { '3': { a: true, b: 'b' } }]),
                    configureFakeTask('id_2', undefined, undefined, [1, '2', { '3': { a: true } }]),
                ],
                [
                    configureFakeTask('id_1', undefined, undefined, [1, '2']),
                    configureFakeTask('id_2', undefined, undefined, [1, 2]),
                ],
                [
                    // eslint-disable-next-line no-null/no-null
                    configureFakeTask('id_1', undefined, undefined, [1, '2', { c: null }]),
                    configureFakeTask('id_2', undefined, undefined, [1, '2', { c: undefined }]),
                ],
            ];
            const allAreFalse = inputs.map(args => registry.compareTasks(...args)).every(areSameTasks => areSameTasks === false);
            (0, chai_1.expect)(allAreFalse).to.be.true;
        });
    });
});
//# sourceMappingURL=task-definition-registry.spec.js.map