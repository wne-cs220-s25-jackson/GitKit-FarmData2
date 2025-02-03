"use strict";
// *****************************************************************************
// Copyright (C) 2022 STMicroelectronics and others.
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
exports.DefaultTestService = exports.TestService = exports.TestContribution = exports.TestServices = exports.TestItem = exports.TestRun = exports.TestFailure = exports.TestMessage = exports.TestExecutionState = exports.TestRunProfileKind = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@theia/core/lib/common");
const vscode_languageserver_protocol_1 = require("@theia/core/shared/vscode-languageserver-protocol");
const markdown_rendering_1 = require("@theia/core/lib/common/markdown-rendering");
const inversify_1 = require("@theia/core/shared/inversify");
const collections_1 = require("../common/collections");
const browser_1 = require("@theia/core/lib/browser");
var TestRunProfileKind;
(function (TestRunProfileKind) {
    TestRunProfileKind[TestRunProfileKind["Run"] = 1] = "Run";
    TestRunProfileKind[TestRunProfileKind["Debug"] = 2] = "Debug";
    TestRunProfileKind[TestRunProfileKind["Coverage"] = 3] = "Coverage";
})(TestRunProfileKind || (exports.TestRunProfileKind = TestRunProfileKind = {}));
var TestExecutionState;
(function (TestExecutionState) {
    TestExecutionState[TestExecutionState["Queued"] = 1] = "Queued";
    TestExecutionState[TestExecutionState["Running"] = 2] = "Running";
    TestExecutionState[TestExecutionState["Passed"] = 3] = "Passed";
    TestExecutionState[TestExecutionState["Failed"] = 4] = "Failed";
    TestExecutionState[TestExecutionState["Skipped"] = 5] = "Skipped";
    TestExecutionState[TestExecutionState["Errored"] = 6] = "Errored";
})(TestExecutionState || (exports.TestExecutionState = TestExecutionState = {}));
var TestMessage;
(function (TestMessage) {
    function is(obj) {
        return (0, common_1.isObject)(obj) && (markdown_rendering_1.MarkdownString.is(obj.message) || typeof obj.message === 'string');
    }
    TestMessage.is = is;
})(TestMessage || (exports.TestMessage = TestMessage = {}));
var TestFailure;
(function (TestFailure) {
    function is(obj) {
        return (0, common_1.isObject)(obj) && (obj.state === TestExecutionState.Failed || obj.state === TestExecutionState.Errored) && Array.isArray(obj.messages);
    }
    TestFailure.is = is;
})(TestFailure || (exports.TestFailure = TestFailure = {}));
var TestRun;
(function (TestRun) {
    function is(obj) {
        return (0, common_1.isObject)(obj)
            && typeof obj.cancel === 'function'
            && typeof obj.name === 'string'
            && typeof obj.isRunning === 'boolean'
            && typeof obj.controller === 'object'
            && typeof obj.onDidChangeProperty === 'function'
            && typeof obj.getTestState === 'function'
            && typeof obj.onDidChangeTestState === 'function'
            && typeof obj.onDidChangeTestState === 'function'
            && typeof obj.getOutput === 'function'
            && typeof obj.onDidChangeTestOutput === 'function'
            && Array.isArray(obj.items);
    }
    TestRun.is = is;
})(TestRun || (exports.TestRun = TestRun = {}));
var TestItem;
(function (TestItem) {
    function is(obj) {
        return (0, common_1.isObject)(obj)
            && obj.id !== undefined
            && obj.label !== undefined
            && Array.isArray(obj.tags)
            && Array.isArray(obj.tests)
            && obj.busy !== undefined
            && obj.canResolveChildren !== undefined
            && typeof obj.resolveChildren === 'function';
    }
    TestItem.is = is;
})(TestItem || (exports.TestItem = TestItem = {}));
var TestServices;
(function (TestServices) {
    function withTestRun(service, controllerId, runId) {
        const controller = service.getControllers().find(c => c.id === controllerId);
        if (!controller) {
            throw new Error(`No test controller with id '${controllerId}' found`);
        }
        const run = controller.testRuns.find(r => r.id === runId);
        if (!run) {
            throw new Error(`No test run with id '${runId}' found`);
        }
        return run;
    }
    TestServices.withTestRun = withTestRun;
})(TestServices || (exports.TestServices = TestServices = {}));
exports.TestContribution = Symbol('TestContribution');
exports.TestService = Symbol('TestService');
let DefaultTestService = class DefaultTestService {
    constructor() {
        this.testRunCounter = 0;
        this.onDidChangeIsRefreshingEmitter = new common_1.Emitter();
        this.onDidChangeIsRefreshing = this.onDidChangeIsRefreshingEmitter.event;
        this.controllers = new Map();
        this.refreshing = new Set();
        this.onControllersChangedEmitter = new common_1.Emitter();
        this.onControllersChanged = this.onControllersChangedEmitter.event;
    }
    registerContributions() {
        this.contributionProvider.getContributions().forEach(contribution => contribution.registerTestControllers(this));
    }
    registerTestController(controller) {
        if (this.controllers.has(controller.id)) {
            throw new Error('TestController already registered: ' + controller.id);
        }
        this.controllers.set(controller.id, controller);
        this.onControllersChangedEmitter.fire({ added: [controller] });
        return common_1.Disposable.create(() => {
            this.controllers.delete(controller.id);
            this.onControllersChangedEmitter.fire({ removed: [controller.id] });
        });
    }
    getControllers() {
        return Array.from(this.controllers.values());
    }
    refresh() {
        const cts = new vscode_languageserver_protocol_1.CancellationTokenSource();
        this.refreshing.add(cts);
        Promise.all(this.getControllers().map(controller => controller.refreshTests(cts.token))).then(() => {
            this.refreshing.delete(cts);
            if (this.refreshing.size === 0) {
                this.onDidChangeIsRefreshingEmitter.fire();
            }
        });
        if (this.refreshing.size === 1) {
            this.onDidChangeIsRefreshingEmitter.fire();
        }
    }
    cancelRefresh() {
        if (this.refreshing.size > 0) {
            this.refreshing.forEach(cts => cts.cancel());
            this.refreshing.clear();
            this.onDidChangeIsRefreshingEmitter.fire();
        }
    }
    get isRefreshing() {
        return this.refreshing.size > 0;
    }
    runAllTests(profileKind) {
        this.getControllers().forEach(controller => {
            this.runTestForController(controller, profileKind, controller.tests);
        });
    }
    async runTestForController(controller, profileKind, items) {
        const runProfiles = controller.testRunProfiles.filter(profile => profile.kind === profileKind);
        let activeProfile;
        if (runProfiles.length === 1) {
            activeProfile = runProfiles[0];
        }
        else if (runProfiles.length > 1) {
            const defaultProfile = runProfiles.find(p => p.isDefault);
            if (defaultProfile) {
                activeProfile = defaultProfile;
            }
            else {
                activeProfile = await this.pickProfile(runProfiles, common_1.nls.localizeByDefault('Pick a test profile to use'));
            }
        }
        if (activeProfile) {
            activeProfile.run(`Test run #${this.testRunCounter++}`, items, [], true);
        }
    }
    async pickProfile(runProfiles, title) {
        var _a;
        if (runProfiles.length === 0) {
            return undefined;
        }
        // eslint-disable-next-line arrow-body-style
        const picks = runProfiles.map(profile => {
            let iconClasses;
            if (profile.kind === TestRunProfileKind.Run) {
                iconClasses = (0, browser_1.codiconArray)('run');
            }
            else if (profile.kind === TestRunProfileKind.Debug) {
                iconClasses = (0, browser_1.codiconArray)('debug-alt');
            }
            return {
                iconClasses,
                label: `${profile.label}${profile.isDefault ? ' (default)' : ''}`,
                profile: profile
            };
        });
        return (_a = (await this.quickpickService.show(picks, { title: title }))) === null || _a === void 0 ? void 0 : _a.profile;
    }
    async pickProfileKind() {
        var _a;
        // eslint-disable-next-line arrow-body-style
        const picks = [{
                iconClasses: (0, browser_1.codiconArray)('run'),
                label: 'Run',
                kind: TestRunProfileKind.Run
            }, {
                iconClasses: (0, browser_1.codiconArray)('debug-alt'),
                label: 'Debug',
                kind: TestRunProfileKind.Debug
            }];
        return (_a = (await this.quickpickService.show(picks, { title: 'Select the kind of profiles' }))) === null || _a === void 0 ? void 0 : _a.kind;
    }
    runTests(profileKind, items) {
        (0, collections_1.groupBy)(items, item => item.controller).forEach((tests, controller) => {
            if (controller) {
                this.runTestForController(controller, profileKind, tests);
            }
        });
    }
    runTestsWithProfile(items) {
        (0, collections_1.groupBy)(items, item => item.controller).forEach((tests, controller) => {
            if (controller) {
                this.pickProfile(controller.testRunProfiles, common_1.nls.localizeByDefault('Pick a test profile to use')).then(activeProfile => {
                    if (activeProfile) {
                        activeProfile.run(`Test run #${this.testRunCounter++}`, items, [], true);
                    }
                });
            }
        });
    }
    selectDefaultProfile() {
        this.pickProfileKind().then(kind => {
            const profiles = this.getControllers().flatMap(c => c.testRunProfiles).filter(profile => profile.kind === kind);
            this.pickProfile(profiles, common_1.nls.localizeByDefault('Pick a test profile to use')).then(activeProfile => {
                if (activeProfile) {
                    // only change the default for the controller containing selected profile for default and its profiles with same kind
                    const controller = this.getControllers().find(c => c.testRunProfiles.includes(activeProfile));
                    controller === null || controller === void 0 ? void 0 : controller.testRunProfiles.filter(profile => profile.kind === activeProfile.kind).forEach(profile => {
                        profile.isDefault = profile === activeProfile;
                    });
                }
            });
        });
    }
    configureProfile() {
        const profiles = [];
        for (const controller of this.controllers.values()) {
            profiles.push(...controller.testRunProfiles);
        }
        ;
        this.pickProfile(profiles.filter(profile => profile.canConfigure), common_1.nls.localizeByDefault('Select a profile to update')).then(profile => {
            if (profile) {
                profile.configure();
            }
        });
    }
    clearResults() {
        for (const controller of this.controllers.values()) {
            controller.clearRuns();
        }
    }
};
exports.DefaultTestService = DefaultTestService;
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.QuickPickService),
    tslib_1.__metadata("design:type", Object)
], DefaultTestService.prototype, "quickpickService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(exports.TestContribution),
    tslib_1.__metadata("design:type", Object)
], DefaultTestService.prototype, "contributionProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DefaultTestService.prototype, "registerContributions", null);
exports.DefaultTestService = DefaultTestService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DefaultTestService);
//# sourceMappingURL=test-service.js.map