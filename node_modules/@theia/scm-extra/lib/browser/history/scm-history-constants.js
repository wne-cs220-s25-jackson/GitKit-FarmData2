"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
exports.ScmCommitNode = exports.ScmHistorySupport = exports.ScmHistoryCommands = exports.SCM_HISTORY_MAX_COUNT = exports.SCM_HISTORY_TOGGLE_KEYBINDING = exports.SCM_HISTORY_LABEL = exports.SCM_HISTORY_ID = void 0;
const core_1 = require("@theia/core");
exports.SCM_HISTORY_ID = 'scm-history';
exports.SCM_HISTORY_LABEL = core_1.nls.localize('theia/scm/history', 'History');
exports.SCM_HISTORY_TOGGLE_KEYBINDING = 'alt+h';
exports.SCM_HISTORY_MAX_COUNT = 100;
var ScmHistoryCommands;
(function (ScmHistoryCommands) {
    ScmHistoryCommands.OPEN_FILE_HISTORY = {
        id: 'scm-history:open-file-history',
    };
    ScmHistoryCommands.OPEN_BRANCH_HISTORY = {
        id: 'scm-history:open-branch-history',
        label: exports.SCM_HISTORY_LABEL
    };
})(ScmHistoryCommands || (exports.ScmHistoryCommands = ScmHistoryCommands = {}));
exports.ScmHistorySupport = Symbol('scm-history-support');
var ScmCommitNode;
(function (ScmCommitNode) {
    function is(node) {
        return !!node && typeof node === 'object' && 'commitDetails' in node && 'expanded' in node && 'selected' in node;
    }
    ScmCommitNode.is = is;
})(ScmCommitNode || (exports.ScmCommitNode = ScmCommitNode = {}));
//# sourceMappingURL=scm-history-constants.js.map