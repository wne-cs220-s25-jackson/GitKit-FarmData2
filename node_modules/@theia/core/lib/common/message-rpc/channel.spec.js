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
exports.ChannelPipe = void 0;
const chai_1 = require("chai");
const spies = require("chai-spies");
const uint8_array_message_buffer_1 = require("./uint8-array-message-buffer");
const channel_1 = require("./channel");
(0, chai_1.use)(spies);
/**
 * A pipe with two channels at each end for testing.
 */
class ChannelPipe {
    constructor() {
        this.left = new channel_1.ForwardingChannel('left', () => this.right.onCloseEmitter.fire({ reason: 'Left channel has been closed' }), () => {
            const leftWrite = new uint8_array_message_buffer_1.Uint8ArrayWriteBuffer();
            leftWrite.onCommit(buffer => {
                this.right.onMessageEmitter.fire(() => new uint8_array_message_buffer_1.Uint8ArrayReadBuffer(buffer));
            });
            return leftWrite;
        });
        this.right = new channel_1.ForwardingChannel('right', () => this.left.onCloseEmitter.fire({ reason: 'Right channel has been closed' }), () => {
            const rightWrite = new uint8_array_message_buffer_1.Uint8ArrayWriteBuffer();
            rightWrite.onCommit(buffer => {
                this.left.onMessageEmitter.fire(() => new uint8_array_message_buffer_1.Uint8ArrayReadBuffer(buffer));
            });
            return rightWrite;
        });
    }
}
exports.ChannelPipe = ChannelPipe;
describe('Message Channel', () => {
    describe('Channel multiplexer', () => {
        it('should forward messages to intended target channel', async () => {
            const pipe = new ChannelPipe();
            const leftMultiplexer = new channel_1.ChannelMultiplexer(pipe.left);
            const rightMultiplexer = new channel_1.ChannelMultiplexer(pipe.right);
            const openChannelSpy = (0, chai_1.spy)(() => {
            });
            rightMultiplexer.onDidOpenChannel(openChannelSpy);
            leftMultiplexer.onDidOpenChannel(openChannelSpy);
            const leftFirst = await leftMultiplexer.open('first');
            const leftSecond = await leftMultiplexer.open('second');
            const rightFirst = rightMultiplexer.getOpenChannel('first');
            const rightSecond = rightMultiplexer.getOpenChannel('second');
            chai_1.assert.isNotNull(rightFirst);
            chai_1.assert.isNotNull(rightSecond);
            const leftSecondSpy = (0, chai_1.spy)((buf) => {
                const message = buf().readString();
                (0, chai_1.expect)(message).equal('message for second');
            });
            leftSecond.onMessage(leftSecondSpy);
            const rightFirstSpy = (0, chai_1.spy)((buf) => {
                const message = buf().readString();
                (0, chai_1.expect)(message).equal('message for first');
            });
            rightFirst.onMessage(rightFirstSpy);
            leftFirst.getWriteBuffer().writeString('message for first').commit();
            rightSecond.getWriteBuffer().writeString('message for second').commit();
            (0, chai_1.expect)(leftSecondSpy).to.be.called();
            (0, chai_1.expect)(rightFirstSpy).to.be.called();
            (0, chai_1.expect)(openChannelSpy).to.be.called.exactly(4);
        });
    });
});
//# sourceMappingURL=channel.spec.js.map