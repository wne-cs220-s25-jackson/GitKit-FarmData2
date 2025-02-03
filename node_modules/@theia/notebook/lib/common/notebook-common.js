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
exports.CellUri = exports.isTextStreamMime = exports.CellExecutionUpdateType = exports.NotebookCellExecutionState = exports.NotebookCellModelResource = exports.NotebookModelResource = exports.NotebookCellsChangeType = exports.CellKind = void 0;
const core_1 = require("@theia/core");
const buffer_1 = require("@theia/core/lib/common/buffer");
var CellKind;
(function (CellKind) {
    CellKind[CellKind["Markup"] = 1] = "Markup";
    CellKind[CellKind["Code"] = 2] = "Code";
})(CellKind || (exports.CellKind = CellKind = {}));
;
var NotebookCellsChangeType;
(function (NotebookCellsChangeType) {
    NotebookCellsChangeType[NotebookCellsChangeType["ModelChange"] = 1] = "ModelChange";
    NotebookCellsChangeType[NotebookCellsChangeType["Move"] = 2] = "Move";
    NotebookCellsChangeType[NotebookCellsChangeType["ChangeCellLanguage"] = 5] = "ChangeCellLanguage";
    NotebookCellsChangeType[NotebookCellsChangeType["Initialize"] = 6] = "Initialize";
    NotebookCellsChangeType[NotebookCellsChangeType["ChangeCellMetadata"] = 7] = "ChangeCellMetadata";
    NotebookCellsChangeType[NotebookCellsChangeType["Output"] = 8] = "Output";
    NotebookCellsChangeType[NotebookCellsChangeType["OutputItem"] = 9] = "OutputItem";
    NotebookCellsChangeType[NotebookCellsChangeType["ChangeCellContent"] = 10] = "ChangeCellContent";
    NotebookCellsChangeType[NotebookCellsChangeType["ChangeDocumentMetadata"] = 11] = "ChangeDocumentMetadata";
    NotebookCellsChangeType[NotebookCellsChangeType["ChangeCellInternalMetadata"] = 12] = "ChangeCellInternalMetadata";
    // ChangeCellMime = 13,
    NotebookCellsChangeType[NotebookCellsChangeType["Unknown"] = 100] = "Unknown";
})(NotebookCellsChangeType || (exports.NotebookCellsChangeType = NotebookCellsChangeType = {}));
var NotebookModelResource;
(function (NotebookModelResource) {
    function is(item) {
        return (0, core_1.isObject)(item) && item.notebookModelUri instanceof core_1.URI;
    }
    NotebookModelResource.is = is;
    function create(uri) {
        return { notebookModelUri: uri };
    }
    NotebookModelResource.create = create;
})(NotebookModelResource || (exports.NotebookModelResource = NotebookModelResource = {}));
var NotebookCellModelResource;
(function (NotebookCellModelResource) {
    function is(item) {
        return (0, core_1.isObject)(item) && item.notebookCellModelUri instanceof core_1.URI;
    }
    NotebookCellModelResource.is = is;
    function create(uri) {
        return { notebookCellModelUri: uri };
    }
    NotebookCellModelResource.create = create;
})(NotebookCellModelResource || (exports.NotebookCellModelResource = NotebookCellModelResource = {}));
var NotebookCellExecutionState;
(function (NotebookCellExecutionState) {
    NotebookCellExecutionState[NotebookCellExecutionState["Unconfirmed"] = 1] = "Unconfirmed";
    NotebookCellExecutionState[NotebookCellExecutionState["Pending"] = 2] = "Pending";
    NotebookCellExecutionState[NotebookCellExecutionState["Executing"] = 3] = "Executing";
})(NotebookCellExecutionState || (exports.NotebookCellExecutionState = NotebookCellExecutionState = {}));
var CellExecutionUpdateType;
(function (CellExecutionUpdateType) {
    CellExecutionUpdateType[CellExecutionUpdateType["Output"] = 1] = "Output";
    CellExecutionUpdateType[CellExecutionUpdateType["OutputItems"] = 2] = "OutputItems";
    CellExecutionUpdateType[CellExecutionUpdateType["ExecutionState"] = 3] = "ExecutionState";
})(CellExecutionUpdateType || (exports.CellExecutionUpdateType = CellExecutionUpdateType = {}));
/**
 * Whether the provided mime type is a text stream like `stdout`, `stderr`.
 */
function isTextStreamMime(mimeType) {
    return ['application/vnd.code.notebook.stdout', 'application/vnd.code.notebook.stderr'].includes(mimeType);
}
exports.isTextStreamMime = isTextStreamMime;
var CellUri;
(function (CellUri) {
    CellUri.cellUriScheme = 'vscode-notebook-cell';
    CellUri.outputUriScheme = 'vscode-notebook-cell-output';
    const _lengths = ['W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f'];
    const _padRegexp = new RegExp(`^[${_lengths.join('')}]+`);
    const _radix = 7;
    function generate(notebook, handle) {
        const s = handle.toString(_radix);
        const p = s.length < _lengths.length ? _lengths[s.length - 1] : 'z';
        const fragment = `${p}${s}s${Buffer.from(buffer_1.BinaryBuffer.fromString(notebook.scheme).buffer).toString('base64')}`;
        return notebook.withScheme(CellUri.cellUriScheme).withFragment(fragment);
    }
    CellUri.generate = generate;
    function parse(cell) {
        if (cell.scheme !== CellUri.cellUriScheme) {
            return undefined;
        }
        const idx = cell.fragment.indexOf('s');
        if (idx < 0) {
            return undefined;
        }
        const handle = parseInt(cell.fragment.substring(0, idx).replace(_padRegexp, ''), _radix);
        const parsedScheme = Buffer.from(cell.fragment.substring(idx + 1), 'base64').toString();
        if (isNaN(handle)) {
            return undefined;
        }
        return {
            handle,
            notebook: cell.withScheme(parsedScheme).withoutFragment()
        };
    }
    CellUri.parse = parse;
    function generateCellOutputUri(notebook, outputId) {
        return notebook
            .withScheme(CellUri.outputUriScheme)
            .withQuery(`op${outputId !== null && outputId !== void 0 ? outputId : ''},${notebook.scheme !== 'file' ? notebook.scheme : ''}`);
    }
    CellUri.generateCellOutputUri = generateCellOutputUri;
    ;
    function parseCellOutputUri(uri) {
        if (uri.scheme !== CellUri.outputUriScheme) {
            return;
        }
        const match = /^op([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})?\,(.*)$/i.exec(uri.query);
        if (!match) {
            return undefined;
        }
        const outputId = match[1] || undefined;
        const scheme = match[2];
        return {
            outputId,
            notebook: uri.withScheme(scheme || 'file').withoutQuery()
        };
    }
    CellUri.parseCellOutputUri = parseCellOutputUri;
    function generateCellPropertyUri(notebook, handle, cellScheme) {
        return CellUri.generate(notebook, handle).withScheme(cellScheme);
    }
    CellUri.generateCellPropertyUri = generateCellPropertyUri;
    function parseCellPropertyUri(uri, propertyScheme) {
        if (uri.scheme !== propertyScheme) {
            return undefined;
        }
        return CellUri.parse(uri.withScheme(CellUri.cellUriScheme));
    }
    CellUri.parseCellPropertyUri = parseCellPropertyUri;
})(CellUri || (exports.CellUri = CellUri = {}));
//# sourceMappingURL=notebook-common.js.map