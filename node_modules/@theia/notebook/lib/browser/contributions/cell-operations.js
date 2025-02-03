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
exports.changeCellType = void 0;
const common_1 = require("../../common");
/**
 * a collection of different reusable notbook cell operations
 */
function changeCellType(notebookModel, cell, type, language) {
    if (cell.cellKind === type) {
        return;
    }
    if (type === common_1.CellKind.Markup) {
        language = 'markdown';
    }
    else {
        language !== null && language !== void 0 ? language : (language = cell.language);
    }
    notebookModel.applyEdits([{
            editType: 1 /* CellEditType.Replace */,
            index: notebookModel.cells.indexOf(cell),
            count: 1,
            cells: [{
                    ...cell.getData(),
                    cellKind: type,
                    language
                }]
        }], true);
}
exports.changeCellType = changeCellType;
//# sourceMappingURL=cell-operations.js.map