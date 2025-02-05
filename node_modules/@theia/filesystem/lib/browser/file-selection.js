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
exports.FileSelection = void 0;
const selection_command_handler_1 = require("@theia/core/lib/common/selection-command-handler");
const common_1 = require("@theia/core/lib/common");
const files_1 = require("../common/files");
var FileSelection;
(function (FileSelection) {
    function is(arg) {
        return (0, common_1.isObject)(arg) && files_1.FileStat.is(arg.fileStat);
    }
    FileSelection.is = is;
    class CommandHandler extends selection_command_handler_1.SelectionCommandHandler {
        constructor(selectionService, options) {
            super(selectionService, arg => FileSelection.is(arg) ? arg : undefined, options);
            this.selectionService = selectionService;
            this.options = options;
        }
    }
    FileSelection.CommandHandler = CommandHandler;
})(FileSelection || (exports.FileSelection = FileSelection = {}));
//# sourceMappingURL=file-selection.js.map