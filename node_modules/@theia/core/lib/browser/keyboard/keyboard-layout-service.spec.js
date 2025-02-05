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
const inversify_1 = require("inversify");
const event_1 = require("../../common/event");
const keys_1 = require("./keys");
const keyboard_layout_service_1 = require("./keyboard-layout-service");
const keyboard_layout_provider_1 = require("../../common/keyboard/keyboard-layout-provider");
const os = require("../../common/os");
const chai = require("chai");
const sinon = require("sinon");
describe('keyboard layout service', function () {
    let stubOSX;
    let stubWindows;
    const setup = async (layout, system) => {
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
        const container = new inversify_1.Container();
        container.bind(keyboard_layout_service_1.KeyboardLayoutService).toSelf().inSingletonScope();
        let MockLayoutProvider = class MockLayoutProvider {
            constructor() {
                this.emitter = new event_1.Emitter();
            }
            get onDidChangeNativeLayout() {
                return this.emitter.event;
            }
            getNativeLayout() {
                return Promise.resolve(layout);
            }
        };
        MockLayoutProvider = tslib_1.__decorate([
            (0, inversify_1.injectable)()
        ], MockLayoutProvider);
        container.bind(keyboard_layout_provider_1.KeyboardLayoutProvider).to(MockLayoutProvider);
        container.bind(keyboard_layout_provider_1.KeyboardLayoutChangeNotifier).to(MockLayoutProvider);
        const service = container.get(keyboard_layout_service_1.KeyboardLayoutService);
        await service.initialize();
        return service;
    };
    afterEach(() => {
        stubOSX.restore();
        stubWindows.restore();
    });
    it('resolves correct key bindings with German Mac layout', async () => {
        const macGerman = require('../../../src/common/keyboard/layouts/de-German-mac.json');
        const service = await setup(macGerman, 'mac');
        const toggleComment = service.resolveKeyCode(keys_1.KeyCode.createKeyCode('Slash+M1'));
        chai.expect(toggleComment.toString()).to.equal('meta+shift+7');
        chai.expect(service.getKeyboardCharacter(toggleComment.key)).to.equal('7');
        const indentLine = service.resolveKeyCode(keys_1.KeyCode.createKeyCode('BracketRight+M1'));
        chai.expect(indentLine.toString()).to.equal('meta+alt+ctrl+6');
        chai.expect(service.getKeyboardCharacter(indentLine.key)).to.equal('6');
    });
    it('resolves correct key bindings with French Mac layout', async () => {
        const macFrench = require('../../../src/common/keyboard/layouts/fr-French-mac.json');
        const service = await setup(macFrench, 'mac');
        const toggleComment = service.resolveKeyCode(keys_1.KeyCode.createKeyCode('Slash+M1'));
        chai.expect(toggleComment.toString()).to.equal('meta+shift+.');
        chai.expect(service.getKeyboardCharacter(toggleComment.key)).to.equal(':');
        const indentLine = service.resolveKeyCode(keys_1.KeyCode.createKeyCode('BracketRight+M1'));
        chai.expect(indentLine.toString()).to.equal('meta+shift+alt+ctrl+-');
        chai.expect(service.getKeyboardCharacter(indentLine.key)).to.equal(')');
    });
    it('resolves correct key bindings with German Windows layout', async () => {
        const winGerman = require('../../../src/common/keyboard/layouts/de-German-pc.json');
        const service = await setup(winGerman, 'win');
        const toggleComment = service.resolveKeyCode(keys_1.KeyCode.createKeyCode('Slash+M1'));
        chai.expect(toggleComment.toString()).to.equal('ctrl+\\');
        chai.expect(service.getKeyboardCharacter(toggleComment.key)).to.equal('#');
        const indentLine = service.resolveKeyCode(keys_1.KeyCode.createKeyCode('BracketRight+M1'));
        chai.expect(indentLine.toString()).to.equal('ctrl+=');
        chai.expect(service.getKeyboardCharacter(indentLine.key)).to.equal('´');
    });
    it('resolves correct key bindings with French Windows layout', async () => {
        const winFrench = require('../../../src/common/keyboard/layouts/fr-French-pc.json');
        const service = await setup(winFrench, 'win');
        const toggleComment = service.resolveKeyCode(keys_1.KeyCode.createKeyCode('Slash+M1'));
        chai.expect(toggleComment.toString()).to.equal('ctrl+.');
        chai.expect(service.getKeyboardCharacter(toggleComment.key)).to.equal(':');
        const indentLine = service.resolveKeyCode(keys_1.KeyCode.createKeyCode('BracketRight+M1'));
        chai.expect(indentLine.toString()).to.equal('ctrl+[');
        chai.expect(service.getKeyboardCharacter(indentLine.key)).to.equal('^');
    });
});
//# sourceMappingURL=keyboard-layout-service.spec.js.map