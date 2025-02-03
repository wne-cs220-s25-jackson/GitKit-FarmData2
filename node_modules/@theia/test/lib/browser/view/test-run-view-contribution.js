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
exports.TestRunViewContribution = exports.TEST_RUNS_INLINE_MENU = exports.TEST_RUNS_CONTEXT_MENU = void 0;
const tslib_1 = require("tslib");
const browser_1 = require("@theia/core/lib/browser");
const inversify_1 = require("@theia/core/shared/inversify");
const test_service_1 = require("../test-service");
const context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
const test_run_widget_1 = require("./test-run-widget");
const test_view_contribution_1 = require("./test-view-contribution");
const core_1 = require("@theia/core");
exports.TEST_RUNS_CONTEXT_MENU = ['test-runs-context-menu'];
exports.TEST_RUNS_INLINE_MENU = [...exports.TEST_RUNS_CONTEXT_MENU, 'inline'];
let TestRunViewContribution = class TestRunViewContribution extends browser_1.AbstractViewContribution {
    constructor() {
        super({
            viewContainerId: test_view_contribution_1.TEST_VIEW_CONTAINER_ID,
            widgetId: test_run_widget_1.TestRunTreeWidget.ID,
            widgetName: core_1.nls.localize('theia/test/testRuns', 'Test Runs'),
            defaultWidgetOptions: {
                area: 'left',
                rank: 200,
            }
        });
    }
    registerToolbarItems(registry) {
        registry.registerItem({
            id: test_view_contribution_1.TestViewCommands.CLEAR_ALL_RESULTS.id,
            command: test_view_contribution_1.TestViewCommands.CLEAR_ALL_RESULTS.id,
            priority: 1
        });
    }
    registerMenus(menus) {
        super.registerMenus(menus);
        menus.registerMenuAction(exports.TEST_RUNS_CONTEXT_MENU, {
            commandId: test_view_contribution_1.TestViewCommands.CANCEL_RUN.id
        });
    }
    registerCommands(commands) {
        super.registerCommands(commands);
        commands.registerCommand(test_view_contribution_1.TestViewCommands.CANCEL_RUN, {
            isEnabled: t => test_service_1.TestRun.is(t) && t.isRunning,
            isVisible: t => test_service_1.TestRun.is(t),
            execute: t => {
                if (test_service_1.TestRun.is(t)) {
                    t.cancel();
                }
            }
        });
        commands.registerCommand(test_view_contribution_1.TestViewCommands.CLEAR_ALL_RESULTS, {
            isEnabled: w => this.withWidget(w, () => true),
            isVisible: w => this.withWidget(w, () => true),
            execute: () => {
                this.testService.clearResults();
            }
        });
    }
    withWidget(widget = this.tryGetWidget(), cb) {
        if (widget instanceof test_run_widget_1.TestRunTreeWidget && widget.id === test_run_widget_1.TestRunTreeWidget.ID) {
            return cb(widget);
        }
        return false;
    }
};
exports.TestRunViewContribution = TestRunViewContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(test_service_1.TestService),
    tslib_1.__metadata("design:type", Object)
], TestRunViewContribution.prototype, "testService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(context_key_service_1.ContextKeyService),
    tslib_1.__metadata("design:type", Object)
], TestRunViewContribution.prototype, "contextKeys", void 0);
exports.TestRunViewContribution = TestRunViewContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], TestRunViewContribution);
//# sourceMappingURL=test-run-view-contribution.js.map