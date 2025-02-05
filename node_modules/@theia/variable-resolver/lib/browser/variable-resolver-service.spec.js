"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common");
const variable_1 = require("./variable");
const variable_resolver_service_1 = require("./variable-resolver-service");
const expect = chai.expect;
before(() => {
    chai.config.showDiff = true;
    chai.config.includeStack = true;
});
describe('variable-resolver-service', () => {
    let testContainer;
    let variableRegistry;
    let variableResolverService;
    beforeEach(() => {
        testContainer = new inversify_1.Container();
        testContainer.bind(variable_1.VariableRegistry).toSelf().inSingletonScope();
        testContainer.bind(variable_resolver_service_1.VariableResolverService).toSelf().inSingletonScope();
        variableRegistry = testContainer.get(variable_1.VariableRegistry);
        variableRegistry.registerVariable({
            name: 'file',
            description: 'current file',
            resolve: () => Promise.resolve('package.json')
        });
        variableRegistry.registerVariable({
            name: 'lineNumber',
            description: 'current line number',
            resolve: () => Promise.resolve('6')
        });
        variableResolverService = testContainer.get(variable_resolver_service_1.VariableResolverService);
    });
    it('should resolve known variables in a text', async () => {
        const resolved = await variableResolverService.resolve('file: ${file}; line: ${lineNumber}');
        expect(resolved).is.equal('file: package.json; line: 6');
    });
    it('should resolve known variables in a string array', async () => {
        const resolved = await variableResolverService.resolveArray(['file: ${file}', 'line: ${lineNumber}']);
        expect(resolved.length).to.be.equal(2);
        expect(resolved).to.contain('file: package.json');
        expect(resolved).to.contain('line: 6');
    });
    it('should skip unknown variables', async () => {
        const resolved = await variableResolverService.resolve('workspace: ${workspaceRoot}; file: ${file}; line: ${lineNumber}');
        expect(resolved).is.equal('workspace: ${workspaceRoot}; file: package.json; line: 6');
    });
    it('should return undefined when a variable throws with `cancelled()` while resolving', async () => {
        variableRegistry.registerVariable({
            name: 'command',
            resolve: (contextUri, commandId) => {
                if (commandId === 'testCommand') {
                    throw (0, common_1.cancelled)();
                }
            }
        });
        const resolved = await variableResolverService.resolve('workspace: ${command:testCommand}; file: ${file}; line: ${lineNumber}');
        expect(resolved).equal(undefined);
    });
});
//# sourceMappingURL=variable-resolver-service.spec.js.map