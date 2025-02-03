"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
const tslib_1 = require("tslib");
const jsdom_1 = require("../test/jsdom");
let disableJSDOM = (0, jsdom_1.enableJSDOM)();
const inversify_1 = require("inversify");
const chai = require("chai");
const sinon = require("sinon");
const os = require("../../common/os");
const logger_1 = require("../../common/logger");
const storage_service_1 = require("../storage-service");
const message_service_1 = require("../../common/message-service");
const window_service_1 = require("../window/window-service");
const browser_keyboard_layout_provider_1 = require("./browser-keyboard-layout-provider");
const keys_1 = require("./keys");
disableJSDOM();
describe('browser keyboard layout provider', function () {
    let stubOSX;
    let stubWindows;
    before(() => disableJSDOM = (0, jsdom_1.enableJSDOM)());
    after(() => disableJSDOM());
    const setup = (system) => {
        switch (system) {
            case 'mac':
                stubOSX = sinon.stub(os, 'isOSX').value(true);
                stubWindows = sinon.stub(os, 'isWindows').value(false);
                break;
            case 'win':
                stubOSX = sinon.stub(os, 'isOSX').value(false);
                stubWindows = sinon.stub(os, 'isWindows').value(true);
                break;
            default:
                stubOSX = sinon.stub(os, 'isOSX').value(false);
                stubWindows = sinon.stub(os, 'isWindows').value(false);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const container = new inversify_1.Container();
        container.bind(browser_keyboard_layout_provider_1.BrowserKeyboardLayoutProvider).toSelf();
        container.bind(logger_1.ILogger).to(MockLogger);
        container.bind(storage_service_1.LocalStorageService).toSelf().inSingletonScope();
        container.bind(message_service_1.MessageService).toConstantValue({});
        container.bind(window_service_1.WindowService).toConstantValue({});
        const service = container.get(browser_keyboard_layout_provider_1.BrowserKeyboardLayoutProvider);
        return { service, container };
    };
    afterEach(() => {
        stubOSX.restore();
        stubWindows.restore();
    });
    it('detects German Mac layout', async () => {
        const { service } = setup('mac');
        let currentLayout = await service.getNativeLayout();
        service.onDidChangeNativeLayout(l => {
            currentLayout = l;
        });
        chai.expect(currentLayout.info.id).to.equal('com.apple.keylayout.US');
        service.validateKey({ code: keys_1.Key.SEMICOLON.code, character: 'ö' });
        chai.expect(currentLayout.info.id).to.equal('com.apple.keylayout.German');
    });
    it('detects French Mac layout', async () => {
        const { service } = setup('mac');
        let currentLayout = await service.getNativeLayout();
        service.onDidChangeNativeLayout(l => {
            currentLayout = l;
        });
        chai.expect(currentLayout.info.id).to.equal('com.apple.keylayout.German');
        service.validateKey({ code: keys_1.Key.SEMICOLON.code, character: 'm' });
        chai.expect(currentLayout.info.id).to.equal('com.apple.keylayout.French');
    });
    it('detects keyboard layout change', async () => {
        const { service } = setup('mac');
        let currentLayout = await service.getNativeLayout();
        service.onDidChangeNativeLayout(l => {
            currentLayout = l;
        });
        service.validateKey({ code: keys_1.Key.QUOTE.code, character: 'ä' });
        service.validateKey({ code: keys_1.Key.SEMICOLON.code, character: 'ö' });
        service.validateKey({ code: keys_1.Key.BRACKET_LEFT.code, character: 'ü' });
        chai.expect(currentLayout.info.id).to.equal('com.apple.keylayout.German');
        service.validateKey({ code: keys_1.Key.SEMICOLON.code, character: 'm' });
        chai.expect(currentLayout.info.id).to.equal('com.apple.keylayout.French');
    });
    it('applies layout chosen by the user', async () => {
        const { service } = setup('mac');
        let currentLayout = await service.getNativeLayout();
        service.onDidChangeNativeLayout(l => {
            currentLayout = l;
        });
        service.validateKey({ code: keys_1.Key.SEMICOLON.code, character: 'm' });
        const spanishLayout = service.allLayoutData.find(data => data.name === 'Spanish' && data.hardware === 'mac');
        await service.setLayoutData(spanishLayout);
        chai.expect(currentLayout.info.id).to.equal('com.apple.keylayout.Spanish');
        await service.setLayoutData('autodetect');
        chai.expect(currentLayout.info.id).to.equal('com.apple.keylayout.French');
    });
    it('restores pressed keys from last session', async () => {
        const { service, container } = setup('mac');
        service.validateKey({ code: keys_1.Key.SEMICOLON.code, character: 'm' });
        const service2 = container.get(browser_keyboard_layout_provider_1.BrowserKeyboardLayoutProvider);
        chai.expect(service2).to.not.equal(service);
        const currentLayout = await service2.getNativeLayout();
        chai.expect(currentLayout.info.id).to.equal('com.apple.keylayout.French');
    });
    it('restores user selection from last session', async () => {
        const { service, container } = setup('mac');
        const spanishLayout = service.allLayoutData.find(data => data.name === 'Spanish' && data.hardware === 'mac');
        await service.setLayoutData(spanishLayout);
        const service2 = container.get(browser_keyboard_layout_provider_1.BrowserKeyboardLayoutProvider);
        chai.expect(service2).to.not.equal(service);
        service2.validateKey({ code: keys_1.Key.SEMICOLON.code, character: 'm' });
        const currentLayout = await service2.getNativeLayout();
        chai.expect(currentLayout.info.id).to.equal('com.apple.keylayout.Spanish');
    });
});
let MockLogger = class MockLogger {
    trace(loggable) {
        return Promise.resolve();
    }
    debug(loggable) {
        return Promise.resolve();
    }
    info(loggable) {
        return Promise.resolve();
    }
    warn(loggable) {
        return Promise.resolve();
    }
    error(loggable) {
        return Promise.resolve();
    }
    fatal(loggable) {
        return Promise.resolve();
    }
};
MockLogger = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MockLogger);
//# sourceMappingURL=browser-keyboard-layout-provider.spec.js.map