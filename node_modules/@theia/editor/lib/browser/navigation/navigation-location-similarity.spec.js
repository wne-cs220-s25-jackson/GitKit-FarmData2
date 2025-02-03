"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
const navigation_location_1 = require("./navigation-location");
const navigation_location_similarity_1 = require("./navigation-location-similarity");
describe('navigation-location-similarity', () => {
    const similarity = new navigation_location_similarity_1.NavigationLocationSimilarity();
    it('should never be similar if they belong to different resources', () => {
        (0, chai_1.expect)(similarity.similar(navigation_location_1.NavigationLocation.create('file:///a', { line: 0, character: 0, }), navigation_location_1.NavigationLocation.create('file:///b', { line: 0, character: 0, }))).to.be.false;
    });
    it('should be true if the locations are withing the threshold', () => {
        (0, chai_1.expect)(similarity.similar(navigation_location_1.NavigationLocation.create('file:///a', { start: { line: 0, character: 10 }, end: { line: 0, character: 15 } }), navigation_location_1.NavigationLocation.create('file:///a', { start: { line: 10, character: 3 }, end: { line: 0, character: 5 } }))).to.be.true;
    });
    it('should be false if the locations are outside of the threshold', () => {
        (0, chai_1.expect)(similarity.similar(navigation_location_1.NavigationLocation.create('file:///a', { start: { line: 0, character: 10 }, end: { line: 0, character: 15 } }), navigation_location_1.NavigationLocation.create('file:///a', { start: { line: 11, character: 3 }, end: { line: 0, character: 5 } }))).to.be.true;
    });
});
//# sourceMappingURL=navigation-location-similarity.spec.js.map