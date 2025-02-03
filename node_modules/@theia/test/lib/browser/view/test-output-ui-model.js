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
exports.TestOutputUIModel = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const test_service_1 = require("../test-service");
const core_1 = require("@theia/core");
const test_context_key_service_1 = require("./test-context-key-service");
let TestOutputUIModel = class TestOutputUIModel {
    constructor() {
        this.activeRuns = new Map();
        this.controllerListeners = new Map();
        this.onDidChangeActiveTestRunEmitter = new core_1.Emitter();
        this.onDidChangeActiveTestRun = this.onDidChangeActiveTestRunEmitter.event;
        this.onDidChangeActiveTestStateEmitter = new core_1.Emitter();
        this.onDidChangeActiveTestState = this.onDidChangeActiveTestStateEmitter.event;
        this.onDidChangeSelectedOutputSourceEmitter = new core_1.Emitter();
        this.onDidChangeSelectedOutputSource = this.onDidChangeSelectedOutputSourceEmitter.event;
        this.onDidChangeSelectedTestStateEmitter = new core_1.Emitter();
        this.onDidChangeSelectedTestState = this.onDidChangeSelectedTestStateEmitter.event;
    }
    init() {
        this.testService.getControllers().forEach(controller => this.addController(controller));
        this.testService.onControllersChanged(deltas => {
            var _a, _b;
            (_a = deltas.added) === null || _a === void 0 ? void 0 : _a.forEach(controller => this.addController(controller));
            (_b = deltas.removed) === null || _b === void 0 ? void 0 : _b.forEach(controller => this.removeController(controller));
        });
    }
    removeController(id) {
        var _a;
        (_a = this.controllerListeners.get(id)) === null || _a === void 0 ? void 0 : _a.dispose();
        if (this.activeRuns.has(id)) {
            this.activeRuns.delete(id);
        }
    }
    addController(controller) {
        this.controllerListeners.set(controller.id, controller.onRunsChanged(delta => {
            var _a;
            if (delta.added) {
                const currentRun = controller.testRuns[controller.testRuns.length - 1];
                if (currentRun) {
                    this.setActiveTestRun(currentRun);
                }
            }
            else {
                (_a = delta.removed) === null || _a === void 0 ? void 0 : _a.forEach(run => {
                    if (run === this.getActiveTestRun(controller)) {
                        const currentRun = controller.testRuns[controller.testRuns.length - 1];
                        this.doSetActiveRun(controller, currentRun);
                    }
                });
            }
        }));
    }
    getActiveTestRun(controller) {
        var _a;
        return (_a = this.activeRuns.get(controller.id)) === null || _a === void 0 ? void 0 : _a.run;
    }
    setActiveTestRun(run) {
        this.doSetActiveRun(run.controller, run);
    }
    doSetActiveRun(controller, run) {
        const old = this.activeRuns.get(controller.id);
        if (old !== run) {
            if (old) {
                old.toDispose.dispose();
            }
            if (run) {
                const toDispose = run.onDidChangeTestState(e => {
                    this.onDidChangeActiveTestStateEmitter.fire({
                        controller,
                        testRun: run,
                        statedDelta: e
                    });
                });
                this.activeRuns.set(controller.id, { run, toDispose });
            }
            else {
                this.activeRuns.delete(controller.id);
            }
            this.onDidChangeActiveTestRunEmitter.fire({ activeRun: run, controller: controller });
        }
    }
    get selectedOutputSource() {
        return this._selectedOutputSource;
    }
    set selectedOutputSource(element) {
        if (element !== this._selectedOutputSource) {
            this._selectedOutputSource = element;
            this.onDidChangeSelectedOutputSourceEmitter.fire(element);
        }
    }
    get selectedTestState() {
        return this._selectedTestState;
    }
    set selectedTestState(element) {
        if (element !== this._selectedTestState) {
            this._selectedTestState = element;
            if (this._selectedTestState && test_service_1.TestFailure.is(this._selectedTestState.state)) {
                const message = this._selectedTestState.state.messages[0];
                this.testContextKeys.contextValue.set(message.contextValue);
            }
            else {
                this.testContextKeys.contextValue.reset();
            }
            this.onDidChangeSelectedTestStateEmitter.fire(element);
        }
    }
};
exports.TestOutputUIModel = TestOutputUIModel;
tslib_1.__decorate([
    (0, inversify_1.inject)(test_context_key_service_1.TestContextKeyService),
    tslib_1.__metadata("design:type", test_context_key_service_1.TestContextKeyService)
], TestOutputUIModel.prototype, "testContextKeys", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(test_service_1.TestService),
    tslib_1.__metadata("design:type", Object)
], TestOutputUIModel.prototype, "testService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TestOutputUIModel.prototype, "init", null);
exports.TestOutputUIModel = TestOutputUIModel = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TestOutputUIModel);
//# sourceMappingURL=test-output-ui-model.js.map