"use strict";
// *****************************************************************************
// Copyright (C) 2019 Ericsson and others.
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
const jsdom_1 = require("../test/jsdom");
let disableJSDOM = (0, jsdom_1.enableJSDOM)();
const chai_1 = require("chai");
const widgets_1 = require("@phosphor/widgets");
const tab_bars_1 = require("./tab-bars");
disableJSDOM();
describe('tab bar', () => {
    before(() => {
        disableJSDOM = (0, jsdom_1.enableJSDOM)();
    });
    after(() => {
        disableJSDOM();
    });
    it('should disambiguate tabs that have identical names', () => {
        const tabBar = new tab_bars_1.TabBarRenderer();
        const owner = new widgets_1.Widget();
        const tabLabels = ['index.ts', 'index.ts', 'index.ts', 'main.ts', 'main.ts', 'main.ts', 'uniqueFile.ts'];
        const tabPaths = [
            'root1/src/foo/bar/index.ts',
            'root1/lib/foo/bar/index.ts',
            'root2/src/foo/goo/bar/index.ts',
            'root1/aaa/main.ts',
            'root1/aaa/bbb/main.ts',
            'root1/aaa/bbb/ccc/main.ts',
            'root1/src/foo/bar/uniqueFile.ts'
        ];
        const tabs = tabLabels.map((label, i) => new widgets_1.Title({
            owner, label, caption: tabPaths[i]
        }));
        const pathMap = tabBar.findDuplicateLabels(tabs);
        (0, chai_1.expect)(pathMap.get(tabPaths[0])).to.be.equal('.../src/...');
        (0, chai_1.expect)(pathMap.get(tabPaths[1])).to.be.equal('.../lib/...');
        (0, chai_1.expect)(pathMap.get(tabPaths[2])).to.be.equal('root2/...');
        (0, chai_1.expect)(pathMap.get(tabPaths[3])).to.be.equal('root1/aaa');
        (0, chai_1.expect)(pathMap.get(tabPaths[4])).to.be.equal('root1/aaa/bbb');
        (0, chai_1.expect)(pathMap.get(tabPaths[5])).to.be.equal('.../ccc');
        (0, chai_1.expect)(pathMap.get(tabPaths[6])).to.be.equal(undefined);
    });
});
//# sourceMappingURL=tab-bars.spec.js.map