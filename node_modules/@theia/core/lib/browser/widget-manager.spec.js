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
const jsdom_1 = require("./test/jsdom");
let disableJsDom = (0, jsdom_1.enableJSDOM)();
const inversify_1 = require("inversify");
const chai_1 = require("chai");
const widget_manager_1 = require("./widget-manager");
const widgets_1 = require("@phosphor/widgets");
const logger_1 = require("../common/logger");
const mock_logger_1 = require("../common/test/mock-logger");
const common_1 = require("../common");
disableJsDom();
class TestWidgetFactory {
    constructor() {
        this.invocations = 0;
        this.id = 'test';
    }
    async createWidget(name) {
        this.invocations++;
        const result = new widgets_1.Widget;
        result.id = name;
        return result;
    }
}
describe('widget-manager', () => {
    let widgetManager;
    before(() => {
        disableJsDom = (0, jsdom_1.enableJSDOM)();
    });
    beforeEach(() => {
        const testContainer = new inversify_1.Container();
        const module = new inversify_1.ContainerModule(bind => {
            bind(logger_1.ILogger).to(mock_logger_1.MockLogger);
            (0, common_1.bindContributionProvider)(bind, widget_manager_1.WidgetFactory);
            bind(widget_manager_1.WidgetFactory).toConstantValue(new TestWidgetFactory());
            bind(widget_manager_1.WidgetManager).toSelf().inSingletonScope();
        });
        testContainer.load(module);
        widgetManager = testContainer.get(widget_manager_1.WidgetManager);
    });
    after(() => {
        disableJsDom();
    });
    it('creates and caches widgets', async () => {
        const wA = await widgetManager.getOrCreateWidget('test', 'widgetA');
        const wB = await widgetManager.getOrCreateWidget('test', 'widgetB');
        (0, chai_1.expect)(wA).not.equals(wB);
        (0, chai_1.expect)(wA).equals(await widgetManager.getOrCreateWidget('test', 'widgetA'));
    });
    describe('tryGetWidget', () => {
        it('Returns undefined if the widget has not been created', () => {
            (0, chai_1.expect)(widgetManager.tryGetWidget('test', 'widgetA')).to.be.undefined;
        });
        it('Returns undefined if the widget is created asynchronously and has not finished being created', () => {
            widgetManager.getOrCreateWidget('test', 'widgetA');
            (0, chai_1.expect)(widgetManager.tryGetWidget('test', 'widgetA')).to.be.undefined;
        });
        it('Returns the widget if the widget is created asynchronously and has finished being created', async () => {
            await widgetManager.getOrCreateWidget('test', 'widgetA');
            (0, chai_1.expect)(widgetManager.tryGetWidget('test', 'widgetA')).not.to.be.undefined;
        });
    });
    it('produces the same widget key regardless of object key order', () => {
        const options1 = {
            factoryId: 'a',
            key1: 1,
            key2: 2,
        };
        const options2 = {
            key2: 2,
            key1: 1,
            factoryId: 'a',
        };
        (0, chai_1.expect)(widgetManager['toKey'](options1)).equals(widgetManager['toKey'](options2));
    });
});
//# sourceMappingURL=widget-manager.spec.js.map