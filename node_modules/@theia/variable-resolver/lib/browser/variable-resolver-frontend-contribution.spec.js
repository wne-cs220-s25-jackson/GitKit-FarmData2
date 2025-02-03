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
exports.TestVariableContribution = void 0;
const jsdom_1 = require("@theia/core/lib/browser/test/jsdom");
let disableJSDOM = (0, jsdom_1.enableJSDOM)();
const frontend_application_config_provider_1 = require("@theia/core/lib/browser/frontend-application-config-provider");
frontend_application_config_provider_1.FrontendApplicationConfigProvider.set({});
const chai = require("chai");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common");
const mock_logger_1 = require("@theia/core/lib/common/test/mock-logger");
const variable_1 = require("./variable");
const variable_quick_open_service_1 = require("./variable-quick-open-service");
const variable_resolver_frontend_contribution_1 = require("./variable-resolver-frontend-contribution");
disableJSDOM();
const expect = chai.expect;
before(() => {
    chai.config.showDiff = true;
    chai.config.includeStack = true;
});
describe('variable-resolver-frontend-contribution', () => {
    let testContainer;
    let variableRegistry;
    before(() => {
        disableJSDOM = (0, jsdom_1.enableJSDOM)();
        testContainer = new inversify_1.Container();
        const module = new inversify_1.ContainerModule((bind, unbind, isBound, rebind) => {
            (0, common_1.bindContributionProvider)(bind, variable_1.VariableContribution);
            bind(variable_1.VariableContribution).toConstantValue(new TestVariableContribution());
            bind(common_1.ILogger).to(mock_logger_1.MockLogger);
            bind(variable_1.VariableRegistry).toSelf().inSingletonScope();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            bind(variable_quick_open_service_1.VariableQuickOpenService).toConstantValue({}); // mock VariableQuickOpenService
            bind(variable_resolver_frontend_contribution_1.VariableResolverFrontendContribution).toSelf();
        });
        testContainer.load(module);
    });
    after(() => {
        disableJSDOM();
    });
    beforeEach(() => {
        variableRegistry = testContainer.get(variable_1.VariableRegistry);
        const variableRegistrar = testContainer.get(variable_resolver_frontend_contribution_1.VariableResolverFrontendContribution);
        variableRegistrar.onStart();
    });
    it('should register all variables from the contribution points', () => {
        const variables = variableRegistry.getVariables();
        expect(variables.length).to.be.equal(2);
        expect(variables[0].name).to.be.equal('file');
        expect(variables[1].name).to.be.equal('lineNumber');
    });
});
class TestVariableContribution {
    registerVariables(variables) {
        variables.registerVariable({
            name: 'file',
            description: 'Resolves to file name opened in the current editor',
            resolve: () => Promise.resolve('package.json')
        });
        variables.registerVariable({
            name: 'lineNumber',
            description: 'Resolves to current line number',
            resolve: () => Promise.resolve('5')
        });
    }
}
exports.TestVariableContribution = TestVariableContribution;
//# sourceMappingURL=variable-resolver-frontend-contribution.spec.js.map