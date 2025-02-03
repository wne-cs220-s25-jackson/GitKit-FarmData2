"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
let disableJSDOM = (0, jsdom_1.enableJSDOM)();
const frontend_application_config_provider_1 = require("@theia/core/lib/browser/frontend-application-config-provider");
frontend_application_config_provider_1.FrontendApplicationConfigProvider.set({});
const uri_1 = require("@theia/core/lib/common/uri");
const chai_1 = require("chai");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common");
const browser_1 = require("@theia/core/lib/browser");
const marker_tree_label_provider_1 = require("./marker-tree-label-provider");
const tree_label_provider_1 = require("@theia/core/lib/browser/tree/tree-label-provider");
const browser_2 = require("@theia/workspace/lib/browser");
const workspace_uri_contribution_1 = require("@theia/workspace/lib/browser/workspace-uri-contribution");
const workspace_variable_contribution_1 = require("@theia/workspace/lib/browser/workspace-variable-contribution");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
const files_1 = require("@theia/filesystem/lib/common/files");
const env_variables_1 = require("@theia/core/lib/common/env-variables");
const mock_env_variables_server_1 = require("@theia/core/lib/browser/test/mock-env-variables-server");
const node_1 = require("@theia/core/lib/node");
const os_1 = require("@theia/core/lib/common/os");
const temp = require("temp");
disableJSDOM();
let markerTreeLabelProvider;
let workspaceService;
before(() => {
    disableJSDOM = (0, jsdom_1.enableJSDOM)();
    const testContainer = new inversify_1.Container();
    workspaceService = new browser_2.WorkspaceService();
    testContainer.bind(browser_2.WorkspaceService).toConstantValue(workspaceService);
    testContainer.bind(workspace_variable_contribution_1.WorkspaceVariableContribution).toSelf().inSingletonScope();
    testContainer.bind(browser_1.ApplicationShell).toConstantValue({
        onDidChangeCurrentWidget: () => undefined,
        widgets: []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    });
    testContainer.bind(browser_1.WidgetManager).toConstantValue({
        onDidCreateWidget: common_1.Event.None
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    });
    testContainer.bind(file_service_1.FileService).toConstantValue({});
    testContainer.bind(browser_1.DefaultUriLabelProviderContribution).toSelf().inSingletonScope();
    testContainer.bind(workspace_uri_contribution_1.WorkspaceUriLabelProviderContribution).toSelf().inSingletonScope();
    testContainer.bind(browser_1.LabelProvider).toSelf().inSingletonScope();
    testContainer.bind(marker_tree_label_provider_1.MarkerTreeLabelProvider).toSelf().inSingletonScope();
    testContainer.bind(tree_label_provider_1.TreeLabelProvider).toSelf().inSingletonScope();
    testContainer.bind(env_variables_1.EnvVariablesServer).toConstantValue(new mock_env_variables_server_1.MockEnvVariablesServerImpl(node_1.FileUri.create(temp.track().mkdirSync())));
    testContainer.bind(common_1.ContributionProvider).toDynamicValue(ctx => ({
        getContributions() {
            return [
                ctx.container.get(marker_tree_label_provider_1.MarkerTreeLabelProvider),
                ctx.container.get(tree_label_provider_1.TreeLabelProvider),
                ctx.container.get(workspace_uri_contribution_1.WorkspaceUriLabelProviderContribution),
                ctx.container.get(browser_1.DefaultUriLabelProviderContribution)
            ];
        }
    })).inSingletonScope();
    markerTreeLabelProvider = testContainer.get(marker_tree_label_provider_1.MarkerTreeLabelProvider);
    workspaceService = testContainer.get(browser_2.WorkspaceService);
});
after(() => {
    disableJSDOM();
});
describe('Marker Tree Label Provider', () => {
    describe('#getName', () => {
        it('should return the correct filename and extension', () => {
            const label = markerTreeLabelProvider.getName(createMarkerInfoNode('a/b/c/foo.ts'));
            (0, chai_1.expect)(label).equals('foo.ts');
        });
    });
    describe('getLongName', () => {
        describe('single-root workspace', () => {
            beforeEach(() => {
                const root = files_1.FileStat.dir('file:///home/a');
                workspaceService['_workspace'] = root;
                workspaceService['_roots'] = [root];
            });
            it('should return the proper label for a directory', () => {
                const label = markerTreeLabelProvider.getLongName(createMarkerInfoNode('file:///home/a/b/c/foo.ts'));
                (0, chai_1.expect)(label).equals('b/c');
            });
            it('should return the proper label for a directory starting with \'.\'', () => {
                const label = markerTreeLabelProvider.getLongName(createMarkerInfoNode('file:///home/a/b/.c/foo.ts'));
                (0, chai_1.expect)(label).equals('b/.c');
            });
            it('should return the proper label when the resource is located at the workspace root', () => {
                const label = markerTreeLabelProvider.getLongName(createMarkerInfoNode('file:///home/a/foo.ts'));
                (0, chai_1.expect)(label).equals('');
            });
            it('should return the full path when the resource does not exist in the workspace root', () => {
                const label = markerTreeLabelProvider.getLongName(createMarkerInfoNode('file:///home/b/foo.ts'));
                if (os_1.OS.backend.isWindows) {
                    (0, chai_1.expect)(label).eq('\\home\\b');
                }
                else {
                    (0, chai_1.expect)(label).eq('/home/b');
                }
            });
        });
        describe('multi-root workspace', () => {
            beforeEach(() => {
                const uri = 'file:///file';
                const file = files_1.FileStat.file(uri);
                const root1 = files_1.FileStat.dir('file:///root1');
                const root2 = files_1.FileStat.dir('file:///root2');
                workspaceService['_workspace'] = file;
                workspaceService['_roots'] = [root1, root2];
            });
            it('should return the proper root \'root1\' and directory', () => {
                const label = markerTreeLabelProvider.getLongName(createMarkerInfoNode('file:///root1/foo/foo.ts'));
                (0, chai_1.expect)(label).equals('root1 ● foo');
            });
            it('should return the proper root \'root2\' and directory', () => {
                const label = markerTreeLabelProvider.getLongName(createMarkerInfoNode('file:///root2/foo/foo.ts'));
                (0, chai_1.expect)(label).equals('root2 ● foo');
            });
            it('should only return the root when the resource is located at the workspace root', () => {
                const label = markerTreeLabelProvider.getLongName(createMarkerInfoNode('file:///root1/foo.ts'));
                (0, chai_1.expect)(label).equals('root1');
            });
            it('should return the full path when the resource does not exist in any workspace root', () => {
                const label = markerTreeLabelProvider.getLongName(createMarkerInfoNode('file:///home/a/b/foo.ts'));
                if (os_1.OS.backend.isWindows) {
                    (0, chai_1.expect)(label).eq('\\home\\a\\b');
                }
                else {
                    (0, chai_1.expect)(label).eq('/home/a/b');
                }
            });
        });
    });
    describe('#getIcon', () => {
        it('should return a typescript icon for a typescript file', () => {
            const icon = markerTreeLabelProvider.getIcon(createMarkerInfoNode('a/b/c/foo.ts'));
            (0, chai_1.expect)(icon).contain('ts-icon');
        });
        it('should return a json icon for a json file', () => {
            const icon = markerTreeLabelProvider.getIcon(createMarkerInfoNode('a/b/c/foo.json'));
            (0, chai_1.expect)(icon).contain('database-icon');
        });
        it('should return a generic icon for a file with no extension', () => {
            const icon = markerTreeLabelProvider.getIcon(createMarkerInfoNode('a/b/c/foo.md'));
            (0, chai_1.expect)(icon).contain('markdown-icon');
        });
    });
    describe('#getDescription', () => {
        beforeEach(() => {
            const root = files_1.FileStat.dir('file:///home/a');
            workspaceService['_workspace'] = root;
            workspaceService['_roots'] = [root];
        });
        it('should return the parent\' long name', () => {
            const label = markerTreeLabelProvider.getDescription(createMarkerInfoNode('file:///home/a/b/c/foo.ts'));
            (0, chai_1.expect)(label).equals('b/c');
        });
    });
    describe('#canHandle', () => {
        it('should successfully handle \'MarkerInfoNodes\'', () => {
            const node = createMarkerInfoNode('a/b/c/foo.ts');
            (0, chai_1.expect)(markerTreeLabelProvider.canHandle(node)).greaterThan(0);
        });
    });
});
/**
 * Create a marker info node for test purposes.
 * @param uri the marker uri.
 *
 * @returns a mock marker info node.
 */
function createMarkerInfoNode(uri) {
    return {
        id: 'id',
        parent: {
            id: 'parent-id',
            kind: '',
            parent: undefined,
            children: []
        },
        numberOfMarkers: 1,
        children: [],
        expanded: true,
        selected: true,
        uri: new uri_1.default(uri)
    };
}
//# sourceMappingURL=marker-tree-label-provider.spec.js.map