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
exports.BulkEditCommands = void 0;
const browser_1 = require("@theia/core/lib/browser");
var BulkEditCommands;
(function (BulkEditCommands) {
    BulkEditCommands.TOGGLE_VIEW = {
        id: 'bulk-edit:toggleView'
    };
    BulkEditCommands.APPLY = {
        id: 'bulk-edit:apply',
        iconClass: (0, browser_1.codicon)('check')
    };
    BulkEditCommands.DISCARD = {
        id: 'bulk-edit:discard',
        iconClass: (0, browser_1.codicon)('clear-all')
    };
})(BulkEditCommands || (exports.BulkEditCommands = BulkEditCommands = {}));
//# sourceMappingURL=bulk-edit-commands.js.map