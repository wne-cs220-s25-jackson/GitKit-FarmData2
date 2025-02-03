"use strict";
// *****************************************************************************
// Copyright (C) 2021 Red Hat, Inc. and others.
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
const rpc_message_encoder_1 = require("./rpc-message-encoder");
const uint8_array_message_buffer_1 = require("./uint8-array-message-buffer");
describe('PPC Message Encoder & Decoder', () => {
    describe('MsgPack  Encoder & Decoder', () => {
        it('should encode object into binary message and decode the message back into the original object', () => {
            const buffer = new Uint8Array(1024);
            const writer = new uint8_array_message_buffer_1.Uint8ArrayWriteBuffer(buffer);
            const testObject = {
                string: 'string',
                boolean: true,
                integer: 5,
                float: 14.5,
                array: ['1', 2, { three: 'three' }],
                set: new Set([1, 2, 3]),
                map: new Map([[1, 1], [2, 2], [3, 3]]),
                buffer: new TextEncoder().encode('ThisIsAUint8Array'),
                object: { foo: 'bar', baz: true },
                undefined: undefined,
                // eslint-disable-next-line no-null/no-null
                null: null
            };
            const encoder = new rpc_message_encoder_1.MsgPackMessageEncoder();
            encoder.encode(writer, testObject);
            const written = writer.getCurrentContents();
            const reader = new uint8_array_message_buffer_1.Uint8ArrayReadBuffer(written);
            const decoder = new rpc_message_encoder_1.MsgPackMessageDecoder();
            const decoded = decoder.decode(reader);
            (0, chai_1.expect)(decoded).deep.equal(testObject);
        });
        it('should fail with an EncodingError when trying to encode the object ', () => {
            const x = new Set();
            const y = new Set();
            x.add(y);
            y.add(x);
            const writer = new uint8_array_message_buffer_1.Uint8ArrayWriteBuffer();
            const encoder = new rpc_message_encoder_1.MsgPackMessageEncoder();
            (0, chai_1.expect)(() => encoder.encode(writer, x)).to.throw(rpc_message_encoder_1.EncodingError);
        });
    });
});
//# sourceMappingURL=rpc-message-encoder.spec.js.map