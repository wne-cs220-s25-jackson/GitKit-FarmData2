"use strict";
// *****************************************************************************
// Copyright (C) 2019 Ericsson and others.
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
exports.ProblemSelection = void 0;
const selection_command_handler_1 = require("@theia/core/lib/common/selection-command-handler");
const common_1 = require("@theia/core/lib/common");
const problem_marker_1 = require("../../common/problem-marker");
var ProblemSelection;
(function (ProblemSelection) {
    function is(arg) {
        return (0, common_1.isObject)(arg) && problem_marker_1.ProblemMarker.is(arg.marker);
    }
    ProblemSelection.is = is;
    class CommandHandler extends selection_command_handler_1.SelectionCommandHandler {
        constructor(selectionService, options) {
            super(selectionService, arg => ProblemSelection.is(arg) ? arg : undefined, options);
        }
    }
    ProblemSelection.CommandHandler = CommandHandler;
})(ProblemSelection || (exports.ProblemSelection = ProblemSelection = {}));
//# sourceMappingURL=problem-selection.js.map