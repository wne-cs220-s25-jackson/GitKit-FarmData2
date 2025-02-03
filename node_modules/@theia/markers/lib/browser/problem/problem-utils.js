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
exports.ProblemUtils = void 0;
const vscode_languageserver_protocol_1 = require("@theia/core/shared/vscode-languageserver-protocol");
var ProblemUtils;
(function (ProblemUtils) {
    /**
     * Comparator for severity.
     * - The highest severity (`error`) come first followed by others.
     * - `undefined` severities are treated as the last ones.
     * @param a the first marker for comparison.
     * @param b the second marker for comparison.
     */
    ProblemUtils.severityCompareMarker = (a, b) => (a.data.severity || Number.MAX_SAFE_INTEGER) - (b.data.severity || Number.MAX_SAFE_INTEGER);
    /**
     * Comparator for severity.
     * - The highest severity (`error`) come first followed by others.
     * - `undefined` severities are treated as the last ones.
     * @param a the first severity for comparison.
     * @param b the second severity for comparison.
     */
    ProblemUtils.severityCompare = (a, b) => (a || Number.MAX_SAFE_INTEGER) - (b || Number.MAX_SAFE_INTEGER);
    /**
     * Comparator for line numbers.
     * - The lowest line number comes first.
     * @param a the first marker for comparison.
     * @param b the second marker for comparison.
     */
    ProblemUtils.lineNumberCompare = (a, b) => a.data.range.start.line - b.data.range.start.line;
    /**
     * Comparator for column numbers.
     * - The lowest column number comes first.
     * @param a the first marker for comparison.
     * @param b the second marker for comparison.
     */
    ProblemUtils.columnNumberCompare = (a, b) => a.data.range.start.character - b.data.range.start.character;
    /**
     * Comparator for marker owner (source).
     * - The order is alphabetical.
     * @param a the first marker for comparison.
     * @param b the second marker for comparison.
     */
    ProblemUtils.ownerCompare = (a, b) => a.owner.localeCompare(b.owner);
    function getPriority(marker) {
        const { severity } = marker.data;
        switch (severity) {
            case vscode_languageserver_protocol_1.DiagnosticSeverity.Error: return 30;
            case vscode_languageserver_protocol_1.DiagnosticSeverity.Warning: return 20;
            case vscode_languageserver_protocol_1.DiagnosticSeverity.Information: return 10;
            default: return 0;
        }
    }
    ProblemUtils.getPriority = getPriority;
    function getColor(marker) {
        const { severity } = marker.data;
        switch (severity) {
            case vscode_languageserver_protocol_1.DiagnosticSeverity.Error: return 'list.errorForeground';
            case vscode_languageserver_protocol_1.DiagnosticSeverity.Warning: return 'list.warningForeground';
            default: return ''; // other severities should not be decorated.
        }
    }
    ProblemUtils.getColor = getColor;
    function filterMarker(marker) {
        const { severity } = marker.data;
        return severity === vscode_languageserver_protocol_1.DiagnosticSeverity.Error
            || severity === vscode_languageserver_protocol_1.DiagnosticSeverity.Warning;
    }
    ProblemUtils.filterMarker = filterMarker;
})(ProblemUtils || (exports.ProblemUtils = ProblemUtils = {}));
//# sourceMappingURL=problem-utils.js.map