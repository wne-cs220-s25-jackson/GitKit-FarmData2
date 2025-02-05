"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.DebugThread = exports.DebugThreadData = void 0;
const React = require("@theia/core/shared/react");
const core_1 = require("@theia/core");
const debug_stack_frame_1 = require("./debug-stack-frame");
class DebugThreadData {
}
exports.DebugThreadData = DebugThreadData;
class DebugThread extends DebugThreadData {
    get onDidFocusStackFrame() {
        return this.onDidFocusStackFrameEmitter.event;
    }
    constructor(session) {
        super();
        this.session = session;
        this.onDidChangedEmitter = new core_1.Emitter();
        this.onDidChanged = this.onDidChangedEmitter.event;
        this.onDidFocusStackFrameEmitter = new core_1.Emitter();
        this._frames = new Map();
        this.pendingFetch = Promise.resolve([]);
        this._pendingFetchCount = 0;
        this.pendingFetchCancel = new core_1.CancellationTokenSource();
    }
    get id() {
        return this.session.id + ':' + this.raw.id;
    }
    get threadId() {
        return this.raw.id;
    }
    get currentFrame() {
        return this._currentFrame;
    }
    set currentFrame(frame) {
        var _a;
        if (((_a = this._currentFrame) === null || _a === void 0 ? void 0 : _a.id) === (frame === null || frame === void 0 ? void 0 : frame.id)) {
            return;
        }
        this._currentFrame = frame;
        this.onDidChangedEmitter.fire(undefined);
        this.onDidFocusStackFrameEmitter.fire(frame);
    }
    get stopped() {
        return !!this.stoppedDetails;
    }
    update(data) {
        Object.assign(this, data);
        if ('stoppedDetails' in data) {
            this.clearFrames();
        }
    }
    clear() {
        this.update({
            raw: this.raw,
            stoppedDetails: undefined
        });
    }
    continue() {
        return this.session.sendRequest('continue', this.toArgs());
    }
    stepOver() {
        return this.session.sendRequest('next', this.toArgs());
    }
    stepIn() {
        return this.session.sendRequest('stepIn', this.toArgs());
    }
    stepOut() {
        return this.session.sendRequest('stepOut', this.toArgs());
    }
    pause() {
        return this.session.sendRequest('pause', this.toArgs());
    }
    get supportsGoto() {
        return !!this.session.capabilities.supportsGotoTargetsRequest;
    }
    async jumpToCursor(uri, position) {
        var _a;
        const source = await ((_a = this.session) === null || _a === void 0 ? void 0 : _a.toDebugSource(uri));
        if (!source) {
            return undefined;
        }
        const response = await this.session.sendRequest('gotoTargets', { source, line: position.lineNumber, column: position.column });
        if (response && response.body.targets.length === 0) {
            this.session.showMessage(core_1.MessageType.Warning, 'No executable code is associated at the current cursor position.');
            return;
        }
        const targetId = response.body.targets[0].id;
        return this.session.sendRequest('goto', this.toArgs({ targetId }));
    }
    async getExceptionInfo() {
        if (this.stoppedDetails && this.stoppedDetails.reason === 'exception') {
            if (this.session.capabilities.supportsExceptionInfoRequest) {
                const response = await this.session.sendRequest('exceptionInfo', this.toArgs());
                return {
                    id: response.body.exceptionId,
                    description: response.body.description,
                    details: response.body.details
                };
            }
            return {
                description: this.stoppedDetails.text
            };
        }
        return undefined;
    }
    get supportsTerminate() {
        return !!this.session.capabilities.supportsTerminateThreadsRequest;
    }
    async terminate() {
        if (this.supportsTerminate) {
            await this.session.sendRequest('terminateThreads', {
                threadIds: [this.raw.id]
            });
        }
    }
    get frames() {
        return this._frames.values();
    }
    get topFrame() {
        return this.frames.next().value;
    }
    get frameCount() {
        return this._frames.size;
    }
    async fetchFrames(levels = 20) {
        const cancel = this.pendingFetchCancel.token;
        this._pendingFetchCount += 1;
        return this.pendingFetch = this.pendingFetch.then(async () => {
            try {
                const start = this.frameCount;
                const frames = await this.doFetchFrames(start, levels);
                if (cancel.isCancellationRequested) {
                    return [];
                }
                return this.doUpdateFrames(frames);
            }
            catch (e) {
                console.error('fetchFrames failed:', e);
                return [];
            }
            finally {
                if (!cancel.isCancellationRequested) {
                    this._pendingFetchCount -= 1;
                }
            }
        });
    }
    get pendingFrameCount() {
        return this._pendingFetchCount;
    }
    async doFetchFrames(startFrame, levels) {
        try {
            const response = await this.session.sendRequest('stackTrace', this.toArgs({ startFrame, levels }));
            if (this.stoppedDetails) {
                this.stoppedDetails.totalFrames = response.body.totalFrames;
            }
            return response.body.stackFrames;
        }
        catch (e) {
            if (this.stoppedDetails) {
                this.stoppedDetails.framesErrorMessage = e.message;
            }
            return [];
        }
    }
    doUpdateFrames(frames) {
        const result = new Set();
        for (const raw of frames) {
            const id = raw.id;
            const frame = this._frames.get(id) || new debug_stack_frame_1.DebugStackFrame(this, this.session);
            this._frames.set(id, frame);
            frame.update({ raw });
            result.add(frame);
        }
        this.updateCurrentFrame();
        return [...result.values()];
    }
    clearFrames() {
        // Clear all frames
        this._frames.clear();
        // Cancel all request promises
        this.pendingFetchCancel.cancel();
        this.pendingFetchCancel = new core_1.CancellationTokenSource();
        // Empty all current requests
        this.pendingFetch = Promise.resolve([]);
        this._pendingFetchCount = 0;
        this.updateCurrentFrame();
    }
    updateCurrentFrame() {
        const { currentFrame } = this;
        const frameId = currentFrame && currentFrame.raw.id;
        this.currentFrame = typeof frameId === 'number' &&
            this._frames.get(frameId) ||
            this._frames.values().next().value;
    }
    toArgs(arg) {
        return Object.assign({}, arg, {
            threadId: this.raw.id
        });
    }
    render() {
        return (React.createElement("div", { className: "theia-debug-thread", title: core_1.nls.localizeByDefault('Session') },
            React.createElement("span", { className: "label" }, this.raw.name),
            React.createElement("span", { className: "status" }, this.threadStatus())));
    }
    threadStatus() {
        if (!this.stoppedDetails) {
            return core_1.nls.localizeByDefault('Running');
        }
        const description = this.stoppedDetails.description;
        if (description) {
            // According to DAP we must show description as is. Translation is made by debug adapter
            return description;
        }
        const reason = this.stoppedDetails.reason;
        const localizedReason = this.getLocalizedReason(reason);
        return reason
            ? core_1.nls.localizeByDefault('Paused on {0}', localizedReason)
            : core_1.nls.localizeByDefault('Paused');
    }
    getLocalizedReason(reason) {
        switch (reason) {
            case 'step':
                return core_1.nls.localize('theia/debug/step', 'step');
            case 'breakpoint':
                return core_1.nls.localize('theia/debug/breakpoint', 'breakpoint');
            case 'exception':
                return core_1.nls.localize('theia/debug/exception', 'exception');
            case 'pause':
                return core_1.nls.localize('theia/debug/pause', 'pause');
            case 'entry':
                return core_1.nls.localize('theia/debug/entry', 'entry');
            case 'goto':
                return core_1.nls.localize('theia/debug/goto', 'goto');
            case 'function breakpoint':
                return core_1.nls.localize('theia/debug/functionBreakpoint', 'function breakpoint');
            case 'data breakpoint':
                return core_1.nls.localize('theia/debug/dataBreakpoint', 'data breakpoint');
            case 'instruction breakpoint':
                return core_1.nls.localize('theia/debug/instructionBreakpoint', 'instruction breakpoint');
            default:
                return '';
        }
    }
}
exports.DebugThread = DebugThread;
//# sourceMappingURL=debug-thread.js.map