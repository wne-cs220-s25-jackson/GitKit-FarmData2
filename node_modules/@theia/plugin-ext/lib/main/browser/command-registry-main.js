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
exports.CommandRegistryMainImpl = exports.ArgumentProcessorContribution = void 0;
const command_1 = require("@theia/core/lib/common/command");
const disposable_1 = require("@theia/core/lib/common/disposable");
const plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
const browser_1 = require("@theia/core/lib/browser");
const plugin_contribution_handler_1 = require("./plugin-contribution-handler");
const core_1 = require("@theia/core");
exports.ArgumentProcessorContribution = Symbol('ArgumentProcessorContribution');
class CommandRegistryMainImpl {
    constructor(rpc, container) {
        this.commands = new Map();
        this.handlers = new Map();
        this.argumentProcessors = [];
        this.toDispose = new disposable_1.DisposableCollection();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.COMMAND_REGISTRY_EXT);
        this.delegate = container.get(command_1.CommandRegistry);
        this.keyBinding = container.get(browser_1.KeybindingRegistry);
        this.contributions = container.get(plugin_contribution_handler_1.PluginContributionHandler);
        container.getNamed(core_1.ContributionProvider, exports.ArgumentProcessorContribution).getContributions().forEach(processor => {
            this.registerArgumentProcessor(processor);
        });
    }
    dispose() {
        this.toDispose.dispose();
    }
    registerArgumentProcessor(processor) {
        this.argumentProcessors.push(processor);
        return disposable_1.Disposable.create(() => {
            const index = this.argumentProcessors.lastIndexOf(processor);
            if (index >= 0) {
                this.argumentProcessors.splice(index, 1);
            }
        });
    }
    $registerCommand(command) {
        const id = command.id;
        this.commands.set(id, this.contributions.registerCommand(command));
        this.toDispose.push(disposable_1.Disposable.create(() => this.$unregisterCommand(id)));
    }
    $unregisterCommand(id) {
        const command = this.commands.get(id);
        if (command) {
            command.dispose();
            this.commands.delete(id);
        }
    }
    $registerHandler(id) {
        this.handlers.set(id, this.contributions.registerCommandHandler(id, (...args) => this.proxy.$executeCommand(id, ...args.map(arg => this.argumentProcessors.reduce((currentValue, processor) => processor.processArgument(currentValue), arg)))));
        this.toDispose.push(disposable_1.Disposable.create(() => this.$unregisterHandler(id)));
    }
    $unregisterHandler(id) {
        const handler = this.handlers.get(id);
        if (handler) {
            handler.dispose();
            this.handlers.delete(id);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async $executeCommand(id, ...args) {
        if (!this.delegate.getCommand(id)) {
            throw new Error(`Command with id '${id}' is not registered.`);
        }
        try {
            return await this.delegate.executeCommand(id, ...args);
        }
        catch (e) {
            // Command handler may be not active at the moment so the error must be caught. See https://github.com/eclipse-theia/theia/pull/6687#discussion_r354810079
            if ('code' in e && e['code'] === 'NO_ACTIVE_HANDLER') {
                return;
            }
            else {
                throw e;
            }
        }
    }
    $getKeyBinding(commandId) {
        try {
            const keyBindings = this.keyBinding.getKeybindingsForCommand(commandId);
            if (keyBindings) {
                // transform inner type to CommandKeyBinding
                return Promise.resolve(keyBindings.map(keyBinding => ({ id: commandId, value: keyBinding.keybinding })));
            }
            else {
                return Promise.resolve(undefined);
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    $getCommands() {
        return Promise.resolve(this.delegate.commandIds);
    }
}
exports.CommandRegistryMainImpl = CommandRegistryMainImpl;
//# sourceMappingURL=command-registry-main.js.map