"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
exports.ProblemWidgetTabBarDecorator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const event_1 = require("@theia/core/lib/common/event");
const problem_manager_1 = require("./problem-manager");
let ProblemWidgetTabBarDecorator = class ProblemWidgetTabBarDecorator {
    constructor() {
        this.id = 'theia-problems-widget-tabbar-decorator';
        this.emitter = new event_1.Emitter();
    }
    init() {
        this.problemManager.onDidChangeMarkers(() => this.fireDidChangeDecorations());
    }
    decorate(title) {
        if (title.owner.id === 'problems') {
            const { infos, warnings, errors } = this.problemManager.getProblemStat();
            const markerCount = infos + warnings + errors;
            return markerCount > 0 ? [{ badge: markerCount }] : [];
        }
        else {
            return [];
        }
    }
    get onDidChangeDecorations() {
        return this.emitter.event;
    }
    fireDidChangeDecorations() {
        this.emitter.fire(undefined);
    }
};
exports.ProblemWidgetTabBarDecorator = ProblemWidgetTabBarDecorator;
tslib_1.__decorate([
    (0, inversify_1.inject)(problem_manager_1.ProblemManager),
    tslib_1.__metadata("design:type", problem_manager_1.ProblemManager)
], ProblemWidgetTabBarDecorator.prototype, "problemManager", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ProblemWidgetTabBarDecorator.prototype, "init", null);
exports.ProblemWidgetTabBarDecorator = ProblemWidgetTabBarDecorator = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ProblemWidgetTabBarDecorator);
//# sourceMappingURL=problem-widget-tab-bar-decorator.js.map