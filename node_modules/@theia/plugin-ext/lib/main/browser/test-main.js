"use strict";
// *****************************************************************************
// Copyright (C) 2023 ST Microelectronics, Inc. and others.
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
exports.TestingMainImpl = exports.TestItemImpl = exports.TestItemCollection = void 0;
const tslib_1 = require("tslib");
const collections_1 = require("@theia/test/lib/common/collections");
const test_service_1 = require("@theia/test/lib/browser/test-service");
const test_execution_progress_service_1 = require("@theia/test/lib/browser/test-execution-progress-service");
const tree_delta_1 = require("@theia/test/lib/common/tree-delta");
const vscode_languageserver_protocol_1 = require("@theia/core/shared/vscode-languageserver-protocol");
const core_1 = require("@theia/core");
const common_1 = require("../../common");
const test_types_1 = require("../../common/test-types");
class TestItemCollection extends collections_1.TreeCollection {
    add(item) {
        item.realParent = this.owner;
        return super.add(item);
    }
}
exports.TestItemCollection = TestItemCollection;
class TestItemImpl {
    update(value) {
        if ('label' in value) {
            this.label = value.label;
        }
        if ('range' in value) {
            this.range = convertRange(value.range);
        }
        if ('sortKey' in value) {
            this.sortKey = value.sortKey;
        }
        if ('tags' in value) {
            this.tags = value.tags;
        }
        if ('busy' in value) {
            this.busy = value.busy;
        }
        if ('sortKey' in value) {
            this.sortKey = value.sortKey;
        }
        if ('canResolveChildren' in value) {
            this.canResolveChildren = value.canResolveChildren;
        }
        if ('description' in value) {
            this.description = value.description;
        }
        if ('error' in value) {
            this.error = value.error;
        }
    }
    constructor(uri, id) {
        this.uri = uri;
        this.id = id;
        this.label = '';
        this.tags = [];
        this.busy = false;
        this.canResolveChildren = false;
        this.items = new TestItemCollection(this, (v) => v.path, (v) => v.deltaBuilder);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    notifyPropertyChange(property, value) {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const val = {};
        val[property] = value;
        if (this.path) {
            (_a = this.deltaBuilder) === null || _a === void 0 ? void 0 : _a.reportChanged(this.path, val);
        }
    }
    get deltaBuilder() {
        if (this._deltaBuilder) {
            return this._deltaBuilder;
        }
        else if (this.realParent) {
            this._deltaBuilder = this.realParent.deltaBuilder;
            return this._deltaBuilder;
        }
        else {
            return undefined;
        }
    }
    get path() {
        if (this._path) {
            return this._path;
        }
        else if (this.realParent instanceof TestItemImpl) {
            this._path = [...this.realParent.path, this.id];
            return this._path;
        }
        else {
            return [this.id];
        }
    }
    ;
    get parent() {
        const realParent = this.realParent;
        if (realParent instanceof TestItemImpl) {
            return realParent;
        }
        return undefined;
    }
    get realParent() {
        return this._parent;
    }
    set realParent(v) {
        this.iterate(item => {
            item._path = undefined;
            return true;
        });
        this._parent = v;
    }
    get controller() {
        var _a;
        return (_a = this.realParent) === null || _a === void 0 ? void 0 : _a.controller;
    }
    iterate(toDo) {
        if (toDo(this)) {
            for (let i = 0; i < this.items.values.length; i++) {
                if (!this.items.values[i].iterate(toDo)) {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    get tests() {
        return this.items.values;
    }
    resolveChildren() {
        var _a;
        if (this.canResolveChildren) {
            (_a = this.controller) === null || _a === void 0 ? void 0 : _a.resolveChildren(this);
        }
    }
}
exports.TestItemImpl = TestItemImpl;
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", String)
], TestItemImpl.prototype, "label", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", Object)
], TestItemImpl.prototype, "range", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", Object)
], TestItemImpl.prototype, "sortKey", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", Array)
], TestItemImpl.prototype, "tags", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", Boolean)
], TestItemImpl.prototype, "busy", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", Boolean)
], TestItemImpl.prototype, "canResolveChildren", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", Object)
], TestItemImpl.prototype, "description", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", Object)
], TestItemImpl.prototype, "error", void 0);
function itemToPath(item) {
    if (!(item instanceof TestItemImpl)) {
        throw new Error(`Not a TestItemImpl: ${item.id}`);
    }
    return item.path;
}
class TestRunProfileImpl {
    set isDefault(isDefault) {
        this._isDefault = isDefault;
        this.proxy.$onDidChangeDefault(this.controllerId, this.id, isDefault);
    }
    get isDefault() {
        return this._isDefault;
    }
    update(update) {
        if ('label' in update) {
            this.label = update.label;
        }
        if ('isDefault' in update) {
            this._isDefault = update.isDefault;
        }
        if ('tag' in update) {
            this.tag = update.tag;
        }
        if ('canConfigure' in update) {
            this.canConfigure = update.canConfigure;
        }
    }
    constructor(proxy, controllerId, id, kind, label, isDefault, tag) {
        this.proxy = proxy;
        this.controllerId = controllerId;
        this.id = id;
        this.kind = kind;
        this.label = label;
        this.isDefault = isDefault;
        this.tag = tag;
    }
    configure() {
        this.proxy.$onConfigureRunProfile(this.controllerId, this.id);
    }
    run(name, included, excluded, preserveFocus) {
        this.proxy.$onRunControllerTests([{
                controllerId: this.controllerId,
                name,
                profileId: this.id,
                includedTests: included.map(item => itemToPath(item)),
                excludedTests: excluded.map(item => itemToPath(item)),
                preserveFocus
            }]);
    }
}
class TestRunImpl {
    constructor(controller, proxy, id, name) {
        this.controller = controller;
        this.proxy = proxy;
        this.id = id;
        this.testStates = new Map();
        this.outputIndices = new Map();
        this.outputs = [];
        this.onDidChangePropertyEmitter = new vscode_languageserver_protocol_1.Emitter();
        this.onDidChangeProperty = this.onDidChangePropertyEmitter.event;
        this.onDidChangeTestStateEmitter = new vscode_languageserver_protocol_1.Emitter();
        this.onDidChangeTestState = this.onDidChangeTestStateEmitter.event;
        this.onDidChangeTestOutputEmitter = new vscode_languageserver_protocol_1.Emitter();
        this.onDidChangeTestOutput = this.onDidChangeTestOutputEmitter.event;
        this.name = name;
        this.isRunning = false;
    }
    ended() {
        const stateEvents = [];
        this.testStates.forEach((state, item) => {
            if (state.state <= test_types_1.TestExecutionState.Running) {
                stateEvents.push({
                    oldState: state,
                    newState: undefined,
                    test: item
                });
                this.testStates.delete(item);
            }
        });
        if (stateEvents.length > 0) {
            this.onDidChangeTestStateEmitter.fire(stateEvents);
        }
        this.isRunning = false;
    }
    notifyPropertyChange(property, value) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const val = {};
        val[property] = value;
        this.onDidChangePropertyEmitter.fire(val);
    }
    cancel() {
        this.proxy.$onCancelTestRun(this.controller.id, this.id);
    }
    getTestState(item) {
        return this.testStates.get(item);
    }
    getOutput(item) {
        if (!item) {
            return this.outputs;
        }
        else {
            const indices = this.outputIndices.get(item);
            if (!indices) {
                return [];
            }
            else {
                return indices.map(index => this.outputs[index]);
            }
        }
    }
    applyChanges(stateChanges, outputChanges) {
        const stateEvents = [];
        stateChanges.forEach(change => {
            const item = this.controller.findItem(change.itemPath);
            if (item) {
                const oldState = this.testStates.get(item);
                this.testStates.set(item, change);
                stateEvents.push({ test: item, oldState: oldState, newState: change });
            }
        });
        const outputEvents = [];
        outputChanges.forEach(change => {
            const output = {
                output: change.output,
                location: convertLocation(change.location)
            };
            this.outputs.push(output);
            let item = undefined;
            if (change.itemPath) {
                item = this.controller.findItem(change.itemPath);
                if (item) {
                    let indices = this.outputIndices.get(item);
                    if (!indices) {
                        indices = [];
                        this.outputIndices.set(item, indices);
                    }
                    indices.push(this.outputs.length - 1);
                }
            }
            outputEvents.push([item, output]);
        });
        this.onDidChangeTestStateEmitter.fire(stateEvents);
        this.onDidChangeTestOutputEmitter.fire(outputEvents);
    }
    get items() {
        return [...this.testStates.keys()];
    }
}
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", Boolean)
], TestRunImpl.prototype, "isRunning", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", String)
], TestRunImpl.prototype, "name", void 0);
function convertLocation(location) {
    if (!location) {
        return undefined;
    }
    return {
        uri: location.uri.toString(),
        range: convertRange(location.range)
    };
}
function convertRange(range) {
    if (range) {
        return {
            start: {
                line: range.startLineNumber,
                character: range.startColumn
            }, end: {
                line: range.endLineNumber,
                character: range.endColumn
            }
        };
    }
    return undefined;
}
class TestControllerImpl {
    constructor(proxy, id, label) {
        this.proxy = proxy;
        this.id = id;
        this.label = label;
        this._profiles = new collections_1.SimpleObservableCollection();
        this._runs = new collections_1.SimpleObservableCollection();
        this.deltaBuilder = new tree_delta_1.AccumulatingTreeDeltaEmitter(300);
        this.canResolveChildren = false;
        this.items = new TestItemCollection(this, item => item.path, () => this.deltaBuilder);
        this.onProfilesChanged = this._profiles.onChanged;
        this.onRunsChanged = this._runs.onChanged;
        this.onItemsChanged = this.deltaBuilder.onDidFlush;
    }
    refreshTests(token) {
        return this.proxy.$refreshTests(this.id, token);
    }
    applyDelta(diff) {
        this.applyDeltasToCollection(this, diff);
    }
    withProfile(profileId) {
        const profile = this._profiles.values.find(p => p.id === profileId);
        if (!profile) {
            throw new Error(`No test profile ${profileId} found in controller with id ${this.id} found`);
        }
        return profile;
    }
    withRun(runId) {
        const run = this._runs.values.find(p => p.id === runId);
        if (!run) {
            throw new Error(`No test profile ${runId} found in controller with id ${this.id} found`);
        }
        return run;
    }
    applyDeltasToCollection(root, deltas) {
        deltas.forEach(delta => this.applyDeltaToCollection(root, delta));
    }
    applyDeltaToCollection(root, delta) {
        if (delta.type === tree_delta_1.DeltaKind.ADDED || delta.type === tree_delta_1.DeltaKind.REMOVED) {
            const node = this.findNodeInRoot(root, delta.path.slice(0, delta.path.length - 1), 0);
            if (node) {
                if (delta.type === tree_delta_1.DeltaKind.ADDED) {
                    node.items.add(this.createTestItem(delta.value));
                }
                else {
                    node.items.remove(delta.path[delta.path.length - 1]);
                }
            }
        }
        else {
            const node = this.findNodeInRoot(root, delta.path, 0);
            if (node) {
                if (delta.type === tree_delta_1.DeltaKind.CHANGED) {
                    node.update(delta.value);
                }
                if (delta.childDeltas) {
                    this.applyDeltasToCollection(node, delta.childDeltas);
                }
            }
        }
    }
    findItem(path) {
        if (path.length === 0) {
            console.warn('looking for item with zero-path');
            return undefined;
        }
        return this.findNodeInRoot(this, path, 0);
    }
    findNodeInRoot(root, path, startIndex) {
        if (startIndex >= path.length) {
            return root;
        }
        const child = root.items.get(path[startIndex]);
        if (!child) {
            return undefined;
        }
        return this.findNodeInRoot(child, path, startIndex + 1);
    }
    createTestItem(value) {
        var _a;
        const item = new TestItemImpl(core_1.URI.fromComponents(value.uri), value === null || value === void 0 ? void 0 : value.id);
        item.update(value);
        (_a = value.children) === null || _a === void 0 ? void 0 : _a.forEach(child => item.items.add(this.createTestItem(child)));
        return item;
    }
    get controller() {
        return this;
    }
    get testRunProfiles() {
        return this._profiles.values;
    }
    update(change) {
        if ('canRefresh' in change) {
            this.canRefresh = change.canRefresh;
        }
        if ('canResolve' in change) {
            this.canResolveChildren = change.canResolve;
        }
        if ('label' in change) {
            this.label = change.label;
        }
    }
    addProfile(profile) {
        this._profiles.add(profile);
    }
    addRun(runId, runName, isRunning) {
        const run = new TestRunImpl(this, this.proxy, runId, runName);
        run.isRunning = isRunning;
        this._runs.add(run);
        return run;
    }
    removeProfile(profileId) {
        this._profiles.remove(this.withProfile(profileId));
    }
    get testRuns() {
        return this._runs.values;
    }
    get tests() {
        return this.items.values;
    }
    resolveChildren(item) {
        if (this.canResolveChildren) {
            this.proxy.$onResolveChildren(this.id, itemToPath(item));
        }
    }
    clearRuns() {
        this._runs.clear();
    }
}
class TestingMainImpl {
    constructor(rpc, container, commandRegistry) {
        this.controllerRegistrations = new Map();
        this.testService = container.get(test_service_1.TestService);
        this.testExecutionProgressService = container.get(test_execution_progress_service_1.TestExecutionProgressService);
        this.proxy = rpc.getProxy(common_1.MAIN_RPC_CONTEXT.TESTING_EXT);
        commandRegistry.registerArgumentProcessor({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            processArgument(arg) {
                if (arg instanceof TestItemImpl) {
                    if (!arg.controller || !arg.path) {
                        throw new Error(`Passing unattached test item ${arg.id} as a command argument`);
                    }
                    return test_types_1.TestItemReference.create(arg.controller.id, arg.path);
                }
                return arg;
            }
        });
    }
    $registerTestController(controllerId, label) {
        const controller = new TestControllerImpl(this.proxy, controllerId, label);
        this.controllerRegistrations.set(controllerId, [controller, this.testService.registerTestController(controller)]);
    }
    $updateController(controllerId, patch) {
        this.withController(controllerId).update(patch);
    }
    $unregisterTestController(controllerId) {
        const registered = this.controllerRegistrations.get(controllerId);
        if (registered) {
            this.controllerRegistrations.delete(controllerId);
            registered[1].dispose();
        }
    }
    withController(controllerId) {
        const registration = this.controllerRegistrations.get(controllerId);
        if (!registration) {
            throw new Error(`No test controller with id ${controllerId} found`);
        }
        return registration[0];
    }
    $notifyDelta(controllerId, diff) {
        this.withController(controllerId).applyDelta(diff);
    }
    $notifyTestRunProfileCreated(controllerId, profile) {
        const registration = this.controllerRegistrations.get(controllerId);
        if (!registration) {
            throw new Error(`No test controller with id ${controllerId} found`);
        }
        registration[0].addProfile(new TestRunProfileImpl(this.proxy, controllerId, profile.id, profile.kind, profile.label, profile.isDefault, profile.tag));
    }
    $updateTestRunProfile(controllerId, profileId, update) {
        this.withController(controllerId).withProfile(profileId).update(update);
    }
    $removeTestRunProfile(controllerId, profileId) {
        this.withController(controllerId).removeProfile(profileId);
    }
    $notifyTestRunCreated(controllerId, run, preserveFocus) {
        this.testExecutionProgressService.onTestRunRequested(preserveFocus);
        this.withController(controllerId).addRun(run.id, run.name, run.isRunning);
    }
    $notifyTestStateChanged(controllerId, runId, stateChanges, outputChanges) {
        this.withController(controllerId).withRun(runId).applyChanges(stateChanges, outputChanges);
    }
    $notifyTestRunEnded(controllerId, runId) {
        this.withController(controllerId).withRun(runId).ended();
    }
}
exports.TestingMainImpl = TestingMainImpl;
//# sourceMappingURL=test-main.js.map