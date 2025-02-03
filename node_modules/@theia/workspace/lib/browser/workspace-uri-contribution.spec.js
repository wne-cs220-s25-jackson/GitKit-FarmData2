"use strict";
// *****************************************************************************
// Copyright (C) 2018 Ericsson and others.
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
const disableJSDOM = (0, jsdom_1.enableJSDOM)();
const chai_1 = require("chai");
const sinon = require("sinon");
const inversify_1 = require("@theia/core/shared/inversify");
const event_1 = require("@theia/core/lib/common/event");
const browser_1 = require("@theia/core/lib/browser");
const label_provider_1 = require("@theia/core/lib/browser/label-provider");
const workspace_uri_contribution_1 = require("./workspace-uri-contribution");
const uri_1 = require("@theia/core/lib/common/uri");
const workspace_variable_contribution_1 = require("./workspace-variable-contribution");
const workspace_service_1 = require("./workspace-service");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
const files_1 = require("@theia/filesystem/lib/common/files");
const env_variables_1 = require("@theia/core/lib/common/env-variables");
const mock_env_variables_server_1 = require("@theia/core/lib/browser/test/mock-env-variables-server");
const node_1 = require("@theia/core/lib/node");
const os_1 = require("@theia/core/lib/common/os");
const temp = require("temp");
after(() => disableJSDOM());
let container;
let labelProvider;
let roots;
beforeEach(() => {
    roots = [files_1.FileStat.dir('file:///workspace')];
    container = new inversify_1.Container();
    container.bind(browser_1.ApplicationShell).toConstantValue({
        onDidChangeCurrentWidget: () => undefined,
        widgets: []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    });
    container.bind(browser_1.WidgetManager).toConstantValue({
        onDidCreateWidget: event_1.Event.None
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    });
    const workspaceService = new workspace_service_1.WorkspaceService();
    workspaceService.tryGetRoots = () => roots;
    container.bind(workspace_service_1.WorkspaceService).toConstantValue(workspaceService);
    container.bind(workspace_variable_contribution_1.WorkspaceVariableContribution).toSelf().inSingletonScope();
    container.bind(workspace_uri_contribution_1.WorkspaceUriLabelProviderContribution).toSelf().inSingletonScope();
    container.bind(file_service_1.FileService).toConstantValue({});
    container.bind(env_variables_1.EnvVariablesServer).toConstantValue(new mock_env_variables_server_1.MockEnvVariablesServerImpl(node_1.FileUri.create(temp.track().mkdirSync())));
    labelProvider = container.get(workspace_uri_contribution_1.WorkspaceUriLabelProviderContribution);
});
afterEach(() => {
    roots = undefined;
    labelProvider = undefined;
    container = undefined;
});
describe('WorkspaceUriLabelProviderContribution class', () => {
    const stubs = [];
    afterEach(() => {
        stubs.forEach(s => s.restore());
        stubs.length = 0;
    });
    describe('canHandle()', () => {
        it('should return 0 if the passed in argument is not a FileStat or URI with the "file" scheme', () => {
            (0, chai_1.expect)(labelProvider.canHandle(new uri_1.default('user-storage:settings.json'))).eq(0);
            (0, chai_1.expect)(labelProvider.canHandle({ uri: 'file:///home/settings.json' })).eq(0);
        });
        it('should return 10 if the passed in argument is a FileStat or URI with the "file" scheme', () => {
            (0, chai_1.expect)(labelProvider.canHandle(new uri_1.default('file:///home/settings.json'))).eq(10);
            (0, chai_1.expect)(labelProvider.canHandle(files_1.FileStat.file('file:///home/settings.json'))).eq(10);
        });
    });
    describe('getIcon()', () => {
        it('should return folder icon from the FileStat of a folder', async () => {
            (0, chai_1.expect)(labelProvider.getIcon(files_1.FileStat.dir('file:///home/'))).eq(labelProvider.defaultFolderIcon);
        });
        it('should return file icon from a non-folder FileStat', async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            stubs.push(sinon.stub(label_provider_1.DefaultUriLabelProviderContribution.prototype, 'getFileIcon').returns(undefined));
            (0, chai_1.expect)(labelProvider.getIcon(files_1.FileStat.file('file:///home/test'))).eq(labelProvider.defaultFileIcon);
        });
        it('should return folder icon from a folder FileStat', async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            stubs.push(sinon.stub(label_provider_1.DefaultUriLabelProviderContribution.prototype, 'getFileIcon').returns(undefined));
            (0, chai_1.expect)(labelProvider.getIcon(files_1.FileStat.dir('file:///home/test'))).eq(labelProvider.defaultFolderIcon);
        });
        it('should return file icon from a file FileStat', async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            stubs.push(sinon.stub(label_provider_1.DefaultUriLabelProviderContribution.prototype, 'getFileIcon').returns(undefined));
            (0, chai_1.expect)(labelProvider.getIcon(files_1.FileStat.file('file:///home/test'))).eq(labelProvider.defaultFileIcon);
        });
        it('should return what getFileIcon() returns from a URI or non-folder FileStat, if getFileIcon() does not return null or undefined', async () => {
            const ret = 'TestString';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            stubs.push(sinon.stub(label_provider_1.DefaultUriLabelProviderContribution.prototype, 'getFileIcon').returns(ret));
            (0, chai_1.expect)(labelProvider.getIcon(new uri_1.default('file:///home/test'))).eq(ret);
            (0, chai_1.expect)(labelProvider.getIcon(files_1.FileStat.file('file:///home/test'))).eq(ret);
        });
        it('should return the default folder icon for a URI or file stat that corresponds to a workspace root', () => {
            (0, chai_1.expect)(labelProvider.getIcon(new uri_1.default('file:///workspace'))).eq(labelProvider.defaultFolderIcon);
            (0, chai_1.expect)(labelProvider.getIcon(files_1.FileStat.dir('file:///workspace'))).eq(labelProvider.defaultFolderIcon);
        });
    });
    describe('getName()', () => {
        it('should return the display name of a file from its URI', () => {
            const file = new uri_1.default('file:///workspace-2/jacques.doc');
            const name = labelProvider.getName(file);
            (0, chai_1.expect)(name).eq('jacques.doc');
        });
        it('should return the display name of a file from its FileStat', () => {
            const file = files_1.FileStat.file('file:///workspace-2/jacques.doc');
            const name = labelProvider.getName(file);
            (0, chai_1.expect)(name).eq('jacques.doc');
        });
    });
    describe('getLongName()', () => {
        it('should return the path of a file relative to the workspace from the file\'s URI if the file is in the workspace', () => {
            const file = new uri_1.default('file:///workspace/some/very-long/path.js');
            const longName = labelProvider.getLongName(file);
            (0, chai_1.expect)(longName).eq('some/very-long/path.js');
        });
        it('should return the path of a file relative to the workspace from the file\'s FileStat if the file is in the workspace', () => {
            const file = files_1.FileStat.file('file:///workspace/some/very-long/path.js');
            const longName = labelProvider.getLongName(file);
            (0, chai_1.expect)(longName).eq('some/very-long/path.js');
        });
        it('should return the absolute path of a file from the file\'s URI if the file is not in the workspace', () => {
            const file = new uri_1.default('file:///tmp/prout.txt');
            const longName = labelProvider.getLongName(file);
            if (os_1.OS.backend.isWindows) {
                (0, chai_1.expect)(longName).eq('\\tmp\\prout.txt');
            }
            else {
                (0, chai_1.expect)(longName).eq('/tmp/prout.txt');
            }
        });
        it('should return the absolute path of a file from the file\'s FileStat if the file is not in the workspace', () => {
            const file = files_1.FileStat.file('file:///tmp/prout.txt');
            const longName = labelProvider.getLongName(file);
            if (os_1.OS.backend.isWindows) {
                (0, chai_1.expect)(longName).eq('\\tmp\\prout.txt');
            }
            else {
                (0, chai_1.expect)(longName).eq('/tmp/prout.txt');
            }
        });
        it('should return the path of a file if WorkspaceService returns no roots', () => {
            roots = [];
            const file = new uri_1.default('file:///tmp/prout.txt');
            const longName = labelProvider.getLongName(file);
            if (os_1.OS.backend.isWindows) {
                (0, chai_1.expect)(longName).eq('\\tmp\\prout.txt');
            }
            else {
                (0, chai_1.expect)(longName).eq('/tmp/prout.txt');
            }
        });
    });
});
//# sourceMappingURL=workspace-uri-contribution.spec.js.map