"use strict";
// *****************************************************************************
// Copyright (C) 2021 SAP SE or an SAP affiliate company and others.
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
const jsdom_1 = require("@theia/core/lib/browser/test/jsdom");
const chai = require("chai");
const vscode_uri_1 = require("@theia/core/shared/vscode-uri");
let disableJSDOM = (0, jsdom_1.enableJSDOM)();
const frontend_application_config_provider_1 = require("@theia/core/lib/browser/frontend-application-config-provider");
frontend_application_config_provider_1.FrontendApplicationConfigProvider.set({});
const inversify_1 = require("@theia/core/shared/inversify");
const bulk_edit_tree_1 = require("./bulk-edit-tree");
const expect = chai.expect;
let bulkEditTree;
let testContainer;
const fileContextsMap = new Map();
let resourceTextEdits;
disableJSDOM();
before(() => {
    disableJSDOM = (0, jsdom_1.enableJSDOM)();
    testContainer = new inversify_1.Container();
    testContainer.bind(bulk_edit_tree_1.BulkEditTree).toSelf();
    bulkEditTree = testContainer.get(bulk_edit_tree_1.BulkEditTree);
    fileContextsMap.set('/c:/test1.ts', 'aaaaaaaaaaaaaaaaaaa');
    fileContextsMap.set('/c:/test2.ts', 'bbbbbbbbbbbbbbbbbbb');
    resourceTextEdits = [
        {
            'resource': vscode_uri_1.URI.file('c:/test1.ts'),
            'textEdit': {
                'text': 'AAAAA', 'range': { 'startLineNumber': 1, 'startColumn': 5, 'endLineNumber': 1, 'endColumn': 10 }
            }
        },
        {
            'resource': vscode_uri_1.URI.file('c:/test2.ts'),
            'textEdit': {
                'text': 'BBBBBB', 'range': { 'startLineNumber': 1, 'startColumn': 3, 'endLineNumber': 1, 'endColumn': 8 }
            }
        }
    ];
});
after(() => {
    disableJSDOM();
});
describe('bulk-edit-tree', () => {
    it('initialize tree', () => {
        bulkEditTree.initTree(resourceTextEdits, fileContextsMap);
        expect(bulkEditTree.root.children.length).is.equal(2);
    });
});
//# sourceMappingURL=bulk-edit-tree.spec.js.map