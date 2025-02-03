"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
const promise_util_1 = require("@theia/core/lib/common/promise-util");
const chai_1 = require("chai");
const buffering_stream_1 = require("./buffering-stream");
describe('BufferringStream', () => {
    it('should emit whatever data was buffered before the timeout', async () => {
        const buffer = new buffering_stream_1.BufferBufferingStream({ emitInterval: 1000 });
        const chunkPromise = waitForChunk(buffer);
        buffer.push(Buffer.from([0]));
        await (0, promise_util_1.wait)(100);
        buffer.push(Buffer.from([1]));
        await (0, promise_util_1.wait)(100);
        buffer.push(Buffer.from([2, 3, 4]));
        const chunk = await chunkPromise;
        (0, chai_1.expect)(chunk).deep.eq(Buffer.from([0, 1, 2, 3, 4]));
    });
    it('should not emit chunks bigger than maxChunkSize', async () => {
        const buffer = new buffering_stream_1.BufferBufferingStream({ maxChunkSize: 2 });
        buffer.push(Buffer.from([0, 1, 2, 3, 4, 5]));
        (0, chai_1.expect)(await waitForChunk(buffer)).deep.eq(Buffer.from([0, 1]));
        (0, chai_1.expect)(await waitForChunk(buffer)).deep.eq(Buffer.from([2, 3]));
        (0, chai_1.expect)(await waitForChunk(buffer)).deep.eq(Buffer.from([4, 5]));
    });
    function waitForChunk(buffer) {
        return new Promise(resolve => buffer.onData(resolve));
    }
});
//# sourceMappingURL=buffering-stream.spec.js.map