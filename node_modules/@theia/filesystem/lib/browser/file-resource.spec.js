"use strict";
// *****************************************************************************
// Copyright (C) 2024 Toro Cloud Pty Ltd and others.
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
const core_1 = require("@theia/core");
const promise_util_1 = require("@theia/core/lib/common/promise-util");
const chai_1 = require("chai");
const sinon = require("sinon");
const files_1 = require("../common/files");
const file_resource_1 = require("./file-resource");
const file_service_1 = require("./file-service");
disableJSDOM();
describe.only('file-resource', () => {
    const sandbox = sinon.createSandbox();
    const mockEmitter = new core_1.Emitter();
    const mockOnChangeEmitter = new core_1.Emitter();
    const mockFileService = new file_service_1.FileService();
    before(() => {
        disableJSDOM = (0, jsdom_1.enableJSDOM)();
    });
    beforeEach(() => {
        sandbox.restore();
        sandbox.stub(mockFileService, 'onDidFilesChange').get(() => mockOnChangeEmitter.event);
        sandbox.stub(mockFileService, 'onDidRunOperation').returns(core_1.Disposable.NULL);
        sandbox.stub(mockFileService, 'watch').get(() => mockEmitter.event);
        sandbox.stub(mockFileService, 'onDidChangeFileSystemProviderCapabilities').get(() => mockEmitter.event);
        sandbox.stub(mockFileService, 'onDidChangeFileSystemProviderReadOnlyMessage').get(() => mockEmitter.event);
    });
    after(() => {
        disableJSDOM();
    });
    it('should save contents and not trigger change event', async () => {
        const resource = new file_resource_1.FileResource(new core_1.URI('file://test/file.txt'), mockFileService, { readOnly: false, shouldOpenAsText: () => Promise.resolve(true), shouldOverwrite: () => Promise.resolve(true) });
        const onChangeSpy = sandbox.spy();
        resource.onDidChangeContents(onChangeSpy);
        const deferred = new promise_util_1.Deferred();
        sandbox.stub(mockFileService, 'write')
            .callsFake(() => deferred.promise);
        sandbox.stub(mockFileService, 'resolve')
            .resolves({
            mtime: 1,
            ctime: 0,
            size: 0,
            etag: '',
            isFile: true,
            isDirectory: false,
            isSymbolicLink: false,
            isReadonly: false,
            name: 'file.txt',
            resource: new core_1.URI('file://test/file.txt')
        });
        resource.saveContents('test');
        await new Promise(resolve => setTimeout(resolve, 0));
        mockOnChangeEmitter.fire(new files_1.FileChangesEvent([{
                resource: new core_1.URI('file://test/file.txt'),
                type: 0 /* FileChangeType.UPDATED */
            }]));
        await new Promise(resolve => setImmediate(resolve));
        (0, chai_1.expect)(onChangeSpy.called).to.be.false;
        deferred.resolve({
            mtime: 0,
            ctime: 0,
            size: 0,
            etag: '',
            encoding: 'utf-8',
            isFile: true,
            isDirectory: false,
            isSymbolicLink: false,
            isReadonly: false,
            name: 'file.txt',
            resource: new core_1.URI('file://test/file.txt')
        });
        await new Promise(resolve => setImmediate(resolve));
        (0, chai_1.expect)(resource.version).to.deep.equal({ etag: '', mtime: 0, encoding: 'utf-8' });
    });
    it('should save content changes and not trigger change event', async () => {
        sandbox.stub(mockFileService, 'hasCapability').returns(true);
        const resource = new file_resource_1.FileResource(new core_1.URI('file://test/file.txt'), mockFileService, { readOnly: false, shouldOpenAsText: () => Promise.resolve(true), shouldOverwrite: () => Promise.resolve(true) });
        const onChangeSpy = sandbox.spy();
        resource.onDidChangeContents(onChangeSpy);
        sandbox.stub(mockFileService, 'read')
            .resolves({
            mtime: 1,
            ctime: 0,
            size: 0,
            etag: '',
            name: 'file.txt',
            resource: new core_1.URI('file://test/file.txt'),
            value: 'test',
            encoding: 'utf-8'
        });
        await resource.readContents();
        const deferred = new promise_util_1.Deferred();
        sandbox.stub(mockFileService, 'update')
            .callsFake(() => deferred.promise);
        sandbox.stub(mockFileService, 'resolve')
            .resolves({
            mtime: 1,
            ctime: 0,
            size: 0,
            etag: '',
            isFile: true,
            isDirectory: false,
            isSymbolicLink: false,
            isReadonly: false,
            name: 'file.txt',
            resource: new core_1.URI('file://test/file.txt')
        });
        resource.saveContentChanges([{
                range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
                rangeLength: 0,
                text: 'test'
            }]);
        await new Promise(resolve => setTimeout(resolve, 0));
        mockOnChangeEmitter.fire(new files_1.FileChangesEvent([{
                resource: new core_1.URI('file://test/file.txt'),
                type: 0 /* FileChangeType.UPDATED */
            }]));
        await new Promise(resolve => setImmediate(resolve));
        (0, chai_1.expect)(onChangeSpy.called).to.be.false;
        deferred.resolve({
            mtime: 0,
            ctime: 0,
            size: 0,
            etag: '',
            encoding: 'utf-8',
            isFile: true,
            isDirectory: false,
            isSymbolicLink: false,
            isReadonly: false,
            name: 'file.txt',
            resource: new core_1.URI('file://test/file.txt')
        });
        await new Promise(resolve => setImmediate(resolve));
        (0, chai_1.expect)(resource.version).to.deep.equal({ etag: '', mtime: 0, encoding: 'utf-8' });
    });
    it('should trigger change event if file is updated and not in sync', async () => {
        const resource = new file_resource_1.FileResource(new core_1.URI('file://test/file.txt'), mockFileService, { readOnly: false, shouldOpenAsText: () => Promise.resolve(true), shouldOverwrite: () => Promise.resolve(true) });
        const onChangeSpy = sandbox.spy();
        resource.onDidChangeContents(onChangeSpy);
        sandbox.stub(mockFileService, 'read')
            .resolves({
            mtime: 1,
            ctime: 0,
            size: 0,
            etag: '',
            name: 'file.txt',
            resource: new core_1.URI('file://test/file.txt'),
            value: 'test',
            encoding: 'utf-8'
        });
        await resource.readContents();
        sandbox.stub(mockFileService, 'resolve')
            .resolves({
            mtime: 2,
            ctime: 0,
            size: 0,
            etag: '',
            isFile: true,
            isDirectory: false,
            isSymbolicLink: false,
            isReadonly: false,
            name: 'file.txt',
            resource: new core_1.URI('file://test/file.txt')
        });
        mockOnChangeEmitter.fire(new files_1.FileChangesEvent([{
                resource: new core_1.URI('file://test/file.txt'),
                type: 0 /* FileChangeType.UPDATED */
            }]));
        await new Promise(resolve => setImmediate(resolve));
        (0, chai_1.expect)(onChangeSpy.called).to.be.true;
    });
});
//# sourceMappingURL=file-resource.spec.js.map