"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.bindDirtyDiff = void 0;
const browser_1 = require("@theia/core/lib/browser");
const dirty_diff_contribution_1 = require("./dirty-diff-contribution");
const dirty_diff_manager_1 = require("./dirty-diff-manager");
function bindDirtyDiff(bind) {
    bind(dirty_diff_manager_1.DirtyDiffManager).toSelf().inSingletonScope();
    bind(dirty_diff_contribution_1.DirtyDiffContribution).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toService(dirty_diff_contribution_1.DirtyDiffContribution);
}
exports.bindDirtyDiff = bindDirtyDiff;
//# sourceMappingURL=dirty-diff-module.js.map