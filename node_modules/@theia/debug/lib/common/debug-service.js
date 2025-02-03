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
exports.ForwardingDebugChannel = exports.DebugError = exports.DebugAdapterPath = exports.DebugService = exports.DebugPath = void 0;
const core_1 = require("@theia/core");
const application_error_1 = require("@theia/core/lib/common/application-error");
/**
 * The WS endpoint path to the Debug service.
 */
exports.DebugPath = '/services/debug';
/**
 * DebugService symbol for DI.
 */
exports.DebugService = Symbol('DebugService');
/**
 * The endpoint path to the debug adapter session.
 */
exports.DebugAdapterPath = '/services/debug-adapter';
var DebugError;
(function (DebugError) {
    DebugError.NotFound = application_error_1.ApplicationError.declare(-41000, (type) => ({
        message: `'${type}' debugger type is not supported.`,
        data: { type }
    }));
})(DebugError || (exports.DebugError = DebugError = {}));
/**
 * A {@link DebugChannel} wrapper implementation that sends and receives messages to/from an underlying {@link Channel}.
 */
class ForwardingDebugChannel {
    constructor(underlyingChannel) {
        this.underlyingChannel = underlyingChannel;
        this.onMessageEmitter = new core_1.Emitter();
        this.underlyingChannel.onMessage(msg => this.onMessageEmitter.fire(msg().readString()));
    }
    send(content) {
        this.underlyingChannel.getWriteBuffer().writeString(content).commit();
    }
    onMessage(cb) {
        this.onMessageEmitter.event(cb);
    }
    onError(cb) {
        this.underlyingChannel.onError(cb);
    }
    onClose(cb) {
        this.underlyingChannel.onClose(event => { var _a; return cb((_a = event.code) !== null && _a !== void 0 ? _a : -1, event.reason); });
    }
    close() {
        this.underlyingChannel.close();
        this.onMessageEmitter.dispose();
    }
}
exports.ForwardingDebugChannel = ForwardingDebugChannel;
//# sourceMappingURL=debug-service.js.map