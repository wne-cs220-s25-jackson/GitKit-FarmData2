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
const vscode_languageserver_protocol_1 = require("@theia/core/shared/vscode-languageserver-protocol");
const event_1 = require("@theia/core/lib/common/event");
const marker_manager_1 = require("../marker-manager");
const marker_tree_1 = require("../marker-tree");
const problem_container_1 = require("./problem-container");
const problem_manager_1 = require("./problem-manager");
const problem_tree_model_1 = require("./problem-tree-model");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
disableJSDOM();
let problemTree;
before(() => {
    disableJSDOM = (0, jsdom_1.enableJSDOM)();
    const testContainer = new inversify_1.Container();
    testContainer.bind(marker_manager_1.MarkerManager).toSelf().inSingletonScope();
    testContainer.bind(problem_manager_1.ProblemManager).toSelf();
    testContainer.bind(marker_tree_1.MarkerOptions).toConstantValue(problem_container_1.PROBLEM_OPTIONS);
    testContainer.bind(file_service_1.FileService).toConstantValue({
        onDidFilesChange: event_1.Event.None
    });
    testContainer.bind(problem_tree_model_1.ProblemTree).toSelf().inSingletonScope();
    problemTree = testContainer.get(problem_tree_model_1.ProblemTree);
});
after(() => {
    disableJSDOM();
});
describe('Problem Tree', () => {
    describe('#sortMarkers', () => {
        describe('should sort markers based on the highest severity', () => {
            it('should sort errors higher than warnings', () => {
                const markerA = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error);
                const markerB = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Warning);
                const nodeA = createMockMarkerNode(markerA);
                const nodeB = createMockMarkerNode(markerB);
                (0, chai_1.expect)(problemTree['sortMarkers'](nodeA, nodeB)).equals(-1);
                (0, chai_1.expect)(problemTree['sortMarkers'](nodeB, nodeA)).equals(1);
            });
            it('should sort errors higher than infos', () => {
                const markerA = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error);
                const markerB = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Information);
                const nodeA = createMockMarkerNode(markerA);
                const nodeB = createMockMarkerNode(markerB);
                (0, chai_1.expect)(problemTree['sortMarkers'](nodeA, nodeB)).equals(-2);
                (0, chai_1.expect)(problemTree['sortMarkers'](nodeB, nodeA)).equals(2);
            });
            it('should sort errors higher than hints', () => {
                const markerA = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error);
                const markerB = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Hint);
                const nodeA = createMockMarkerNode(markerA);
                const nodeB = createMockMarkerNode(markerB);
                (0, chai_1.expect)(problemTree['sortMarkers'](nodeA, nodeB)).equals(-3);
                (0, chai_1.expect)(problemTree['sortMarkers'](nodeB, nodeA)).equals(3);
            });
            it('should sort warnings higher than infos', () => {
                const markerA = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Warning);
                const markerB = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Information);
                const nodeA = createMockMarkerNode(markerA);
                const nodeB = createMockMarkerNode(markerB);
                (0, chai_1.expect)(problemTree['sortMarkers'](nodeA, nodeB)).equals(-1);
                (0, chai_1.expect)(problemTree['sortMarkers'](nodeB, nodeA)).equals(1);
            });
            it('should sort warnings higher than hints', () => {
                const markerA = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Warning);
                const markerB = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Hint);
                const nodeA = createMockMarkerNode(markerA);
                const nodeB = createMockMarkerNode(markerB);
                (0, chai_1.expect)(problemTree['sortMarkers'](nodeA, nodeB)).equals(-2);
                (0, chai_1.expect)(problemTree['sortMarkers'](nodeB, nodeA)).equals(2);
            });
            it('should sort infos higher than hints', () => {
                const markerA = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Information);
                const markerB = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Hint);
                const nodeA = createMockMarkerNode(markerA);
                const nodeB = createMockMarkerNode(markerB);
                (0, chai_1.expect)(problemTree['sortMarkers'](nodeA, nodeB)).equals(-1);
                (0, chai_1.expect)(problemTree['sortMarkers'](nodeB, nodeA)).equals(1);
            });
        });
        it('should sort markers based on lowest line number if their severities are equal', () => {
            const markerA = createMockMarker({ start: { line: 1, character: 10 }, end: { line: 1, character: 20 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error);
            const markerB = createMockMarker({ start: { line: 5, character: 10 }, end: { line: 5, character: 20 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error);
            const nodeA = createMockMarkerNode(markerA);
            const nodeB = createMockMarkerNode(markerB);
            (0, chai_1.expect)(problemTree['sortMarkers'](nodeA, nodeB)).equals(-4);
            (0, chai_1.expect)(problemTree['sortMarkers'](nodeB, nodeA)).equals(4);
        });
        it('should sort markers based on lowest column number if their severities and line numbers are equal', () => {
            const markerA = createMockMarker({ start: { line: 1, character: 10 }, end: { line: 1, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error);
            const markerB = createMockMarker({ start: { line: 1, character: 20 }, end: { line: 1, character: 20 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error);
            const nodeA = createMockMarkerNode(markerA);
            const nodeB = createMockMarkerNode(markerB);
            (0, chai_1.expect)(problemTree['sortMarkers'](nodeA, nodeB)).equals(-10);
            (0, chai_1.expect)(problemTree['sortMarkers'](nodeB, nodeA)).equals(10);
        });
        it('should sort markers based on owner if their severities, line numbers and columns are equal', () => {
            const markerA = createMockMarker({ start: { line: 1, character: 10 }, end: { line: 1, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error, 'A');
            const markerB = createMockMarker({ start: { line: 1, character: 10 }, end: { line: 1, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error, 'B');
            const nodeA = createMockMarkerNode(markerA);
            const nodeB = createMockMarkerNode(markerB);
            (0, chai_1.expect)(problemTree['sortMarkers'](nodeA, nodeB)).equals(-1);
            (0, chai_1.expect)(problemTree['sortMarkers'](nodeB, nodeA)).equals(1);
        });
        it('should not sort if markers are equal', () => {
            const markerA = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error);
            const markerB = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error);
            const nodeA = createMockMarkerNode(markerA);
            const nodeB = createMockMarkerNode(markerB);
            (0, chai_1.expect)(problemTree['sortMarkers'](nodeA, nodeB)).equals(0);
            (0, chai_1.expect)(problemTree['sortMarkers'](nodeB, nodeA)).equals(0);
        });
    });
});
/**
 * Create a mock marker node with the given diagnostic marker.
 * @param marker the diagnostic marker.
 *
 * @returns a mock marker node.
 */
function createMockMarkerNode(marker) {
    return {
        id: 'id',
        name: 'marker',
        parent: undefined,
        selected: false,
        uri: new uri_1.default(''),
        marker
    };
}
/**
 * Create a mock diagnostic marker.
 * @param range the diagnostic range.
 * @param severity the diagnostic severity.
 * @param owner the optional owner of the diagnostic
 *
 * @returns a mock diagnostic marker.
 */
function createMockMarker(range, severity, owner) {
    const data = {
        range: range,
        severity: severity,
        message: 'message'
    };
    return Object.freeze({
        uri: 'uri',
        kind: 'marker',
        owner: owner !== null && owner !== void 0 ? owner : 'owner',
        data
    });
}
//# sourceMappingURL=problem-tree-model.spec.js.map