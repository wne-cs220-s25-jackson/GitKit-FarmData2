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
const inversify_1 = require("@theia/core/shared/inversify");
const git_prompt_1 = require("../../common/git-prompt");
const git_prompt_module_1 = require("../../browser/prompt/git-prompt-module");
const git_quick_open_prompt_1 = require("./git-quick-open-prompt");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(git_quick_open_prompt_1.GitQuickOpenPrompt).toSelf().inSingletonScope();
    bind(git_prompt_1.GitPrompt).toService(git_quick_open_prompt_1.GitQuickOpenPrompt);
    (0, git_prompt_module_1.bindPromptServer)(bind);
});
//# sourceMappingURL=electron-git-prompt-module.js.map