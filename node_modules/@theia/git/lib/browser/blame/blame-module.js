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
exports.bindBlame = void 0;
const browser_1 = require("@theia/core/lib/browser");
const common_1 = require("@theia/core/lib/common");
const blame_contribution_1 = require("./blame-contribution");
const blame_decorator_1 = require("./blame-decorator");
const blame_manager_1 = require("./blame-manager");
function bindBlame(bind) {
    bind(blame_contribution_1.BlameContribution).toSelf().inSingletonScope();
    bind(blame_manager_1.BlameManager).toSelf().inSingletonScope();
    bind(blame_decorator_1.BlameDecorator).toSelf().inSingletonScope();
    for (const serviceIdentifier of [common_1.CommandContribution, browser_1.KeybindingContribution, common_1.MenuContribution]) {
        bind(serviceIdentifier).toService(blame_contribution_1.BlameContribution);
    }
}
exports.bindBlame = bindBlame;
//# sourceMappingURL=blame-module.js.map