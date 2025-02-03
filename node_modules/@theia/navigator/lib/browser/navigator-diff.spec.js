"use strict";
// *****************************************************************************
// Copyright (C) 2019 David Saunders and others.
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
const frontend_application_config_provider_1 = require("@theia/core/lib/browser/frontend-application-config-provider");
frontend_application_config_provider_1.FrontendApplicationConfigProvider.set({});
const chai_1 = require("chai");
const navigator_diff_1 = require("./navigator-diff");
const path = require("path");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common");
const mock_logger_1 = require("@theia/core/lib/common/test/mock-logger");
const uri_1 = require("@theia/core/lib/common/uri");
const browser_1 = require("@theia/core/lib/browser");
const mock_opener_service_1 = require("@theia/core/lib/browser/test/mock-opener-service");
const message_service_1 = require("@theia/core/lib/common/message-service");
const message_service_protocol_1 = require("@theia/core/lib/common/message-service-protocol");
const file_uri_1 = require("@theia/core/lib/common/file-uri");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
const disk_file_system_provider_1 = require("@theia/filesystem/lib/node/disk-file-system-provider");
disableJSDOM();
let testContainer;
beforeEach(() => {
    testContainer = new inversify_1.Container();
    const module = new inversify_1.ContainerModule((bind, unbind, isBound, rebind) => {
        bind(common_1.ILogger).to(mock_logger_1.MockLogger).inSingletonScope();
        bind(common_1.SelectionService).toSelf().inSingletonScope();
        bind(navigator_diff_1.NavigatorDiff).toSelf().inSingletonScope();
        bind(browser_1.OpenerService).to(mock_opener_service_1.MockOpenerService);
        const fileService = new file_service_1.FileService();
        fileService['resourceForError'] = (resource) => resource.toString();
        fileService.registerProvider('file', new disk_file_system_provider_1.DiskFileSystemProvider());
        bind(file_service_1.FileService).toConstantValue(fileService);
        bind(message_service_1.MessageService).toSelf().inSingletonScope();
        bind(message_service_protocol_1.MessageClient).toSelf().inSingletonScope();
    });
    testContainer.load(module);
});
describe('NavigatorDiff', () => {
    it('should allow a valid first file to be added', async () => {
        const diff = testContainer.get(navigator_diff_1.NavigatorDiff);
        testContainer.get(common_1.SelectionService).selection = [{
                uri: new uri_1.default(file_uri_1.FileUri.create(path.resolve(__dirname, '../../test-resources/testFileA.json')).toString())
            }];
        const result = await diff.addFirstComparisonFile();
        (0, chai_1.expect)(result).to.be.true;
    });
    it('should reject invalid file when added', async () => {
        const diff = testContainer.get(navigator_diff_1.NavigatorDiff);
        testContainer.get(common_1.SelectionService).selection = [{
                uri: new uri_1.default(file_uri_1.FileUri.create(path.resolve(__dirname, '../../test-resources/nonExistentFile.json')).toString())
            }];
        const result = await diff.addFirstComparisonFile();
        (0, chai_1.expect)(result).to.be.false;
    });
    it('should run comparison when second file is added', done => {
        const diff = testContainer.get(navigator_diff_1.NavigatorDiff);
        testContainer.get(common_1.SelectionService).selection = [{
                uri: new uri_1.default(file_uri_1.FileUri.create(path.resolve(__dirname, '../../test-resources/testFileA.json')).toString())
            }];
        diff.addFirstComparisonFile()
            .then(result => {
            testContainer.get(common_1.SelectionService).selection = [{
                    uri: new uri_1.default(file_uri_1.FileUri.create(path.resolve(__dirname, '../../test-resources/testFileB.json')).toString())
                }];
            diff.compareFiles()
                .then(compareResult => {
                (0, chai_1.expect)(compareResult).to.be.true;
                done();
            });
        });
    });
    it('should fail to run comparison if first file not added', done => {
        const diff = testContainer.get(navigator_diff_1.NavigatorDiff);
        testContainer.get(common_1.SelectionService).selection = [{
                uri: new uri_1.default(file_uri_1.FileUri.create(path.resolve(__dirname, '../../test-resources/testFileA.json')).toString())
            }];
        diff.compareFiles()
            .then(compareResult => {
            (0, chai_1.expect)(compareResult).to.be.false;
            done();
        });
    });
});
//# sourceMappingURL=navigator-diff.spec.js.map