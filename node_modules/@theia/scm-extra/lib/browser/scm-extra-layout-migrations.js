"use strict";
// *****************************************************************************
// Copyright (C) 2020 Arm and others.
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
exports.ScmExtraLayoutVersion4Migration = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const scm_history_contribution_1 = require("./history/scm-history-contribution");
let ScmExtraLayoutVersion4Migration = class ScmExtraLayoutVersion4Migration {
    constructor() {
        this.layoutVersion = 4.0;
    }
    onWillInflateWidget(desc, { parent }) {
        if (desc.constructionOptions.factoryId === 'git-history') {
            desc.constructionOptions.factoryId = scm_history_contribution_1.SCM_HISTORY_ID;
            return desc;
        }
        return undefined;
    }
};
exports.ScmExtraLayoutVersion4Migration = ScmExtraLayoutVersion4Migration;
exports.ScmExtraLayoutVersion4Migration = ScmExtraLayoutVersion4Migration = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ScmExtraLayoutVersion4Migration);
//# sourceMappingURL=scm-extra-layout-migrations.js.map