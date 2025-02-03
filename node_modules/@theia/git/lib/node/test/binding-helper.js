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
exports.createGit = exports.initializeBindings = void 0;
const inversify_1 = require("@theia/core/shared/inversify");
const dugite_git_1 = require("../dugite-git");
const git_backend_module_1 = require("../git-backend-module");
const logger_backend_module_1 = require("@theia/core/lib/node/logger-backend-module");
const no_sync_repository_manager_1 = require(".././test/no-sync-repository-manager");
const git_env_provider_1 = require("../env/git-env-provider");
const common_1 = require("@theia/core/lib/common");
const core_1 = require("@theia/core");
const logger_1 = require("@theia/core/lib/common/logger");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function initializeBindings() {
    const container = new inversify_1.Container();
    const bind = container.bind.bind(container);
    bind(git_env_provider_1.DefaultGitEnvProvider).toSelf().inRequestScope();
    bind(git_env_provider_1.GitEnvProvider).toService(git_env_provider_1.DefaultGitEnvProvider);
    bind(common_1.MessageService).toSelf();
    bind(core_1.MessageClient).toSelf();
    (0, logger_backend_module_1.bindLogger)(bind);
    return { container, bind };
}
exports.initializeBindings = initializeBindings;
/**
 * For testing only.
 */
async function createGit(bindingOptions = git_backend_module_1.GitBindingOptions.Default) {
    const { container, bind } = initializeBindings();
    (0, git_backend_module_1.bindGit)(bind, {
        bindManager(binding) {
            return binding.to(no_sync_repository_manager_1.NoSyncRepositoryManager).inSingletonScope();
        }
    });
    container.get(logger_1.ILogger).setLogLevel(common_1.LogLevel.ERROR);
    const git = container.get(dugite_git_1.DugiteGit);
    await git.exec({ localUri: '' }, ['--version']); // Enforces eager Git initialization by setting the `LOCAL_GIT_DIRECTORY` and `GIT_EXEC_PATH` env variables.
    return git;
}
exports.createGit = createGit;
//# sourceMappingURL=binding-helper.js.map