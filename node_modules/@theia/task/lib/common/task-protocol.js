"use strict";
// *****************************************************************************
// Copyright (C) 2017 Ericsson and others.
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
exports.TaskScope = exports.TaskCustomization = exports.TaskOutputPresentation = exports.PanelKind = exports.RevealKind = exports.DependsOrder = exports.TaskClient = exports.TaskServer = exports.taskPath = void 0;
exports.taskPath = '/services/task';
exports.TaskServer = Symbol('TaskServer');
exports.TaskClient = Symbol('TaskClient');
var DependsOrder;
(function (DependsOrder) {
    DependsOrder["Sequence"] = "sequence";
    DependsOrder["Parallel"] = "parallel";
})(DependsOrder || (exports.DependsOrder = DependsOrder = {}));
var RevealKind;
(function (RevealKind) {
    RevealKind["Always"] = "always";
    RevealKind["Silent"] = "silent";
    RevealKind["Never"] = "never";
})(RevealKind || (exports.RevealKind = RevealKind = {}));
var PanelKind;
(function (PanelKind) {
    PanelKind["Shared"] = "shared";
    PanelKind["Dedicated"] = "dedicated";
    PanelKind["New"] = "new";
})(PanelKind || (exports.PanelKind = PanelKind = {}));
var TaskOutputPresentation;
(function (TaskOutputPresentation) {
    function getDefault() {
        return {
            echo: true,
            reveal: RevealKind.Always,
            focus: false,
            panel: PanelKind.Shared,
            showReuseMessage: true,
            clear: false,
            close: false
        };
    }
    TaskOutputPresentation.getDefault = getDefault;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function fromJson(task) {
        let outputPresentation = getDefault();
        if (task && task.presentation) {
            if (task.presentation.reveal) {
                let reveal = RevealKind.Always;
                if (task.presentation.reveal === 'silent') {
                    reveal = RevealKind.Silent;
                }
                else if (task.presentation.reveal === 'never') {
                    reveal = RevealKind.Never;
                }
                outputPresentation = { ...outputPresentation, reveal };
            }
            if (task.presentation.panel) {
                let panel = PanelKind.Shared;
                if (task.presentation.panel === 'dedicated') {
                    panel = PanelKind.Dedicated;
                }
                else if (task.presentation.panel === 'new') {
                    panel = PanelKind.New;
                }
                outputPresentation = { ...outputPresentation, panel };
            }
            outputPresentation = {
                ...outputPresentation,
                echo: task.presentation.echo === undefined || task.presentation.echo,
                focus: shouldSetFocusToTerminal(task),
                showReuseMessage: shouldShowReuseMessage(task),
                clear: shouldClearTerminalBeforeRun(task),
                close: shouldCloseTerminalOnFinish(task)
            };
        }
        return outputPresentation;
    }
    TaskOutputPresentation.fromJson = fromJson;
    function shouldAlwaysRevealTerminal(task) {
        return !task.presentation || task.presentation.reveal === undefined || task.presentation.reveal === RevealKind.Always;
    }
    TaskOutputPresentation.shouldAlwaysRevealTerminal = shouldAlwaysRevealTerminal;
    function shouldSetFocusToTerminal(task) {
        return !!task.presentation && !!task.presentation.focus;
    }
    TaskOutputPresentation.shouldSetFocusToTerminal = shouldSetFocusToTerminal;
    function shouldClearTerminalBeforeRun(task) {
        return !!task.presentation && !!task.presentation.clear;
    }
    TaskOutputPresentation.shouldClearTerminalBeforeRun = shouldClearTerminalBeforeRun;
    function shouldCloseTerminalOnFinish(task) {
        return !!task.presentation && !!task.presentation.close;
    }
    TaskOutputPresentation.shouldCloseTerminalOnFinish = shouldCloseTerminalOnFinish;
    function shouldShowReuseMessage(task) {
        return !task.presentation || task.presentation.showReuseMessage === undefined || !!task.presentation.showReuseMessage;
    }
    TaskOutputPresentation.shouldShowReuseMessage = shouldShowReuseMessage;
})(TaskOutputPresentation || (exports.TaskOutputPresentation = TaskOutputPresentation = {}));
var TaskCustomization;
(function (TaskCustomization) {
    function isBuildTask(task) {
        return task.group === 'build' || typeof task.group === 'object' && task.group.kind === 'build';
    }
    TaskCustomization.isBuildTask = isBuildTask;
    function isDefaultBuildTask(task) {
        return isDefaultTask(task) && isBuildTask(task);
    }
    TaskCustomization.isDefaultBuildTask = isDefaultBuildTask;
    function isDefaultTask(task) {
        return typeof task.group === 'object' && task.group.isDefault;
    }
    TaskCustomization.isDefaultTask = isDefaultTask;
    function isTestTask(task) {
        return task.group === 'test' || typeof task.group === 'object' && task.group.kind === 'test';
    }
    TaskCustomization.isTestTask = isTestTask;
    function isDefaultTestTask(task) {
        return isDefaultTask(task) && isTestTask(task);
    }
    TaskCustomization.isDefaultTestTask = isDefaultTestTask;
})(TaskCustomization || (exports.TaskCustomization = TaskCustomization = {}));
var TaskScope;
(function (TaskScope) {
    TaskScope[TaskScope["Global"] = 1] = "Global";
    TaskScope[TaskScope["Workspace"] = 2] = "Workspace";
})(TaskScope || (exports.TaskScope = TaskScope = {}));
//# sourceMappingURL=task-protocol.js.map