"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.DebugSessionConnection = exports.DebugEventTypes = void 0;
const promise_util_1 = require("@theia/core/lib/common/promise-util");
const core_1 = require("@theia/core");
var DebugEventTypes;
(function (DebugEventTypes) {
    function isStandardEvent(event) {
        return standardDebugEvents.has(event);
    }
    DebugEventTypes.isStandardEvent = isStandardEvent;
    ;
})(DebugEventTypes || (exports.DebugEventTypes = DebugEventTypes = {}));
const standardDebugEvents = new Set([
    'breakpoint',
    'capabilities',
    'continued',
    'exited',
    'initialized',
    'invalidated',
    'loadedSource',
    'module',
    'output',
    'process',
    'progressEnd',
    'progressStart',
    'progressUpdate',
    'stopped',
    'terminated',
    'thread'
]);
class DebugSessionConnection {
    constructor(sessionId, connectionFactory, traceOutputChannel) {
        this.sessionId = sessionId;
        this.traceOutputChannel = traceOutputChannel;
        this.sequence = 1;
        this.pendingRequests = new Map();
        this.requestHandlers = new Map();
        this.onDidCustomEventEmitter = new core_1.Emitter();
        this.onDidCustomEvent = this.onDidCustomEventEmitter.event;
        this.onDidCloseEmitter = new core_1.Emitter();
        this.onDidClose = this.onDidCloseEmitter.event;
        this.isClosed = false;
        this.toDispose = new core_1.DisposableCollection(this.onDidCustomEventEmitter, core_1.Disposable.create(() => this.pendingRequests.clear()), core_1.Disposable.create(() => this.emitters.clear()));
        this.allThreadsContinued = true;
        this.emitters = new Map();
        this.connectionPromise = this.createConnection(connectionFactory);
    }
    get disposed() {
        return this.toDispose.disposed;
    }
    checkDisposed() {
        if (this.disposed) {
            throw new Error('the debug session connection is disposed, id: ' + this.sessionId);
        }
    }
    dispose() {
        this.toDispose.dispose();
    }
    async createConnection(connectionFactory) {
        const connection = await connectionFactory(this.sessionId);
        connection.onClose(() => {
            this.isClosed = true;
            this.cancelPendingRequests();
            this.onDidCloseEmitter.fire();
        });
        connection.onMessage(data => this.handleMessage(data));
        return connection;
    }
    async sendRequest(command, args, timeout) {
        const result = await this.doSendRequest(command, args, timeout);
        if (command === 'next' || command === 'stepIn' ||
            command === 'stepOut' || command === 'stepBack' ||
            command === 'reverseContinue' || command === 'restartFrame') {
            this.fireContinuedEvent(args.threadId);
        }
        if (command === 'continue') {
            const response = result;
            const allThreadsContinued = response && response.body && response.body.allThreadsContinued;
            if (allThreadsContinued !== undefined) {
                this.allThreadsContinued = result.body.allThreadsContinued;
            }
            this.fireContinuedEvent(args.threadId, this.allThreadsContinued);
            return result;
        }
        return result;
    }
    sendCustomRequest(command, args) {
        return this.doSendRequest(command, args);
    }
    cancelPendingRequests() {
        this.pendingRequests.forEach((deferred, requestId) => {
            deferred.reject(new Error(`Request ${requestId} cancelled on connection close`));
        });
    }
    doSendRequest(command, args, timeout) {
        const result = new promise_util_1.Deferred();
        if (this.isClosed) {
            result.reject(new Error('Connection is closed'));
        }
        else {
            const request = {
                seq: this.sequence++,
                type: 'request',
                command: command,
                arguments: args
            };
            this.pendingRequests.set(request.seq, result);
            if (timeout) {
                const handle = setTimeout(() => {
                    const pendingRequest = this.pendingRequests.get(request.seq);
                    if (pendingRequest) {
                        // request has not been handled
                        this.pendingRequests.delete(request.seq);
                        const error = {
                            type: 'response',
                            seq: 0,
                            request_seq: request.seq,
                            success: false,
                            command,
                            message: `Request #${request.seq}: ${request.command} timed out`
                        };
                        pendingRequest.reject(error);
                    }
                }, timeout);
                result.promise.finally(() => clearTimeout(handle));
            }
            this.send(request);
        }
        return result.promise;
    }
    async send(message) {
        const connection = await this.connectionPromise;
        const messageStr = JSON.stringify(message);
        if (this.traceOutputChannel) {
            const now = new Date();
            const dateStr = `${now.toLocaleString(undefined, { hour12: false })}.${now.getMilliseconds()}`;
            this.traceOutputChannel.appendLine(`${this.sessionId.substring(0, 8)} ${dateStr} theia -> adapter: ${JSON.stringify(message, undefined, 4)}`);
        }
        connection.send(messageStr);
    }
    handleMessage(data) {
        const message = JSON.parse(data);
        if (this.traceOutputChannel) {
            const now = new Date();
            const dateStr = `${now.toLocaleString(undefined, { hour12: false })}.${now.getMilliseconds()}`;
            this.traceOutputChannel.appendLine(`${this.sessionId.substring(0, 8)} ${dateStr} theia <- adapter: ${JSON.stringify(message, undefined, 4)}`);
        }
        if (message.type === 'request') {
            this.handleRequest(message);
        }
        else if (message.type === 'response') {
            this.handleResponse(message);
        }
        else if (message.type === 'event') {
            this.handleEvent(message);
        }
    }
    handleResponse(response) {
        const pendingRequest = this.pendingRequests.get(response.request_seq);
        if (pendingRequest) {
            this.pendingRequests.delete(response.request_seq);
            if (!response.success) {
                pendingRequest.reject(response);
            }
            else {
                pendingRequest.resolve(response);
            }
        }
    }
    onRequest(command, handler) {
        this.requestHandlers.set(command, handler);
    }
    async handleRequest(request) {
        const response = {
            type: 'response',
            seq: 0,
            command: request.command,
            request_seq: request.seq,
            success: true,
        };
        const handler = this.requestHandlers.get(request.command);
        if (handler) {
            try {
                response.body = await handler(request);
            }
            catch (error) {
                response.success = false;
                response.message = error.message;
            }
        }
        else {
            console.error('Unhandled request', request);
        }
        await this.send(response);
    }
    handleEvent(event) {
        if (event.event === 'continued') {
            this.allThreadsContinued = event.body.allThreadsContinued === false ? false : true;
        }
        if (DebugEventTypes.isStandardEvent(event.event)) {
            this.doFire(event.event, event);
        }
        else {
            this.onDidCustomEventEmitter.fire(event);
        }
    }
    on(kind, listener) {
        return this.getEmitter(kind).event(listener);
    }
    onEvent(kind) {
        return this.getEmitter(kind).event;
    }
    fire(kind, e) {
        this.doFire(kind, e);
    }
    doFire(kind, e) {
        this.getEmitter(kind).fire(e);
    }
    getEmitter(kind) {
        const emitter = this.emitters.get(kind) || this.newEmitter();
        this.emitters.set(kind, emitter);
        return emitter;
    }
    newEmitter() {
        const emitter = new core_1.Emitter();
        this.checkDisposed();
        this.toDispose.push(emitter);
        return emitter;
    }
    fireContinuedEvent(threadId, allThreadsContinued = false) {
        this.fire('continued', {
            type: 'event',
            event: 'continued',
            body: {
                threadId,
                allThreadsContinued
            },
            seq: -1
        });
    }
}
exports.DebugSessionConnection = DebugSessionConnection;
//# sourceMappingURL=debug-session-connection.js.map