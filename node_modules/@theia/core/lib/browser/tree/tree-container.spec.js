"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
const inversify_1 = require("inversify");
const tree_container_1 = require("./tree-container");
const tree_search_1 = require("./tree-search");
const tree_widget_1 = require("./tree-widget");
describe('TreeContainer', () => {
    describe('IsTreeServices should accurately distinguish TreeProps from TreeContainerProps', () => {
        it('should assign search:boolean to TreeProps', () => {
            assert((0, tree_container_1.isTreeServices)({
                ...tree_widget_1.defaultTreeProps, search: true, multiSelect: true, globalSelection: true, contextMenuPath: ['so-contextual']
            }) === false);
        });
        it('should assign search:not-a-boolean to TreeContainerProps', () => {
            assert((0, tree_container_1.isTreeServices)({ search: tree_search_1.TreeSearch }) === true);
        });
        const nonDefault = { search: !tree_widget_1.defaultTreeProps.search, contextMenu: ['no-default-for-this'] };
        it('should use props passed in as just props', () => {
            const parent = new inversify_1.Container();
            const child = (0, tree_container_1.createTreeContainer)(parent, nonDefault);
            assert.deepStrictEqual(child.get(tree_widget_1.TreeProps), { ...tree_widget_1.defaultTreeProps, ...nonDefault });
        });
        it('should use props passed in as part of TreeContainerProps', () => {
            const parent = new inversify_1.Container();
            const child = (0, tree_container_1.createTreeContainer)(parent, { props: nonDefault });
            assert.deepStrictEqual(child.get(tree_widget_1.TreeProps), { ...tree_widget_1.defaultTreeProps, ...nonDefault });
        });
    });
});
//# sourceMappingURL=tree-container.spec.js.map