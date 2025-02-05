"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// *****************************************************************************
// Copyright (C) 2021 Red Hat and others.
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
const assert = require("assert/strict");
const promise_util_1 = require("./promise-util");
const event_1 = require("./event");
const cancellation_1 = require("./cancellation");
describe('promise-util', () => {
    describe('waitForEvent', () => {
        it('should time out', async () => {
            const emitter = new event_1.Emitter();
            await assert.rejects((0, promise_util_1.waitForEvent)(emitter.event, 1000), reason => reason instanceof cancellation_1.CancellationError);
        });
        it('should get event', async () => {
            const emitter = new event_1.Emitter();
            setTimeout(() => {
                emitter.fire('abcd');
            }, 500);
            assert.strictEqual(await (0, promise_util_1.waitForEvent)(emitter.event, 1000), 'abcd');
        });
    });
    describe('firstTrue', () => {
        function createSequentialPromises(...executionHandlers) {
            const deferreds = [];
            let i = 0;
            for (let k = 0; k < executionHandlers.length; k++) {
                deferreds.push(new promise_util_1.Deferred());
            }
            const resolveNext = () => {
                if (i < executionHandlers.length) {
                    executionHandlers[i](value => deferreds[i].resolve(value), error => deferreds[i].reject(error));
                    i++;
                }
                if (i < executionHandlers.length) {
                    setTimeout(resolveNext, 1);
                }
            };
            setTimeout(resolveNext, 1);
            return deferreds.map(deferred => deferred.promise);
        }
        it('should resolve to false when the promises arg is empty', async () => {
            const actual = await (0, promise_util_1.firstTrue)();
            assert.strictEqual(actual, false);
        });
        it('should resolve to true when the first promise resolves to true', async () => {
            const signals = [];
            function createHandler(signal, result) {
                return (resolve, reject) => {
                    signals.push(signal);
                    if (typeof result !== 'undefined') {
                        resolve(result);
                    }
                    else {
                        reject(undefined);
                    }
                };
            }
            const actual = await (0, promise_util_1.firstTrue)(...createSequentialPromises(createHandler('a', false), createHandler('b', false), createHandler('c', true), createHandler('d', false), createHandler('e', true)));
            assert.strictEqual(actual, true);
            assert.deepStrictEqual(signals, ['a', 'b', 'c']);
        });
        it('should reject when one of the promises rejects', async () => {
            await assert.rejects((0, promise_util_1.firstTrue)(...createSequentialPromises((resolve, _) => resolve(false), resolve => resolve(false), (_, reject) => reject(new Error('my test error')), resolve => resolve(true))), /Error: my test error/);
        });
    });
});
//# sourceMappingURL=promise-util.spec.js.map