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
exports.PluginDebugAdapterSession = void 0;
const debug_adapter_session_1 = require("@theia/debug/lib/common/debug-adapter-session");
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Server debug adapter session.
 */
class PluginDebugAdapterSession extends debug_adapter_session_1.DebugAdapterSessionImpl {
    constructor(debugAdapter, tracker, theiaSession) {
        super(theiaSession.id, debugAdapter);
        this.debugAdapter = debugAdapter;
        this.tracker = tracker;
        this.theiaSession = theiaSession;
    }
    get parentSession() {
        return this.theiaSession.parentSession;
    }
    get type() {
        return this.theiaSession.type;
    }
    get name() {
        return this.theiaSession.name;
    }
    ;
    get workspaceFolder() {
        return this.theiaSession.workspaceFolder;
    }
    ;
    get configuration() {
        return this.theiaSession.configuration;
    }
    ;
    async start(channel) {
        if (this.tracker.onWillStartSession) {
            this.tracker.onWillStartSession();
        }
        await super.start(channel);
    }
    async stop() {
        if (this.tracker.onWillStopSession) {
            this.tracker.onWillStopSession();
        }
        await super.stop();
    }
    async customRequest(command, args) {
        return this.theiaSession.customRequest(command, args);
    }
    async getDebugProtocolBreakpoint(breakpoint) {
        return this.theiaSession.getDebugProtocolBreakpoint(breakpoint);
    }
    onDebugAdapterError(error) {
        if (this.tracker.onError) {
            this.tracker.onError(error);
        }
        super.onDebugAdapterError(error);
    }
    send(message) {
        try {
            super.send(message);
        }
        finally {
            if (this.tracker.onDidSendMessage) {
                this.tracker.onDidSendMessage(JSON.parse(message));
            }
        }
    }
    write(message) {
        if (this.tracker.onWillReceiveMessage) {
            this.tracker.onWillReceiveMessage(JSON.parse(message));
        }
        super.write(message);
    }
    onDebugAdapterExit() {
        if (this.tracker.onExit) {
            this.tracker.onExit(undefined, undefined);
        }
        super.onDebugAdapterExit();
    }
}
exports.PluginDebugAdapterSession = PluginDebugAdapterSession;
//# sourceMappingURL=plugin-debug-adapter-session.js.map