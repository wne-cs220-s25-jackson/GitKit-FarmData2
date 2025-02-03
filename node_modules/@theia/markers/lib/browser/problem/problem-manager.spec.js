"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
const chai = require("chai");
const uri_1 = require("@theia/core/lib/common/uri");
const inversify_1 = require("@theia/core/shared/inversify");
const problem_manager_1 = require("./problem-manager");
const event_1 = require("@theia/core/lib/common/event");
const logger_1 = require("@theia/core/lib/common/logger");
const vscode_languageserver_protocol_1 = require("@theia/core/shared/vscode-languageserver-protocol");
const mock_logger_1 = require("@theia/core/lib/common/test/mock-logger");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
const storage_service_1 = require("@theia/core/lib/browser/storage-service");
disableJSDOM();
const expect = chai.expect;
let manager;
let container;
/**
 * The default range for test purposes.
 */
const range = { start: { line: 0, character: 10 }, end: { line: 0, character: 10 } };
describe('problem-manager', () => {
    beforeEach(() => {
        container = new inversify_1.Container();
        container.bind(logger_1.ILogger).to(mock_logger_1.MockLogger);
        container.bind(storage_service_1.StorageService).to(storage_service_1.LocalStorageService).inSingletonScope();
        container.bind(storage_service_1.LocalStorageService).toSelf().inSingletonScope();
        container.bind(file_service_1.FileService).toConstantValue({
            onDidFilesChange: event_1.Event.None
        });
        container.bind(problem_manager_1.ProblemManager).toSelf();
        manager = container.get(problem_manager_1.ProblemManager);
    });
    describe('#setMarkers', () => {
        it('should successfully set new markers', () => {
            expect(Array.from(manager.getUris()).length).to.equal(0);
            manager.setMarkers(new uri_1.default('a'), 'a', [{ message: 'a', range }]);
            expect(Array.from(manager.getUris()).length).to.equal(1);
        });
        it('should replace markers', () => {
            const uri = new uri_1.default('a');
            let events = 0;
            manager.onDidChangeMarkers(() => events++);
            expect(events).equal(0);
            const initial = manager.setMarkers(uri, 'a', [{ message: 'a', range }]);
            expect(initial.length).equal(0);
            expect(events).equal(1);
            const updated = manager.setMarkers(uri, 'a', [{ message: 'a', range }]);
            expect(updated.length).equal(1);
            expect(events).equal(2);
            expect(manager.findMarkers({ uri }).length).equal(1);
        });
    });
    describe('#cleanAllMarkers', () => {
        it('should successfully clean all markers', () => {
            // Create mock markers.
            manager.setMarkers(new uri_1.default('a'), 'a', [{ message: 'a', range }]);
            manager.setMarkers(new uri_1.default('b'), 'b', [{ message: 'a', range }]);
            manager.setMarkers(new uri_1.default('c'), 'c', [{ message: 'a', range }]);
            expect(Array.from(manager.getUris()).length).to.equal(3);
            // Clean the markers.
            manager.cleanAllMarkers();
            expect(Array.from(manager.getUris()).length).to.equal(0);
        });
    });
    describe('#findMarkers', () => {
        it('should find markers by `owner`', () => {
            const owner = 'foo';
            manager.setMarkers(new uri_1.default('a'), owner, [{ message: 'a', range }]);
            manager.setMarkers(new uri_1.default('b'), owner, [{ message: 'a', range }]);
            expect(manager.findMarkers({ owner }).length).equal(2);
            expect(manager.findMarkers({ owner: 'unknown' }).length).equal(0);
        });
        it('should find markers by `owner` and `uri`', () => {
            const owner = 'foo';
            const uri = new uri_1.default('bar');
            // Create a marker to match the filter.
            manager.setMarkers(uri, owner, [{ message: 'a', range }]);
            // Create 2 markers that do not match the filter.
            manager.setMarkers(new uri_1.default('invalid'), 'invalid-owner', [{ message: 'a', range }]);
            manager.setMarkers(new uri_1.default('invalid'), 'invalid-owner', [{ message: 'a', range }]);
            // Expect to find the markers which satisfy the filter only.
            expect(manager.findMarkers({ owner, uri }).length).equal(1);
        });
        describe('dataFilter', () => {
            it('should find markers that satisfy filter for `severity`', () => {
                manager.setMarkers(new uri_1.default('a'), 'a', [{ message: 'a', range, severity: vscode_languageserver_protocol_1.DiagnosticSeverity.Error }]);
                expect(manager.findMarkers({ dataFilter: d => d.severity === vscode_languageserver_protocol_1.DiagnosticSeverity.Error }).length).equal(1);
                expect(manager.findMarkers({ dataFilter: d => d.severity !== vscode_languageserver_protocol_1.DiagnosticSeverity.Error }).length).equal(0);
            });
            it('should find markers that satisfy filter for `code`', () => {
                const code = 100;
                manager.setMarkers(new uri_1.default('a'), 'a', [{ message: 'a', range, code }]);
                expect(manager.findMarkers({ dataFilter: d => d.code === code }).length).equal(1);
                expect(manager.findMarkers({ dataFilter: d => d.code !== code }).length).equal(0);
            });
            it('should find markers that satisfy filter for `message`', () => {
                const message = 'foo';
                manager.setMarkers(new uri_1.default('a'), 'a', [{ message, range }]);
                expect(manager.findMarkers({ dataFilter: d => d.message === message }).length).equal(1);
                expect(manager.findMarkers({ dataFilter: d => d.message !== message }).length).equal(0);
            });
            it('should find markers that satisfy filter for `source`', () => {
                const source = 'typescript';
                manager.setMarkers(new uri_1.default('a'), 'a', [{ message: 'a', range, source }]);
                expect(manager.findMarkers({ dataFilter: d => d.source === source }).length).equal(1);
                expect(manager.findMarkers({ dataFilter: d => d.source !== source }).length).equal(0);
            });
            it('should find markers that satisfy filter for `range`', () => {
                manager.setMarkers(new uri_1.default('a'), 'a', [{ message: 'a', range }]);
                // The default `range` has a start line number of 0.
                expect(manager.findMarkers({ dataFilter: d => d.range.start.line === 0 }).length).equal(1);
                expect(manager.findMarkers({ dataFilter: d => d.range.start.line > 0 }).length).equal(0);
            });
        });
    });
    describe('#getUris', () => {
        it('should return 0 uris when no markers are present', () => {
            expect(Array.from(manager.getUris()).length).to.equal(0);
        });
        it('should return the list of uris', () => {
            manager.setMarkers(new uri_1.default('a'), 'a', [{ message: 'a', range, severity: vscode_languageserver_protocol_1.DiagnosticSeverity.Error }]);
            manager.setMarkers(new uri_1.default('b'), 'b', [{ message: 'a', range, severity: vscode_languageserver_protocol_1.DiagnosticSeverity.Error }]);
            expect(Array.from(manager.getUris()).length).to.equal(2);
        });
    });
    describe('#getProblemStat', () => {
        it('should return 0 stats when no markers are present', () => {
            const { errors, warnings, infos } = manager.getProblemStat();
            expect(errors).to.equal(0);
            expect(warnings).to.equal(0);
            expect(infos).to.equal(0);
        });
        it('should return the proper problem stats', () => {
            // Create 3 error markers.
            manager.setMarkers(new uri_1.default('error-1'), 'error-1', [{ message: 'a', range, severity: vscode_languageserver_protocol_1.DiagnosticSeverity.Error }]);
            manager.setMarkers(new uri_1.default('error-2'), 'error-2', [{ message: 'a', range, severity: vscode_languageserver_protocol_1.DiagnosticSeverity.Error }]);
            manager.setMarkers(new uri_1.default('error-3'), 'error-3', [{ message: 'a', range, severity: vscode_languageserver_protocol_1.DiagnosticSeverity.Error }]);
            // Create 2 warning markers.
            manager.setMarkers(new uri_1.default('warning-1'), 'warning-1', [{ message: 'a', range, severity: vscode_languageserver_protocol_1.DiagnosticSeverity.Warning }]);
            manager.setMarkers(new uri_1.default('warning-2'), 'warning-2', [{ message: 'a', range, severity: vscode_languageserver_protocol_1.DiagnosticSeverity.Warning }]);
            // Create 1 info marker.
            manager.setMarkers(new uri_1.default('info-1'), 'info-1', [{ message: 'a', range, severity: vscode_languageserver_protocol_1.DiagnosticSeverity.Information }]);
            // Collect the total problem stats for the application.
            const { errors, warnings, infos } = manager.getProblemStat();
            expect(errors).to.equal(3);
            expect(warnings).to.equal(2);
            expect(infos).to.equal(1);
        });
    });
});
//# sourceMappingURL=problem-manager.spec.js.map