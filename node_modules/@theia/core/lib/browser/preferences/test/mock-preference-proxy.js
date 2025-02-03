"use strict";
// *****************************************************************************
// Copyright (C) 2018 Ericsson and others.
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
exports.createMockPreferenceProxy = void 0;
const common_1 = require("../../../common");
/* eslint-disable @typescript-eslint/no-explicit-any */
function createMockPreferenceProxy(preferences) {
    const unsupportedOperation = (_, __) => {
        throw new Error('Unsupported operation');
    };
    return new Proxy({}, {
        get: (_, property) => {
            if (property === 'onPreferenceChanged') {
                return new common_1.Emitter().event;
            }
            if (property === 'dispose') {
                return () => { };
            }
            if (property === 'ready') {
                return Promise.resolve();
            }
            // eslint-disable-next-line no-null/no-null
            if (preferences[property] !== undefined && preferences[property] !== null) {
                return preferences[property];
            }
            return undefined;
        },
        ownKeys: () => [],
        getOwnPropertyDescriptor: (_, property) => ({}),
        set: unsupportedOperation,
        deleteProperty: unsupportedOperation,
        defineProperty: unsupportedOperation
    });
}
exports.createMockPreferenceProxy = createMockPreferenceProxy;
//# sourceMappingURL=mock-preference-proxy.js.map