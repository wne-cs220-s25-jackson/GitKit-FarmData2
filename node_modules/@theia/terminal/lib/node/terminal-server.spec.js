"use strict";
// *****************************************************************************
// Copyright (C) 2017 Ericsson and others.
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
const chai = require("chai");
const terminal_test_container_1 = require("./test/terminal-test-container");
const terminal_protocol_1 = require("../common/terminal-protocol");
/**
 * Globals
 */
const expect = chai.expect;
describe('TerminalServer', function () {
    this.timeout(5000);
    let terminalServer;
    beforeEach(() => {
        const container = (0, terminal_test_container_1.createTerminalTestContainer)();
        terminalServer = container.get(terminal_protocol_1.ITerminalServer);
    });
    it('test terminal create', async function () {
        const args = ['--version'];
        const createResult = await terminalServer.create({ command: process.execPath, 'args': args });
        expect(createResult).to.be.greaterThan(-1);
    });
});
//# sourceMappingURL=terminal-server.spec.js.map