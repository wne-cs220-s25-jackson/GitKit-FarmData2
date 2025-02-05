"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
const jsdom_1 = require("@theia/core/lib/browser/test/jsdom");
let disableJSDOM = (0, jsdom_1.enableJSDOM)();
const chai_1 = require("chai");
const inversify_1 = require("@theia/core/shared/inversify");
const uri_1 = require("@theia/core/lib/common/uri");
const logger_1 = require("@theia/core/lib/common/logger");
const mock_logger_1 = require("@theia/core/lib/common/test/mock-logger");
const opener_service_1 = require("@theia/core/lib/browser/opener-service");
const mock_opener_service_1 = require("@theia/core/lib/browser/test/mock-opener-service");
const navigation_location_updater_1 = require("./navigation-location-updater");
const mock_navigation_location_updater_1 = require("./test/mock-navigation-location-updater");
const navigation_location_similarity_1 = require("./navigation-location-similarity");
const navigation_location_1 = require("./navigation-location");
const navigation_location_service_1 = require("./navigation-location-service");
disableJSDOM();
describe('navigation-location-service', () => {
    let stack;
    before(() => {
        disableJSDOM = (0, jsdom_1.enableJSDOM)();
    });
    after(() => {
        disableJSDOM();
    });
    beforeEach(() => {
        stack = init();
    });
    it('should not allow navigating back when the stack is empty', () => {
        (0, chai_1.expect)(stack.canGoBack()).to.be.false;
    });
    it('should not allow navigating back when the stack has a single location', () => {
        stack.register(createCursorLocation());
        (0, chai_1.expect)(stack.canGoBack()).to.be.false;
    });
    it('should allow navigating back when the stack has more than one locations', () => {
        stack.register(createCursorLocation(), createCursorLocation({ line: 100, character: 100 }));
        (0, chai_1.expect)(stack.canGoBack()).to.be.true;
    });
    it('should not allow navigating forward when the stack is empty', () => {
        (0, chai_1.expect)(stack.canGoForward()).to.be.false;
    });
    it('should not allow navigating forward when the pointer points to the end last element of the stack', () => {
        stack.register(createCursorLocation(), createCursorLocation({ line: 100, character: 100 }));
        (0, chai_1.expect)(stack.canGoForward()).to.be.false;
    });
    it('should not exceed the max stack item', () => {
        const max = navigation_location_service_1.NavigationLocationService['MAX_STACK_ITEMS'];
        const locations = [...Array(max + 10).keys()].map(i => createCursorLocation({ line: i * 10, character: i }, `file://${i}`));
        stack.register(...locations);
        (0, chai_1.expect)(stack.locations().length).to.not.be.greaterThan(max);
    });
    it('should successfully clear the history', () => {
        (0, chai_1.expect)(stack['recentlyClosedEditors'].length).equal(0);
        const editor = createMockClosedEditor(new uri_1.default('file://foo/a.ts'));
        stack.addClosedEditor(editor);
        (0, chai_1.expect)(stack['recentlyClosedEditors'].length).equal(1);
        (0, chai_1.expect)(stack['stack'].length).equal(0);
        stack.register(createCursorLocation());
        (0, chai_1.expect)(stack['stack'].length).equal(1);
        stack['clearHistory']();
        (0, chai_1.expect)(stack['recentlyClosedEditors'].length).equal(0);
        (0, chai_1.expect)(stack['stack'].length).equal(0);
    });
    describe('last-edit-location', async () => {
        it('should return with undefined if the stack contains no modifications', () => {
            stack.register(createCursorLocation(), createCursorLocation({ line: 100, character: 100 }));
            (0, chai_1.expect)(stack.lastEditLocation()).to.be.undefined;
        });
        it('should return with the location of the last modification', () => {
            const expected = navigation_location_1.NavigationLocation.create('file://path/to/file', {
                text: '',
                range: { start: { line: 200, character: 0 }, end: { line: 500, character: 0 } },
                rangeLength: 0
            });
            stack.register(createCursorLocation(), expected, createCursorLocation({ line: 100, character: 100 }));
            (0, chai_1.expect)(stack.lastEditLocation()).to.be.deep.equal(expected);
        });
        it('should return with the location of the last modification even if the pointer is not on the head', async () => {
            const modificationLocation = navigation_location_1.NavigationLocation.create('file://path/to/file', {
                text: '',
                range: { start: { line: 300, character: 0 }, end: { line: 500, character: 0 } },
                rangeLength: 0
            });
            const expected = navigation_location_1.NavigationLocation.create('file://path/to/file', {
                text: '',
                range: { start: { line: 700, character: 0 }, end: { line: 800, character: 0 } },
                rangeLength: 0
            });
            stack.register(createCursorLocation(), modificationLocation, createCursorLocation({ line: 100, character: 100 }), expected);
            await stack.back();
            await stack.back();
            (0, chai_1.expect)(stack.currentLocation()).to.be.deep.equal(modificationLocation);
            (0, chai_1.expect)(stack.lastEditLocation()).to.be.deep.equal(expected);
        });
    });
    describe('recently-closed-editors', () => {
        describe('#getLastClosedEditor', () => {
            it('should return the last closed editor from the history', () => {
                const uri = new uri_1.default('file://foo/a.ts');
                stack.addClosedEditor(createMockClosedEditor(uri));
                const editor = stack.getLastClosedEditor();
                (0, chai_1.expect)(editor === null || editor === void 0 ? void 0 : editor.uri).equal(uri);
            });
            it('should return `undefined` when no history is found', () => {
                (0, chai_1.expect)(stack['recentlyClosedEditors'].length).equal(0);
                const editor = stack.getLastClosedEditor();
                (0, chai_1.expect)(editor).equal(undefined);
            });
            it('should not exceed the max history', () => {
                (0, chai_1.expect)(stack['recentlyClosedEditors'].length).equal(0);
                const max = navigation_location_service_1.NavigationLocationService['MAX_RECENTLY_CLOSED_EDITORS'];
                for (let i = 0; i < max + 10; i++) {
                    const uri = new uri_1.default(`file://foo/bar-${i}.ts`);
                    stack.addClosedEditor(createMockClosedEditor(uri));
                }
                (0, chai_1.expect)(stack['recentlyClosedEditors'].length <= max).be.true;
            });
        });
        describe('#addToRecentlyClosedEditors', () => {
            it('should include unique recently closed editors in the history', () => {
                (0, chai_1.expect)(stack['recentlyClosedEditors'].length).equal(0);
                const a = createMockClosedEditor(new uri_1.default('file://foo/a.ts'));
                const b = createMockClosedEditor(new uri_1.default('file://foo/b.ts'));
                stack.addClosedEditor(a);
                stack.addClosedEditor(b);
                (0, chai_1.expect)(stack['recentlyClosedEditors'].length).equal(2);
            });
            it('should not include duplicate recently closed editors in the history', () => {
                const uri = new uri_1.default('file://foo/a.ts');
                [1, 2, 3].forEach(i => {
                    stack.addClosedEditor(createMockClosedEditor(uri));
                });
                (0, chai_1.expect)(stack['recentlyClosedEditors'].length).equal(1);
            });
        });
        describe('#removeFromRecentlyClosedEditors', () => {
            it('should successfully remove editors from the history that match the given editor uri', () => {
                (0, chai_1.expect)(stack['recentlyClosedEditors'].length).equal(0);
                const editor = createMockClosedEditor(new uri_1.default('file://foo/a.ts'));
                [1, 2, 3].forEach(() => {
                    stack['recentlyClosedEditors'].push(editor);
                });
                (0, chai_1.expect)(stack['recentlyClosedEditors'].length).equal(3);
                // Remove the given editor from the recently closed history.
                stack['removeClosedEditor'](editor.uri);
                (0, chai_1.expect)(stack['recentlyClosedEditors'].length).equal(0);
            });
        });
    });
    function createCursorLocation(context = { line: 0, character: 0, }, uri = 'file://path/to/file') {
        return navigation_location_1.NavigationLocation.create(uri, context);
    }
    function init() {
        const container = new inversify_1.Container({ defaultScope: 'Singleton' });
        container.bind(navigation_location_service_1.NavigationLocationService).toSelf();
        container.bind(navigation_location_similarity_1.NavigationLocationSimilarity).toSelf();
        container.bind(mock_opener_service_1.MockOpenerService).toSelf();
        container.bind(mock_logger_1.MockLogger).toSelf();
        container.bind(logger_1.ILogger).toService(mock_logger_1.MockLogger);
        container.bind(mock_navigation_location_updater_1.NoopNavigationLocationUpdater).toSelf();
        container.bind(navigation_location_updater_1.NavigationLocationUpdater).toService(mock_navigation_location_updater_1.NoopNavigationLocationUpdater);
        container.bind(opener_service_1.OpenerService).toService(mock_opener_service_1.MockOpenerService);
        return container.get(navigation_location_service_1.NavigationLocationService);
    }
    function createMockClosedEditor(uri) {
        return { uri, viewState: {} };
    }
});
//# sourceMappingURL=navigation-location-service.spec.js.map