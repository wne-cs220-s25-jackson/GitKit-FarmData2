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
/* eslint-disable no-null/no-null */
const ovsx_router_client_1 = require("./ovsx-router-client");
const ovsx_router_client_spec_data_1 = require("./ovsx-router-client.spec-data");
const ovsx_types_1 = require("./ovsx-types");
const assert = require("assert");
describe('OVSXRouterClient', async () => {
    const router = await ovsx_router_client_1.OVSXRouterClient.FromConfig({
        registries: ovsx_router_client_spec_data_1.registries,
        use: ['internal', 'public', 'third'],
        rules: [{
                ifRequestContains: /\btestFullStop\b/.source,
                use: null,
            },
            {
                ifRequestContains: /\bsecret\b/.source,
                use: 'internal'
            },
            {
                ifExtensionIdMatches: /^some\./.source,
                use: 'internal'
            }]
    }, ovsx_router_client_spec_data_1.testClientProvider, ovsx_router_client_spec_data_1.filterFactories);
    it('test query agglomeration', async () => {
        const result = await router.query({ namespaceName: 'other' });
        assert.deepStrictEqual(result.extensions.map(ovsx_types_1.ExtensionLike.id), [
            // note the order: plugins from "internal" first then from "public"
            'other.d',
            'other.e'
        ]);
    });
    it('test query request filtering', async () => {
        const result = await router.query({ namespaceName: 'secret' });
        assert.deepStrictEqual(result.extensions.map(ovsx_types_1.ExtensionLike.id), [
            // 'secret.w' from 'public' shouldn't be returned
            'secret.x',
            'secret.y',
            'secret.z'
        ]);
    });
    it('test query result filtering', async () => {
        const result = await router.query({ namespaceName: 'some' });
        assert.deepStrictEqual(result.extensions.map(ovsx_types_1.ExtensionLike.idWithVersion), [
            // no entry for the `some` namespace should be returned from the `public` registry
            'some.a@1.0.0'
        ]);
    });
    it('test query full stop', async () => {
        const result = await router.query({ extensionId: 'testFullStop.c' });
        assert.deepStrictEqual(result.extensions.length, 0);
    });
    it('test search agglomeration', async () => {
        const result = await router.search({ query: 'other.' });
        assert.deepStrictEqual(result.extensions.map(ovsx_types_1.ExtensionLike.id), [
            // note the order: plugins from "internal" first then from "public"
            'other.d',
            'other.e'
        ]);
    });
    it('test search request filtering', async () => {
        const result = await router.search({ query: 'secret.' });
        assert.deepStrictEqual(result.extensions.map(ovsx_types_1.ExtensionLike.id), [
            // 'secret.w' from 'public' shouldn't be returned
            'secret.x',
            'secret.y',
            'secret.z'
        ]);
    });
    it('test search result filtering', async () => {
        const result = await router.search({ query: 'some.' });
        assert.deepStrictEqual(result.extensions.map(ovsx_types_1.ExtensionLike.idWithVersion), [
            // no entry for the `some` namespace should be returned from the `public` registry
            'some.a@1.0.0'
        ]);
    });
    it('test search full stop', async () => {
        const result = await router.search({ query: 'testFullStop.c' });
        assert.deepStrictEqual(result.extensions.length, 0);
    });
    it('test config with unknown conditions', async () => {
        const clientPromise = ovsx_router_client_1.OVSXRouterClient.FromConfig({
            use: 'not relevant',
            rules: [{
                    ifRequestContains: /.*/.source,
                    unknownCondition: /should cause an error to be thrown/.source,
                    use: ['internal', 'public']
                }]
        }, ovsx_router_client_spec_data_1.testClientProvider, ovsx_router_client_spec_data_1.filterFactories);
        assert.rejects(clientPromise, /^Error: unknown conditions:/);
    });
});
//# sourceMappingURL=ovsx-router-client.spec.js.map