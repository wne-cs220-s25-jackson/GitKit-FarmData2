"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat and others.
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
const command_1 = require("./command");
const chai = require("chai");
const expect = chai.expect;
let commandRegistry;
describe('Commands', () => {
    beforeEach(() => {
        commandRegistry = new command_1.CommandRegistry(new EmptyContributionProvider());
    });
    it('should register and execute a given command', async () => {
        const concatId = 'concat';
        const command = { id: concatId };
        commandRegistry.registerCommand(command, new ConcatCommandHandler());
        const result = await commandRegistry.executeCommand(concatId, 'a', 'b', 'c');
        expect('abc').equals(result);
    });
    it('should add command to recently used', async () => {
        const commandId = 'stub';
        const command = { id: commandId };
        commandRegistry.registerCommand(command, new StubCommandHandler());
        commandRegistry.addRecentCommand(command);
        expect(commandRegistry.recent.length).equal(1);
    });
    it('should add multiple commands to recently used in the order they were used', async () => {
        const commandIds = ['a', 'b', 'c'];
        const commands = [
            { id: commandIds[0] },
            { id: commandIds[1] },
            { id: commandIds[2] },
        ];
        // Register each command.
        commands.forEach((c) => {
            commandRegistry.registerCommand(c, new StubCommandHandler());
        });
        // Execute order c, b, a.
        commandRegistry.addRecentCommand(commands[2]);
        commandRegistry.addRecentCommand(commands[1]);
        commandRegistry.addRecentCommand(commands[0]);
        // Expect recently used to be a, b, c.
        const result = commandRegistry.recent;
        expect(result.length).equal(3);
        expect(result[0].id).equal(commandIds[0]);
        expect(result[1].id).equal(commandIds[1]);
        expect(result[2].id).equal(commandIds[2]);
    });
    it('should add a previously used command to the top of the most recently used', async () => {
        const commandIds = ['a', 'b', 'c'];
        const commands = [
            { id: commandIds[0] },
            { id: commandIds[1] },
            { id: commandIds[2] },
        ];
        // Register each command.
        commands.forEach((c) => {
            commandRegistry.registerCommand(c, new StubCommandHandler());
        });
        // Execute order a, b, c, a.
        commandRegistry.addRecentCommand(commands[0]);
        commandRegistry.addRecentCommand(commands[1]);
        commandRegistry.addRecentCommand(commands[2]);
        commandRegistry.addRecentCommand(commands[0]);
        // Expect recently used to be a, b, c.
        const result = commandRegistry.recent;
        expect(result.length).equal(3);
        expect(result[0].id).equal(commandIds[0]);
        expect(result[1].id).equal(commandIds[2]);
        expect(result[2].id).equal(commandIds[1]);
    });
    it('should clear the recently used command history', async () => {
        const commandIds = ['a', 'b', 'c'];
        const commands = [
            { id: commandIds[0] },
            { id: commandIds[1] },
            { id: commandIds[2] },
        ];
        // Register each command.
        commands.forEach((c) => {
            commandRegistry.registerCommand(c, new StubCommandHandler());
        });
        // Execute each command.
        commandRegistry.addRecentCommand(commands[0]);
        commandRegistry.addRecentCommand(commands[1]);
        commandRegistry.addRecentCommand(commands[2]);
        // Clear the list of recently used commands.
        commandRegistry.clearCommandHistory();
        expect(commandRegistry.recent.length).equal(0);
    });
    it('should return with an empty array of handlers if the command is not registered', () => {
        expect(commandRegistry.getCommand('missing')).to.be.undefined;
        expect(commandRegistry.getAllHandlers('missing')).to.be.empty;
    });
    it('should return with an empty array of handlers if the command has no registered handlers', () => {
        commandRegistry.registerCommand({ id: 'id' });
        expect(commandRegistry.getCommand('id')).to.be.not.undefined;
        expect(commandRegistry.getAllHandlers('id')).to.be.empty;
    });
    it('should return all handlers including the non active ones', () => {
        commandRegistry.registerCommand({ id: 'id' });
        commandRegistry.registerHandler('id', new StubCommandHandler());
        commandRegistry.registerHandler('id', new NeverActiveStubCommandHandler());
        expect(commandRegistry.getAllHandlers('id').length).to.be.equal(2);
    });
    describe('compareCommands', () => {
        it('should sort command \'a\' before command \'b\' with categories', () => {
            const a = { id: 'a', category: 'a', label: 'a' };
            const b = { id: 'b', category: 'b', label: 'b' };
            expect(command_1.Command.compareCommands(a, b)).to.equal(-1);
            expect(command_1.Command.compareCommands(b, a)).to.equal(1);
        });
        it('should sort command \'a\' before command \'b\' without categories', () => {
            const a = { id: 'a', label: 'a' };
            const b = { id: 'b', label: 'b' };
            expect(command_1.Command.compareCommands(a, b)).to.equal(-1);
            expect(command_1.Command.compareCommands(b, a)).to.equal(1);
        });
        it('should sort command \'a\' before command \'b\' with mix-match categories', () => {
            const a = { id: 'a', category: 'a', label: 'a' };
            const b = { id: 'b', label: 'a' };
            expect(command_1.Command.compareCommands(a, b)).to.equal(1);
            expect(command_1.Command.compareCommands(b, a)).to.equal(-1);
        });
        it('should sort irregardless of casing', () => {
            const lowercase = { id: 'a', label: 'a' };
            const uppercase = { id: 'a', label: 'A' };
            expect(command_1.Command.compareCommands(lowercase, uppercase)).to.equal(0);
        });
        it('should not sort if commands are equal', () => {
            const a = { id: 'a', label: 'a' };
            expect(command_1.Command.compareCommands(a, a)).to.equal(0);
        });
        it('should not sort commands without labels', () => {
            const a = { id: 'a' };
            const b = { id: 'b' };
            expect(command_1.Command.compareCommands(a, b)).to.equal(0);
        });
    });
});
class EmptyContributionProvider {
    getContributions(recursive) {
        return [];
    }
}
class ConcatCommandHandler {
    execute(...args) {
        let concat = '';
        args.forEach(element => {
            concat += element;
        });
        return concat;
    }
}
class StubCommandHandler {
    execute(...args) { return undefined; }
}
class NeverActiveStubCommandHandler extends StubCommandHandler {
    isEnabled() { return false; }
}
//# sourceMappingURL=command.spec.js.map