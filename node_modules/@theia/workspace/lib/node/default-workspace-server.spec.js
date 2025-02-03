"use strict";
// *****************************************************************************
// Copyright (C) 2022 Alexander Flammer and others.
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
const inversify_1 = require("@theia/core/shared/inversify");
const mock_env_variables_server_1 = require("@theia/core/lib/browser/test/mock-env-variables-server");
const env_variables_1 = require("@theia/core/lib/common/env-variables");
const node_1 = require("@theia/core/lib/node");
const common_1 = require("../common");
const default_workspace_server_1 = require("./default-workspace-server");
const chai_1 = require("chai");
const temp = require("temp");
const fs = require("fs");
const core_1 = require("@theia/core");
const mock_logger_1 = require("@theia/core/lib/common/test/mock-logger");
describe('DefaultWorkspaceServer', function () {
    describe('getRecentWorkspaces()', async () => {
        let workspaceServer;
        let tmpConfigDir;
        let recentWorkspaceFile;
        beforeEach(() => {
            // create a temporary directory
            const tempDirPath = temp.track().mkdirSync();
            tmpConfigDir = node_1.FileUri.create(fs.realpathSync(tempDirPath));
            recentWorkspaceFile = node_1.FileUri.fsPath(tmpConfigDir.resolve('recentworkspace.json'));
            // create a container with the necessary bindings for the DefaultWorkspaceServer
            const container = new inversify_1.Container();
            const containerModule = new inversify_1.ContainerModule(bind => {
                /* Mock logger binding*/
                bind(core_1.ILogger).to(mock_logger_1.MockLogger);
                (0, core_1.bindContributionProvider)(bind, default_workspace_server_1.WorkspaceHandlerContribution);
                bind(default_workspace_server_1.FileWorkspaceHandlerContribution).toSelf().inSingletonScope();
                bind(default_workspace_server_1.WorkspaceHandlerContribution).toService(default_workspace_server_1.FileWorkspaceHandlerContribution);
                bind(default_workspace_server_1.WorkspaceCliContribution).toSelf().inSingletonScope();
                bind(default_workspace_server_1.DefaultWorkspaceServer).toSelf().inSingletonScope();
                bind(common_1.WorkspaceFileService).toSelf().inSingletonScope();
                bind(common_1.UntitledWorkspaceService).toSelf().inSingletonScope();
                bind(env_variables_1.EnvVariablesServer).toConstantValue(new mock_env_variables_server_1.MockEnvVariablesServerImpl(tmpConfigDir));
            });
            container.load(containerModule);
            workspaceServer = container.get(default_workspace_server_1.DefaultWorkspaceServer);
        });
        it('should return empty list of workspaces if no recent workspaces file is existing', async function () {
            const recent = await workspaceServer.getRecentWorkspaces();
            (0, chai_1.expect)(recent).to.be.empty;
        });
        it('should not return non-existing workspaces from recent workspaces file', async function () {
            fs.writeFileSync(recentWorkspaceFile, JSON.stringify({
                recentRoots: [
                    tmpConfigDir.resolve('somethingNotExisting').toString(),
                    tmpConfigDir.resolve('somethingElseNotExisting').toString()
                ]
            }));
            const recent = await workspaceServer.getRecentWorkspaces();
            (0, chai_1.expect)(recent).to.be.empty;
        });
        it('should return only existing workspaces from recent workspaces file', async function () {
            fs.writeFileSync(recentWorkspaceFile, JSON.stringify({
                recentRoots: [
                    tmpConfigDir.toString(),
                    tmpConfigDir.resolve('somethingNotExisting').toString()
                ]
            }));
            const recent = await workspaceServer.getRecentWorkspaces();
            (0, chai_1.expect)(recent).to.have.members([tmpConfigDir.toString()]);
        });
        it('should ignore non-string array entries but return remaining existing file paths', async function () {
            // previously caused: 'TypeError: Cannot read property 'fsPath' of undefined', see issue #10250
            fs.writeFileSync(recentWorkspaceFile, JSON.stringify({
                recentRoots: [
                    [tmpConfigDir.toString()],
                    {},
                    12345678,
                    undefined,
                    tmpConfigDir.toString(),
                ]
            }));
            const recent = await workspaceServer.getRecentWorkspaces();
            (0, chai_1.expect)(recent).to.have.members([tmpConfigDir.toString()]);
        });
    });
});
//# sourceMappingURL=default-workspace-server.spec.js.map