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
var TestRunTreeWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRunTreeWidget = exports.TestRunTree = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const tree_1 = require("@theia/core/lib/browser/tree");
const browser_1 = require("@theia/core/lib/browser");
const icon_theme_service_1 = require("@theia/core/lib/browser/icon-theme-service");
const theming_1 = require("@theia/core/lib/browser/theming");
const context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
const test_service_1 = require("../test-service");
const React = require("@theia/core/shared/react");
const core_1 = require("@theia/core");
const test_execution_state_manager_1 = require("./test-execution-state-manager");
const test_output_ui_model_1 = require("./test-output-ui-model");
class TestRunNode {
    constructor(counter, id, run, parent) {
        this.counter = counter;
        this.id = id;
        this.run = run;
        this.parent = parent;
        this.selected = false;
        this.children = [];
    }
    get name() {
        return this.run.name || core_1.nls.localize('theia/test/testRunDefaultName', '{0} run {1}', this.run.controller.label, this.counter);
    }
    ;
}
class TestItemNode {
    constructor(id, item, parent) {
        this.id = id;
        this.item = item;
        this.parent = parent;
        this.selected = false;
    }
    get name() {
        return this.item.label;
    }
}
let TestRunTree = class TestRunTree extends tree_1.TreeImpl {
    constructor() {
        super(...arguments);
        this.ROOT = {
            id: 'TestResults',
            name: 'Test Results',
            parent: undefined,
            children: [],
            visible: false
        };
        this.controllerListeners = new Map();
        this.runs = new Map();
        this.nextId = 0;
    }
    init() {
        this.root = this.ROOT;
        this.testService.getControllers().forEach(controller => {
            this.addController(controller);
        });
        this.testService.onControllersChanged(controllerDelta => {
            var _a, _b;
            (_a = controllerDelta.removed) === null || _a === void 0 ? void 0 : _a.forEach(controller => {
                var _a;
                (_a = this.controllerListeners.get(controller)) === null || _a === void 0 ? void 0 : _a.dispose();
            });
            (_b = controllerDelta.added) === null || _b === void 0 ? void 0 : _b.forEach(controller => this.addController(controller));
        });
    }
    addController(controller) {
        controller.testRuns.forEach(run => this.addRun(run));
        const listeners = new core_1.DisposableCollection();
        this.controllerListeners.set(controller.id, listeners);
        listeners.push(controller.onRunsChanged(runDelta => {
            var _a, _b;
            (_a = runDelta.removed) === null || _a === void 0 ? void 0 : _a.forEach(run => {
                var _a;
                (_a = this.runs.get(run)) === null || _a === void 0 ? void 0 : _a.disposable.dispose();
                this.runs.delete(run);
                this.refresh(this.ROOT);
            });
            (_b = runDelta.added) === null || _b === void 0 ? void 0 : _b.forEach(run => {
                this.addRun(run);
                this.refresh(this.ROOT);
            });
        }));
    }
    addRun(run) {
        const newNode = this.createRunNode(run);
        const affected = [];
        const disposables = new core_1.DisposableCollection();
        disposables.push(run.onDidChangeTestState(deltas => {
            let needsRefresh = false;
            deltas.forEach(delta => {
                if (delta.newState) {
                    if (delta.newState.state > test_service_1.TestExecutionState.Queued) {
                        const testNode = info.tests.get(delta.test);
                        if (!testNode) {
                            if (info.tests.size === 0) {
                                newNode.expanded = true;
                            }
                            info.tests.set(delta.test, this.createTestItemNode(newNode, delta.test));
                            needsRefresh = true;
                        }
                        else {
                            affected.push(testNode);
                        }
                    }
                }
                else {
                    info.tests.delete(delta.test);
                    needsRefresh = true;
                }
            });
            if (needsRefresh) {
                this.refresh(newNode);
            }
            else {
                this.onDidUpdateEmitter.fire(affected);
            }
        }));
        disposables.push(run.onDidChangeProperty(() => this.onDidUpdateEmitter.fire([])));
        const info = {
            node: newNode,
            disposable: disposables,
            tests: new Map(run.items.filter(item => { var _a; return (((_a = run.getTestState(item)) === null || _a === void 0 ? void 0 : _a.state) || 0) > test_service_1.TestExecutionState.Queued; }).map(item => [item, this.createTestItemNode(newNode, item)]))
        };
        this.runs.set(run, info);
    }
    createRunNode(run) {
        return new TestRunNode(this.nextId, `id-${this.nextId++}`, run, this.ROOT);
    }
    createTestItemNode(parent, item) {
        return new TestItemNode(`testitem-${this.nextId++}`, item, parent);
    }
    async resolveChildren(parent) {
        if (parent === this.ROOT) {
            return Promise.resolve([...this.runs.values()].reverse().map(info => info.node));
        }
        else if (parent instanceof TestRunNode) {
            const runInfo = this.runs.get(parent.run);
            if (runInfo) {
                return Promise.resolve([...runInfo.tests.values()]);
            }
            else {
                return Promise.resolve([]);
            }
        }
        else {
            return Promise.resolve([]);
        }
    }
};
exports.TestRunTree = TestRunTree;
tslib_1.__decorate([
    (0, inversify_1.inject)(test_service_1.TestService),
    tslib_1.__metadata("design:type", Object)
], TestRunTree.prototype, "testService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TestRunTree.prototype, "init", null);
exports.TestRunTree = TestRunTree = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TestRunTree);
let TestRunTreeWidget = TestRunTreeWidget_1 = class TestRunTreeWidget extends tree_1.TreeWidget {
    constructor(props, model, contextMenuRenderer) {
        super(props, model, contextMenuRenderer);
        this.id = TestRunTreeWidget_1.ID;
        this.title.label = core_1.nls.localize('theia/test/testRuns', 'Test Runs');
        this.title.caption = core_1.nls.localize('theia/test/testRuns', 'Test Runs');
        this.title.iconClass = (0, browser_1.codicon)('run');
        this.title.closable = true;
    }
    init() {
        super.init();
        this.addClass('theia-test-run-view');
        this.model.onSelectionChanged(() => {
            const node = this.model.selectedNodes[0];
            if (node instanceof TestRunNode) {
                this.uiModel.selectedOutputSource = {
                    get output() {
                        return node.run.getOutput();
                    },
                    onDidAddTestOutput: core_1.Event.map(node.run.onDidChangeTestOutput, evt => evt.map(item => item[1]))
                };
            }
            else if (node instanceof TestItemNode) {
                this.uiModel.selectedOutputSource = {
                    get output() {
                        return node.parent.run.getOutput(node.item);
                    },
                    onDidAddTestOutput: core_1.Event.map(node.parent.run.onDidChangeTestOutput, evt => evt.filter(item => item[0] === node.item).map(item => item[1]))
                };
                this.uiModel.selectedTestState = node.parent.run.getTestState(node.item);
            }
        });
    }
    renderTree(model) {
        if (tree_1.CompositeTreeNode.is(this.model.root) && this.model.root.children.length > 0) {
            return super.renderTree(model);
        }
        return React.createElement("div", { className: 'theia-widget-noInfo noMarkers' }, core_1.nls.localizeByDefault('No tests have been found in this workspace yet.'));
    }
    getTestStateClass(state) {
        switch (state) {
            case test_service_1.TestExecutionState.Queued: return `${(0, browser_1.codicon)('history')} queued`;
            case test_service_1.TestExecutionState.Running: return `${(0, browser_1.codicon)('sync')} codicon-modifier-spin running`;
            case test_service_1.TestExecutionState.Skipped: return `${(0, browser_1.codicon)('debug-step-over')} skipped`;
            case test_service_1.TestExecutionState.Failed: return `${(0, browser_1.codicon)('error')} failed`;
            case test_service_1.TestExecutionState.Errored: return `${(0, browser_1.codicon)('issues')} errored`;
            case test_service_1.TestExecutionState.Passed: return `${(0, browser_1.codicon)('pass')} passed`;
            default: return (0, browser_1.codicon)('circle');
        }
    }
    renderIcon(node, props) {
        var _a;
        if (node instanceof TestItemNode) {
            const state = (_a = node.parent.run.getTestState(node.item)) === null || _a === void 0 ? void 0 : _a.state;
            return React.createElement("div", { className: this.getTestStateClass(state) });
        }
        else if (node instanceof TestRunNode) {
            const icon = node.run.isRunning ? `${(0, browser_1.codicon)('sync')} codicon-modifier-spin running` : (0, browser_1.codicon)('circle');
            return React.createElement("div", { className: icon });
        }
        else {
            return super.renderIcon(node, props);
        }
    }
    toContextMenuArgs(node) {
        if (node instanceof TestRunNode) {
            return [node.run];
        }
        else if (node instanceof TestItemNode) {
            const item = node.item;
            const executionState = node.parent.run.getTestState(node.item);
            if (test_service_1.TestFailure.is(executionState)) {
                return [item, executionState.messages];
            }
            return [item];
        }
        return [];
    }
    storeState() {
        return {}; // don't store any state for now
    }
};
exports.TestRunTreeWidget = TestRunTreeWidget;
TestRunTreeWidget.ID = 'test-run-widget';
tslib_1.__decorate([
    (0, inversify_1.inject)(icon_theme_service_1.IconThemeService),
    tslib_1.__metadata("design:type", icon_theme_service_1.IconThemeService)
], TestRunTreeWidget.prototype, "iconThemeService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(context_key_service_1.ContextKeyService),
    tslib_1.__metadata("design:type", Object)
], TestRunTreeWidget.prototype, "contextKeys", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(theming_1.ThemeService),
    tslib_1.__metadata("design:type", theming_1.ThemeService)
], TestRunTreeWidget.prototype, "themeService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(test_execution_state_manager_1.TestExecutionStateManager),
    tslib_1.__metadata("design:type", test_execution_state_manager_1.TestExecutionStateManager)
], TestRunTreeWidget.prototype, "stateManager", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(test_output_ui_model_1.TestOutputUIModel),
    tslib_1.__metadata("design:type", test_output_ui_model_1.TestOutputUIModel)
], TestRunTreeWidget.prototype, "uiModel", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TestRunTreeWidget.prototype, "init", null);
exports.TestRunTreeWidget = TestRunTreeWidget = TestRunTreeWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(tree_1.TreeProps)),
    tslib_1.__param(1, (0, inversify_1.inject)(tree_1.TreeModel)),
    tslib_1.__param(2, (0, inversify_1.inject)(browser_1.ContextMenuRenderer)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, browser_1.ContextMenuRenderer])
], TestRunTreeWidget);
//# sourceMappingURL=test-run-widget.js.map