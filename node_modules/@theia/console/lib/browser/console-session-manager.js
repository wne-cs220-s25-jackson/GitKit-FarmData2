"use strict";
// *****************************************************************************
// Copyright (C) 2021 TypeFox and others.
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
exports.ConsoleSessionManager = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const core_1 = require("@theia/core");
const severity_1 = require("@theia/core/lib/common/severity");
let ConsoleSessionManager = class ConsoleSessionManager {
    constructor() {
        this.sessions = new Map();
        this.sessionAddedEmitter = new core_1.Emitter();
        this.sessionDeletedEmitter = new core_1.Emitter();
        this.sessionWasShownEmitter = new core_1.Emitter();
        this.sessionWasHiddenEmitter = new core_1.Emitter();
        this.selectedSessionChangedEmitter = new core_1.Emitter();
        this.severityChangedEmitter = new core_1.Emitter();
        this.toDispose = new core_1.DisposableCollection();
        this.toDisposeOnSessionDeletion = new Map();
    }
    get onDidAddSession() {
        return this.sessionAddedEmitter.event;
    }
    get onDidDeleteSession() {
        return this.sessionDeletedEmitter.event;
    }
    get onDidShowSession() {
        return this.sessionWasShownEmitter.event;
    }
    get onDidHideSession() {
        return this.sessionWasHiddenEmitter.event;
    }
    get onDidChangeSelectedSession() {
        return this.selectedSessionChangedEmitter.event;
    }
    get onDidChangeSeverity() {
        return this.severityChangedEmitter.event;
    }
    dispose() {
        this.toDispose.dispose();
    }
    get severity() {
        return this._severity;
    }
    set severity(value) {
        value = value || severity_1.Severity.Ignore;
        this._severity = value;
        for (const session of this.sessions.values()) {
            session.severity = value;
        }
        this.severityChangedEmitter.fire(undefined);
    }
    get all() {
        return Array.from(this.sessions.values());
    }
    get selectedSession() {
        return this._selectedSession;
    }
    set selectedSession(session) {
        const oldSession = this.selectedSession;
        this._selectedSession = session;
        this.selectedSessionChangedEmitter.fire(session);
        if (oldSession !== session) {
            if (oldSession) {
                this.sessionWasHiddenEmitter.fire(oldSession);
            }
            if (session) {
                this.sessionWasShownEmitter.fire(session);
            }
        }
    }
    get(id) {
        return this.sessions.get(id);
    }
    add(session) {
        this.sessions.set(session.id, session);
        this.sessionAddedEmitter.fire(session);
        if (this.sessions.size === 1) {
            this.selectedSession = session;
        }
    }
    delete(id) {
        const session = this.sessions.get(id);
        if (this.sessions.delete(id) && session) {
            if (this.selectedSession === session) {
                // select a new sessions or undefined if none are left
                this.selectedSession = this.sessions.values().next().value;
            }
            session.dispose();
            this.sessionDeletedEmitter.fire(session);
        }
    }
};
exports.ConsoleSessionManager = ConsoleSessionManager;
exports.ConsoleSessionManager = ConsoleSessionManager = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ConsoleSessionManager);
//# sourceMappingURL=console-session-manager.js.map