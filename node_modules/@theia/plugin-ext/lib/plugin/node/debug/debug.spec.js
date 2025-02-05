"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/********************************************************************************
 * Copyright (C) 2022 STMicroelectronics and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
 ********************************************************************************/
const inversify_1 = require("@theia/core/shared/inversify");
const chai = require("chai");
const rpc_protocol_1 = require("../../../common/rpc-protocol");
const debug_ext_1 = require("../../debug/debug-ext");
const expect = chai.expect;
describe('Debug API', () => {
    describe('#asDebugSourceURI', () => {
        const mockRPCProtocol = {
            getProxy(_proxyId) {
                return {};
            },
            set(_id, instance) {
                return instance;
            },
            dispose() {
                // Nothing
            }
        };
        const container = new inversify_1.Container();
        container.bind(rpc_protocol_1.RPCProtocol).toConstantValue(mockRPCProtocol);
        container.bind(debug_ext_1.DebugExtImpl).toSelf().inSingletonScope();
        const debug = container.get(debug_ext_1.DebugExtImpl);
        it('should use sourceReference, path and sessionId', () => {
            const source = {
                sourceReference: 3,
                path: 'test/path'
            };
            const session = { id: 'test-session' };
            const uri = debug.asDebugSourceUri(source, session);
            expect(uri.toString(true)).to.be.equal('debug:test/path?ref=3&session=test-session');
        });
        it('should use sourceReference', () => {
            const source = {
                sourceReference: 5
            };
            const uri = debug.asDebugSourceUri(source);
            expect(uri.toString(true)).to.be.equal('debug:?ref=5');
        });
        it('should use sourceReference and session', () => {
            const source = {
                sourceReference: 5
            };
            const session = { id: 'test-session' };
            const uri = debug.asDebugSourceUri(source, session);
            expect(uri.toString(true)).to.be.equal('debug:?ref=5&session=test-session');
        });
        it('should use sourceReference and path', () => {
            const source = {
                sourceReference: 4,
                path: 'test/path'
            };
            const uri = debug.asDebugSourceUri(source);
            expect(uri.toString(true)).to.be.equal('debug:test/path?ref=4');
        });
        it('should use path', () => {
            const source = {
                path: 'scheme:/full/path'
            };
            const uri = debug.asDebugSourceUri(source);
            expect(uri.toString(true)).to.be.equal('scheme:/full/path');
        });
        it('should use file path', () => {
            const source = {
                path: '/full/path'
            };
            const uri = debug.asDebugSourceUri(source);
            expect(uri.toString(true)).to.be.equal('file:///full/path');
        });
    });
});
//# sourceMappingURL=debug.spec.js.map