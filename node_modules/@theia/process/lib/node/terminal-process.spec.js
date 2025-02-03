"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const chai = require("chai");
const process = require("process");
const stream = require("stream");
const process_test_container_1 = require("./test/process-test-container");
const terminal_process_1 = require("./terminal-process");
const os_1 = require("@theia/core/lib/common/os");
/**
 * Globals
 */
const expect = chai.expect;
let terminalProcessFactory;
beforeEach(() => {
    terminalProcessFactory = (0, process_test_container_1.createProcessTestContainer)().get(terminal_process_1.TerminalProcessFactory);
});
describe('TerminalProcess', function () {
    this.timeout(20000);
    it('test error on non existent path', async function () {
        const error = await new Promise((resolve, reject) => {
            const proc = terminalProcessFactory({ command: '/non-existent' });
            proc.onError(resolve);
            proc.onExit(resolve);
        });
        if (os_1.isWindows) {
            expect(error.code).eq('ENOENT');
        }
        else {
            expect(error.code).eq(1);
        }
    });
    it('test implicit .exe (Windows only)', async function () {
        const match = /^(.+)\.exe$/.exec(process.execPath);
        if (!os_1.isWindows || !match) {
            this.skip();
        }
        const command = match[1];
        const args = ['--version'];
        const terminal = await new Promise((resolve, reject) => {
            const proc = terminalProcessFactory({ command, args });
            proc.onExit(resolve);
            proc.onError(reject);
        });
        expect(terminal.code).to.exist;
    });
    it('test error on trying to execute a directory', async function () {
        const error = await new Promise((resolve, reject) => {
            const proc = terminalProcessFactory({ command: __dirname });
            proc.onError(resolve);
            proc.onExit(resolve);
        });
        if (os_1.isWindows) {
            expect(error.code).eq('ENOENT');
        }
        else {
            expect(error.code).eq(1);
        }
    });
    it('test exit', async function () {
        const args = ['--version'];
        const exit = await new Promise((resolve, reject) => {
            const proc = terminalProcessFactory({ command: process.execPath, args });
            proc.onExit(resolve);
            proc.onError(reject);
        });
        expect(exit.code).eq(0);
    });
    it('test pipe stream', async function () {
        const v = await new Promise((resolve, reject) => {
            const args = ['--version'];
            const terminalProcess = terminalProcessFactory({ command: process.execPath, args });
            terminalProcess.onError(reject);
            const outStream = new stream.PassThrough();
            terminalProcess.createOutputStream().pipe(outStream);
            let version = '';
            outStream.on('data', data => {
                version += data.toString();
            });
            /* node-pty is not sending 'end' on the stream as it quits
            only 'exit' is sent on the terminal process.  */
            terminalProcess.onExit(() => {
                resolve(version.trim());
            });
        });
        /* Avoid using equal since terminal characters can be inserted at the end.  */
        expect(v).to.have.string(process.version);
    });
});
//# sourceMappingURL=terminal-process.spec.js.map