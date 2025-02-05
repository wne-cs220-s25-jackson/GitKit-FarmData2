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
exports.bindPromptServer = void 0;
const inversify_1 = require("@theia/core/shared/inversify");
const ws_connection_provider_1 = require("@theia/core/lib/browser/messaging/ws-connection-provider");
const git_prompt_1 = require("../../common/git-prompt");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(git_prompt_1.GitPrompt).toSelf();
    bindPromptServer(bind);
});
function bindPromptServer(bind) {
    bind(git_prompt_1.GitPromptServer).to(git_prompt_1.GitPromptServerImpl).inSingletonScope();
    bind(git_prompt_1.GitPromptServerProxy).toDynamicValue(context => ws_connection_provider_1.WebSocketConnectionProvider.createProxy(context.container, git_prompt_1.GitPrompt.WS_PATH)).inSingletonScope();
}
exports.bindPromptServer = bindPromptServer;
//# sourceMappingURL=git-prompt-module.js.map