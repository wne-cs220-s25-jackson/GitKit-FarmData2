"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.OutputChannelRegistryMainImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const command_1 = require("@theia/core/lib/common/command");
const output_commands_1 = require("@theia/output/lib/browser/output-commands");
let OutputChannelRegistryMainImpl = class OutputChannelRegistryMainImpl {
    $append(name, text, pluginInfo) {
        this.commandService.executeCommand(output_commands_1.OutputCommands.APPEND.id, { name, text });
        return Promise.resolve();
    }
    $clear(name) {
        this.commandService.executeCommand(output_commands_1.OutputCommands.CLEAR.id, { name });
        return Promise.resolve();
    }
    $dispose(name) {
        this.commandService.executeCommand(output_commands_1.OutputCommands.DISPOSE.id, { name });
        return Promise.resolve();
    }
    async $reveal(name, preserveFocus) {
        const options = { preserveFocus };
        this.commandService.executeCommand(output_commands_1.OutputCommands.SHOW.id, { name, options });
    }
    $close(name) {
        this.commandService.executeCommand(output_commands_1.OutputCommands.HIDE.id, { name });
        return Promise.resolve();
    }
};
exports.OutputChannelRegistryMainImpl = OutputChannelRegistryMainImpl;
tslib_1.__decorate([
    (0, inversify_1.inject)(command_1.CommandService),
    tslib_1.__metadata("design:type", Object)
], OutputChannelRegistryMainImpl.prototype, "commandService", void 0);
exports.OutputChannelRegistryMainImpl = OutputChannelRegistryMainImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], OutputChannelRegistryMainImpl);
//# sourceMappingURL=output-channel-registry-main.js.map