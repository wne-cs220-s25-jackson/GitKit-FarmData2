"use strict";
// *****************************************************************************
// Copyright (C) 2019 Red Hat, Inc. and others.
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
const assert = require("assert");
const known_commands_1 = require("./known-commands");
const types_impl_1 = require("./types-impl");
const type_converters_1 = require("./type-converters");
describe('Known Command Conversions', () => {
    it('Should convert position correctly', () => {
        // given
        const commandID = 'editor.action.rename';
        const uri = types_impl_1.URI.parse('file://my_theia_location');
        const line = 61;
        const character = 22;
        const position = new types_impl_1.Position(line, character); // vscode type position
        assert.ok(known_commands_1.KnownCommands.mapped(commandID));
        // when
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        known_commands_1.KnownCommands.map(commandID, [uri, position], (mappedID, mappedArgs) => {
            // then
            assert.strictEqual(commandID, mappedID);
            assert.strictEqual(mappedArgs.length, 2);
            assert.deepStrictEqual(uri, mappedArgs[0]);
            const expectedMonacoPosition = (0, type_converters_1.fromPosition)(position);
            assert.deepStrictEqual(expectedMonacoPosition, mappedArgs[1]);
        });
    });
});
//# sourceMappingURL=known-commands.spec.js.map