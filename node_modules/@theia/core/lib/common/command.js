"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
exports.CommandRegistry = exports.CommandService = exports.commandServicePath = exports.CommandContribution = exports.Command = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const event_1 = require("./event");
const disposable_1 = require("./disposable");
const contribution_provider_1 = require("./contribution-provider");
const nls_1 = require("./nls");
const debounce = require("p-debounce");
const types_1 = require("./types");
var Command;
(function (Command) {
    /* Determine whether object is a Command */
    function is(arg) {
        return (0, types_1.isObject)(arg) && 'id' in arg;
    }
    Command.is = is;
    /** Utility function to easily translate commands */
    function toLocalizedCommand(command, nlsLabelKey = command.id, nlsCategoryKey) {
        return {
            ...command,
            label: command.label && nls_1.nls.localize(nlsLabelKey, command.label),
            originalLabel: command.label,
            category: nlsCategoryKey && command.category && nls_1.nls.localize(nlsCategoryKey, command.category) || command.category,
            originalCategory: command.category,
        };
    }
    Command.toLocalizedCommand = toLocalizedCommand;
    function toDefaultLocalizedCommand(command) {
        return {
            ...command,
            label: command.label && nls_1.nls.localizeByDefault(command.label),
            originalLabel: command.label,
            category: command.category && nls_1.nls.localizeByDefault(command.category),
            originalCategory: command.category,
        };
    }
    Command.toDefaultLocalizedCommand = toDefaultLocalizedCommand;
    /** Comparator function for when sorting commands */
    function compareCommands(a, b) {
        if (a.label && b.label) {
            const aCommand = (a.category ? `${a.category}: ${a.label}` : a.label).toLowerCase();
            const bCommand = (b.category ? `${b.category}: ${b.label}` : b.label).toLowerCase();
            return (aCommand).localeCompare(bCommand);
        }
        else {
            return 0;
        }
    }
    Command.compareCommands = compareCommands;
    /**
     * Determine if two commands are equal.
     *
     * @param a the first command for comparison.
     * @param b the second command for comparison.
     */
    function equals(a, b) {
        return (a.id === b.id &&
            a.label === b.label &&
            a.iconClass === b.iconClass &&
            a.category === b.category);
    }
    Command.equals = equals;
})(Command || (exports.Command = Command = {}));
exports.CommandContribution = Symbol('CommandContribution');
exports.commandServicePath = '/services/commands';
exports.CommandService = Symbol('CommandService');
/**
 * The command registry manages commands and handlers.
 */
let CommandRegistry = class CommandRegistry {
    constructor(contributionProvider) {
        this.contributionProvider = contributionProvider;
        this._commands = {};
        this._handlers = {};
        this.toUnregisterCommands = new Map();
        // List of recently used commands.
        this._recent = [];
        this.onWillExecuteCommandEmitter = new event_1.Emitter();
        this.onWillExecuteCommand = this.onWillExecuteCommandEmitter.event;
        this.onDidExecuteCommandEmitter = new event_1.Emitter();
        this.onDidExecuteCommand = this.onDidExecuteCommandEmitter.event;
        this.onCommandsChangedEmitter = new event_1.Emitter();
        this.onCommandsChanged = this.onCommandsChangedEmitter.event;
        this.fireDidChange = debounce(() => this.doFireDidChange(), 0);
    }
    onStart() {
        const contributions = this.contributionProvider.getContributions();
        for (const contrib of contributions) {
            contrib.registerCommands(this);
        }
    }
    *getAllCommands() {
        var _a;
        for (const command of Object.values(this._commands)) {
            yield { ...command, handlers: (_a = this._handlers[command.id]) !== null && _a !== void 0 ? _a : [] };
        }
    }
    /**
     * Register the given command and handler if present.
     *
     * Throw if a command is already registered for the given command identifier.
     */
    registerCommand(command, handler) {
        if (this._commands[command.id]) {
            console.warn(`A command ${command.id} is already registered.`);
            return disposable_1.Disposable.NULL;
        }
        const toDispose = new disposable_1.DisposableCollection(this.doRegisterCommand(command));
        if (handler) {
            toDispose.push(this.registerHandler(command.id, handler));
        }
        this.toUnregisterCommands.set(command.id, toDispose);
        toDispose.push(disposable_1.Disposable.create(() => this.toUnregisterCommands.delete(command.id)));
        return toDispose;
    }
    doRegisterCommand(command) {
        this._commands[command.id] = command;
        return {
            dispose: () => {
                delete this._commands[command.id];
            }
        };
    }
    unregisterCommand(commandOrId) {
        const id = Command.is(commandOrId) ? commandOrId.id : commandOrId;
        const toUnregister = this.toUnregisterCommands.get(id);
        if (toUnregister) {
            toUnregister.dispose();
        }
    }
    /**
     * Register the given handler for the given command identifier.
     *
     * If there is already a handler for the given command
     * then the given handler is registered as more specific, and
     * has higher priority during enablement, visibility and toggle state evaluations.
     */
    registerHandler(commandId, handler) {
        let handlers = this._handlers[commandId];
        if (!handlers) {
            this._handlers[commandId] = handlers = [];
        }
        handlers.unshift(handler);
        this.fireDidChange();
        return {
            dispose: () => {
                const idx = handlers.indexOf(handler);
                if (idx >= 0) {
                    handlers.splice(idx, 1);
                    this.fireDidChange();
                }
            }
        };
    }
    doFireDidChange() {
        this.onCommandsChangedEmitter.fire();
    }
    /**
     * Test whether there is an active handler for the given command.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isEnabled(command, ...args) {
        return typeof this.getActiveHandler(command, ...args) !== 'undefined';
    }
    /**
     * Test whether there is a visible handler for the given command.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isVisible(command, ...args) {
        return typeof this.getVisibleHandler(command, ...args) !== 'undefined';
    }
    /**
     * Test whether there is a toggled handler for the given command.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isToggled(command, ...args) {
        return typeof this.getToggledHandler(command, ...args) !== 'undefined';
    }
    /**
     * Execute the active handler for the given command and arguments.
     *
     * Reject if a command cannot be executed.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async executeCommand(commandId, ...args) {
        const handler = this.getActiveHandler(commandId, ...args);
        if (handler) {
            await this.fireWillExecuteCommand(commandId, args);
            const result = await handler.execute(...args);
            this.onDidExecuteCommandEmitter.fire({ commandId, args });
            return result;
        }
        throw Object.assign(new Error(`The command '${commandId}' cannot be executed. There are no active handlers available for the command.`), { code: 'NO_ACTIVE_HANDLER' });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async fireWillExecuteCommand(commandId, args = []) {
        await event_1.WaitUntilEvent.fire(this.onWillExecuteCommandEmitter, { commandId, args }, 30000);
    }
    /**
     * Get a visible handler for the given command or `undefined`.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getVisibleHandler(commandId, ...args) {
        const handlers = this._handlers[commandId];
        if (handlers) {
            for (const handler of handlers) {
                try {
                    if (!handler.isVisible || handler.isVisible(...args)) {
                        return handler;
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
        return undefined;
    }
    /**
     * Get an active handler for the given command or `undefined`.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getActiveHandler(commandId, ...args) {
        const handlers = this._handlers[commandId];
        if (handlers) {
            for (const handler of handlers) {
                try {
                    if (!handler.isEnabled || handler.isEnabled(...args)) {
                        return handler;
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
        return undefined;
    }
    /**
     * Get a toggled handler for the given command or `undefined`.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getToggledHandler(commandId, ...args) {
        const handlers = this._handlers[commandId];
        if (handlers) {
            for (const handler of handlers) {
                try {
                    if (handler.isToggled && handler.isToggled(...args)) {
                        return handler;
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
        return undefined;
    }
    /**
     * Returns with all handlers for the given command. If the command does not have any handlers,
     * or the command is not registered, returns an empty array.
     */
    getAllHandlers(commandId) {
        const handlers = this._handlers[commandId];
        return handlers ? handlers.slice() : [];
    }
    /**
     * Get all registered commands.
     */
    get commands() {
        return Object.values(this._commands);
    }
    /**
     * Get a command for the given command identifier.
     */
    getCommand(id) {
        return this._commands[id];
    }
    /**
     * Get all registered commands identifiers.
     */
    get commandIds() {
        return Object.keys(this._commands);
    }
    /**
     * Get the list of recently used commands.
     */
    get recent() {
        const commands = [];
        for (const recentId of this._recent) {
            const command = this.getCommand(recentId);
            if (command) {
                commands.push(command);
            }
        }
        return commands;
    }
    /**
     * Set the list of recently used commands.
     * @param commands the list of recently used commands.
     */
    set recent(commands) {
        this._recent = Array.from(new Set(commands.map(e => e.id)));
    }
    /**
     * Adds a command to recently used list.
     * Prioritizes commands that were recently executed to be most recent.
     *
     * @param recent a recent command, or array of recent commands.
     */
    addRecentCommand(recent) {
        for (const recentCommand of Array.isArray(recent) ? recent : [recent]) {
            // Determine if the command currently exists in the recently used list.
            const index = this._recent.findIndex(commandId => commandId === recentCommand.id);
            // If the command exists, remove it from the array so it can later be placed at the top.
            if (index >= 0) {
                this._recent.splice(index, 1);
            }
            // Add the recent command to the beginning of the array (most recent).
            this._recent.unshift(recentCommand.id);
        }
    }
    /**
     * Clear the list of recently used commands.
     */
    clearCommandHistory() {
        this.recent = [];
    }
};
exports.CommandRegistry = CommandRegistry;
exports.CommandRegistry = CommandRegistry = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(contribution_provider_1.ContributionProvider)),
    tslib_1.__param(0, (0, inversify_1.named)(exports.CommandContribution)),
    tslib_1.__metadata("design:paramtypes", [Object])
], CommandRegistry);
//# sourceMappingURL=command.js.map