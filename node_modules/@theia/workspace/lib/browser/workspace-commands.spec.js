"use strict";
// *****************************************************************************
// Copyright (C) 2021 Ericsson and others.
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
const chai_1 = require("chai");
const uri_1 = require("@theia/core/lib/common/uri");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/filesystem/lib/browser");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
const browser_2 = require("@theia/core/lib/browser");
const common_1 = require("@theia/core/lib/common");
const selection_service_1 = require("@theia/core/lib/common/selection-service");
const workspace_commands_1 = require("./workspace-commands");
const workspace_compare_handler_1 = require("./workspace-compare-handler");
const workspace_delete_handler_1 = require("./workspace-delete-handler");
const workspace_duplicate_handler_1 = require("./workspace-duplicate-handler");
const workspace_preferences_1 = require("./workspace-preferences");
const workspace_service_1 = require("./workspace-service");
const application_protocol_1 = require("@theia/core/lib/common/application-protocol");
const clipboard_service_1 = require("@theia/core/lib/browser/clipboard-service");
disableJSDOM();
describe('workspace-commands', () => {
    let commands;
    const childStat = {
        isFile: true,
        isDirectory: false,
        isSymbolicLink: false,
        isReadonly: false,
        resource: new uri_1.default('foo/bar'),
        name: 'bar',
    };
    const parent = {
        isFile: false,
        isDirectory: true,
        isSymbolicLink: false,
        isReadonly: false,
        resource: new uri_1.default('foo'),
        name: 'foo',
        children: [
            childStat
        ]
    };
    before(() => disableJSDOM = (0, jsdom_1.enableJSDOM)());
    after(() => disableJSDOM());
    beforeEach(() => {
        const container = new inversify_1.Container();
        container.bind(browser_1.FileDialogService).toConstantValue({});
        container.bind(file_service_1.FileService).toConstantValue({
            async exists(resource) {
                return resource.path.base.includes('bar'); // 'bar' exists for test purposes.
            }
        });
        container.bind(browser_2.FrontendApplication).toConstantValue({});
        container.bind(browser_2.LabelProvider).toConstantValue({});
        container.bind(common_1.MessageService).toConstantValue({});
        container.bind(browser_2.OpenerService).toConstantValue({});
        container.bind(selection_service_1.SelectionService).toConstantValue({});
        container.bind(workspace_commands_1.WorkspaceCommandContribution).toSelf().inSingletonScope();
        container.bind(workspace_compare_handler_1.WorkspaceCompareHandler).toConstantValue({});
        container.bind(workspace_delete_handler_1.WorkspaceDeleteHandler).toConstantValue({});
        container.bind(workspace_duplicate_handler_1.WorkspaceDuplicateHandler).toConstantValue({});
        container.bind(workspace_preferences_1.WorkspacePreferences).toConstantValue({});
        container.bind(workspace_service_1.WorkspaceService).toConstantValue({});
        container.bind(clipboard_service_1.ClipboardService).toConstantValue({});
        container.bind(application_protocol_1.ApplicationServer).toConstantValue({
            getBackendOS() {
                return Promise.resolve(common_1.OS.type());
            }
        });
        commands = container.get(workspace_commands_1.WorkspaceCommandContribution);
    });
    describe('#validateFileName', () => {
        it('should not validate an empty file name', async () => {
            const message = await commands['validateFileName']('', parent);
            (0, chai_1.expect)(message).to.equal('');
        });
        it('should accept the resource does not exist', async () => {
            const message = await commands['validateFileName']('a.ts', parent);
            (0, chai_1.expect)(message).to.equal('');
        });
        it('should not accept if the resource exists', async () => {
            const message = await commands['validateFileName']('bar', parent);
            (0, chai_1.expect)(message).to.not.equal(''); // a non empty message indicates an error.
        });
        it('should not accept invalid filenames', async () => {
            let message = await commands['validateFileName']('.', parent, true); // invalid filename.
            (0, chai_1.expect)(message).to.not.equal('');
            message = await commands['validateFileName']('/a', parent, true); // invalid starts-with `\`.
            (0, chai_1.expect)(message).to.not.equal('');
            message = await commands['validateFileName'](' a', parent, true); // invalid leading whitespace.
            (0, chai_1.expect)(message).to.not.equal('');
            message = await commands['validateFileName']('a ', parent, true); // invalid trailing whitespace.
            (0, chai_1.expect)(message).to.not.equal('');
        });
    });
    describe('#validateFileRename', () => {
        it('should accept if the resource exists case-insensitively', async () => {
            const oldName = 'bar';
            const newName = 'Bar';
            const message = await commands['validateFileRename'](oldName, newName, parent);
            (0, chai_1.expect)(message).to.equal('');
        });
        it('should accept if the resource does not exist case-insensitively', async () => {
            const oldName = 'bar';
            const newName = 'foo';
            const message = await commands['validateFileRename'](oldName, newName, parent);
            (0, chai_1.expect)(message).to.equal('');
        });
    });
});
//# sourceMappingURL=workspace-commands.spec.js.map