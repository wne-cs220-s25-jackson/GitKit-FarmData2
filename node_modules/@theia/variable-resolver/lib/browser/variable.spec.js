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
const mock_logger_1 = require("@theia/core/lib/common/test/mock-logger");
const variable_1 = require("./variable");
const expect = chai.expect;
let variableRegistry;
before(() => {
    chai.config.showDiff = true;
    chai.config.includeStack = true;
});
describe('variable api', () => {
    let testContainer;
    before(() => {
        testContainer = new inversify_1.Container();
        const module = new inversify_1.ContainerModule((bind, unbind, isBound, rebind) => {
            bind(common_1.ILogger).to(mock_logger_1.MockLogger);
            bind(variable_1.VariableRegistry).toSelf();
        });
        testContainer.load(module);
    });
    beforeEach(() => {
        variableRegistry = testContainer.get(variable_1.VariableRegistry);
    });
    it('should register and return variable', () => {
        registerTestVariable();
        const variable = variableRegistry.getVariable(TEST_VARIABLE.name);
        expect(variable).is.not.undefined;
        if (variable) {
            expect(variable.name).is.equal(TEST_VARIABLE.name);
        }
    });
    it('should not register a variable for already existed name', () => {
        const variables = [
            {
                name: 'workspaceRoot',
                description: 'workspace root URI',
                resolve: () => Promise.resolve('')
            },
            {
                name: 'workspaceRoot',
                description: 'workspace root URI 2',
                resolve: () => Promise.resolve('')
            }
        ];
        variables.forEach(v => variableRegistry.registerVariable(v));
        const registeredVariables = variableRegistry.getVariables();
        expect(registeredVariables.length).to.be.equal(1);
        expect(registeredVariables[0].name).to.be.equal('workspaceRoot');
        expect(registeredVariables[0].description).to.be.equal('workspace root URI');
    });
    it('should dispose variable', () => {
        const disposable = registerTestVariable();
        disposable.dispose();
        const variable = variableRegistry.getVariable(TEST_VARIABLE.name);
        expect(variable).is.undefined;
    });
    it('should unregister variables on dispose', () => {
        registerTestVariable();
        let variables = variableRegistry.getVariables();
        expect(variables.length).to.be.equal(1);
        variableRegistry.dispose();
        variables = variableRegistry.getVariables();
        expect(variables.length).to.be.equal(0);
    });
});
const TEST_VARIABLE = {
    name: 'workspaceRoot',
    resolve: () => Promise.resolve('')
};
function registerTestVariable() {
    return variableRegistry.registerVariable(TEST_VARIABLE);
}
//# sourceMappingURL=variable.spec.js.map