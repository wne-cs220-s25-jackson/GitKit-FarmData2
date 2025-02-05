"use strict";
// *****************************************************************************
// Copyright (C) 2023 Ericsson and others.
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
exports.testClientProvider = exports.filterFactories = exports.clients = exports.registries = void 0;
/* eslint-disable no-null/no-null */
const ovsx_mock_client_1 = require("./ovsx-mock-client");
const ovsx_router_filters_1 = require("./ovsx-router-filters");
exports.registries = {
    internal: 'https://internal.testdomain/',
    public: 'https://public.testdomain/',
    third: 'https://third.testdomain/'
};
exports.clients = {
    [exports.registries.internal]: new ovsx_mock_client_1.OVSXMockClient().setExtensionsFromIds(exports.registries.internal, [
        'some.a@1.0.0',
        'other.d',
        'secret.x',
        'secret.y',
        'secret.z',
        ...Array(50)
            .fill(undefined)
            .map((element, i) => `internal.autogen${i}`)
    ]),
    [exports.registries.public]: new ovsx_mock_client_1.OVSXMockClient().setExtensionsFromIds(exports.registries.public, [
        'some.a@2.0.0',
        'some.b',
        'other.e',
        'testFullStop.c',
        'secret.w',
        ...Array(50)
            .fill(undefined)
            .map((element, i) => `public.autogen${i}`)
    ]),
    [exports.registries.third]: new ovsx_mock_client_1.OVSXMockClient().setExtensionsFromIds(exports.registries.third, [
        ...Array(200)
            .fill(undefined)
            .map((element, i) => `third.autogen${i}`)
    ])
};
exports.filterFactories = [
    ovsx_router_filters_1.RequestContainsFilterFactory,
    ovsx_router_filters_1.ExtensionIdMatchesFilterFactory
];
function testClientProvider(uri) {
    const client = exports.clients[uri];
    if (!client) {
        throw new Error(`unknown client for URI=${uri}`);
    }
    return client;
}
exports.testClientProvider = testClientProvider;
;
//# sourceMappingURL=ovsx-router-client.spec-data.js.map