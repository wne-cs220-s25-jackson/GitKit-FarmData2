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
exports.FrontendApplicationStateService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const event_1 = require("../common/event");
const promise_util_1 = require("../common/promise-util");
const logger_1 = require("../common/logger");
let FrontendApplicationStateService = class FrontendApplicationStateService {
    constructor() {
        this._state = 'init';
        this.deferred = {};
        this.stateChanged = new event_1.Emitter();
    }
    get state() {
        return this._state;
    }
    set state(state) {
        if (state !== this._state) {
            this.doSetState(state);
        }
    }
    get onStateChanged() {
        return this.stateChanged.event;
    }
    doSetState(state) {
        if (this.deferred[this._state] === undefined) {
            this.deferred[this._state] = new promise_util_1.Deferred();
        }
        const oldState = this._state;
        this._state = state;
        if (this.deferred[state] === undefined) {
            this.deferred[state] = new promise_util_1.Deferred();
        }
        this.deferred[state].resolve();
        this.logger.info(`Changed application state from '${oldState}' to '${this._state}'.`);
        this.stateChanged.fire(state);
    }
    reachedState(state) {
        if (this.deferred[state] === undefined) {
            this.deferred[state] = new promise_util_1.Deferred();
        }
        return this.deferred[state].promise;
    }
    reachedAnyState(...states) {
        return Promise.race(states.map(s => this.reachedState(s)));
    }
};
exports.FrontendApplicationStateService = FrontendApplicationStateService;
tslib_1.__decorate([
    (0, inversify_1.inject)(logger_1.ILogger),
    tslib_1.__metadata("design:type", Object)
], FrontendApplicationStateService.prototype, "logger", void 0);
exports.FrontendApplicationStateService = FrontendApplicationStateService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FrontendApplicationStateService);
//# sourceMappingURL=frontend-application-state.js.map