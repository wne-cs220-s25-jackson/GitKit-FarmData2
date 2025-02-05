"use strict";
// *****************************************************************************
// Copyright (C) 2023 TypeFox and others.
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
exports.DefaultFrontendApplicationContribution = exports.OnWillStopAction = exports.FrontendApplicationContribution = void 0;
const tslib_1 = require("tslib");
const types_1 = require("../common/types");
const inversify_1 = require("inversify");
/**
 * Clients can implement to get a callback for contributing widgets to a shell on start.
 */
exports.FrontendApplicationContribution = Symbol('FrontendApplicationContribution');
var OnWillStopAction;
(function (OnWillStopAction) {
    function is(candidate) {
        return (0, types_1.isObject)(candidate) && 'action' in candidate && 'reason' in candidate;
    }
    OnWillStopAction.is = is;
})(OnWillStopAction || (exports.OnWillStopAction = OnWillStopAction = {}));
/**
 * Default frontend contribution that can be extended by clients if they do not want to implement any of the
 * methods from the interface but still want to contribute to the frontend application.
 */
let DefaultFrontendApplicationContribution = class DefaultFrontendApplicationContribution {
    initialize() {
        // NOOP
    }
};
exports.DefaultFrontendApplicationContribution = DefaultFrontendApplicationContribution;
exports.DefaultFrontendApplicationContribution = DefaultFrontendApplicationContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DefaultFrontendApplicationContribution);
//# sourceMappingURL=frontend-application-contribution.js.map