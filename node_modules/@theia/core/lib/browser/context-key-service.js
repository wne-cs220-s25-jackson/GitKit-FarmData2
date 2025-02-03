"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
exports.ContextKeyServiceDummyImpl = exports.ContextKeyService = exports.ContextKey = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const event_1 = require("../common/event");
var ContextKey;
(function (ContextKey) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ContextKey.None = Object.freeze({
        set: () => { },
        reset: () => { },
        get: () => undefined
    });
})(ContextKey || (exports.ContextKey = ContextKey = {}));
exports.ContextKeyService = Symbol('ContextKeyService');
let ContextKeyServiceDummyImpl = class ContextKeyServiceDummyImpl {
    constructor() {
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
    }
    fireDidChange(event) {
        this.onDidChangeEmitter.fire(event);
    }
    createKey(key, defaultValue) {
        return ContextKey.None;
    }
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    match(expression, context) {
        return true;
    }
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    parseKeys(expression) {
        return new Set();
    }
    /**
     * Details should be implemented by an extension, e.g. by the monaco extension.
     * Callback must be synchronous.
     */
    with(values, callback) {
        return callback();
    }
    /**
     * Details should implemented by an extension, e.g. by the monaco extension.
     */
    createScoped(target) {
        return this;
    }
    /**
     * Details should be implemented by an extension, e.g. the monaco extension.
     */
    createOverlay(overlay) {
        return this;
    }
    /**
     * Details should be implemented by an extension, e.g. by the monaco extension.
     */
    setContext(key, value) { }
    dispose() { }
};
exports.ContextKeyServiceDummyImpl = ContextKeyServiceDummyImpl;
exports.ContextKeyServiceDummyImpl = ContextKeyServiceDummyImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ContextKeyServiceDummyImpl);
//# sourceMappingURL=context-key-service.js.map