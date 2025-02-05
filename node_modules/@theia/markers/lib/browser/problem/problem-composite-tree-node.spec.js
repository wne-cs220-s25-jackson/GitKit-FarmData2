"use strict";
// *****************************************************************************
// Copyright (C) 2021 EclipseSource and others.
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
const problem_composite_tree_node_1 = require("./problem-composite-tree-node");
disableJSDOM();
let rootNode;
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
});
beforeEach(() => {
    rootNode = getRootNode('theia-problem-marker-widget');
});
after(() => {
    disableJSDOM();
});
describe('problem-composite-tree-node', () => {
    describe('#sortMarkersInfo', () => {
        describe('should sort markersInfo based on the highest severity', () => {
            function testSeveritySorting(high, low) {
                const highMarker = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, high);
                const lowMarker = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, low);
                const highNode = createMockMarkerNode(highMarker);
                const lowNode = createMockMarkerNode(lowMarker);
                const highMarkerNode = createMarkerInfo('1', new uri_1.default('a'), [highNode]);
                const lowMarkerNode = createMarkerInfo('2', new uri_1.default('b'), [lowNode]);
                const highFirstRoot = getRootNode('highFirstRoot');
                problem_composite_tree_node_1.ProblemCompositeTreeNode.addChildren(highFirstRoot, [
                    { node: highMarkerNode, markers: [highMarker] },
                    { node: lowMarkerNode, markers: [lowMarker] },
                ]);
                expectCorrectOrdering(highFirstRoot);
                const lowFirstRoot = getRootNode('lowFirstRoot');
                problem_composite_tree_node_1.ProblemCompositeTreeNode.addChildren(lowFirstRoot, [
                    { node: lowMarkerNode, markers: [lowMarker] },
                    { node: highMarkerNode, markers: [highMarker] },
                ]);
                expectCorrectOrdering(lowFirstRoot);
                function expectCorrectOrdering(root) {
                    (0, chai_1.expect)(root.children.length).to.equal(2);
                    (0, chai_1.expect)(root.children[0]).to.equal(highMarkerNode);
                    (0, chai_1.expect)(highMarkerNode.nextSibling).to.equal(lowMarkerNode);
                    (0, chai_1.expect)(root.children[1]).to.equal(lowMarkerNode);
                    (0, chai_1.expect)(lowMarkerNode.previousSibling).to.equal(highMarkerNode);
                }
            }
            it('should sort error higher than warnings', () => {
                testSeveritySorting(vscode_languageserver_protocol_1.DiagnosticSeverity.Error, vscode_languageserver_protocol_1.DiagnosticSeverity.Warning);
            });
            it('should sort errors higher than infos', () => {
                testSeveritySorting(vscode_languageserver_protocol_1.DiagnosticSeverity.Error, vscode_languageserver_protocol_1.DiagnosticSeverity.Information);
            });
            it('should sort errors higher than hints', () => {
                testSeveritySorting(vscode_languageserver_protocol_1.DiagnosticSeverity.Error, vscode_languageserver_protocol_1.DiagnosticSeverity.Hint);
            });
            it('should sort warnings higher than infos', () => {
                testSeveritySorting(vscode_languageserver_protocol_1.DiagnosticSeverity.Warning, vscode_languageserver_protocol_1.DiagnosticSeverity.Information);
            });
            it('should sort warnings higher than hints', () => {
                testSeveritySorting(vscode_languageserver_protocol_1.DiagnosticSeverity.Warning, vscode_languageserver_protocol_1.DiagnosticSeverity.Hint);
            });
            it('should sort infos higher than hints', () => {
                testSeveritySorting(vscode_languageserver_protocol_1.DiagnosticSeverity.Information, vscode_languageserver_protocol_1.DiagnosticSeverity.Hint);
            });
        });
        it('should sort markersInfo based on URI if severities are equal', () => {
            const markerA = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error);
            const markerB = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error);
            const nodeA = createMockMarkerNode(markerA);
            const nodeB = createMockMarkerNode(markerB);
            const markerInfoNodeA = createMarkerInfo('1', new uri_1.default('a'), [nodeA]);
            const markerInfoNodeB = createMarkerInfo('2', new uri_1.default('b'), [nodeB]);
            problem_composite_tree_node_1.ProblemCompositeTreeNode.addChildren(rootNode, [
                { node: markerInfoNodeA, markers: [markerA] },
                { node: markerInfoNodeB, markers: [markerB] },
            ]);
            (0, chai_1.expect)(rootNode.children.length).to.equal(2);
            (0, chai_1.expect)(rootNode.children[0]).to.equal(markerInfoNodeA);
            (0, chai_1.expect)(markerInfoNodeA.nextSibling).to.equal(markerInfoNodeB);
            (0, chai_1.expect)(rootNode.children[1]).to.equal(markerInfoNodeB);
            (0, chai_1.expect)(markerInfoNodeB.previousSibling).to.equal(markerInfoNodeA);
        });
        it('changing marker content should lead to update in ProblemCompositeTree', () => {
            const markerA = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error);
            const nodeA = createMockMarkerNode(markerA);
            const markerInfoNodeA = createMarkerInfo('1', new uri_1.default('a'), [nodeA]);
            problem_composite_tree_node_1.ProblemCompositeTreeNode.addChildren(rootNode, [
                { node: markerInfoNodeA, markers: [markerA] }
            ]);
            markerA.data.severity = vscode_languageserver_protocol_1.DiagnosticSeverity.Hint;
            problem_composite_tree_node_1.ProblemCompositeTreeNode.addChildren(rootNode, [
                { node: markerInfoNodeA, markers: [markerA] }
            ]);
            (0, chai_1.expect)(rootNode.children.length).to.equal(1);
            (0, chai_1.expect)(rootNode.children[0]).to.equal(markerInfoNodeA);
        });
        it('changing marker content from error to hint should lead to lower rank', () => {
            const markerA = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error);
            const nodeA = createMockMarkerNode(markerA);
            const markerInfoNodeA = createMarkerInfo('1', new uri_1.default('a'), [nodeA]);
            problem_composite_tree_node_1.ProblemCompositeTreeNode.addChildren(rootNode, [
                { node: markerInfoNodeA, markers: [markerA] }
            ]);
            const markerB = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error);
            const nodeB = createMockMarkerNode(markerB);
            const markerInfoNodeB = createMarkerInfo('2', new uri_1.default('b'), [nodeB]);
            problem_composite_tree_node_1.ProblemCompositeTreeNode.addChildren(rootNode, [
                { node: markerInfoNodeB, markers: [markerB] }
            ]);
            markerA.data.severity = vscode_languageserver_protocol_1.DiagnosticSeverity.Hint;
            problem_composite_tree_node_1.ProblemCompositeTreeNode.addChildren(rootNode, [
                { node: markerInfoNodeA, markers: [markerA] }
            ]);
            (0, chai_1.expect)(rootNode.children.length).to.equal(2);
            (0, chai_1.expect)(rootNode.children[0]).to.equal(markerInfoNodeB);
            (0, chai_1.expect)(markerInfoNodeB.nextSibling).to.equal(markerInfoNodeA);
            (0, chai_1.expect)(rootNode.children[1]).to.equal(markerInfoNodeA);
            (0, chai_1.expect)(markerInfoNodeA.previousSibling).to.equal(markerInfoNodeB);
        });
        it('changing marker content from error to hint should lead to higher rank', () => {
            const markerA = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Hint);
            const nodeA = createMockMarkerNode(markerA);
            const markerInfoNodeA = createMarkerInfo('1', new uri_1.default('a'), [nodeA]);
            problem_composite_tree_node_1.ProblemCompositeTreeNode.addChildren(rootNode, [
                { node: markerInfoNodeA, markers: [markerA] }
            ]);
            const markerB = createMockMarker({ start: { line: 0, character: 10 }, end: { line: 0, character: 10 } }, vscode_languageserver_protocol_1.DiagnosticSeverity.Error);
            const nodeB = createMockMarkerNode(markerB);
            const markerInfoNodeB = createMarkerInfo('2', new uri_1.default('b'), [nodeB]);
            problem_composite_tree_node_1.ProblemCompositeTreeNode.addChildren(rootNode, [
                { node: markerInfoNodeB, markers: [markerB] }
            ]);
            markerA.data.severity = vscode_languageserver_protocol_1.DiagnosticSeverity.Error;
            problem_composite_tree_node_1.ProblemCompositeTreeNode.addChildren(rootNode, [
                { node: markerInfoNodeA, markers: [markerA] }
            ]);
            (0, chai_1.expect)(rootNode.children.length).to.equal(2);
            (0, chai_1.expect)(rootNode.children[0]).to.equal(markerInfoNodeA);
            (0, chai_1.expect)(markerInfoNodeA.nextSibling).to.equal(markerInfoNodeB);
            (0, chai_1.expect)(rootNode.children[1]).to.equal(markerInfoNodeB);
            (0, chai_1.expect)(markerInfoNodeB.previousSibling).to.equal(markerInfoNodeA);
        });
    });
});
function createMarkerInfo(id, uri, marker) {
    return {
        children: marker ? marker : [],
        expanded: true,
        uri,
        id,
        parent: rootNode,
        selected: false,
        numberOfMarkers: marker ? marker.length : 0
    };
}
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
function getRootNode(id) {
    return {
        visible: false,
        id: id,
        name: 'MarkerTree',
        kind: 'problem',
        children: [],
        parent: undefined
    };
}
//# sourceMappingURL=problem-composite-tree-node.spec.js.map