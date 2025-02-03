"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
const chai = require("chai");
const uri_1 = require("./uri");
const uri_command_handler_1 = require("./uri-command-handler");
const expect = chai.expect;
const mockHandler = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    execute(...args) { this.lastCall = args; },
    lastCall: []
};
const selectedURIs = [
    new uri_1.default('/foo'),
    new uri_1.default('/bar'),
];
const mockSelectionService = {
    selection: selectedURIs.map(uri => ({ uri }))
};
describe('URI-Aware Command Handlers', () => {
    afterEach(() => {
        mockHandler.lastCall = [];
    });
    describe('UriAwareCommandHandler', () => {
        it('getUri returns the first argument if it is a URI (single)', () => {
            const args = [new uri_1.default('/passed/in'), 'some', 'other', 'args'];
            const output = uri_command_handler_1.UriAwareCommandHandler.MonoSelect(mockSelectionService, mockHandler)['getUri'](...args);
            expect(output).equals(args[0]);
        });
        it('getUri returns the first argument if it is a URI (multi)', () => {
            const args = [[new uri_1.default('/passed/in')], 'some', 'other', 'args'];
            const output = uri_command_handler_1.UriAwareCommandHandler.MultiSelect(mockSelectionService, mockHandler)['getUri'](...args);
            expect(output).equals(args[0]);
        });
        it('getUri returns an argument from the service if no URI is provided (single)', () => {
            const args = ['some', 'other', 'args'];
            const output = uri_command_handler_1.UriAwareCommandHandler.MonoSelect(mockSelectionService, mockHandler)['getUri'](...args);
            expect(output).equals(selectedURIs[0]);
        });
        it('getUri returns an argument from the service if no URI is provided (multi)', () => {
            const args = ['some', 'other', 'args'];
            const output = uri_command_handler_1.UriAwareCommandHandler.MultiSelect(mockSelectionService, mockHandler)['getUri'](...args);
            expect(output).deep.equals(selectedURIs);
        });
        it('calls the handler with the same args if the first argument if it is a URI (single)', () => {
            const args = [new uri_1.default('/passed/in'), 'some', 'other', 'args'];
            uri_command_handler_1.UriAwareCommandHandler.MonoSelect(mockSelectionService, mockHandler)['execute'](...args);
            expect(mockHandler.lastCall).deep.equals(args);
        });
        it('calls the handler with the same args if the first argument if it is a URI (multi)', () => {
            const args = [[new uri_1.default('/passed/in')], 'some', 'other', 'args'];
            uri_command_handler_1.UriAwareCommandHandler.MultiSelect(mockSelectionService, mockHandler)['execute'](...args);
            expect(mockHandler.lastCall).deep.equals(args);
        });
        it('calls the handler with an argument from the service if no URI is provided (single)', () => {
            const args = ['some', 'other', 'args'];
            uri_command_handler_1.UriAwareCommandHandler.MonoSelect(mockSelectionService, mockHandler)['execute'](...args);
            expect(mockHandler.lastCall).deep.equals([selectedURIs[0], ...args]);
        });
        it('calls the handler with an argument from the service if no URI is provided (multi)', () => {
            const args = ['some', 'other', 'args'];
            uri_command_handler_1.UriAwareCommandHandler.MultiSelect(mockSelectionService, mockHandler)['execute'](...args);
            expect(mockHandler.lastCall).deep.equals([selectedURIs, ...args]);
        });
    });
});
//# sourceMappingURL=uri-command-handler.spec.js.map