"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
exports.ProblemLayoutVersion3Migration = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const problem_marker_1 = require("../../common/problem-marker");
const problem_widget_1 = require("./problem-widget");
let ProblemLayoutVersion3Migration = class ProblemLayoutVersion3Migration {
    constructor() {
        this.layoutVersion = 3.0;
    }
    onWillInflateWidget(desc) {
        if (desc.constructionOptions.factoryId === problem_marker_1.PROBLEM_KIND) {
            desc.constructionOptions.factoryId = problem_widget_1.PROBLEMS_WIDGET_ID;
            return desc;
        }
        return undefined;
    }
};
exports.ProblemLayoutVersion3Migration = ProblemLayoutVersion3Migration;
exports.ProblemLayoutVersion3Migration = ProblemLayoutVersion3Migration = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ProblemLayoutVersion3Migration);
//# sourceMappingURL=problem-layout-migrations.js.map