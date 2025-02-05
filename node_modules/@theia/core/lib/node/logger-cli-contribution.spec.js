"use strict";
// *****************************************************************************
// Copyright (C) 2018 Ericsson and others.
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
const chai_1 = require("chai");
const yargs = require("yargs");
const temp = require("temp");
const fs = require("fs");
const inversify_1 = require("inversify");
const logger_1 = require("../common/logger");
const logger_cli_contribution_1 = require("./logger-cli-contribution");
const sinon = require("sinon");
// Allow creating temporary files, but remove them when we are done.
const track = temp.track();
let cli;
let consoleErrorSpy;
describe('log-level-cli-contribution', () => {
    beforeEach(() => {
        const container = new inversify_1.Container();
        const module = new inversify_1.ContainerModule(bind => {
            bind(logger_cli_contribution_1.LogLevelCliContribution).toSelf().inSingletonScope();
        });
        container.load(module);
        cli = container.get(logger_cli_contribution_1.LogLevelCliContribution);
        yargs.global([]);
        cli.configure(yargs);
        consoleErrorSpy = sinon.spy(console, 'error');
    });
    afterEach(() => {
        consoleErrorSpy.restore();
    });
    it('should use --log-level flag', async () => {
        const args = yargs.parse(['--log-level=debug']);
        await cli.setArguments(args);
        (0, chai_1.expect)(cli.defaultLogLevel).eq(logger_1.LogLevel.DEBUG);
    });
    it('should read json config file', async () => {
        const file = track.openSync();
        fs.writeFileSync(file.fd, JSON.stringify({
            defaultLevel: 'info',
            levels: {
                'hello': 'debug',
                'world': 'fatal',
            }
        }));
        fs.fsyncSync(file.fd);
        fs.closeSync(file.fd);
        const args = yargs.parse(['--log-config', file.path]);
        await cli.setArguments(args);
        (0, chai_1.expect)(cli.defaultLogLevel).eq(logger_1.LogLevel.INFO);
        (0, chai_1.expect)(cli.logLevels).eql({
            hello: logger_1.LogLevel.DEBUG,
            world: logger_1.LogLevel.FATAL,
        });
    });
    it('should use info as default log level', async () => {
        const args = yargs.parse([]);
        await cli.setArguments(args);
        (0, chai_1.expect)(cli.defaultLogLevel).eq(logger_1.LogLevel.INFO);
        (0, chai_1.expect)(cli.logLevels).eql({});
    });
    it('should reject wrong default log level', async () => {
        const file = track.openSync();
        fs.writeFileSync(file.fd, JSON.stringify({
            defaultLevel: 'potato',
            levels: {
                'hello': 'debug',
                'world': 'fatal',
            }
        }));
        const args = yargs.parse(['--log-config', file.path]);
        await cli.setArguments(args);
        sinon.assert.calledWithMatch(consoleErrorSpy, 'Unknown default log level in');
    });
    it('should reject wrong logger log level', async () => {
        const file = track.openSync();
        fs.writeFileSync(file.fd, JSON.stringify({
            defaultLevel: 'info',
            levels: {
                'hello': 'potato',
                'world': 'fatal',
            }
        }));
        const args = yargs.parse(['--log-config', file.path]);
        await cli.setArguments(args);
        sinon.assert.calledWithMatch(consoleErrorSpy, 'Unknown log level for logger hello in');
    });
    it('should reject nonexistent config files', async () => {
        const args = yargs.parse(['--log-config', '/tmp/cacaca']);
        await cli.setArguments(args);
        sinon.assert.calledWithMatch(consoleErrorSpy, 'no such file or directory');
    });
    it('should reject config file with invalid JSON', async () => {
        const file = track.openSync();
        const text = JSON.stringify({
            defaultLevel: 'info',
            levels: {
                'hello': 'potato',
                'world': 'fatal',
            }
        });
        fs.writeFileSync(file.fd, '{' + text);
        const args = yargs.parse(['--log-config', file.path]);
        await cli.setArguments(args);
        sinon.assert.calledWithMatch(consoleErrorSpy, 'Error reading log config file');
    });
    // Skip this test because it is flaky, sometimes we don't receive the event.
    // If trying to fix it, make sure that you can run a few of theses (I used
    // 4) in parallel for a few minutes without failure:
    //
    //  $ while ./node_modules/.bin/mocha --opts configs/mocha.opts packages/core/lib/node/logger-cli-contribution.spec.js  --grep watch; do true; done
    it.skip('should watch the config file', async () => {
        let filename;
        {
            const file = track.openSync();
            filename = file.path;
            fs.writeFileSync(file.fd, JSON.stringify({
                defaultLevel: 'info',
                levels: {
                    'hello': 'debug',
                    'world': 'fatal',
                }
            }));
            fs.fsyncSync(file.fd);
            fs.closeSync(file.fd);
            const args = yargs.parse(['--log-config', file.path]);
            await cli.setArguments(args);
        }
        (0, chai_1.expect)(cli.defaultLogLevel).eq(logger_1.LogLevel.INFO);
        (0, chai_1.expect)(cli.logLevels).eql({
            hello: logger_1.LogLevel.DEBUG,
            world: logger_1.LogLevel.FATAL,
        });
        const gotEvent = new Promise(resolve => {
            cli.onLogConfigChanged(() => resolve());
            const fd = fs.openSync(filename, 'w');
            fs.ftruncateSync(fd);
            fs.writeFileSync(fd, JSON.stringify({
                defaultLevel: 'debug',
                levels: {
                    'bonjour': 'debug',
                    'world': 'trace',
                }
            }));
            fs.fsyncSync(fd);
            fs.closeSync(fd);
        });
        await gotEvent;
        (0, chai_1.expect)(cli.defaultLogLevel).eq(logger_1.LogLevel.DEBUG);
        (0, chai_1.expect)(cli.logLevels).eql({
            bonjour: logger_1.LogLevel.DEBUG,
            world: logger_1.LogLevel.TRACE,
        });
    });
    it('should keep original levels when changing the log levels file with a broken one', async function () {
        this.timeout(5000);
        const file = track.openSync();
        fs.writeFileSync(file.fd, JSON.stringify({
            defaultLevel: 'info',
            levels: {
                'hello': 'debug',
                'world': 'fatal',
            }
        }));
        fs.fsyncSync(file.fd);
        const args = yargs.parse(['--log-config', file.path]);
        await cli.setArguments(args);
        (0, chai_1.expect)(cli.defaultLogLevel).eq(logger_1.LogLevel.INFO);
        (0, chai_1.expect)(cli.logLevels).eql({
            hello: logger_1.LogLevel.DEBUG,
            world: logger_1.LogLevel.FATAL,
        });
        const waitForTwoSeconds = new Promise(resolve => {
            fs.ftruncateSync(file.fd);
            const text = '{' + JSON.stringify({
                defaultLevel: 'debug',
                levels: {
                    'bonjour': 'debug',
                    'world': 'trace',
                }
            });
            fs.writeFileSync(file.fd, text);
            fs.fsyncSync(file.fd);
            // Check in two seconds that the log levels haven't changed.
            setTimeout(resolve, 2000);
        });
        await waitForTwoSeconds;
        (0, chai_1.expect)(cli.defaultLogLevel).eq(logger_1.LogLevel.INFO);
        (0, chai_1.expect)(cli.logLevels).eql({
            hello: logger_1.LogLevel.DEBUG,
            world: logger_1.LogLevel.FATAL,
        });
    });
});
//# sourceMappingURL=logger-cli-contribution.spec.js.map