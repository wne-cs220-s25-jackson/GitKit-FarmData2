"use strict";
// *****************************************************************************
// Copyright (C) 2023 STMicroelectronics and others.
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
exports.TestExecutionStateManager = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const test_service_1 = require("../test-service");
/**
 * This class manages the state of "internal" nodes in the test tree
 */
let TestExecutionStateManager = class TestExecutionStateManager {
    constructor() {
        this.executionStates = new Map();
    }
    init() {
        this.testService.getControllers().forEach(controller => this.addController(controller));
        this.testService.onControllersChanged(controllerDelta => {
            var _a;
            (_a = controllerDelta.added) === null || _a === void 0 ? void 0 : _a.forEach(controller => this.addController(controller));
        });
    }
    addController(controller) {
        controller.testRuns.forEach(run => this.addRun(run));
        controller.onRunsChanged(runDelta => {
            var _a, _b;
            (_a = runDelta.added) === null || _a === void 0 ? void 0 : _a.forEach(run => this.addRun(run));
            (_b = runDelta.removed) === null || _b === void 0 ? void 0 : _b.forEach(run => {
                this.executionStates.delete(run);
            });
        });
    }
    addRun(run) {
        this.executionStates.set(run, new TestExecutionStateMap);
        run.onDidChangeTestState(updates => {
            updates.forEach(update => {
                var _a, _b;
                this.updateState(run, update.test, (_a = update.oldState) === null || _a === void 0 ? void 0 : _a.state, (_b = update.newState) === null || _b === void 0 ? void 0 : _b.state);
            });
        });
    }
    updateState(run, item, oldState, newState) {
        const map = this.executionStates.get(run);
        map.reportState(item, oldState, newState);
    }
    getComputedState(run, item) {
        var _a;
        return (_a = this.executionStates.get(run)) === null || _a === void 0 ? void 0 : _a.getComputedState(item);
    }
};
exports.TestExecutionStateManager = TestExecutionStateManager;
tslib_1.__decorate([
    (0, inversify_1.inject)(test_service_1.TestService),
    tslib_1.__metadata("design:type", Object)
], TestExecutionStateManager.prototype, "testService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TestExecutionStateManager.prototype, "init", null);
exports.TestExecutionStateManager = TestExecutionStateManager = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TestExecutionStateManager);
class TestExecutionStateMap {
    constructor() {
        this.stateCounts = new Map();
    }
    reportState(item, oldState, newState) {
        if (oldState !== newState) {
            if (item.parent) {
                this.reportChildStateChanged(item.parent, oldState, newState);
            }
        }
    }
    reportChildStateChanged(parent, oldState, newState) {
        if (oldState !== newState) {
            const currentParentState = this.getComputedState(parent);
            let counts = this.stateCounts.get(parent);
            if (!counts) {
                counts = [];
                counts[test_service_1.TestExecutionState.Queued] = 0;
                counts[test_service_1.TestExecutionState.Running] = 0;
                counts[test_service_1.TestExecutionState.Passed] = 0;
                counts[test_service_1.TestExecutionState.Failed] = 0;
                counts[test_service_1.TestExecutionState.Skipped] = 0;
                counts[test_service_1.TestExecutionState.Errored] = 0;
                this.stateCounts.set(parent, counts);
            }
            if (oldState) {
                counts[oldState]--;
            }
            if (newState) {
                counts[newState]++;
            }
            const newParentState = this.getComputedState(parent);
            if (parent.parent && currentParentState !== newParentState) {
                this.reportChildStateChanged(parent.parent, currentParentState, newParentState);
            }
        }
    }
    updateState(item, oldState, newState) {
        let parent = item.parent;
        while (parent && 'parent' in parent) { // parent is a test item
            let counts = this.stateCounts.get(parent);
            if (!counts) {
                counts = [];
                counts[test_service_1.TestExecutionState.Queued] = 0;
                counts[test_service_1.TestExecutionState.Running] = 0;
                counts[test_service_1.TestExecutionState.Passed] = 0;
                counts[test_service_1.TestExecutionState.Failed] = 0;
                counts[test_service_1.TestExecutionState.Skipped] = 0;
                counts[test_service_1.TestExecutionState.Errored] = 0;
                this.stateCounts.set(parent, counts);
            }
            if (oldState) {
                counts[oldState]--;
            }
            counts[newState]++;
            parent = parent.parent;
        }
    }
    getComputedState(item) {
        const counts = this.stateCounts.get(item);
        if (counts) {
            if (counts[test_service_1.TestExecutionState.Errored] > 0) {
                return test_service_1.TestExecutionState.Errored;
            }
            else if (counts[test_service_1.TestExecutionState.Failed] > 0) {
                return test_service_1.TestExecutionState.Failed;
            }
            else if (counts[test_service_1.TestExecutionState.Running] > 0) {
                return test_service_1.TestExecutionState.Running;
            }
            else if (counts[test_service_1.TestExecutionState.Queued] > 0) {
                return test_service_1.TestExecutionState.Queued;
            }
            else if (counts[test_service_1.TestExecutionState.Passed] > 0) {
                return test_service_1.TestExecutionState.Passed;
            }
            else if (counts[test_service_1.TestExecutionState.Skipped] > 0) {
                return test_service_1.TestExecutionState.Skipped;
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }
}
//# sourceMappingURL=test-execution-state-manager.js.map