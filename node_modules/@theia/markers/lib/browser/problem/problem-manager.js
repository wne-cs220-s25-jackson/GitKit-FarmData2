"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
exports.ProblemManager = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const marker_manager_1 = require("../marker-manager");
const problem_marker_1 = require("../../common/problem-marker");
let ProblemManager = class ProblemManager extends marker_manager_1.MarkerManager {
    getKind() {
        return problem_marker_1.PROBLEM_KIND;
    }
    getProblemStat() {
        let errors = 0;
        let warnings = 0;
        let infos = 0;
        for (const marker of this.findMarkers()) {
            if (marker.data.severity === 1) {
                errors++;
            }
            else if (marker.data.severity === 2) {
                warnings++;
            }
            else if (marker.data.severity === 3) {
                infos++;
            }
        }
        return { errors, warnings, infos };
    }
};
exports.ProblemManager = ProblemManager;
exports.ProblemManager = ProblemManager = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ProblemManager);
//# sourceMappingURL=problem-manager.js.map