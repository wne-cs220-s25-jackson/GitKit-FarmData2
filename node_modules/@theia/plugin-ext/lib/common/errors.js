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
exports.isENOENT = exports.disposed = exports.readonly = exports.illegalArgument = void 0;
const types_1 = require("@theia/core/lib/common/types");
function illegalArgument(message) {
    if (message) {
        return new Error(`Illegal argument: ${message}`);
    }
    else {
        return new Error('Illegal argument');
    }
}
exports.illegalArgument = illegalArgument;
function readonly(name) {
    if (name) {
        return new Error(`readonly property '${name} cannot be changed'`);
    }
    else {
        return new Error('readonly property cannot be changed');
    }
}
exports.readonly = readonly;
function disposed(what) {
    const result = new Error(`${what} has been disposed`);
    result.name = 'DISPOSED';
    return result;
}
exports.disposed = disposed;
const ENOENT = 'ENOENT';
function isErrnoException(arg) {
    return arg instanceof Error
        && (0, types_1.isObject)(arg)
        && typeof arg.code === 'string'
        && typeof arg.errno === 'number';
}
/**
 * _(No such file or directory)_: Commonly raised by `fs` operations to indicate that a component of the specified pathname does not exist — no entity (file or directory) could be
 * found by the given path.
 */
function isENOENT(arg) {
    return isErrnoException(arg) && arg.code === ENOENT;
}
exports.isENOENT = isENOENT;
//# sourceMappingURL=errors.js.map