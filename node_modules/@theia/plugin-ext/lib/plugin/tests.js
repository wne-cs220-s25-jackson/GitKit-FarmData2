"use strict";
// *****************************************************************************
// Copyright (C) 2023 Mathieu Bussieres and others.
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
exports.TestRunProfile = exports.TestingExtImpl = exports.TestRun = exports.checkTestRunInstance = exports.TestControllerImpl = void 0;
const tslib_1 = require("tslib");
const cancellation_1 = require("@theia/core/lib/common/cancellation");
const core_1 = require("@theia/core");
const hash_1 = require("@theia/core/lib/common/hash");
const types_1 = require("@theia/core/lib/common/types");
const plugin_api_rpc_1 = require("../common/plugin-api-rpc");
const uuid_1 = require("@theia/core/lib/common/uuid");
const Convert = require("./type-converters");
const test_item_1 = require("./test-item");
const tree_delta_1 = require("@theia/test/lib/common/tree-delta");
const test_types_1 = require("../common/test-types");
const collections_1 = require("@theia/test/lib/common/collections");
const types_impl_1 = require("./types-impl");
const plugin_api_rpc_model_1 = require("../common/plugin-api-rpc-model");
class TestControllerImpl {
    constructor(onDispose, proxy, id, _label) {
        this.onDispose = onDispose;
        this.proxy = proxy;
        this.id = id;
        this._label = _label;
        this._profiles = new Map();
        this.activeRuns = new Map();
        this.proxy.$registerTestController(id, _label);
        this.deltaBuilder = new tree_delta_1.AccumulatingTreeDeltaEmitter(200);
        this.deltaBuilder.onDidFlush(delta => {
            // console.debug('flushing delta'); // logging levels don't work in plugin host: https://github.com/eclipse-theia/theia/issues/12234
            const mapped = this.mapDeltas(delta);
            // console.debug(JSON.stringify(mapped, undefined, 3));
            this.proxy.$notifyDelta(id, mapped);
        });
        this.items = new test_item_1.TestItemCollection(this, item => item.path, () => this.deltaBuilder);
    }
    mapDeltas(deltas) {
        return deltas.map(delta => this.mapDelta(delta));
    }
    mapDelta(delta) {
        var _a;
        return {
            path: delta.path,
            type: delta.type,
            value: delta.value ? Convert.TestItem.fromPartial(delta.value) : undefined,
            childDeltas: (_a = delta.childDeltas) === null || _a === void 0 ? void 0 : _a.map(d => this.mapDelta(d))
        };
    }
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
        this.proxy.$updateController(this.id, { label: value });
    }
    get refreshHandler() {
        return this._refreshHandler;
    }
    set refreshHandler(value) {
        this._refreshHandler = value;
        this.proxy.$updateController(this.id, { canRefresh: !!value });
    }
    get resolveHandler() {
        return this._resolveHandler;
    }
    set resolveHandler(handler) {
        this._resolveHandler = handler;
        this.proxy.$updateController(this.id, { canResolve: !!handler });
    }
    getProfile(id) {
        return this._profiles.get(Number.parseInt(id));
    }
    createRunProfile(label, kind, runHandler, isDefault, tag, supportsContinuousRun) {
        // Derive the profile ID from a hash so that the same profile will tend
        // to have the same hashes, allowing re-run requests to work across reloads.
        let profileId = (0, hash_1.hash)(label);
        while (this._profiles.has(profileId)) {
            profileId++;
        }
        const profile = new TestRunProfile(this.proxy, this.id, profileId.toString(), label, kind, runHandler, isDefault, tag);
        this._profiles.set(profileId, profile);
        return profile;
    }
    createTestItem(id, label, uri) {
        return new test_item_1.TestItemImpl(id, uri, label);
    }
    createTestRun(request, name, persist = true) {
        const run = new TestRun(this, this.proxy, name || '', persist, true, request.preserveFocus);
        const endListener = run.onWillFlush(() => {
            // make sure we notify the front end of test item changes before test run state is sent
            this.deltaBuilder.flush();
        });
        run.onDidEnd(() => {
            endListener.dispose();
            this.activeRuns.delete(request);
        });
        this.activeRuns.set(request, run);
        return run;
    }
    dispose() {
        this.proxy.$unregisterTestController(this.id);
        this.onDispose();
    }
    runTestsForUI(profileId, name, includedTests, excludedTests, preserveFocus) {
        const profile = this.getProfile(profileId);
        if (!profile) {
            console.error(`No test run profile found for controller ${this.id} with id ${profileId} `);
            return;
        }
        const includeTests = includedTests
            .map(testId => this.items.find(testId))
            .filter(types_1.isDefined);
        if (includeTests.length === 0) {
            return;
        }
        function isPrefix(left, right) {
            if (left.length > right.length) {
                return false;
            }
            for (let i = 0; i < left.length; i++) {
                if (left[i] !== right[i]) {
                    return false;
                }
            }
            return true;
        }
        const excludeTests = excludedTests
            .filter(path => includedTests.some(includedPath => isPrefix(path, includedPath)))
            .map(path => this.items.find(path))
            .filter(types_1.isDefined);
        const request = new types_impl_1.TestRunRequest(includeTests, excludeTests, profile, false /* don't support continuous run yet */, preserveFocus);
        // we do not cancel test runs via a cancellation token, but instead invoke "cancel" on the test runs
        profile.runHandler(request, cancellation_1.CancellationToken.None);
    }
    cancelRun(runId) {
        if (runId === undefined) {
            this.activeRuns.forEach(run => run.cancel());
        }
        else {
            const run = [...this.activeRuns.values()].find(r => r.id === runId);
            if (!run) {
                throw new Error(`TestController ${this.id} cannot cancel non - existing run ${runId} `);
            }
            run.cancel();
        }
    }
    invalidateTestResults(items) {
        // do nothing for the moment, since we don't have a UI to "mark as outdated and deprioritized in the editor's UI."
    }
}
exports.TestControllerImpl = TestControllerImpl;
function checkTestInstance(item) {
    if (item instanceof test_item_1.TestItemImpl) {
        if (!item.path) {
            throw new Error('Test item not added to a collection');
        }
        return item;
    }
    else if (item) {
        throw new Error('Not a TestItem instance');
    }
    return undefined;
}
function checkTestRunInstance(item) {
    if (item instanceof TestRun) {
        return item;
    }
    else if (item) {
        throw new Error('Not a TestRun instance');
    }
    return undefined;
}
exports.checkTestRunInstance = checkTestRunInstance;
class TestRun {
    constructor(controller, proxy, name, isPersisted, isRunning, preserveFocus) {
        this.controller = controller;
        this.proxy = proxy;
        this.name = name;
        this.isPersisted = isPersisted;
        this.onDidEndEmitter = new core_1.Emitter();
        this.onDidEnd = this.onDidEndEmitter.event;
        this.onWillFlushEmitter = new core_1.Emitter();
        this.onWillFlush = this.onWillFlushEmitter.event;
        this.onDidDisposeEmitter = new core_1.Emitter();
        this.onDidDispose = this.onDidDisposeEmitter.event;
        this.testStateDeltas = new Map();
        this.testOutputDeltas = [];
        this.changeBatcher = new collections_1.ChangeBatcher(() => {
            this.emitChange();
        }, 200);
        this.id = (0, uuid_1.generateUuid)();
        this.tokenSource = new cancellation_1.CancellationTokenSource();
        this.proxy.$notifyTestRunCreated(this.controller.id, { id: this.id, name: this.name, isRunning }, preserveFocus);
    }
    get token() {
        return this.tokenSource.token;
    }
    enqueued(test) {
        this.updateTestState(test, { itemPath: checkTestInstance(test).path, state: test_types_1.TestExecutionState.Queued });
    }
    started(test) {
        this.updateTestState(test, { itemPath: checkTestInstance(test).path, state: test_types_1.TestExecutionState.Running });
    }
    skipped(test) {
        this.updateTestState(test, { itemPath: checkTestInstance(test).path, state: test_types_1.TestExecutionState.Skipped });
    }
    failed(test, message, duration) {
        this.updateTestState(test, { itemPath: checkTestInstance(test).path, state: test_types_1.TestExecutionState.Failed, messages: Convert.TestMessage.from(message), duration });
    }
    errored(test, message, duration) {
        this.updateTestState(test, { itemPath: checkTestInstance(test).path, state: test_types_1.TestExecutionState.Errored, messages: Convert.TestMessage.from(message), duration });
    }
    passed(test, duration) {
        this.updateTestState(test, { itemPath: checkTestInstance(test).path, state: test_types_1.TestExecutionState.Passed, duration });
    }
    appendOutput(output, location, test) {
        var _a;
        this.testOutputDeltas.push({ output, location: Convert.fromLocation(location), itemPath: (_a = checkTestInstance(test)) === null || _a === void 0 ? void 0 : _a.path });
        this.changeBatcher.changeOccurred();
    }
    end() {
        this.ended = true;
        this.proxy.$notifyTestRunEnded(this.controller.id, this.id);
    }
    /** @stubbed */
    addCoverage(fileCoverage) { }
    checkNotEnded(test) {
        if (this.ended) {
            console.warn(`Setting the state of test "${test.id}" is a no - op after the run ends.`);
            return false;
        }
        return true;
    }
    updateTestState(item, state) {
        if (this.checkNotEnded(item)) {
            this.testStateDeltas.set(item, state);
            this.changeBatcher.changeOccurred();
        }
    }
    emitChange() {
        this.onWillFlushEmitter.fire();
        this.proxy.$notifyTestStateChanged(this.controller.id, this.id, [...this.testStateDeltas.values()], this.testOutputDeltas);
        this.testOutputDeltas = [];
        this.testStateDeltas = new Map();
    }
    cancel() {
        this.tokenSource.cancel();
    }
}
exports.TestRun = TestRun;
class TestingExtImpl {
    constructor(rpc, commands) {
        this.controllersById = new Map();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.TESTING_MAIN);
        commands.registerArgumentProcessor({
            processArgument: arg => {
                if (test_types_1.TestItemReference.is(arg)) {
                    return this.toTestItem(arg);
                }
                else if (Array.isArray(arg)) {
                    return arg.map(param => test_types_1.TestItemReference.is(param) ? this.toTestItem(param) : param);
                }
                else if (test_types_1.TestMessageArg.is(arg)) {
                    return this.fromTestMessageArg(arg);
                }
                else {
                    return arg;
                }
            }
        });
    }
    fromTestMessageArg(arg) {
        const testItem = arg.testItemReference ? this.toTestItem(arg.testItemReference) : undefined;
        const message = this.toTestMessage(arg.testMessage);
        return {
            test: testItem,
            message: message
        };
    }
    toTestMessage(testMessage) {
        const message = plugin_api_rpc_model_1.MarkdownString.is(testMessage.message) ? Convert.toMarkdown(testMessage.message) : testMessage.message;
        return {
            message: message,
            actualOutput: testMessage.actual,
            expectedOutput: testMessage.expected,
            contextValue: testMessage.contextValue,
            location: this.toLocation(testMessage.location),
            stackTrace: testMessage.stackTrace ? testMessage.stackTrace.map(frame => this.toStackFrame(frame)) : undefined
        };
    }
    toLocation(location) {
        if (!location) {
            return undefined;
        }
        return new types_impl_1.Location(types_impl_1.URI.parse(location.uri), this.toRange(location.range));
    }
    toRange(range) {
        return new types_impl_1.Range(this.toPosition(range.start), this.toPosition(range.end));
    }
    toPosition(position) {
        if (!position) {
            return undefined;
        }
        return new types_impl_1.Position(position.line, position.character);
    }
    toStackFrame(stackFrame) {
        return {
            label: stackFrame.label,
            position: this.toPosition(stackFrame.position),
            uri: stackFrame.uri ? types_impl_1.URI.parse(stackFrame.uri) : undefined
        };
    }
    toTestItem(ref) {
        const result = this.withController(ref.controllerId).items.find(ref.testPath);
        if (!result) {
            throw new Error(`Test item for controller ${ref.controllerId} not found: ${ref.testPath}`);
        }
        return result;
    }
    withController(controllerId) {
        const controller = this.controllersById.get(controllerId);
        if (!controller) {
            throw new Error(`No test controller found with id "${controllerId}"`);
        }
        return controller;
    }
    $onResolveChildren(controllerId, path) {
        var _a;
        const controller = this.withController(controllerId);
        if (controller.resolveHandler) {
            const item = controller.items.find(path);
            if (item === null || item === void 0 ? void 0 : item.canResolveChildren) { // the item and resolve handler might have been been changed, but not sent to the front end
                (_a = controller.resolveHandler) === null || _a === void 0 ? void 0 : _a.call(controller, item);
            }
        }
    }
    /**
     * Implements theia.test.registerTestProvider
     */
    createTestController(controllerId, label) {
        if (this.controllersById.has(controllerId)) {
            throw new Error(`Attempt to insert a duplicate controller with ID "${controllerId}"`);
        }
        const disposable = new core_1.DisposableCollection();
        const controller = new TestControllerImpl(() => disposable.dispose(), this.proxy, controllerId, label);
        this.controllersById.set(controllerId, controller);
        disposable.push(core_1.Disposable.create(() => this.controllersById.delete(controllerId)));
        return controller;
    }
    /** @inheritdoc */
    $onConfigureRunProfile(controllerId, profileId) {
        var _a, _b, _c;
        (_c = (_b = (_a = this.controllersById.get(controllerId)) === null || _a === void 0 ? void 0 : _a.getProfile(profileId)) === null || _b === void 0 ? void 0 : _b.configureHandler) === null || _c === void 0 ? void 0 : _c.call(_b);
    }
    /** @inheritdoc */
    $onDidChangeDefault(controllerId, profileId, isDefault) {
        var _a;
        const profile = (_a = this.controllersById.get(controllerId)) === null || _a === void 0 ? void 0 : _a.getProfile(profileId);
        if (profile) {
            profile.doSetDefault(isDefault);
        }
    }
    /** @inheritdoc */
    async $refreshTests(controllerId, token) {
        var _a, _b;
        await ((_b = (_a = this.withController(controllerId)).refreshHandler) === null || _b === void 0 ? void 0 : _b.call(_a, token));
    }
    /**
     * Runs tests with the given set of IDs. Allows for test from multiple
     * providers to be run.
     * @override
     */
    $onRunControllerTests(reqs) {
        reqs.map(req => this.runTestsForUI(req));
    }
    runTestsForUI(req) {
        this.withController(req.controllerId).runTestsForUI(req.profileId, req.name, req.includedTests, req.excludedTests, req.preserveFocus);
    }
    /**
     * Cancels an ongoing test run.
     */
    $onCancelTestRun(controllerId, runId) {
        this.withController(controllerId).cancelRun(runId);
    }
}
exports.TestingExtImpl = TestingExtImpl;
class TestRunProfile {
    constructor(proxy, controllerId, profileId, label, kind, runHandler, isDefault = false, tag = undefined) {
        this.controllerId = controllerId;
        this.profileId = profileId;
        this.kind = kind;
        this.runHandler = runHandler;
        this.supportsContinuousRun = false;
        this.onDidChangeDefaultEmitter = new core_1.Emitter();
        this.onDidChangeDefault = this.onDidChangeDefaultEmitter.event;
        proxy.$notifyTestRunProfileCreated(controllerId, {
            id: profileId,
            kind: kind,
            tag: tag ? tag.toString() : '',
            label: label,
            isDefault: isDefault,
            canConfigure: false,
        });
        this.proxy = proxy;
        this.label = label;
        this.tag = tag;
        this.label = label;
        this.isDefault = isDefault;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    notifyPropertyChange(property, value) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const val = {};
        val[property] = value;
        this.proxy.$updateTestRunProfile(this.controllerId, this.profileId, val);
    }
    get isDefault() {
        return this._isDefault;
    }
    set isDefault(isDefault) {
        if (this.doSetDefault(isDefault)) {
            this.proxy.$updateTestRunProfile(this.controllerId, this.profileId, { isDefault: isDefault });
        }
    }
    doSetDefault(isDefault) {
        if (this._isDefault !== isDefault) {
            this._isDefault = isDefault;
            this.onDidChangeDefaultEmitter.fire(isDefault);
            return true;
        }
        return false;
    }
    notifyTagChange(_property, value) {
        this.proxy.$updateTestRunProfile(this.controllerId, this.profileId, { tag: value ? value.toString() : '' });
    }
    notifyConfigureHandlerChange(_property, value) {
        this.proxy.$updateTestRunProfile(this.controllerId, this.profileId, { canConfigure: !!value });
    }
    dispose() {
    }
}
exports.TestRunProfile = TestRunProfile;
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", String)
], TestRunProfile.prototype, "label", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyTagChange'),
    tslib_1.__metadata("design:type", Object)
], TestRunProfile.prototype, "tag", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyConfigureHandlerChange'),
    tslib_1.__metadata("design:type", Function)
], TestRunProfile.prototype, "configureHandler", void 0);
//# sourceMappingURL=tests.js.map