"use strict";
// *****************************************************************************
// Copyright (C) 2021 SAP SE or an SAP affiliate company and others.
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
exports.BulkEditNodeSelection = void 0;
const selection_command_handler_1 = require("@theia/core/lib/common/selection-command-handler");
const common_1 = require("@theia/core/lib/common");
var BulkEditNodeSelection;
(function (BulkEditNodeSelection) {
    function is(arg) {
        return (0, common_1.isObject)(arg) && 'bulkEdit' in arg;
    }
    BulkEditNodeSelection.is = is;
    class CommandHandler extends selection_command_handler_1.SelectionCommandHandler {
        constructor(selectionService, options) {
            super(selectionService, arg => BulkEditNodeSelection.is(arg) ? arg : undefined, options);
            this.selectionService = selectionService;
            this.options = options;
        }
    }
    BulkEditNodeSelection.CommandHandler = CommandHandler;
})(BulkEditNodeSelection || (exports.BulkEditNodeSelection = BulkEditNodeSelection = {}));
//# sourceMappingURL=bulk-edit-node-selection.js.map