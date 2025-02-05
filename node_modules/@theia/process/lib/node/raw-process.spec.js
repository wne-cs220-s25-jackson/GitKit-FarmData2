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
const raw_process_1 = require("./raw-process");
const temp = require("temp");
const fs = require("fs");
const path = require("path");
/* Allow to create temporary files, but delete them when we're done.  */
const track = temp.track();
/**
 * Globals
 */
const expect = chai.expect;
const FORK_TEST_FILE = path.join(__dirname, '../../src/node/test/process-fork-test.js');
describe('RawProcess', function () {
    this.timeout(20000);
    let rawProcessFactory;
    beforeEach(() => {
        rawProcessFactory = (0, process_test_container_1.createProcessTestContainer)().get(raw_process_1.RawProcessFactory);
    });
    after(() => {
        track.cleanupSync();
    });
    it('test error on non-existent path', async function () {
        const error = await new Promise((resolve, reject) => {
            const proc = rawProcessFactory({ command: '/non-existent' });
            proc.onStart(reject);
            proc.onError(resolve);
            proc.onExit(reject);
        });
        expect(error.code).eq('ENOENT');
    });
    it('test error on non-executable path', async function () {
        // Create a non-executable file.
        const f = track.openSync('non-executable');
        fs.writeSync(f.fd, 'echo bob');
        // Make really sure it's non-executable.
        let mode = fs.fstatSync(f.fd).mode;
        mode &= ~fs.constants.S_IXUSR;
        mode &= ~fs.constants.S_IXGRP;
        mode &= ~fs.constants.S_IXOTH;
        fs.fchmodSync(f.fd, mode);
        fs.closeSync(f.fd);
        const error = await new Promise((resolve, reject) => {
            const proc = rawProcessFactory({ command: f.path });
            proc.onStart(reject);
            proc.onError(resolve);
            proc.onExit(reject);
        });
        // do not check the exact error code as this seems to change between nodejs version
        expect(error).to.exist;
    });
    it('test start event', function () {
        return new Promise(async (resolve, reject) => {
            const args = ['-e', 'process.exit(3)'];
            const rawProcess = rawProcessFactory({ command: process.execPath, 'args': args });
            rawProcess.onStart(resolve);
            rawProcess.onError(reject);
            rawProcess.onExit(reject);
        });
    });
    it('test exit', async function () {
        const args = ['--version'];
        const rawProcess = rawProcessFactory({ command: process.execPath, 'args': args });
        const p = new Promise((resolve, reject) => {
            rawProcess.onError(reject);
            rawProcess.onExit(event => {
                if (event.code === undefined) {
                    reject(new Error('event.code is undefined'));
                }
                else {
                    resolve(event.code);
                }
            });
        });
        const exitCode = await p;
        expect(exitCode).equal(0);
    });
    it('test pipe stdout stream', async function () {
        const output = await new Promise(async (resolve, reject) => {
            const args = ['-e', 'console.log("text to stdout")'];
            const outStream = new stream.PassThrough();
            const rawProcess = rawProcessFactory({ command: process.execPath, 'args': args });
            rawProcess.onError(reject);
            rawProcess.outputStream.pipe(outStream);
            let buf = '';
            outStream.on('data', data => {
                buf += data.toString();
            });
            outStream.on('end', () => {
                resolve(buf.trim());
            });
        });
        expect(output).to.be.equal('text to stdout');
    });
    it('test pipe stderr stream', async function () {
        const output = await new Promise(async (resolve, reject) => {
            const args = ['-e', 'console.error("text to stderr")'];
            const outStream = new stream.PassThrough();
            const rawProcess = rawProcessFactory({ command: process.execPath, 'args': args });
            rawProcess.onError(reject);
            rawProcess.errorStream.pipe(outStream);
            let buf = '';
            outStream.on('data', data => {
                buf += data.toString();
            });
            outStream.on('end', () => {
                resolve(buf.trim());
            });
        });
        expect(output).to.be.equal('text to stderr');
    });
    it('test forked pipe stdout stream', async function () {
        const args = ['version'];
        const rawProcess = rawProcessFactory({ modulePath: FORK_TEST_FILE, args, options: { stdio: 'pipe' } });
        const outStream = new stream.PassThrough();
        const p = new Promise((resolve, reject) => {
            let version = '';
            outStream.on('data', data => {
                version += data.toString();
            });
            outStream.on('end', () => {
                resolve(version.trim());
            });
        });
        rawProcess.outputStream.pipe(outStream);
        expect(await p).to.be.equal('1.0.0');
    });
    it('test forked pipe stderr stream', async function () {
        const rawProcess = rawProcessFactory({ modulePath: FORK_TEST_FILE, args: [], options: { stdio: 'pipe' } });
        const outStream = new stream.PassThrough();
        const p = new Promise((resolve, reject) => {
            let version = '';
            outStream.on('data', data => {
                version += data.toString();
            });
            outStream.on('end', () => {
                resolve(version.trim());
            });
        });
        rawProcess.errorStream.pipe(outStream);
        expect(await p).to.have.string('Error');
    });
});
//# sourceMappingURL=raw-process.spec.js.map