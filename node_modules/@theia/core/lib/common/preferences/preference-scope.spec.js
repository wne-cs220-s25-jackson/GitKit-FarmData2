"use strict";
// *****************************************************************************
// Copyright (C) 2022 TypeFox and others.
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
const chai_1 = require("chai");
const preference_scope_1 = require("./preference-scope");
describe('PreferenceScope', () => {
    it('getScopes() should return numbers from broadest to narrowest', () => {
        (0, chai_1.expect)(preference_scope_1.PreferenceScope.getScopes()).deep.equal([0, 1, 2, 3]);
    });
    it('getReversedScopes() should return numbers from narrowest to broadest', () => {
        (0, chai_1.expect)(preference_scope_1.PreferenceScope.getReversedScopes()).deep.equal([3, 2, 1, 0]);
    });
    it('getScopeNames() should return the names of scopes broader than the current one', () => {
        (0, chai_1.expect)(preference_scope_1.PreferenceScope.getScopeNames(preference_scope_1.PreferenceScope.Workspace)).deep.equal(['Default', 'User', 'Workspace']);
    });
    it('is() returns whether a value is a preference scope', () => {
        (0, chai_1.expect)(preference_scope_1.PreferenceScope.is(preference_scope_1.PreferenceScope.Default)).to.be.true;
        (0, chai_1.expect)(preference_scope_1.PreferenceScope.is(preference_scope_1.PreferenceScope.User)).to.be.true;
        (0, chai_1.expect)(preference_scope_1.PreferenceScope.is(preference_scope_1.PreferenceScope.Workspace)).to.be.true;
        (0, chai_1.expect)(preference_scope_1.PreferenceScope.is(preference_scope_1.PreferenceScope.Folder)).to.be.true;
        (0, chai_1.expect)(preference_scope_1.PreferenceScope.is(0)).to.be.true;
        (0, chai_1.expect)(preference_scope_1.PreferenceScope.is(1)).to.be.true;
        (0, chai_1.expect)(preference_scope_1.PreferenceScope.is(2)).to.be.true;
        (0, chai_1.expect)(preference_scope_1.PreferenceScope.is(3)).to.be.true;
        (0, chai_1.expect)(preference_scope_1.PreferenceScope.is(4)).to.be.false;
        (0, chai_1.expect)(preference_scope_1.PreferenceScope.is(-1)).to.be.false;
        (0, chai_1.expect)(preference_scope_1.PreferenceScope.is({})).to.be.false;
        (0, chai_1.expect)(preference_scope_1.PreferenceScope.is('Default')).to.be.false;
    });
});
//# sourceMappingURL=preference-scope.spec.js.map