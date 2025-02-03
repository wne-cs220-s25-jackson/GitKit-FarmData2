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
const yargs = require("yargs");
const chai = require("chai");
const cli_1 = require("./cli");
const promise_util_1 = require("../common/promise-util");
class TestCliManager extends cli_1.CliManager {
    constructor(...contribs) {
        super({
            getContributions() { return contribs; }
        });
    }
}
beforeEach(() => {
    yargs.global([]);
});
describe('CliManager', () => {
    it('Parses simple option', async () => {
        const value = new promise_util_1.Deferred();
        const manager = new TestCliManager({
            configure(conf) {
                conf.option('foo', { alias: 'f', description: 'Some foo.' });
                conf.option('bar', { alias: 'b', description: 'Some bla.', default: 'my-default', type: 'string' });
            },
            setArguments(args) {
                value.resolve(args['foo']);
            }
        });
        await manager.initializeCli(['-f', 'bla'], () => Promise.resolve(), () => Promise.resolve());
        chai.assert.equal(await value.promise, 'bla');
    });
    it('resolves with default', async () => {
        const value = new promise_util_1.Deferred();
        const manager = new TestCliManager({
            configure(conf) {
                conf.option('foo', { alias: 'f', description: 'Some foo.' });
                conf.option('bar', { alias: 'b', description: 'Some bla.', default: 'my-default', type: 'string' });
            },
            setArguments(args) {
                value.resolve(args['bar']);
            }
        });
        await manager.initializeCli(['--foo'], () => Promise.resolve(), () => Promise.resolve());
        chai.assert.equal(await value.promise, 'my-default');
    });
    it('prints help and exits', async () => assertExits(async () => {
        const manager = new TestCliManager();
        await manager.initializeCli(['--help'], () => Promise.resolve(), () => Promise.resolve());
    }));
});
async function assertExits(code) {
    const oldExit = process.exit;
    const exitCalled = new promise_util_1.Deferred();
    const exitError = new Error();
    process.exit = () => {
        throw exitError;
    };
    try {
        await code();
        exitCalled.reject();
    }
    catch (err) {
        if (err === exitError) {
            exitCalled.resolve();
        }
        else {
            exitCalled.reject();
        }
    }
    finally {
        process.exit = oldExit;
    }
    return exitCalled.promise;
}
//# sourceMappingURL=cli.spec.js.map